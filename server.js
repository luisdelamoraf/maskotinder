const express = require("express");
const fs = require("fs")
const randomize = require("randomatic");
const app = express();
const port = 3000;
//const mongoose = require('./db/mongodb-connect');

//Archivos
let id = JSON.parse(fs.readFileSync('./id.json'));

//Middleware global
app.use(express.json())


const mongoose = require('./db/mongodb-connect');


let usuarioSchema = mongoose.Schema({
    id:{
        type: Number,
        required: true,
        unique: true,
    },
    nombre: String,
    apellido: String,
    correo: String,
    password: String,
    telefono:Number,
    url: String,
    acomodos: Number,
    ubicacion:String
})

let Usuario = mongoose.model('usuario', usuarioSchema);

Usuario.find({},(err,doc)=>{
    if(doc){
        console.log(doc);
    }
    if(err){
        console.log(err);
    }
})


let newUsuario = {
    id: 1,
    nombre: "Test",
    apellido: "Test",
    correo: "Test",
    password: "Test",
    telefono: 3330004444,
    url: "Test",
    acomodos: 0,
    ubicacion:"Test"
};
let usuario = Usuario(newUsuario)
usuario.save().then((doc)=>console.log(doc));



//ÚLTIMA LÍNEA
app.listen(port, () => console.log("Ejecutando en el puerto " + port));