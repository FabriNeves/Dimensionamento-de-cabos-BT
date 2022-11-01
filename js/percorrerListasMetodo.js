

// Função de percorrer listas e encontrar o primeiro valor maior que o informado ;
// export function retornaOPrimeiroValorMaior(valorProcurado, listaDeprocura) {
//     for (let i = 0; i < listaDeprocura.length; i++) {
//         const element = listaDeprocura[i];
//         if (element >= valorProcurado) {
//             return listaDeprocura.indexOf(element);
//         }
//     }
// }

// export function retornaOPrimeiroValorMaior_e(valorProcurado, listaDeprocura) {
//     for (let i = 0; i < listaDeprocura.length; i++) {
//         const element = listaDeprocura[i];
//         if (element >= valorProcurado) {
//             return element;
//         }
//     }
// }



function busca(array, de, ate, valorBuscado) {

    //console.log(de, ate);
    const meio = Math.floor((de + ate) / 2);
    const atual = array[meio]; 

    if (de > ate) {
        if(de>array.length-1){
            return de-1;
        }
        return de;
    }

    if (valorBuscado === atual) {
        return meio;
    }
    if (valorBuscado < atual) {

        return busca(array, de, meio - 1, valorBuscado);
    }
    if (valorBuscado > atual) {

        return busca(array, meio + 1, ate, valorBuscado);
    }
}

export function retornaOPrimeiroValorMaior(valorProcurado, listaDeprocura) {

    return busca(listaDeprocura,0,listaDeprocura.length-1,valorProcurado);

}

export function retornaOPrimeiroValorMaior_e(valorProcurado, listaDeprocura) {

    return listaDeprocura[busca(listaDeprocura,0,listaDeprocura.length-1,valorProcurado)];

}

//  const arrayTeste = [2,3,4,7,9,14,16,18,19];
// console.log(novaFuncao(18,arrayTeste));

