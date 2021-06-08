const mongoose = require('mongoose')
const generate = require('gerador-validador-cpf')
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;
const Client = new Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    cpf: {
        type: String,
        // default: () => {
        //     return generate();
        // },
    },
    endereco: String,
    nascimento: String,


})

Client.pre('save', async function (next) {
    const hash = await bcrypt.hash(this.password, 10)
    this.password = hash
    next();
})

module.exports = mongoose.model('Client', Client)