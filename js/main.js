// Ponto de entrada da página: lê os campos do formulário, chama a lógica de
// cálculo (js/logica/) e escreve o resultado formatado na tela (js/ui/).

import { indiceMetodosA_D } from "./dados/tabelaCondutores.js";
import { procuraCondutorCorrespondente } from "./logica/selecaoDeCondutor.js";
import { tabelaAgrupamentoDeCircuitos } from "./dados/tabelaAgrupamentoCircuitos.js";
import { correcaoDeTemperatura } from "./logica/correcaoTemperatura.js";
import { MainFuncaoCalculoDeQueda, secoesRetasDisponiveis } from "./logica/quedaDeTensao.js";
import { retornaDiametroDoCondutor } from "./logica/diametroCondutor.js";
import { retornaOPrimeiroValorMaior_e } from "./logica/buscaBinaria.js";
import { calcularGMD, calcularGMDSimetrica, calcularGMDLinha, calcularGMDGeral } from "./logica/gmd.js";
import { opcoesPorMetodo, preencherOpcoesNumeroDeCondutores } from "./ui/opcoesNumeroDeCondutores.js";
import { preencherOpcoesSecaoReta } from "./ui/opcoesSecaoReta.js";
import { criarTabelaCaboBase, criarTabelaCaboTemperatura, criarTabelaSecaoCondutor, criarTabelaQuedaTensao } from "./ui/tabelaResultados.js";

// --- Campos do formulário: seleção de seção do condutor ---
const inputCorrenteProjeto = document.querySelector("#correnteDeProjeto");
const selectMetodoInstalacao = document.querySelector("#selecaoMetodo");
const selectMaterialCondutor = document.querySelector("#selecaoMaterial");
const selectMaterialIsolacao = document.querySelector("#selecaoIsolacao");
let selectNumeroCondutores = document.querySelector("#nCondutores");
const selectLocalInstalacao = document.querySelector("#localInsta");
const inputTemperatura = document.querySelector("#correcaoTemp");
const selectReferenciaAgrupamento = document.querySelector("#ReferenciasAgrupamentoCircuitos");
const selectNumeroDeCircuitos = document.querySelector("#numeroDeCircuitos");
const botaoCalcularSecao = document.querySelector("#calcularGeral");
const divResultadoSecao = document.querySelector(".resultado");
const botaoSelecionarCabo = document.querySelector("#botaoSelecionarCabo");
const divResultadoCaboBase = document.querySelector(".resultadoCaboBase");
const botaoSelecionarCaboTemperatura = document.querySelector("#botaoSelecionarCaboTemperatura");
const divResultadoCaboTemperatura = document.querySelector(".resultadoCaboTemperatura");

// --- Campos do formulário: queda de tensão ---
const inputSecaoReta = document.querySelector("#secaoReta_quedaDeTensao");
const inputTensaoNominal = document.querySelector("#tensaoNominal");
const inputComprimentoCircuito = document.querySelector("#comprimento_Circuito");
const inputDiametroCondutor = document.querySelector("#diametro_Condutor");
const inputDistanciaEntreEixos = document.querySelector("#distancia_Entre_Eixos");
const inputCosPhi = document.querySelector("#cosPhi");
const inputGmd = document.querySelector("#_gmd");
const botaoCalcularQuedaTensao = document.querySelector("#botao3");
const divResultadoQuedaTensao = document.querySelector(".resultado3");

// A lista de seções disponíveis no select depende do material do condutor.
preencherOpcoesSecaoReta(secoesRetasDisponiveis[selectMaterialCondutor.value], inputSecaoReta, 50);

selectMaterialCondutor.onchange = function () {
    const secoesDoNovoMaterial = secoesRetasDisponiveis[selectMaterialCondutor.value];
    const secaoMaisProxima = retornaOPrimeiroValorMaior_e(Number(inputSecaoReta.value), secoesDoNovoMaterial);
    preencherOpcoesSecaoReta(secoesDoNovoMaterial, inputSecaoReta, secaoMaisProxima);
    inputDiametroCondutor.value = retornaDiametroDoCondutor(inputSecaoReta.value).toFixed(2); // valor aproximado
};

// O GMD é sempre recalculado a partir da distância entre eixos e da
// disposição escolhida em "Número de condutores carregados" — nunca digitado
// manualmente (ver js/logica/gmd.js).
function recalcularGmd() {
    inputGmd.value = calcularGMD(selectNumeroCondutores.value, Number(inputDistanciaEntreEixos.value)).toFixed(4);
}
recalcularGmd();

selectNumeroCondutores.onchange = recalcularGmd;

// --- Calculadora de GMD (widget à parte, não interfere no cálculo principal
// até que "Usar este valor no cálculo" seja clicado). Nos modos simples
// (trifólio/2 cabos/linha) ela usa direto o valor de "Distância entre
// eixos" acima — não faz sentido pedir a mesma medida duas vezes. Só o
// caso geral (triângulo irregular) tem campos próprios, pois não há como
// reaproveitar um único valor de distância nesse caso. ---
const selectGmdCalcDisposicao = document.querySelector("#gmdCalcDisposicao");
const inputGmdCalcX = document.querySelector("#gmdCalcX");
const inputGmdCalcY = document.querySelector("#gmdCalcY");
const inputGmdCalcZ = document.querySelector("#gmdCalcZ");
const notaGmdCalcSimples = document.querySelector("#gmdCalcNotaSimples");
const divGmdCalcInputsXYZ = document.querySelector("#gmdCalcInputsXYZ");
const infoGmdCalcResultado = document.querySelector("#gmdCalcResultado");
const botaoUsarGmdCalculado = document.querySelector("#botaoUsarGmdCalculado");
const diagramasGmdCalc = document.querySelectorAll(".gmd-diagrama");

function calcularGmdDaCalculadora() {
    const modo = selectGmdCalcDisposicao.value;
    if (modo === "xyz") {
        return calcularGMDGeral(Number(inputGmdCalcX.value), Number(inputGmdCalcY.value), Number(inputGmdCalcZ.value));
    }
    const distancia = Number(inputDistanciaEntreEixos.value);
    if (modo === "linha") {
        return calcularGMDLinha(distancia);
    }
    return calcularGMDSimetrica(distancia); // trifólio ou 2 cabos
}

function atualizarResultadoGmdCalculadora() {
    infoGmdCalcResultado.textContent = `${calcularGmdDaCalculadora().toFixed(4)} mm`;
}

// Mostra o diagrama correspondente à disposição escolhida (um <svg> por
// opção do select, todos com o id "gmdDiagrama-<valor da opção>").
// Usa style.display em vez da propriedade "hidden" porque esta última não é
// bem suportada em elementos <svg> em todos os navegadores.
function atualizarDiagramaGmdCalculadora() {
    diagramasGmdCalc.forEach((svg) => {
        const ativo = svg.id === `gmdDiagrama-${selectGmdCalcDisposicao.value}`;
        svg.style.display = ativo ? "block" : "none";
    });
}

selectGmdCalcDisposicao.onchange = function () {
    const ehCasoGeral = selectGmdCalcDisposicao.value === "xyz";
    notaGmdCalcSimples.hidden = ehCasoGeral;
    divGmdCalcInputsXYZ.hidden = !ehCasoGeral;
    atualizarDiagramaGmdCalculadora();
    atualizarResultadoGmdCalculadora();
};
[inputGmdCalcX, inputGmdCalcY, inputGmdCalcZ].forEach((elemento) => {
    elemento.oninput = atualizarResultadoGmdCalculadora;
});
atualizarDiagramaGmdCalculadora();
atualizarResultadoGmdCalculadora();

inputDistanciaEntreEixos.onchange = function () {
    recalcularGmd();
    atualizarResultadoGmdCalculadora();
};

botaoUsarGmdCalculado.onclick = function () {
    inputGmd.value = calcularGmdDaCalculadora().toFixed(4);
};

/**
 * Calcula a seção do condutor (mm²) a partir da corrente de projeto,
 * aplicando as correções de temperatura e de agrupamento de circuitos.
 * @returns {[string, string]} [secaoDoCondutor, tabelaHtmlDeResultado]
 */
function calcularSecaoCabo(correnteProjetoAmpere) {
    const metodoInstalacaoValor = selectMetodoInstalacao.value;
    const materialCondutorValor = selectMaterialCondutor.value;
    const materialIsolacaoValor = selectMaterialIsolacao.value;
    const numeroCondutoresValor = selectNumeroCondutores.value;

    const fatorCorrecaoTemperatura = correcaoDeTemperatura(inputTemperatura.value * 1, selectLocalInstalacao.value, selectMaterialIsolacao.value);
    const correnteAposTemperatura = correnteProjetoAmpere / fatorCorrecaoTemperatura;

    const fatorCorrecaoAgrupamento = tabelaAgrupamentoDeCircuitos[selectReferenciaAgrupamento.value][selectNumeroDeCircuitos.value - 1];
    const correnteCorrigida = correnteAposTemperatura / fatorCorrecaoAgrupamento;

    const { secao: secaoDoCondutor, capacidadeAdmissivel } = procuraCondutorCorrespondente(correnteCorrigida, metodoInstalacaoValor, materialCondutorValor, materialIsolacaoValor, numeroCondutoresValor);

    const tabelaHtml = criarTabelaSecaoCondutor({
        correnteProjeto: correnteProjetoAmpere,
        metodoInstalacao: metodoInstalacaoValor,
        materialCondutor: materialCondutorValor,
        materialIsolacao: materialIsolacaoValor,
        numeroCondutores: numeroCondutoresValor,
        temperatura: inputTemperatura.value,
        localInstalacao: selectLocalInstalacao.value,
        fatorCorrecaoTemperatura,
        correnteAposTemperatura,
        fatorCorrecaoAgrupamento,
        correnteCorrigida,
        capacidadeAdmissivel,
        secaoDoCondutor
    });

    inputDiametroCondutor.value = retornaDiametroDoCondutor(secaoDoCondutor).toFixed(2); // valor aproximado

    return [secaoDoCondutor, tabelaHtml];
}

botaoCalcularSecao.onclick = function () {
    const [secaoDoCondutor, tabelaHtml] = calcularSecaoCabo(inputCorrenteProjeto.value);
    // A tabela de seção do condutor inclui seções menores que não existem na
    // lista de seções da queda de tensão (ex.: 0,5mm²) — arredonda para cima.
    inputSecaoReta.value = retornaOPrimeiroValorMaior_e(Number(secaoDoCondutor), secoesRetasDisponiveis[selectMaterialCondutor.value]);
    divResultadoSecao.innerHTML = tabelaHtml;
};

// Mostra qual cabo seria escolhido só pela corrente de projeto, método,
// material, isolação e nº de condutores — antes de qualquer correção de
// temperatura ou agrupamento (que serão aplicadas sobre esta capacidade).
botaoSelecionarCabo.onclick = function () {
    const metodoInstalacaoValor = selectMetodoInstalacao.value;
    const materialCondutorValor = selectMaterialCondutor.value;
    const materialIsolacaoValor = selectMaterialIsolacao.value;
    const numeroCondutoresValor = selectNumeroCondutores.value;

    const { secao, capacidadeAdmissivel } = procuraCondutorCorrespondente(inputCorrenteProjeto.value, metodoInstalacaoValor, materialCondutorValor, materialIsolacaoValor, numeroCondutoresValor);

    divResultadoCaboBase.innerHTML = criarTabelaCaboBase(inputCorrenteProjeto.value, metodoInstalacaoValor, materialCondutorValor, materialIsolacaoValor, numeroCondutoresValor, secao, capacidadeAdmissivel);
};

// Mostra qual cabo seria escolhido já com a correção de temperatura
// aplicada, mas ainda sem o fator de agrupamento de circuitos.
botaoSelecionarCaboTemperatura.onclick = function () {
    const fatorCorrecaoTemperatura = correcaoDeTemperatura(inputTemperatura.value * 1, selectLocalInstalacao.value, selectMaterialIsolacao.value);
    const correnteAposTemperatura = inputCorrenteProjeto.value / fatorCorrecaoTemperatura;

    const { secao, capacidadeAdmissivel } = procuraCondutorCorrespondente(correnteAposTemperatura, selectMetodoInstalacao.value, selectMaterialCondutor.value, selectMaterialIsolacao.value, selectNumeroCondutores.value);

    divResultadoCaboTemperatura.innerHTML = criarTabelaCaboTemperatura(inputCorrenteProjeto.value, inputTemperatura.value, selectLocalInstalacao.value, fatorCorrecaoTemperatura, correnteAposTemperatura, secao, capacidadeAdmissivel);
};

// Ao trocar o método de instalação, as opções de "número de condutores
// carregados" mudam: A-D compartilham um conjunto, E/F/G têm o seu próprio.
selectMetodoInstalacao.onchange = function () {
    const metodo = selectMetodoInstalacao.value;
    if (indiceMetodosA_D.indexOf(metodo) >= 0) {
        preencherOpcoesNumeroDeCondutores(opcoesPorMetodo.ABCD, selectNumeroCondutores);
    } else if (metodo === "E") {
        preencherOpcoesNumeroDeCondutores(opcoesPorMetodo.E, selectNumeroCondutores);
    } else if (metodo === "F") {
        preencherOpcoesNumeroDeCondutores(opcoesPorMetodo.F, selectNumeroCondutores);
    } else if (metodo === "G") {
        preencherOpcoesNumeroDeCondutores(opcoesPorMetodo.G, selectNumeroCondutores);
    }
    selectNumeroCondutores = document.querySelector("#nCondutores");
    selectNumeroCondutores.onchange = recalcularGmd;
    recalcularGmd(); // a disposição pode ter mudado silenciosamente (sem disparar "change")
};

botaoCalcularQuedaTensao.onclick = function () {
    divResultadoQuedaTensao.innerHTML = calcularQuedaDeTensao();
};

inputSecaoReta.onchange = function () {
    inputDiametroCondutor.value = retornaDiametroDoCondutor(inputSecaoReta.value).toFixed(2); // valor aproximado
};

function calcularQuedaDeTensao() {
    const secaoRetaValor = Number(inputSecaoReta.value);
    if (secaoRetaValor === 0) {
        return "Selecione uma Seção de Cabo";
    }

    const materialCondutorValor = String(selectMaterialCondutor.value);
    const cosPhiValor = Number(inputCosPhi.value);
    const correnteProjetoValor = Number(inputCorrenteProjeto.value);
    const comprimentoCircuitoKm = Number(inputComprimentoCircuito.value) / 1000;
    const numeroCondutoresCarregados = Number(selectNumeroCondutores.value.substring(0, 1));
    const materialIsolacaoValor = String(selectMaterialIsolacao.value);
    const diametroCondutorValor = Number(inputDiametroCondutor.value);
    const distanciaEntreEixosValor = Number(inputDistanciaEntreEixos.value);
    const gmdValor = Number(inputGmd.value);

    const quedaTensaoVolts = MainFuncaoCalculoDeQueda(materialCondutorValor, cosPhiValor, correnteProjetoValor, comprimentoCircuitoKm, numeroCondutoresCarregados, materialIsolacaoValor, secaoRetaValor, diametroCondutorValor, distanciaEntreEixosValor, gmdValor);

    return criarTabelaQuedaTensao(quedaTensaoVolts, inputTensaoNominal.value, comprimentoCircuitoKm, correnteProjetoValor);
}
