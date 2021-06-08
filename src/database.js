const mongoose = require('mongoose')
/*
 
const banco_ = mongoose.connect(
  "mongodb+srv://formulario:flamengo15@cluster0-xsmns.mongodb.net/test?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
 */



const URI = mongoose.connect(
  "mongodb+srv://admin:admin@cluster0-xsmns.mongodb.net/Test?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //debug: true,
    useFindAndModify: true,
  }
);