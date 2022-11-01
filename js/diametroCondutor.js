

export function retornaDiametroDoCondutor(x) {


    const a0 = 2.20403231067812; 
    const a1 = 0.132602333215558;
    const a2 = -0.000442075287771815;
    const a3 = 8.00241761643337e-07;
    const a4 = -5.09391184552829e-10;
    const resultado = a0+a1*x+a2*Math.pow(x,2)+a3*Math.pow(x,3)+a4*Math.pow(x,4);
    return resultado;
}

//console.log(retornaDiametroDoCondutor(300));