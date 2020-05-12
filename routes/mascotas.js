const router = require("express").Router();
const mascota = require("../db/mascota");
const jwt = require("jsonwebtoken");
let correo;
 
router.post("/api/mascotas",autenticacion, async (req, res) => {
    try{
        let LastDoc = await mascota.find({ }, {_id:0, id_mascota:1}).sort({id_mascota:-1}).limit(1);
        req.body.id_mascota = LastDoc[0].id_mascota+1;
        let Msc = await mascota.RegistrarMascota(req.body)
        res.status(201).send(Msc);
     }catch(err){
          res.status(400).send({ERROR:err});
      }
})
router.get("/api/mascotas",autenticacion, async (req, res)=>{
    let msc = await mascota.ObtenerMascota(correo)
    res.status(200).send(msc)
})
router.get("/api/UnaMascota",autenticacion, async (req, res)=>{
    console.log(req.get("IdMascota"));
    let msc = await mascota.UnaMascota(req.get("IdMascota"))
    res.status(200).send(msc)
})


router.get("/api/CatalogoMascotas",autenticacion, async (req,res)=>{
    let ctlg = await mascota.MostrarMascotas()
    res.status(200).send(ctlg)
})

router.put("/api/mascotas",autenticacion, async (req, res) =>{
    try{
        let Msc = await mascota.SolicitarMascota(req.body)
        res.status(201).send(Msc);
     }catch(err){
          res.status(400).send({ERROR:err});
      }
})

router.put("/api/mascotasFav",autenticacion, async (req, res) =>{
    try{
        let Msc = await mascota.FavMascota(req.body)
        res.status(201).send(Msc);
     }catch(err){
          res.status(400).send({ERROR:err});
      }
})

router.delete("/api/mascotas",autenticacion, async (req,res)=>{
    try{
        await mascota.EliminarMascota(req.body.i)
        res.status(200).send({OK:"Mascota eliminada correctamente"})
    }catch(err){
        res.status(400).send({ERROR:err});
    }
})

router.get("/api/mascotasFav",autenticacion, async (req,res)=>{
    let favs = await mascota.MostrarMascotasFav(correo)
    res.status(200).send(favs)
})


//Middleware a rutas
async function autenticacion(req, res, next) {
    console.log("Middleware: autenticacion");
    jwt.verify(req.get("x-user-token"), "Labredes1",function(err, decoded) {
        if(decoded!=undefined)correo=decoded.correo;
    })
    if(correo != undefined){
        console.log("Middleware: autenticacion COMPLETADO");
        next()
    }else{
        res.status(401).send("ERROR")
    }
}  


module.exports = router;


