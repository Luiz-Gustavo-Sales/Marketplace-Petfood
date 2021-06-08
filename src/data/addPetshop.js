const Petshop = require('../models/petshop')
const Product = require('../models/product')
const petshops = require("./petfood.json")
const createREcipients = require('../services/pagarme').createREcipient;
//database
require("../database")
const AddPetshopsAndProducts = async () => {
    try {

        for (let petshop of petshops) {

            const recipient = await createREcipients(petshop.nome)
            //SE OCORRE TUDO CERTO VAI SER CRIADO O PAGADOR NO PAGARME COM ID FORNECIDO PELO PAGARME
            if (!recipient.error) {
                const newPetshop = await new Petshop({ ...petshop, recipient_id: recipient.data.id }).save();
                //APOS CRIAR NOVA PETSHOP VAI CRIAR OS PRODUTO COM ID DA PETSHOP INSERIDA
                await Product.insertMany(
                    petshop.produtos.map((p) => ({ ...p, petshop_id: newPetshop._id })))
              
            } else {
               // console.log(recipient)
                console.log("ERRO")
            }
        }

        console.log("Final do Script")
    } catch (error) {
        console.log(error)

    }
}

AddPetshopsAndProducts();