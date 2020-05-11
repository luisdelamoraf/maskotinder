const router = require("express").Router();
const mascota = require("../db/mascota");
const jwt = require("jsonwebtoken");
let correo;
async function autenticacion(req, res, next) {
    
    jwt.verify(req.get("x-user-token"), "Labredes1",function(err, decoded) {
        if(decoded!=undefined)correo=decoded.correo;
    })
    if(correo != undefined){
        next()
    }else{
        res.status(401).send("ERROR")
    }
}
    
router.post("/api/mascotas", async (req, res) => {
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

router.get("/api/CatalogoMascotas",autenticacion, async (req,res)=>{
    let ctlg = await mascota.MostrarMascotas()
    res.status(200).send(ctlg)
})

module.exports = router;


