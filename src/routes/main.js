const express = require('express');
const authMiddleware = require('../middlewares/auth')
const routes = express.Router();
//retorna petshop
const Petshop = require('../models/petshop')
const Product = require('../models/product')
const Client = require('../models/Client')
//=============CONTROLLERS================================
const Login = require('../controllers/Login')
const Register = require('../controllers/Register')
const Petshops = require('../controllers/Petshops')
//arquivo de transação com pagarme
const createSplitTransaction = require('../services/pagarme').createSplitTransaction


//=========================INICIO==CLIENTE=====================================
routes.post('/login', Login.Login)

routes.post('/register', Register.Register)
//=======================FIM======CLIENTE=======================================

//======================TESTANDO ROTA COM TOKEN================================
routes.get('/rota2', async (req, res) => {
    res.status(200).send({ error: false })
})

routes.get('/rota1', async (req, res) => {
    res.status(200).send({ error: false })
})
//==============FIM========TESTANDO ROTA COM TOKEN============================


routes.use(authMiddleware)
//retornando os produtos da PETSHOP MAIS A INFORMAIS DA PETSHOPP
routes.get('/petshop/:id', Petshops.ListPetshopProducts)

//Rota pra listar todos as LOjas de PETSHOPP
routes.get('/petshops', Petshops.ListPetshop)

//ROTA DE TRANSAÇÃO
routes.post('/purchase', Petshops.TransactionPetshops)



module.exports = routes;