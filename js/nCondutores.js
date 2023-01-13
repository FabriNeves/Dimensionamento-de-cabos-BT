
//Objetos que contem as opçoes para numero de condutores.

export const MudarSelecao = {
  opcaoParaABCD: {
    A: {
      texto: 'circuito trifásico sem neutro = 3 condutores carregados',
      valor: '3n'
    },
    B: {
      texto: 'circuito trifásico com neutro = 4 condutores carregados',
      valor: '3n'
    },
    C: {
      texto: 'circuito monofásico a 2 condutores = 2 condutores carregados',
      valor: '2n'
    },
    D: {
      texto: 'circuito monofásico a 3 condutores = 3 condutores carregados',
      valor: '3n'
    },
    E: {
      texto: 'circuito bifásico a 2 condutores = 2 condutores carregados',
      valor: '2n'
    },
    F: {
      texto: 'circuito bifásico a 3 condutores = 3 condutores carregados',
      valor: '3n'
    }
  },
  opcaoParaE: {
    E1: {
      texto: 'Cabos multipolares: Dois condutores carregados',
      valor: '2n'
    },
    E2: {
      texto: 'Cabos multipolares: Três condutores carregados',
      valor: '3n'
    }
  },
  opcaoParaF: {
    F1: {
      texto: 'Cabos unipolares: Dois condutores carregados,justapostos',
      valor: '2J'
    },
    F2: {
      texto: 'Cabos unipolares: Três condutores carregados,em trifólio',
      valor: '3T'
    },
    F3: {
      texto: 'Cabos unipolares: Três condutores carregados,no mesmo plano|Justapostos',
      valor: '3J'
    }
  },
  opcaoParaG: {
    G1: {
      texto: 'Cabos unipolares: Três condutores carregados,no mesmo plano|Espaçados na horizontal',
      valor: '3H'
    },
    G2: {
      texto: 'Cabos unipolares: Três condutores carregados,no mesmo plano|Espaçados na vertical',
      valor: '3V'
    }
  },
  changeSelect: function (obj, elemento) {
    elemento.options.length = 0;
    const chaves = Object.keys(obj);
    chaves.forEach((key, index) => {
      // .substring(0,1)
      elemento.options[elemento.options.length] = new Option(`${chaves[index]} - ${obj[key].texto}`, obj[key].valor);
      //console.log(`${chaves[index]} - ${obj[key].texto}`, obj[key].valor);
    });
  }
}

//MudarSelecao.changeSelect(MudarSelecao.opcaoParaF,document.getElementById("nCondutores"));


// Exemplo de Função 
// function changeSelect() {
//   var selectElement = document.getElementById("nCondutores");
//   selectElement.options.length = 0; // clear current options
//   selectElement.options[selectElement.options.length] = new Option("Option 1", "1");
//   selectElement.options[selectElement.options.length] = new Option("Option 2", "2");
//   selectElement.options[selectElement.options.length] = new Option("Option 3", "3");
// }