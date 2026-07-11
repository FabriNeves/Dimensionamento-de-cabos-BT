// Lógica de seleção do condutor: dado um método de instalação, material,
// isolação e nº de condutores carregados, encontra a menor seção (mm²) da
// tabela cuja corrente admissível suporta a corrente de projeto informada.

import { tabelasA_D, tabelasEFG, indiceMetodosA_D, indiceMetodosE_G } from "../dados/tabelaCondutores.js";
import { retornaOPrimeiroValorMaior } from "./buscaBinaria.js";

/**
 * Extrai, de uma das tabelas de corrente admissível, a coluna de um método
 * específico (ex.: "A12n") como uma lista simples de valores, na mesma
 * ordem das linhas da tabela (mesma ordem das seções "s").
 * @param {string} nomeTabela ex.: "tabela_PVC_COBRE"
 * @param {string} coluna ex.: "A12n", ou "s" para a lista de seções
 * @param {string} metodoSelecionado usado só para decidir A_D vs E_G
 */
function extrairLista(nomeTabela, coluna, metodoSelecionado) {
    const tabelas = indiceMetodosA_D.indexOf(metodoSelecionado) >= 0 ? tabelasA_D : tabelasEFG;
    return tabelas[nomeTabela].map(linha => linha[coluna]);
}

/**
 * Retorna a lista de correntes admissíveis (ou de seções, se
 * numeroCondutoresModo === "s") para um método/material/isolação.
 */
export function retornalistaColuna(metodo, materialCondutor, materialIsolacao, numeroCondutoresModo) {
    const nomeTabela = `tabela_${materialIsolacao}_${materialCondutor}`;
    const colunaMetodoENumeroCondutores = metodo + numeroCondutoresModo;
    return extrairLista(nomeTabela, colunaMetodoENumeroCondutores, metodo);
}

/**
 * Encontra a seção (mm²) do condutor cuja corrente admissível é a primeira
 * (menor) suficiente para a corrente de projeto informada.
 * @returns {string} seção do condutor em mm², ex.: "16"
 */
export function procuraCondutorCorrespondente(correnteProjeto, metodo, materialCondutor, materialIsolacao, numeroCondutoresModo) {
    const listaDeCorrentesAdmissiveis = retornalistaColuna(metodo, materialCondutor, materialIsolacao, numeroCondutoresModo);
    const listaDeSecoesValidas = retornalistaColuna("", materialCondutor, materialIsolacao, "s");
    const indice = retornaOPrimeiroValorMaior(Number(correnteProjeto), listaDeCorrentesAdmissiveis);
    return listaDeSecoesValidas[indice];
}

export { indiceMetodosA_D, indiceMetodosE_G };
