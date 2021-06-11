
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const authCOnfig = require('../config/auth.json');
const authMiddleware = require('../middlewares/auth')
const Petshop = require('../models/petshop')
const Product = require('../models/product')
const Client = require('../models/Client')

module.exports = {

    async Login(req, res) {

        function generateToken(params = {}) {
            return jwt.sign(params, authCOnfig.secret, { expiresIn: 86400 })
        }

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
            //res.json({ error: false, user, token })
        } catch (error) {
            res.json({ err: true, message: error.message })
        }
    }
}