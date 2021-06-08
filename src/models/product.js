const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const product = new Schema({
    //CHAVE PRIMARY para identificar de qual loja é o produto
    petshop_id: {
        type: Schema.Types.ObjectId,
        //chamando o model do schema do petshop
        ref: 'Petshop'
    },

    nome: String,
    capa: String,
    preco: Number,
    avaliacoes: Number

})
module.exports = mongoose.model('Product', product)