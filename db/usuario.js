const mongoose = require("mongoose");
let usuarioSchema = mongoose.Schema({
    id:{
        type:Number,
        require:true
    },
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
        require:true,
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

//Registro de usuarios
usuarioSchema.statics.RegistrarUsuario = (datosUsuario)=>{
    datosUsuario.telefono = 0000000000,
    datosUsuario.url = "https://aguadilla.inter.edu/wp-content/uploads/2019/03/default-profile-300x300.png",
    datosUsuario.acomodos= 0,
    datosUsuario.ubicacion= "x"
    let nuevoUsuario = usuario(datosUsuario)
    return nuevoUsuario.save()
}


usuarioSchema.statics.ObtenerUsuario = async (correo)=>{

    let USR = await usuario.findOne({correo:correo},{_id:0})
    return USR
}

let usuario = mongoose.model('usuario', usuarioSchema);
module.exports = usuario
