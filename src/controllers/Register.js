
const Client = require('../models/Client')

module.exports = {

    async Register(req, res) {

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
    }
}