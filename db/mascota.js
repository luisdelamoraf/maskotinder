const mongoose = require("mongoose");
const usuario  = require ("./usuario");
const jwt = require ("jsonwebtoken");

let MascotaSchema = mongoose.Schema({
    id_mascota:{
        type:Number,
        require:true
    },
    nombre:{
        type:String,
        require:true
    },
    especie:{
        type:Number,
        require:true
    },
    descripcion:{
        type:String,
        require:true
    },
    sexo:{
        type:String,
        require:true
    },
    cumpleaños:{
        type:String,
        require:true
    },
    ubicacion:{
        type:String,
        require:true
    },
    url1:{
        type:String,
        require:true
    },
    url2:{
        type:String,
        require:true
    },
    url3:{
        type:String,
        require:true
    },
    id_dueño:{
        type:Number,
        require:true
    },
    Favoritos:{
        type:Array
    }
})

MascotaSchema.statics.RegistrarMascota = async (datosMascota)=>{
    let correo
    jwt.verify(datosMascota.token_usr, "Labredes1",function(err, decoded) {
        if(decoded!=undefined)correo=decoded.correo;
    })
    let idUSR = await usuario.findOne({correo:correo},{_id:0,id:1})
    datosMascota.id_dueño = idUSR.id
    let nuevaMascota = mascota(datosMascota)
    return nuevaMascota.save()
}
MascotaSchema.statics.ObtenerMascota = async (correo)=>{
    let USR = await usuario.findOne({correo:correo},{_id:0,id:1})
    let MSC = await mascota.find({id_dueño:USR.id},{_id:0})
    return MSC
}

MascotaSchema.statics.MostrarMascotas = async () =>{
    let todas = await mascota.find({})
    console.log(todas);
    return todas
}




let mascota = mongoose.model("mascota",MascotaSchema)
module.exports = mascota