// Cálculo de queda de tensão em corrente alternada para condutores de baixa
// tensão, seguindo o método descrito na NBR5410 / guias de fabricantes
// (resistência CA corrigida por efeito pelicular e de proximidade, reatância
// indutiva a partir da GMD, e queda de tensão resultante em V/A.km).

import { secoesRetasDisponiveis, tabelaResistenciaR0 } from "../dados/tabelaResistenciaCondutores.js";

export { secoesRetasDisponiveis };

const FREQUENCIA_HZ = 60;
// O código original usava dois valores de PI com precisões diferentes nas
// fórmulas de Xs²/Xp² e de XL. Mantido assim de propósito para não alterar
// os resultados numéricos já validados desta calculadora.
const PI_APROXIMADO = 3.1415;
const PI = 3.14159265359;

/** Queda de tensão (V) por corrente alternada, para circuito de 2 ou 3 fases. */
function quedaTensaoCorrenteAlternada(R, cosPhi, Xl, numeroDeFases) {
    const senPhi = Math.sqrt(1 - Math.pow(cosPhi, 2));
    if (numeroDeFases === 3) {
        return Math.sqrt(3) * (R * cosPhi + Xl * senPhi);
    }
    if (numeroDeFases === 2) {
        return 2 * (R * cosPhi + Xl * senPhi);
    }
}

/** Converte queda de tensão absoluta (V) em percentual da tensão nominal. */
export function quedaDeTensaoPorcento(deltaV, tensaoNominal) {
    return (deltaV / tensaoNominal) * 100;
}

/** Resistência elétrica CA do condutor (Ω/km), corrigida pelos efeitos pelicular (Ys) e de proximidade (Yp). */
function resistenciaEletricaCorrenteAlternada(rLinha, ys, yp) {
    return rLinha * (1 + ys + yp);
}

/** Resistência CC corrigida para a temperatura de operação do condutor (R'). */
function calculoRlinha(r0, alfa20, temperaturaOperacao) {
    return r0 * (1 + alfa20 * (temperaturaOperacao - 20));
}

/** Resistência CC a 20°C (Ω/km) da seção comercial informada. */
function selecionaR0(materialCondutor, secaoReta) {
    const tabela = tabelaResistenciaR0[materialCondutor];
    const indiceSecaoReta = tabela.secaoRetaLista.indexOf(secaoReta);
    return tabela.R0[indiceSecaoReta];
}

/** Coeficiente de variação de resistência com a temperatura (1/°C). */
function calculoValorAlfa20(materialCondutor) {
    if (materialCondutor === "AL") return 0.00403;
    if (materialCondutor === "COBRE") return 0.00393;
}

/** Temperatura máxima de operação do condutor (°C), conforme isolação. */
function calculaTemperaturaOperacao(materialIsolacao) {
    if (materialIsolacao === "PVC") return 70;
    if (materialIsolacao === "EPR") return 90;
}

/** Efeito pelicular (skin effect). */
function calculaYs(xs2) {
    const xs4 = xs2 * xs2;
    return xs4 / (192 + 0.8 * xs4);
}

function calculaXsAoQuadrado(rLinha) {
    return ((8 * PI_APROXIMADO * FREQUENCIA_HZ) / rLinha) * 1e-4;
}

/** Efeito de proximidade entre condutores, depende da geometria (2 ou 3 condutores). */
function calculaYp(xp2, diametroCondutor, distanciaEntreEixos, numeroDeCondutoresCarregados) {
    const xp4 = xp2 * xp2;
    const razaoDiametroDistancia2 = Math.pow(diametroCondutor / distanciaEntreEixos, 2);

    if (numeroDeCondutoresCarregados === 2) {
        return (xp4 / (192 + 0.8 * xp4)) * razaoDiametroDistancia2 * 2.9;
    }
    if (numeroDeCondutoresCarregados === 3) {
        const parte1 = (xp4 / (192 + 0.8 * xp4)) * razaoDiametroDistancia2;
        const parte2 = 0.312 * razaoDiametroDistancia2 + (1.18 / (xp4 / (192 + 0.8 * xp4) + 0.27));
        return parte1 * parte2;
    }
}

function calculaXp2(rLinha, kp) {
    return (8 * PI_APROXIMADO * FREQUENCIA_HZ / rLinha) * 1e-4 * kp;
}

/** Coeficiente Kp por material do condutor (usado no cálculo do efeito de proximidade). */
function selecionadaKpParaMaterialCondutor(materialCondutor) {
    if (materialCondutor === "AL") return 1;
    if (materialCondutor === "COBRE") return 0.8;
}

/** Indutância do circuito (mH/km) a partir da GMD (Geometric Mean Distance) e do diâmetro do condutor. */
function calculoIndutancia(gmd, diametroCondutor) {
    return 0.05 + 0.2 * Math.log1p(2 * gmd / diametroCondutor);
}

/** Reatância indutiva (Ω/km) a partir da indutância L (mH/km). */
function calculoXL(indutancia) {
    return 2 * PI * FREQUENCIA_HZ * indutancia * 1e-3;
}

/**
 * Calcula a queda de tensão total (V) do circuito.
 * @param {"COBRE"|"AL"} materialCondutor
 * @param {number} cosPhi fator de potência
 * @param {number} correnteTransportada em A
 * @param {number} comprimentoDoCircuito em km
 * @param {number} numeroDeCondutoresCarregados 2 ou 3
 * @param {"PVC"|"EPR"} materialIsolacao
 * @param {number} secaoDoCondutor em mm²
 * @param {number} diametroCondutor em mm
 * @param {number} distanciaEntreEixos em mm
 * @param {number} gmd Geometric Mean Distance, em mm
 * @returns {number} queda de tensão em V
 */
export function MainFuncaoCalculoDeQueda(materialCondutor, cosPhi, correnteTransportada, comprimentoDoCircuito, numeroDeCondutoresCarregados, materialIsolacao, secaoDoCondutor, diametroCondutor, distanciaEntreEixos, gmd) {
    const kp = selecionadaKpParaMaterialCondutor(materialCondutor);
    const temperaturaOperacao = calculaTemperaturaOperacao(materialIsolacao);
    const alfa20 = calculoValorAlfa20(materialCondutor);
    const r0 = selecionaR0(materialCondutor, secaoDoCondutor);
    const rLinha = calculoRlinha(r0, alfa20, temperaturaOperacao);
    const xp2 = calculaXp2(rLinha, kp);
    const yp = calculaYp(xp2, diametroCondutor, distanciaEntreEixos, numeroDeCondutoresCarregados);
    const xs2 = calculaXsAoQuadrado(rLinha);
    const ys = calculaYs(xs2);
    const resistenciaCA = resistenciaEletricaCorrenteAlternada(rLinha, ys, yp);
    const indutancia = calculoIndutancia(gmd, diametroCondutor);
    const reatanciaIndutiva = calculoXL(indutancia);
    const quedaPorAmperePorKm = quedaTensaoCorrenteAlternada(resistenciaCA, cosPhi, reatanciaIndutiva, numeroDeCondutoresCarregados);

    return quedaPorAmperePorKm * correnteTransportada * comprimentoDoCircuito;
}

// Nota: o "diâmetro do condutor" usado nestes cálculos é o diâmetro do
// condutor metálico propriamente dito, não o diâmetro externo do cabo.
