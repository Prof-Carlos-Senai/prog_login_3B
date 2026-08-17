const express = require('express')
const app = express()
const cors = require('cors')

const PORT = 3000
const hostname = 'localhost'

const conn = require('./db/conn')
require('./models/rel')

const authMiddleware = require('./middleware/auth.middleware')
const authController = require('./controller/auth.controller')
const usuarioController = require('./controller/usuario.controller')
const produtoController = require('./controller/produto.controller')
const estoqueController = require('./controller/estoque.controller')

// ---------- middleware -------------
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())
// -----------------------------------
// ------- Rotas Públicas -----
app.post('/usuario', usuarioController.cadastrar)

app.post('/login', authController.login)

app.get('/', (req,res)=>{
    res.status(200).json({message: 'Teste de aplicação rodando'})
})

// --- Rotas privadas precisam de autenticação e autorização 
app.use(authMiddleware)

// ------- Rotas Privadas ou Protegidas ---------
app.get('/usuarios', usuarioController.listar)
app.get('/usuario/:id', usuarioController.consultar)

app.post('/produto', produtoController.cadastrar)
app.get('/produtos', produtoController.listar)
app.get('/produto/:id', produtoController.consultar)
app.put('/produto/:id', produtoController.atualizar)
app.delete('/produto/:id', produtoController.apagar)

app.post('/estoque', estoqueController.cadastrar)
app.get('/estoques', estoqueController.listar)

// ------------------- Server ---------------
conn.sync()
.then(()=>{
    app.listen(PORT, hostname, ()=>{
        console.log(`Servidor rodando em http://${hostname}:${PORT}`)
    })
})
.catch((err)=>{
    console.error('Erro de conexão com o banco de dados!',err.message || err)
})
