// Ponto de entrada da página: lê os campos do formulário, chama a lógica de
// cálculo (js/logica/) e escreve o resultado formatado na tela (js/ui/).

import { indiceMetodosA_D } from "./dados/tabelaCondutores.js";
import { procuraCondutorCorrespondente } from "./logica/selecaoDeCondutor.js";
import { tabelaAgrupamentoDeCircuitos } from "./dados/tabelaAgrupamentoCircuitos.js";
import { correcaoDeTemperatura } from "./logica/correcaoTemperatura.js";
import { MainFuncaoCalculoDeQueda, secoesRetasDisponiveis } from "./logica/quedaDeTensao.js";
import { retornaDiametroDoCondutor } from "./logica/diametroCondutor.js";
import { retornaOPrimeiroValorMaior_e } from "./logica/buscaBinaria.js";
import { opcoesPorMetodo, preencherOpcoesNumeroDeCondutores } from "./ui/opcoesNumeroDeCondutores.js";
import { criarTabelaSecaoCondutor, criarTabelaQuedaTensao } from "./ui/tabelaResultados.js";

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
    const fatorCorrecaoAgrupamento = tabelaAgrupamentoDeCircuitos[selectReferenciaAgrupamento.value][selectNumeroDeCircuitos.value - 1];

    const correnteCorrigida = (correnteProjetoAmpere / fatorCorrecaoTemperatura) / fatorCorrecaoAgrupamento;

    const secaoDoCondutor = procuraCondutorCorrespondente(correnteCorrigida, metodoInstalacaoValor, materialCondutorValor, materialIsolacaoValor, numeroCondutoresValor);
    const tabelaHtml = criarTabelaSecaoCondutor(correnteProjetoAmpere, metodoInstalacaoValor, materialCondutorValor, materialIsolacaoValor, numeroCondutoresValor, inputTemperatura.value, selectLocalInstalacao.value, fatorCorrecaoTemperatura, fatorCorrecaoAgrupamento, secaoDoCondutor);

    inputDiametroCondutor.value = retornaDiametroDoCondutor(secaoDoCondutor).toFixed(2); // valor aproximado

    return [secaoDoCondutor, tabelaHtml];
}

botaoCalcularSecao.onclick = function () {
    const [secaoDoCondutor, tabelaHtml] = calcularSecaoCabo(inputCorrenteProjeto.value);
    inputSecaoReta.value = secaoDoCondutor;
    divResultadoSecao.innerHTML = tabelaHtml;
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
};

botaoCalcularQuedaTensao.onclick = function () {
    const secaoMaisProxima = retornaOPrimeiroValorMaior_e(Number(inputSecaoReta.value), secoesRetasDisponiveis[selectMaterialCondutor.value]);
    inputSecaoReta.value = secaoMaisProxima === false ? 0.5 : secaoMaisProxima;
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
