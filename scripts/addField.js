// procurar o botão / quando clicar no botão
document.querySelector("#add-time").addEventListener('click', cloneField)

//executar uma ação

function cloneField () {
    const newFieldContainer = document.querySelector('.schedule-item').cloneNode(true)
   
// pegar os campos. que campos?
    const fields = newFieldContainer.querySelectorAll('input')
 // para cada campo: limpar 
 fields.forEach(function(field){
     //pegar o campo do momento e limpar ele pra quando criar novo horario ficar limpo
    field.value=""
 })
    // Colocar na página. Onde?
    document.querySelector('#schedule-items').appendChild(newFieldContainer)
}