const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const authCOnfig = require('../config/auth.json');
const authMiddleware = require('../middlewares/auth')
const routes = express.Router();
//retorna petshop
const Petshop = require('../models/petshop')
const Product = require('../models/product')
const Client = require('../models/Client')


//arquivo de transação com pagarme
const createSplitTransaction = require('../services/pagarme').createSplitTransaction

//função gerando TOKEN
function generateToken(params = {}) {
    return jwt.sign(params, authCOnfig.secret, { expiresIn: 86400 })
}






//rota de transação com PAGARME



//=========================INICIO==CLIENTE==============================================
routes.post('/login', async (req, res) => {
    try {
        const { cpf, password } = req.body
        const user = await Client.findOne({ cpf: cpf })

        //verificando se o usuário existe
        if (!user) {
            return res.status(400).send({ err: "Usuário não existe" })
        }
        //função bcypt é uma função assincona por isso o AWAIT
        if (!await bcrypt.compare(password, user.password)) {

            return res.status(400).send({ err: "Senha invalida" })
        }
        user.password = undefined
        res.send({ user, token: generateToken({ id: user.id }) })
        //const token = jwt.sign({ id: user.id }, authCOnfig.secret, { expiresIn: 86400 })
        res.json({ error: false, user, token })
    } catch (error) {
        res.json({ err: true, message: error.message })
    }
})

routes.post('/register', async (req, res) => {
    try {
        const dados = req.body
        const userExists = await Client.findOne({ cpf: dados.documents });
        console.log("Uusário encontrado: ", userExists)
        //verificando se ja existe o usuário com e-mail cadastrado
        if (userExists) {
            console.log("EXISTE ESSE USUÁRIO: ", userExists)
            return res.status(400).send({ message: "Cliente existe na base de dados", err: true, userExists });

        }
        const response = await Client.create({
            name: dados.name,
            password: dados.password,
            email: dados.email,
            cpf: dados.documents
        })

        response.password = undefined
        // console.log("Dados enviado para rota: ", aux)
        // console.log("Dados enviado para rota: ", aux.map(e => { console.log(e.number) }))
        res.json({ error: false, response })
    } catch (error) {
        res.json({ err: true, message: error.message })
    }
})
//=======================FIM======CLIENTE=======================================




//======================TESTANDO ROTA COM TOKEN================================
routes.get('/rota2', async (req, res) => {
    res.status(200).send({ error: false })
})


routes.use(authMiddleware)
routes.get('/rota1', async (req, res) => {
    res.status(200).send({ error: false })
})


//retornando os produtos da PETSHO MAIS A INFORMAIS DA PETSHOPP
routes.get('/petshop/:id', async (req, res) => {
    try {
        //listar todas PETSHOPS
        const petshop = await Petshop.findById(req.params.id);
        let products = await Product.find({ petshop_id: petshop._id })

        res.json({ error: false, petshop: { ...petshop._dec, products } })
    } catch (error) {
        res.json({ error: true, message: error.message });
    }
})


//Rota pra listar todos as LOjas de PETSHOPP
routes.get('/petshops', async (req, res) => {
    try {
        //listar todas PETSHOPS
        const petshops = await Petshop.find();

        res.json({ error: false, petshops })
    } catch (error) {
        res.json({ error: true, message: error.message });
    }
})

//ROTA DE TRANSAÇÃO
routes.post('/purchase', async (req, res) => {

    try {

        //console.log(req.body)
        if (Object.values(req.body).length === 0) {
            res.status(400).send({ err: true, message: "Objeto Vazio" })
        }
        const response = await createSplitTransaction(req.body);
        // console.log(response)
        res.status(200).send({ error: false, response })
    } catch (error) {
        res.status(400).send({ err: true, message: error.message })
    }
})



module.exports = routes;