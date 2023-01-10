{/* <select
  name="nCondutores"
  id="nCondutores">
  <option value="3n">
    a - circuito trifásico sem neutro = 3 condutores carregados
  </option>
  <option value="3n">
    b - circuito trifásico com neutro = 4 condutores carregados
  </option>
  <option value="2n">
    c - circuito monofásico a 2 condutores = 2 condutores carregados{' '}
  </option>
  <option value="3n">
    d - circuito monofásico a 3 condutores = 3 condutores carregados
  </option>
  <option value="2n">
    e - circuito bifásico a 2 condutores = 2 condutores carregados
  </option>
  <option value="3n">
    f - circuito bifásico a 3 condutores = 3 condutores carregados
  </option>
</select> */}

const nCondutores = {
  a: {
    texto: 'circuito trifásico sem neutro = 3 condutores carregados',
    valor: '3n'
  },
  b: {
    texto: 'circuito trifásico com neutro = 4 condutores carregados',
    valor: '3n'
  },
  c: {
    texto: 'circuito monofásico a 2 condutores = 2 condutores carregados',
    valor: '2n'
  },
  d: {
    texto: 'circuito monofásico a 3 condutores = 3 condutores carregados',
    valor: '3n'
  },
  e: {
    texto: 'circuito bifásico a 2 condutores = 2 condutores carregados',
    valor: '2n'
  },
  f: {
    texto: 'circuito bifásico a 3 condutores = 3 condutores carregados',
    valor: '3n'
  }
}

const letra = 1

const metodos = ['a', 'b', 'c', 'd', 'e', 'f']
const desc = [
  'circuito trifásico sem neutro = 3 condutores carregados',
  'circuito trifásico com neutro = 4 condutores carregados',
  'circuito monofásico a 2 condutores = 2 condutores carregados',
  'circuito monofásico a 3 condutores = 3 condutores carregados',
  'circuito bifásico a 2 condutores = 2 condutores carregados',
  'circuito bifásico a 3 condutores = 3 condutores carregados',
]
const valor = ['3n', '2n']



metodos.forEach(el => console.log(el))
