const Usuario = require('../models/Usuario')

const login = async (req,res)=>{
    const valores = req.body

    if(!valores.email || !valores.senha){
        return res.status(400).json({message: "Para Login, Digite email e senha!"})
    }

    try{
        const dados = await Usuario.findOne({where: { email: valores.email}})

        if(!dados){
           return res.status(404).json({message: 'Usuário Não encontrado!'})
        }

        if(valores.senha === dados.senha){
            res.status(200).json({
                message: 'Login realizados com sucesso',
                statusLog: true,
                nome: dados.nome
            })
        }else{
            res.status(403).json({mesage: 'Senha incorreta! Tente Novamente'})
        }

    }catch(err){
        console.error('Erro ao tentar fazer o login',err)
        res.status(500).json({message: 'Erro ao tentar fazer o login'})
    }
}

module.exports = { login }