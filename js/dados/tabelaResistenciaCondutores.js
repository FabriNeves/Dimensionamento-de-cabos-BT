// Seções comerciais disponíveis por material, e resistência elétrica em
// corrente contínua a 20°C (R0, em Ω/km) por seção — usada no cálculo de
// queda de tensão.

export const secoesRetasDisponiveis = {
    COBRE: [1.5, 2.5, 4, 6, 10, 16, 25, 35, 50, 70, 95, 120, 150, 185, 240, 300, 400, 500, 630],
    AL: [10, 16, 25, 35, 50, 70, 95, 120, 150, 185, 240, 300, 400, 500, 630]
};

export const tabelaResistenciaR0 = {
    COBRE: {
        secaoRetaLista: [1.5, 2.5, 4, 6, 10, 16, 25, 35, 50, 70, 95, 120, 150, 185, 240, 300, 400, 500, 630],
        R0: [12.1, 7.41, 4.61, 3.08, 1.83, 1.15, 0.727, 0.524, 0.386, 0.268, 0.193, 0.153, 0.124, 0.0991, 0.0754, 0.0601, 0.0470, 0.0366, 0.0283]
    },
    AL: {
        secaoRetaLista: [10, 16, 25, 35, 50, 70, 95, 120, 150, 185, 240, 300, 400, 500, 630],
        R0: [3.30, 1.91, 1.20, 0.868, 0.641, 0.443, 0.320, 0.253, 0.206, 0.164, 0.125, 0.100, 0.0778, 0.0605, 0.0469]
    }
};
