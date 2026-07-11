// Opções do <select> "Número de condutores carregados", que mudam conforme
// o método de instalação escolhido (A-D têm um conjunto de opções; E, F e G
// têm opções próprias, pois representam disposições diferentes de cabos
// unipolares/multipolares).

export const opcoesPorMetodo = {
  ABCD: {
    A: { texto: 'circuito trifásico sem neutro = 3 condutores carregados', valor: '3n' },
    B: { texto: 'circuito trifásico com neutro = 4 condutores carregados', valor: '3n' },
    C: { texto: 'circuito monofásico a 2 condutores = 2 condutores carregados', valor: '2n' },
    D: { texto: 'circuito monofásico a 3 condutores = 3 condutores carregados', valor: '3n' },
    E: { texto: 'circuito bifásico a 2 condutores = 2 condutores carregados', valor: '2n' },
    F: { texto: 'circuito bifásico a 3 condutores = 3 condutores carregados', valor: '3n' }
  },
  E: {
    E1: { texto: 'Cabos multipolares: Dois condutores carregados', valor: '2n' },
    E2: { texto: 'Cabos multipolares: Três condutores carregados', valor: '3n' }
  },
  F: {
    F1: { texto: 'Cabos unipolares: Dois condutores carregados,justapostos', valor: '2J' },
    F2: { texto: 'Cabos unipolares: Três condutores carregados,em trifólio', valor: '3T' },
    F3: { texto: 'Cabos unipolares: Três condutores carregados,no mesmo plano|Justapostos', valor: '3J' }
  },
  G: {
    G1: { texto: 'Cabos unipolares: Três condutores carregados,no mesmo plano|Espaçados na horizontal', valor: '3H' },
    G2: { texto: 'Cabos unipolares: Três condutores carregados,no mesmo plano|Espaçados na vertical', valor: '3V' }
  }
};

/** Reconstrói as <option> de `elementoSelect` a partir de um dos grupos de `opcoesPorMetodo`. */
export function preencherOpcoesNumeroDeCondutores(grupoDeOpcoes, elementoSelect) {
  elementoSelect.options.length = 0; // limpa as opções atuais
  Object.keys(grupoDeOpcoes).forEach((chave) => {
    const opcao = grupoDeOpcoes[chave];
    elementoSelect.options[elementoSelect.options.length] = new Option(`${chave} - ${opcao.texto}`, opcao.valor);
  });
}
