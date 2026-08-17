function authMiddleware(req, res, next){
    const statusLog = req.query.statusLog
    console.log('Valor do statusLog = ',statusLog)

    if(statusLog !== "true"){
        return res.status(400).json({message: "Acesso Negado! Faça o Login!"})
    }

    next()
}

module.exports = authMiddleware