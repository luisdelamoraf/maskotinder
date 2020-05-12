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
        type:String,
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
        type:Array,
        require:true
    },
    interesados:{
        type:Array,
        require:true
    }
})

MascotaSchema.statics.MostrarMascotasFav = async (correo) =>{
    let USRID = await usuario.find({correo:correo},{_id:0 , id:1})
    console.log(USRID);
    let favs = await mascota.find({id_dueño:USRID},{_id:0,__v:0})
    console.log(favs);
    return favs
}

MascotaSchema.statics.RegistrarMascota = async (datosMascota)=>{
    let correo
    jwt.verify(datosMascota.token_usr, "Labredes1",function(err, decoded) {
        if(decoded!=undefined)correo=decoded.correo;
    })
    let idUSR = await usuario.findOne({correo:correo},{_id:0,id:1,ubicacion:1})
    await usuario.findOneAndUpdate({correo:correo},{$inc:{acomodos:1}})
    datosMascota.id_dueño = idUSR.id
    datosMascota.interesados=[]
    datosMascota.Favoritos=[]
    datosMascota.ubicacion=idUSR.ubicacion
    let nuevaMascota = mascota(datosMascota)
    return nuevaMascota.save()
}

MascotaSchema.statics.ObtenerMascota = async (correo)=>{
    let USR = await usuario.findOne({correo:correo},{_id:0,id:1})
    let MSC = await mascota.find({id_dueño:USR.id},{_id:0})
    return MSC
}
MascotaSchema.statics.UnaMascota = async (idMsct)=>{
    let MSC = await mascota.findOne({id_mascota:idMsct},{_id:0,interesados:1})
    console.log(MSC);
    return MSC
}

MascotaSchema.statics.MostrarMascotas = async () =>{
    let todas = await mascota.find({},{_id:0,__v:0})
    return todas
}

MascotaSchema.statics.SolicitarMascota = async (datosMascota)=>{
    let Solicitada = await mascota.findOneAndUpdate({id_mascota:datosMascota.id_mascota},{
        interesados: datosMascota.interesados
    })
    console.log(Solicitada);
    return Solicitada
}

MascotaSchema.statics.FavMascota = async (datosMascota)=>{
    console.log(datosMascota);
    let Solicitada = await mascota.findOneAndUpdate({id_mascota:datosMascota.id_mascota},{
        Favoritos: datosMascota.Favoritos
    })
    console.log(Solicitada);
    return Solicitada
}

MascotaSchema.statics.MostrarMascotasFav = async (correo) =>{
    let idUSR = await usuario.findOne({correo:correo},{_id:0,id:1})
    let favs = await mascota.find({Favoritos:idUSR.id},{_id:0,__v:0})
    return favs
}

MascotaSchema.statics.SolicitarMAscotaUnfav = async (correo, idMSC)=>{
    let idm = parseInt(idMSC)
    let idUSR = await usuario.findOne({correo:correo}, {_id:0, id:1})
    let Solicitada = await mascota.findOneAndUpdate({id_mascota:idm},{$pull: {Favoritos: idUSR.id}});
    let msc = await mascota.findOne({id_mascota:idm}, {_id:0, Favoritos:1})
    return Solicitada
}



//Eliminar mascota
MascotaSchema.statics.EliminarMascota = async(i, correo)=>{
await mascota.findOneAndDelete({id_mascota:i})
await usuario.findOneAndUpdate({correo:correo},{$inc:{acomodos:-1}})

}


MascotaSchema.statics.ObtenerInteresados = async (msct)=>{
    let USR = await usuario.findOne({correo:correo},{_id:0,id:1})
    let MSC = await mascota.find({id_dueño:USR.id},{_id:0})
    return MSC
}


let mascota = mongoose.model("mascota",MascotaSchema)
module.exports = mascota


