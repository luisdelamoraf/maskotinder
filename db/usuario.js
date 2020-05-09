const mongoose = require("mongoose");

let usuarioSchema = mongoose.Schema({
    nombre:{
        type:String,
        require:true
    },
    apellido:{
        type:String,
        require:true
    },
    correo:{
        type:String,
        unique: true
    },
    password:{
        type:String,
        require:true
    },
    telefono:{
        type:Number,
        require:true
    },
    url:{
        type:String,
        require:true
    },
    acomodos:{
        type:Number,
        require:true
    },
    ubicacion:{
        type:String,
        require:true
    },
})

let usuario = mongoose.model('usuario', usuarioSchema);

//Registro de usuarios

function RegistrarUsuario(req){
    let usr = usuario(req)
    usr.telefono = 0000000000,
    usr.url = "https://aguadilla.inter.edu/wp-content/uploads/2019/03/default-profile-300x300.png",
    usr.acomodos= 0,
    usr.ubicacion= "x"
    usr.save()
    .then((doc)=>console.log(doc))
    .catch((err)=>console.log("Ocurrio un error",err));
}


usuario.RegistrarUsuario = RegistrarUsuario;
module.exports = usuario

