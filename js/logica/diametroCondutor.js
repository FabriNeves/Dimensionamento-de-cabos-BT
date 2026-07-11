// Estimativa do diâmetro do condutor (mm) a partir da sua seção reta (mm²),
// por um polinômio de 4º grau ajustado a partir de tabelas de fabricantes.
// Valor aproximado: para maior precisão, consultar a tabela do fabricante.

export function retornaDiametroDoCondutor(secaoReta) {
    const a0 = 2.20403231067812;
    const a1 = 0.132602333215558;
    const a2 = -0.000442075287771815;
    const a3 = 8.00241761643337e-07;
    const a4 = -5.09391184552829e-10;

    return a0
        + a1 * secaoReta
        + a2 * Math.pow(secaoReta, 2)
        + a3 * Math.pow(secaoReta, 3)
        + a4 * Math.pow(secaoReta, 4);
}
