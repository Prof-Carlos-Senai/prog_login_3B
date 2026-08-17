const Usuario = require('../models/Usuario')

const cadastrar = async (req,res)=>{
    const valores = req.body

    if(!valores.nome || !valores.email || !valores.senha){
        return res.status(400).json({message: 'Campos Obrigatórios'})
    }

    try{
        let dados = await Usuario.create(valores)
        res.status(201).json({message: 'Usuário cadastrado com sucesso!', dados})
    }catch(err){
        console.log('Erro ao cadastrar usuário!',err)
        res.status(500).json({message: 'Erro ao cadastrar usuário!'})
    }
}

const listar = async (req,res)=>{
    try{
        const dados = await Usuario.findAll()
        res.status(200).json(dados)
    }catch(err){
        console.log('Erro ao listar usuário!',err)
        res.status(500).json({message: 'Erro ao listar usuário!'})
    }
}

const consultar = async (req,res)=>{
    const id = req.params.id

    try{
        let dados = await Usuario.findByPk(id)
        if(!dados){
            return res.status(404).json({message: 'Usuário não encontrado!'})
        }else{
            res.status(200).json(dados)
        }
    }catch(err){
        console.log('Erro ao consultar usuário!',err)
        res.status(500).json({message: 'Erro ao consultar usuário!'})
    }
}

module.exports = { cadastrar, listar, consultar }