const router = require("express").Router();
const mascota = require("../db/mascota");
const jwt = require("jsonwebtoken");
let correo;
 
router.post("/mascotas",autenticacion, async (req, res) => {
    try{
        let LastDoc = await mascota.find({ }, {_id:0, id_mascota:1}).sort({id_mascota:-1}).limit(1);
        req.body.id_mascota = LastDoc[0].id_mascota+1;
        let Msc = await mascota.RegistrarMascota(req.body)
        res.status(201).send(Msc);
     }catch(err){
          res.status(400).send({ERROR:err});
      }
})
router.get("/mascotas",autenticacion, async (req, res)=>{
    let msc = await mascota.ObtenerMascota(correo)
    res.status(200).send(msc)
})

router.get("/CatalogoMascotas",autenticacion, async (req,res)=>{
    let ctlg = await mascota.MostrarMascotas()
    res.status(200).send(ctlg)
})

router.put("/mascotas",autenticacion, async (req, res) =>{
    try{
        let Msc = await mascota.SolicitarMascota(req.body)
        res.status(201).send(Msc);
     }catch(err){
          res.status(400).send({ERROR:err});
      }
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


