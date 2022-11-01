
// Extrair variaveis do |HTML 
const correnteProjeto = document.querySelector("#correnteDeProjeto");
const metodoInstalacao = document.querySelector("#selecaoMetodo");
const materialCondutorSelecionado = document.querySelector("#selecaoMaterial");
const materialIsolacao = document.querySelector("#selecaoIsolacao");
const tipoDeinstalcao = document.querySelector(".tipoDeInstalacao");
let numeroCondutores = document.querySelector("#nCondutores");
const localInstalacaoAmb = document.querySelector("#localInsta");
const correcaoTemp = document.querySelector("#correcaoTemp");
const referenciaDeAgrupamentos = document.querySelector("#ReferenciasAgrupamentoCircuitos");
const NCicuitos = document.querySelector("#numeroDeCircuitos");
const botao = document.querySelector("#calcularGeral");
const resultado = document.querySelector(".resultado");

const tensaoNominal = document.querySelector("#tensaoNominal");
const comprimentoDoCircuito_ = document.querySelector("#comprimento_Circuito");
const diametro_Condutor_ = document.querySelector("#diametro_Condutor");
const distancia_Entre_Eixos_ = document.querySelector("#distancia_Entre_Eixos");
const cossenoPhi = document.querySelector("#cosPhi");
const _gmd = document.querySelector("#_gmd");
const botao3 = document.querySelector("#botao3");
const resultado3 = document.querySelector(".resultado3");

const secaoReta_quedaDeTensao = document.querySelector("#secaoReta_quedaDeTensao")



import { opcaoParaABCD, opcaoParaE, opcaoParaF, opcaoParaG } from "./html.js";
import { indiceMetodosA_D, indiceMetodosE_G, procuraCondutorCorrespondente } from "./tabelasMetodosABCEFG.js";
import { tabela_AgrupamentoDeCircuitos } from "./agrupamentoDeCircuitos.js"
import { correcaoDeTemperatura } from "./FatorTempTabelas.js";
import { MainFuncaoCalculoDeQueda, quedaDeTensaoPorcento, secoesRetasDisponiveis } from "./funcoesDeQuedaDeTensao.js";
import { retornaDiametroDoCondutor } from "./diametroCondutor.js";
import { retornaOPrimeiroValorMaior_e } from "./percorrerListasMetodo.js";


function calcularSecaoCabo(correnteProjeto) {
    // Variaveis para calcular seção do cabo 
    let a = correnteProjeto
    const b = metodoInstalacao.value;
    const c = materialCondutorSelecionado.value;
    const d = materialIsolacao.value;
    const e = numeroCondutores.value;

    // Aplicação da correção de temperatura
    const valorCorrecao = correcaoDeTemperatura(correcaoTemp.value * 1, localInstalacaoAmb.value, materialIsolacao.value);
    a = a / valorCorrecao;
    correnteCorrigida = a;

    //Aplicação da correção por agrupamento de condutores 
    const ref = referenciaDeAgrupamentos.value;
    const nCirc = NCicuitos.value;
    const fatorDeCorrecao = tabela_AgrupamentoDeCircuitos[ref][nCirc - 1];
    a = a / fatorDeCorrecao;

    const result = procuraCondutorCorrespondente(a, b, c, d, e);
    const resultadoTexto = `
    <table>
        <tr>
            <th>Corrente de Projeto </th>
            <th>
                <info>${correnteProjeto}A</info>
            </th>
        </tr>
        <tr>
            <th>Método de Instalação</th>
            <th>
                <info>${metodoInstalacao.value}</info>
            </th>
        </tr>
        <tr>
            <th>Material Condutor </th>
            <th>
                <info>${materialCondutorSelecionado.value}</info>
            </th>
        </tr>
        <tr>
            <th>Material de Isolação </th>
            <th>
                <info>${materialIsolacao.value}</info>
            </th>
        </tr>
        <tr>
            <th>Número de Condutores Carregados </th>
            <th>
                <info>${numeroCondutores.value.substring(0, 1)}</info>
            </th>
        </tr>
        <tr>
            <th>Para temperatura do<info> ${localInstalacaoAmb.value} </info>de <info>
                    ${correcaoTemp.value}ºC</info>
            </th>
            <th>
                <info> ${valorCorrecao} </info>
            </th>
        </tr>
        <tr>
            <th>Fator de agrupamento de circuitos</th>
            <th>
                <info> ${fatorDeCorrecao}</info>
            </th>
        </tr>
        <tr>
            <th>Seção reta do Condutor</th>
            <th>
                <info> ${result}mm²</info>
            </th>
        </tr>
    </table>
    `;
    diametro_Condutor_.value = retornaDiametroDoCondutor(result).toFixed(2); //Valor Aproximado 
    return [result, resultadoTexto];
}

botao.onclick = function () {
    secaoReta_resultado = calcularSecaoCabo(correnteProjeto.value);
    console.log(secaoReta_resultado);
    secaoReta_quedaDeTensao.value = secaoReta_resultado[0];
    resultado.innerHTML = secaoReta_resultado[1];
}

metodoInstalacao.onchange = function () {
    if (0 <= indiceMetodosA_D.indexOf(metodoInstalacao.value)) {
        tipoDeinstalcao.innerHTML = opcaoParaABCD;
        numeroCondutores = document.querySelector("#nCondutores");
    }
    if (metodoInstalacao.value === "E") {
        tipoDeinstalcao.innerHTML = opcaoParaE;
        numeroCondutores = document.querySelector("#nCondutores");
    }
    if (metodoInstalacao.value === "F") {
        tipoDeinstalcao.innerHTML = opcaoParaF;
        numeroCondutores = document.querySelector("#nCondutores");
    }
    if (metodoInstalacao.value === "G") {
        tipoDeinstalcao.innerHTML = opcaoParaG;
        numeroCondutores = document.querySelector("#nCondutores");
    }

}

/*
botao2.onclick = function () {
    
    resultado2.textContent = calcularSecaoCabo(correcaoNumeroCirc)[1];
}
*/
botao3.onclick = function () {
    const val = retornaOPrimeiroValorMaior_e(Number(secaoReta_quedaDeTensao.value), secoesRetasDisponiveis[materialCondutorSelecionado.value]);
    (val == false) ? val = 0.5 : "";
    secaoReta_quedaDeTensao.value = val;
    resultado3.innerHTML = CalculaQuedaDeTensao()
}

secaoReta_quedaDeTensao.onchange = function () {
    diametro_Condutor_.value = retornaDiametroDoCondutor(secaoReta_quedaDeTensao.value).toFixed(2); //Valor Aproximado 
}

function CalculaQuedaDeTensao() {
    const a = String(materialCondutorSelecionado.value);
    const b = Number(cossenoPhi.value);
    const c = Number(correnteProjeto.value);
    const d = Number(comprimentoDoCircuito_.value) / 1000;
    const e = Number(numeroCondutores.value.substring(0, 1));
    const f = String(materialIsolacao.value);
    const g = Number(secaoReta_quedaDeTensao.value);
    if (g === 0) {
        //console.log("Selecione uma Seção de Cabo");
        return "Selecione uma Seção de Cabo";
    }
    const h = Number(diametro_Condutor_.value);
    const i = Number(distancia_Entre_Eixos_.value);
    const j = Number(_gmd.value);
    //console.log(a, b, c, d, e, f, g, h, i, j);

    const resultado = MainFuncaoCalculoDeQueda(a, b, c, d, e, f, g, h, i, j);
    return "<p class='Resultado'>Queda de tensão de :<info>" + quedaDeTensaoPorcento(resultado, tensaoNominal.value).toFixed(2) + "%</info>"+" <br> Distância :<info>"+d+"</info> Km" + "<br>Corrente de Projeto de <info>: " +c+"</info> A";

}