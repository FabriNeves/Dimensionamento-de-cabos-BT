
import { retornaOPrimeiroValorMaior } from "./percorrerListasMetodo.js";

const ambienteLista = {
  temperatura: [10, 15, 20, 25, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80],
  PVC: [1.22, 1.17, 1.12, 1.06, 0.94, 0.87, 0.79, 0.71, 0.61, 0.50, 0.5, 0.5, 0.5, 0.5],
  EPR: [1.15, 1.12, 1.08, 1.04, 0.96, 0.91, 0.87, 0.82, 0.76, 0.71, 0.65, 0.58, 0.50, 0.41]
}

const soloLista = {
  temperatura: [10, 15, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80],
  PVC: [1.10, 1.05, 0.95, 0.89, 0.84, 0.77, 0.71, 0.63, 0.55, 0.45, 0.45, 0.45, 0.45, 0.45],
  EPR: [1.07, 1.04, 0.96, 0.93, 0.89, 0.85, 0.80, 0.76, 0.71, 0.65, 0.60, 0.53, 0.46, 0.38]
}

const correcaoTempObjeto = {
  ambiente: ambienteLista,
  solo: soloLista
}


//number(20),String("solo") ou "Ambiente",String("PVC") ou "EPR";
export function correcaoDeTemperatura(temp, local, isolante) {
  //console.log(temp,local,isolante);
  const indice = retornaOPrimeiroValorMaior(temp, correcaoTempObjeto.ambiente.temperatura);
  const listaArmazenada = correcaoTempObjeto[local][isolante];
  //console.log(temp,local,isolante,listaArmazenada[indice]);
  return listaArmazenada[indice];
}