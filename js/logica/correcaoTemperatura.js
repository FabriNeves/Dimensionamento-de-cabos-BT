// Cálculo do fator de correção de corrente admissível por temperatura.

import { retornaOPrimeiroValorMaior } from "./buscaBinaria.js";
import { tabelaCorrecaoTemperaturaPorLocal } from "../dados/tabelaCorrecaoTemperatura.js";

/**
 * @param {number} temperatura em °C
 * @param {"ambiente"|"solo"} local
 * @param {"PVC"|"EPR"} isolante
 * @returns {number} fator de correção a ser aplicado à corrente admissível
 */
export function correcaoDeTemperatura(temperatura, local, isolante) {
  const indice = retornaOPrimeiroValorMaior(temperatura, tabelaCorrecaoTemperaturaPorLocal.ambiente.temperatura);
  const listaDeFatores = tabelaCorrecaoTemperaturaPorLocal[local][isolante];
  return listaDeFatores[indice];
}
