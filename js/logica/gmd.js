// Cálculo automático do GMD (Geometric Mean Distance) a partir da distância
// entre eixos e da disposição dos condutores, conforme as fórmulas do guia
// de dimensionamento da Prysmian (seção 6.4).

/** Disposição simétrica (trifólio ou 2 cabos lado a lado, tocando): GMD = D. */
export function calcularGMDSimetrica(distancia) {
    return distancia;
}

/** 3 cabos em linha, mesma distância entre vizinhos: GMD = D·∛2. */
export function calcularGMDLinha(distancia) {
    return distancia * Math.cbrt(2);
}

/** Caso geral (triângulo com 3 distâncias diferentes): GMD = ∛(x·y·z). */
export function calcularGMDGeral(distanciaX, distanciaY, distanciaZ) {
    return Math.cbrt(distanciaX * distanciaY * distanciaZ);
}

const FORMULAS_POR_DISPOSICAO = {
    "2J": calcularGMDSimetrica,  // 2 unipolares justapostos
    "3T": calcularGMDSimetrica,  // trifólio
    "3J": calcularGMDLinha,      // 3 unipolares justapostos em linha
    "3H": calcularGMDLinha,      // 3 espaçados horizontal
    "3V": calcularGMDLinha,      // 3 espaçados vertical
    "2n": calcularGMDSimetrica,  // genérico (métodos A-D/E): assume justapostos
    "3n": calcularGMDLinha,      // genérico (métodos A-D/E): assume em linha
};

/**
 * @param {string} codigoDisposicao valor do select "Número de condutores
 * carregados" (ex.: "3T", "3J", "3n"...)
 * @param {number} distanciaEntreEixos em mm
 * @returns {number} GMD em mm
 */
export function calcularGMD(codigoDisposicao, distanciaEntreEixos) {
    const formula = FORMULAS_POR_DISPOSICAO[codigoDisposicao] ?? FORMULAS_POR_DISPOSICAO["3n"];
    return formula(distanciaEntreEixos);
}
