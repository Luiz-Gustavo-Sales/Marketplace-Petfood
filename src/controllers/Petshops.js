const Petshop = require('../models/petshop')
const Product = require('../models/product')
const createSplitTransaction = require('../services/pagarme').createSplitTransaction
module.exports = {

    async ListPetshopProducts(req, res) {
        try {
            //listar todas PETSHOPS
            const petshop = await Petshop.findById(req.params.id);
            let products = await Product.find({ petshop_id: petshop._id })

            res.json({ error: false, petshop: { ...petshop._dec, products } })
        } catch (error) {
            res.json({ error: true, message: error.message });
        }

    },

    async ListPetshop(req, res) {

        try {
            //listar todas PETSHOPS
            const petshops = await Petshop.find();

            res.json({ error: false, petshops })
        } catch (error) {
            res.json({ error: true, message: error.message });
        }
    },
    async TransactionPetshops(req, res) {
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

    }
}