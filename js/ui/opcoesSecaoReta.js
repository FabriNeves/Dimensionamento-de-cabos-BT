// Preenche o <select> de "Seção reta" (usado no cálculo de queda de tensão)
// com a lista de seções comerciais padronizadas disponíveis para o
// material do condutor selecionado (ver js/dados/tabelaResistenciaCondutores.js).

/**
 * @param {number[]} secoesDisponiveis ex.: secoesRetasDisponiveis.COBRE
 * @param {HTMLSelectElement} elementoSelect
 * @param {number|string} valorParaSelecionar seção a deixar pré-selecionada
 */
export function preencherOpcoesSecaoReta(secoesDisponiveis, elementoSelect, valorParaSelecionar) {
    elementoSelect.options.length = 0; // limpa as opções atuais
    secoesDisponiveis.forEach((secao) => {
        elementoSelect.options[elementoSelect.options.length] = new Option(`${secao} mm²`, secao);
    });
    elementoSelect.value = valorParaSelecionar;
}
