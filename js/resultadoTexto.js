
export const textoFormatado = `
<table border="1">
    <tr>
        <th>Corrente de Projeto </th>
        <th>
            <info>${correnteProjeto}A</info>
        </th>
    </tr>
    <tr>
        <th>Metodo de Instalação</th>
        <th>
            <info>${metodoInstalacao.value}</info>
        </th>
    </tr>
    <tr>
        <th>Material Condutor </th>
        <th>
            <info>${materialCondutorSelecionado.value}</info>
        </th>
    </tr>
    <tr>
        <th>Material de Isolação </th>
        <th>
            <info>${materialIsolacao.value}</info>
        </th>
    </tr>
    <tr>
        <th>Numero de Condutores Carregados </th>
        <th>
            <info>${numeroCondutores.value.substring(0, 1)}</info>
        </th>
    </tr>
    <tr>
        <th>Para temperatura do<info> ${localInstalacaoAmb.value} </info>de <info>
                ${correcaoTemp.value}ºC</info>
        </th>
        <th>
            <info> ${valorCorrecao} </info>
        </th>
    </tr>
    <tr>
        <th>Fator de agrupamento de circuitos</th>
        <th>
            <info> ${fatorDeCorrecao}</info>
        </th>
    </tr>
    <tr>
        <th>Seção reta do Cabo</th>
        <th>
            <info> ${result}mm²</info>
        </th>
    </tr>
</table>
`

// `
//     <p class="Resultado">Corrente de Projeto :<info>${correnteProjeto}A</info></p>
//     <p class="Resultado"> Metodo de Instalação :<info>${metodoInstalacao.value}</info></p>
//     <p class="Resultado">Material Condutor :<info>${materialCondutorSelecionado.value}</info></p>
//     <p class="Resultado">Material de Isolação :<info>${materialIsolacao.value}</info></p>
//     <p class="Resultado">Numero de Condutores Carregados :<info>${numeroCondutores.value.substring(0, 1)}</info></p>
//     <p class="Resultado">Para temperatura do<info> ${localInstalacaoAmb.value} </info>de <info>
//     ${correcaoTemp.value}ºC</info> valor de :<info> ${valorCorrecao} </info></p>
//     <p class="Resultado">Fator de agrupamento de circuitos :<info> ${fatorDeCorrecao} </info></p>
//     <p class="Resultado">Seção reta do Cabo :<info> ${result}mm²</info></p>`;