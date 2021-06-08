const axios = require('axios')

//API DE ENVIO DE COMPRAS PARA O PAGARME
const api = axios.create({
    //baseURL deve ser MAISCULA URL
    baseURL: "https://api.pagar.me/1"
})

//API DE TESTE DO PAGARME
const api_key = require('../data/keys.json').api_key;

module.exports = {
    createREcipient: async (name) => {
        try {
            const response = await api.post('/recipients', {
                api_key,
                bank_account: {
                    bank_code: '341',
                    agencia: '0932',
                    agencia_dv: '5',
                    conta: '58054',
                    type: 'conta_corrente',
                    conta_dv: '1',
                    document_number: '72163010000159',
                    legal_name: name,
                },
                register_information: {
                    type: 'corporation',
                    document_number: '72163010000159',
                    company_name: name,
                    email: 'pedgree@email.com',
                    site_url: 'http://www.site.com',
                    phone_numbers: [
                        {
                            ddd: '11',
                            number: '85876199',
                            type: 'mobile',
                        },
                    ],
                    managing_partners: [
                        {
                            type: 'individual',
                            document_number: '925452787',
                            email: 'some@email.com',
                            name: 'Someone',
                        },
                    ],
                },
            });
            return { error: false, data: response.data }
        } catch (err) {
            return { error: true, message: err.message }
        }
    },
    createSplitTransaction: async (data) => {
        try {

            console.log("Data:", data);
            if (Object.values(data).length === 0) {
                console.log("OBJETO VAZIO")
                return { error: true, message: "Objeto VAZIO" }
            }
            const response = await api.post("/transactions", {
                api_key,
                ...data,
            })
            return { error: false, data: response.data }
        } catch (error) {
            return { error: true, message: error.message }
        }
    }
}