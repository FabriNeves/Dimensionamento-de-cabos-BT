const fs = require('fs');

const tabela_EPR_AL = require('./tabela_EPR_AL.json');
const tabela_EPR_COBRE = require('./tabela_EPR_COBRE.json');
const tabela_PVC_AL = require('./tabela_PVC_AL.json');
const tabela_PVC_COBRE = require('./tabela_PVC_COBRE.json');

const chaves = Object.keys(tabela_PVC_COBRE);

// for (let index = 0; index < chaves.length; index++) {
//     const element = Number(chaves[index]);
    
// }


console.log(chaves);

console.log(tabela_PVC_COBRE['0.5'].A1)