const mongoose = require('mongoose');
let user ="dbUser";
let password ="labredes";
let dbName = "dbUsers"
const dbUrl = `mongodb+srv://${user}:${password}@cluster0-dltgt.mongodb.net/${dbName}?retryWrites=true&w=majority`

mongoose.connect(dbUrl,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology: true
})
    .then(()=> console.log("Conectado a la base de datos"))
    .catch((err)=>console.log("No conectado",err))
    
module.exports = mongoose;