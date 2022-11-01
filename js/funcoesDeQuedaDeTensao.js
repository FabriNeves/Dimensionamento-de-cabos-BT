


export const secoesRetasDisponiveis = {
    COBRE:[1.5, 2.5, 4, 6, 10, 16, 25, 35, 50, 70, 95, 120, 150, 185, 240, 300, 400, 500, 630],
    AL:[10, 16, 25, 35, 50, 70, 95, 120, 150, 185, 240, 300, 400, 500, 630]
}

// # CÁLCULO DA QUEDA DE TENSÃO
function quedaTensaoCorrenteAlternada(R, cosphi, Xl, composicaoCircuito) {

    const senphi = Math.sqrt(1 - Math.pow(cosphi, 2));
    if (composicaoCircuito === 3) {
        //console.log("...");
        
        return Math.sqrt(3) * (R * cosphi + Xl * senphi);
    } else if (composicaoCircuito === 2) {
        //console.log(". .");
        return 2 * (R * cosphi + Xl * senphi);
    }
}

// ## Queda de tensão em %
export function quedaDeTensaoPorcento(deltaV, tensaoVCA) {
    //DeltaV%
    return (deltaV / tensaoVCA) * 100;
}

// # RESISTÊNCIA ELÉTRICA DO CONDUTOR EM CORRENTE ALTERNADA
function resistenciaEletricaCorrenteAlternada(Rlinha, Ys, Yp) {
    const R = Rlinha * (1 + Ys + Yp);
    return R;
}

// ## Rlinha 
function calculoRlinha(R0, alfa20, teta) {

    return R0 * (1 + alfa20 * (teta - 20));

}
// ### R0

function selecionaR0(material_condutor, secaoReta) {

    const Elementos = {
        COBRE: {
            secaoRetaLista: [1.5, 2.5, 4, 6, 10, 16, 25, 35, 50, 70, 95, 120, 150, 185, 240, 300, 400, 500, 630],
            R0: [12.1, 7.41, 4.61, 3.08, 1.83, 1.15, 0.727, 0.524, 0.386, 0.268, 0.193, 0.153, 0.124, 0.0991, 0.0754, 0.0601, 0.0470, 0.0366, 0.0283]
        },
        AL: {
            secaoRetaLista: [10, 16, 25, 35, 50, 70, 95, 120, 150, 185, 240, 300, 400, 500, 630],
            R0: [3.30, 1.91, 1.20, 0.868, 0.641, 0.443, 0.320, 0.253, 0.206, 0.164, 0.125, 0.100, 0.0778, 0.0605, 0.0469]
        }
    }


    const indiceSecaoReta = Elementos[material_condutor].secaoRetaLista.indexOf(secaoReta);
    return Elementos[material_condutor].R0[indiceSecaoReta];

}

// ### alfa20
function calculoValorAlfa20(material_condutor) {
    if (material_condutor === "AL") {
        return 0.00403;
    }
    if (material_condutor === "COBRE") {
        return 0.00393;
    }
}
// ### teta
function calculaTeta(material_De_Isolacao) {
    if (material_De_Isolacao === "PVC") {
        return 70;
    }
    if (material_De_Isolacao === "EPR") {
        return 90;
    }
}

// ## Ys
function calculaYs(Xs2) {
    const Xs4 = Xs2 * Xs2;
    return Xs4 / (192 + 0.8 * Xs4);
}

// ###Xs2 == X²s
function calculaXs_aoQuadrado(Rlinha) {
    const pi = 3.1415;
    const f = 60; //hz
    return ((8 * pi * f) / Rlinha) * 1e-4;
}

// ##Yp 
function calculaYp(Xp2, diametroCondutor, s, numerodeCondutoresCarregados) {

    const Xp4 = Xp2 * Xp2;
    if (numerodeCondutoresCarregados === 2) {
        return (Xp4 / (192 + 0.8 * Xp4)) * Math.pow(diametroCondutor / s, 2) * 2.9;
    }
    if (numerodeCondutoresCarregados === 3) {
        const pt1 = Xp4 / (192 + 0.8 * Xp4) * Math.pow(diametroCondutor / s, 2);
        const pt2 = 0.312 * Math.pow(diametroCondutor / s, 2) + (1.18 / (Xp4 / (192 + 0.8 * Xp4) + 0.27))
        return pt1 * pt2;
    }

}

// ###X2p

function calculaXp2(Rlinha, Kp) {
    const pi = 3.1415;
    const f = 60; //hz
    return (8 * pi * f / (Rlinha)) * 1e-4 * Kp;
}

// ####materialCondutor KP 

function selecionadaKpParaMaterialCondutor(material_condutor) {
    if (material_condutor === "AL") {
        return 1;
    }
    if (material_condutor === "COBRE") {
        return 0.8;
    }
}

function calculoIndutancia(GMD, diametroCondutor) {
    return 0.05 + 0.2 * Math.log1p(2 * GMD / diametroCondutor);
}

function calculoXL(L) {
    const pi = 3.14159265359;
    const f = 60; // Hz
    return 2 * pi * f * L * 1e-3;
}
//console.log(quedaTensaoCorrenteAlternada(1,0.90,10,1,0.3,3));
//console.log(quedaTensaoCorrenteAlternada(1,0.90,10,1,0.3,2));



export function MainFuncaoCalculoDeQueda(material_condutor, cosphi, correnteTransportada, comprimentoDoCircuito, numerodeCondutoresCarregados, material_De_Isolacao, secaoDoCondutor, diametroCondutor, distânciaEntreEixos, GMD) {

    const feedback = `
    ----Parametros de Calculo----
    Material Condutor : ${material_condutor} | ${typeof(material_condutor)};
    Cos phi : ${cosphi} | ${typeof(cosphi)};
    Corrente Transportada: ${correnteTransportada} A | ${typeof(correnteTransportada)};
    Comprimento do Circuito: ${comprimentoDoCircuito * 1000} Metros | ${typeof(comprimentoDoCircuito)};
    Numero de Condutores Carregados: ${numerodeCondutoresCarregados} | ${typeof(numerodeCondutoresCarregados)};
    Material de Isolação: ${material_De_Isolacao} | ${typeof(material_De_Isolacao)};
    Area do Condutor : ${secaoDoCondutor} mm² | ${typeof(secaoDoCondutor)};
    Diametro Condutor: ${diametroCondutor} mm | ${typeof(diametroCondutor)};
    Distância Entre Eixos: ${distânciaEntreEixos} mm | ${typeof(distânciaEntreEixos)};
    Geometric Mean Distance; ${GMD} | ${typeof(GMD)};
    `;
    //console.log(feedback);

    const Kp = selecionadaKpParaMaterialCondutor(material_condutor);
    const teta = calculaTeta(material_De_Isolacao);
    const alfa20 = calculoValorAlfa20(material_condutor);
    const R0 = selecionaR0(material_condutor, secaoDoCondutor);
    const Rlinha = calculoRlinha(R0, alfa20, teta);
    const Xp2 = calculaXp2(Rlinha, Kp);
    const Yp = calculaYp(Xp2, diametroCondutor, distânciaEntreEixos, numerodeCondutoresCarregados);
    const Xs2 = calculaXs_aoQuadrado(Rlinha);
    const Ys = calculaYs(Xs2);
    const R = resistenciaEletricaCorrenteAlternada(Rlinha, Ys, Yp);
    const L = calculoIndutancia(GMD, diametroCondutor)
    const XL = calculoXL(L);
    const V_A_km = quedaTensaoCorrenteAlternada(R, cosphi, XL, numerodeCondutoresCarregados)

    const feedback2 = `
        ----Calculo---
        V/A.Km = ${V_A_km};
        XL  = ${XL};
        Indutancia(L) = ${L};
        Resistência Eletrica CA = ${R};
        Ys = ${Ys};
        Xs² = ${Xs2};
        Yp = ${Yp};
        Xp² = ${Xp2};
        R' = ${Rlinha};
        R° = ${R0};
        Alfa 20° = ${alfa20};
        Teta = ${teta};
        Kp = ${Kp};
    `;
    //console.log(feedback2);
    const resultado = V_A_km * correnteTransportada * comprimentoDoCircuito;
    return resultado;

}

                                    // material /cosphi / I/ Comprimento/ Fases/ Isolamento/ Seção / diametro/distancia / GMD
//console.log(MainFuncaoCalculoDeQueda("COBRE",0.95,100,0.200,3,"PVC",50,8.15,12,7,8.15));
//console.log(calculoXL(calculoIndutancia (12,12)));


// Diametro do condutor é de fato  diametro do cobre , não o diametro externo. 




