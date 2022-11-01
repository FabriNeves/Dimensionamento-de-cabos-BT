
// html 
/* <p> 
O número de condutores carregados a ser considerado é o dos
condutores efetivamente percorridos por corrente. Nos circuitos trifásicos com neutro, quando puder
ser
admitido o equilíbrio das correntes nos condutores fase e quando não for prevista a circulação de
correntes
harmônicas no condutor neutro, este não deve ser computado, considerando-se, portanto, para o
circuito, 3
condutores carregados.
</p> */
export const opcaoParaABCD =
    `<fieldset> 
    <select name="nCondutores" id="nCondutores">
        <option value="3n">a - circuito trifásico sem neutro = 3 condutores carregados</option>
        <option value="3n">b - circuito trifásico com neutro = 4 condutores carregados</option>
        <option value="2n">c - circuito monofásico a 2 condutores = 2 condutores carregados </option>
        <option value="3n">d - circuito monofásico a 3 condutores = 3 condutores carregados</option>
        <option value="2n">e - circuito bifásico a 2 condutores = 2 condutores carregados</option>
        <option value="3n">f - circuito bifásico a 3 condutores = 3 condutores carregados</option>
    </select>
</fieldset>`;

/* <img src="./imagens/imagemMetodosEFG.png">   */
export const opcaoParaE =
`<fieldset>
 
<select name="nCondutores" id="nCondutores">
    <option value="2n">E - Cabos multipolares: Dois condutores carregados</option>
    <option value="3n">E - Cabos multipolares: Três condutores carregados</option>
</select>
</fieldset>`;
{/* <img src="./imagens/imagemMetodosEFG.png">   */}
export const opcaoParaF =
`<fieldset> 
<select name="nCondutores" id="nCondutores">  
    <option value="2J">F - Cabos unipolares: Dois condutores carregados,justapostos</option>
    <option value="3T">F - Cabos unipolares: Três condutores carregados,em trifólio</option>
    <option value="3J">F - Cabos unipolares: Três condutores carregados,no mesmo plano|Justapostos</option>   
</select>
</fieldset>`;
{/* <img src="./imagens/imagemMetodosEFG.png">   */}
export const opcaoParaG =
`<fieldset> 
<select name="nCondutores" id="nCondutores">
    <option value="3H">G - Cabos unipolares: Três condutores carregados,no mesmo plano|Espaçados na horizontal</option>
    <option value="3V">G - Cabos unipolares: Três condutores carregados,no mesmo plano|Espaçados na vertical</option>
</select>
</fieldset>`;


