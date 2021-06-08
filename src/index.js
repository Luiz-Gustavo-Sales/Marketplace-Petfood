const express = require('express')
//chamndo o express
const app = express()
const cors = require('cors')
//controle de requisições (tempo,log das requisições)
const morgan = require('morgan')
//manipular json
//const bodyParser = require('body-parser')

//databases
require('./database')
const routes = require('./routes/main')

//caso nao tenha variavel port vai rodar na porta 5050
app.set('port', process.env.PORT || 5050)

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

//chamando requisição
app.use(routes)

app.listen(app.get('port'), (PORTA) => {
    console.log('Serve rodando - PORTA: ', app.get('port'));
})