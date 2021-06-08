const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth.json')
module.exports = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    //VERIFICANDO SE EXISTE TOKEN
    if (!authHeader) {
        return res.status(401).send({ error: "TOKEN NAO FOI INFORMADO " })
    }

    //Quebrando o TOKEN
    const parts = authHeader.split(' ');
    console.log("TOKEN AQUI: " + parts)
    //VALINDANDO TAMANHO 
    if (!parts.length === 2) {
        return res.status(401).send({ error: "Token error" })
    }
    //usando desestruturação 

    //scheme fica a o Bearer do token
    //token fica os numeros LOUCOS
    // const { scheme, token } = parts;
    let scheme = parts[0];
    let token = parts[1]

    console.log("TOKEN: ", token)
    console.log("Bearer:", scheme)
    //VERIFICANDO SE TEM A INICIO DO TOKEN para poder prosseguir
    if (/^ Bearer$/i.test(scheme)) {
        return res.status(401).send({ error: "TOKEN MAL INFORMADO" })
    }


    //VERIFICANDO A CHAV DO TOKEN 
    jwt.verify(token, authConfig.secret, (err, decoded) => {
        try {

            console.log("ERRO: ", err)
            console.log("DECODED: ", decoded)
            if (err) return res.status(401).send({ error: "TOKEN INVALIDO" })
            //

            req.userId = decoded.id

            return next();
        } catch (error) {
            return { error: true, message: error.message }
        }


    })





}