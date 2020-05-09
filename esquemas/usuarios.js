const mongoose = require("mongoose");

let usuarioSchema = mongoose.Schema({
    nombre: String,
    apellido:String,
    correo: String,
    password:String,
    telefono:Number,
    url:String,
    acomodos:Number,
    ubicacion:String
})

module.exports = mongoose.model('usuario', usuarioSchema);