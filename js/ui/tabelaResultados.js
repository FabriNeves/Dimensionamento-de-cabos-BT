// Monta o HTML (tabelas) exibido como resultado dos dois cálculos da página:
// seleção de seção do condutor e queda de tensão.

import { quedaDeTensaoPorcento } from "../logica/quedaDeTensao.js";

/**
 * Tabela-resumo do cabo selecionado diretamente pela corrente de projeto,
 * sem nenhuma correção de temperatura ou agrupamento — é sobre a
 * "capacidadeAdmissivel" tabelada deste cabo que essas correções serão
 * aplicadas na etapa seguinte (ver criarTabelaSecaoCondutor).
 */
export function criarTabelaCaboBase(correnteProjeto, metodoInstalacao, materialCondutor, materialIsolacao, numeroCondutores, secaoDoCondutor, capacidadeAdmissivel) {
    let tabela = '<table>';
    tabela += `<tr><th>Corrente de Projeto</th><th><info>${correnteProjeto}A</info></th></tr>`;
    tabela += `<tr><th>Método / Nº de Condutores</th><th><info>${metodoInstalacao} - ${numeroCondutores.substring(0, 1)}</info></th></tr>`;
    tabela += `<tr><th>Material Condutor / Isolação</th><th><info>${materialCondutor} / ${materialIsolacao}</info></th></tr>`;
    tabela += `<tr><th>Cabo selecionado (sem correções)</th><th><info>${secaoDoCondutor}mm²</info></th></tr>`;
    tabela += `<tr><th>Capacidade nominal tabelada</th><th><info>${capacidadeAdmissivel}A</info></th></tr>`;
    tabela += '</table>';
    return tabela;
}

/**
 * Tabela-resumo do cabo selecionado após aplicar apenas a correção de
 * temperatura (ainda sem o fator de agrupamento de circuitos, aplicado na
 * etapa seguinte sobre a capacidade deste cabo).
 */
export function criarTabelaCaboTemperatura(correnteProjeto, temperatura, localInstalacao, fatorCorrecaoTemperatura, correnteAposTemperatura, secaoDoCondutor, capacidadeAdmissivel) {
    let tabela = '<table>';
    tabela += `<tr><th>Corrente de Projeto</th><th><info>${correnteProjeto}A</info></th></tr>`;
    tabela += `<tr><th>Fator de correção de temperatura (${localInstalacao}, ${temperatura}ºC)</th><th><info>${fatorCorrecaoTemperatura}</info></th></tr>`;
    tabela += `<tr><th>Corrente após correção de temperatura</th><th><info>${correnteAposTemperatura.toFixed(2)}A</info></th></tr>`;
    tabela += `<tr><th>Cabo selecionado (com correção de temperatura)</th><th><info>${secaoDoCondutor}mm²</info></th></tr>`;
    tabela += `<tr><th>Capacidade nominal tabelada</th><th><info>${capacidadeAdmissivel}A</info></th></tr>`;
    tabela += '</table>';
    return tabela;
}

/**
 * Tabela-resumo do cálculo de seleção de seção do condutor, incluindo os
 * resultados parciais de cada etapa (corrente após cada correção), para
 * permitir conferência manual em conjunto com uma tabela de fabricante/NBR5410.
 */
export function criarTabelaSecaoCondutor({
    correnteProjeto,
    metodoInstalacao,
    materialCondutor,
    materialIsolacao,
    numeroCondutores,
    temperatura,
    localInstalacao,
    fatorCorrecaoTemperatura,
    correnteAposTemperatura,
    fatorCorrecaoAgrupamento,
    correnteCorrigida,
    capacidadeAdmissivel,
    secaoDoCondutor
}) {
    let tabela = '<table>';
    tabela += `<tr><th>Corrente de Projeto</th><th><info>${correnteProjeto}A</info></th></tr>`;
    tabela += `<tr><th>Método de Instalação</th><th><info>${metodoInstalacao}</info></th></tr>`;
    tabela += `<tr><th>Material Condutor</th><th><info>${materialCondutor}</info></th></tr>`;
    tabela += `<tr><th>Material de Isolação</th><th><info>${materialIsolacao}</info></th></tr>`;
    tabela += `<tr><th>Número de Condutores Carregados</th><th><info>${numeroCondutores.substring(0, 1)}</info></th></tr>`;
    tabela += `<tr><th>Fator de correção de temperatura (${localInstalacao}, ${temperatura}ºC)</th><th><info>${fatorCorrecaoTemperatura}</info></th></tr>`;
    tabela += `<tr><th>Corrente após correção de temperatura</th><th><info>${correnteAposTemperatura.toFixed(2)}A</info></th></tr>`;
    tabela += `<tr><th>Fator de agrupamento de circuitos</th><th><info>${fatorCorrecaoAgrupamento}</info></th></tr>`;
    tabela += `<tr><th>Corrente corrigida (usada na seleção)</th><th><info>${correnteCorrigida.toFixed(2)}A</info></th></tr>`;
    tabela += `<tr><th>Seção reta do Condutor</th><th><info>${secaoDoCondutor}mm²</info></th></tr>`;
    tabela += `<tr><th>Capacidade nominal tabelada para essa seção</th><th><info>${capacidadeAdmissivel}A</info></th></tr>`;
    tabela += '</table>';
    return tabela;
}

/** Tabela-resumo do cálculo de queda de tensão. */
export function criarTabelaQuedaTensao(quedaTensaoVolts, tensaoNominal, comprimentoCircuitoKm, correnteProjeto) {
    let tabela = '<table>';
    tabela += `<tr><th>Queda de tensão </th><th><info>${quedaDeTensaoPorcento(quedaTensaoVolts, tensaoNominal).toFixed(2)}%</info></th></tr>`;
    tabela += `<tr><th>Distância</th><th><info>${comprimentoCircuitoKm * 1000} m</info></th></tr>`;
    tabela += `<tr><th>Corrente de Projeto</th><th><info>${correnteProjeto}A</info></th></tr>`;
    tabela += '</table>';
    return tabela;
}
