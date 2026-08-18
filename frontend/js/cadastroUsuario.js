let resposta = document.getElementById('resposta')
let btn_cadastrar = document.getElementById('btn_cadastrar')

btn_cadastrar.addEventListener('click', (e)=>{
    e.preventDefault()

    const nome = document.getElementById('nome').value
    const email = document.getElementById('email').value
    const senha = document.getElementById('senha').value

    if(!nome || !email || !senha){
        alert('todos os campos são obrigatórios')
        return
    }

    const valores = {
        nome: nome,
        email: email,
        senha: senha
    }

    fetch(`${API_URL}/usuario`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(valores)
    })
    .then(resp => resp.json())
    .then(dados =>{
        console.log(dados)

        resposta.innerHTML = ''
        resposta.innerHTML += `<p>${dados.message}</p><br>`
        resposta.innerHTML += `<div class="card">${criarCard(dados)}</div>`
    })
})


function criarCard(dados){
    let card = ''

    card += `    
        <h2>Nome: ${dados.dados.nome}</h2>
        <hr>
        <br>
        <p><strong>Código: ${dados.dados.codUsuario}</strong></p>
        <p><strong>email: ${dados.dados.email}</strong></p>
        <p><strong>senha: ${dados.dados.senha}</strong></p>        
    `
    return card
}
