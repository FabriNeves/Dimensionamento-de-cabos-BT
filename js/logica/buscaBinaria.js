// Busca binária usada para localizar, dentro de uma lista ordenada
// crescente (ex.: correntes admissíveis, temperaturas de referência), a
// posição do primeiro valor maior ou igual ao valor procurado.

/**
 * Busca recursiva. Quando não há valor igual, retorna o índice do primeiro
 * elemento maior que o procurado (ou o último índice válido, se o valor
 * procurado for maior que todos os elementos da lista).
 */
function busca(lista, inicio, fim, valorProcurado) {
    if (inicio > fim) {
        return inicio > lista.length - 1 ? inicio - 1 : inicio;
    }

    const meio = Math.floor((inicio + fim) / 2);
    const valorNoMeio = lista[meio];

    if (valorProcurado === valorNoMeio) {
        return meio;
    }
    if (valorProcurado < valorNoMeio) {
        return busca(lista, inicio, meio - 1, valorProcurado);
    }
    return busca(lista, meio + 1, fim, valorProcurado);
}

/** Retorna o índice do primeiro valor de `lista` maior ou igual a `valorProcurado`. */
export function retornaOPrimeiroValorMaior(valorProcurado, lista) {
    return busca(lista, 0, lista.length - 1, valorProcurado);
}

/** Igual a retornaOPrimeiroValorMaior, mas retorna o valor em vez do índice. */
export function retornaOPrimeiroValorMaior_e(valorProcurado, lista) {
    return lista[busca(lista, 0, lista.length - 1, valorProcurado)];
}
