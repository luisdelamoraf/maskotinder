const router = require("express").Router();
const mascota = require("../db/mascota");
const jwt = require("jsonwebtoken");

    
router.post("/api/mascotas", async (req, res) => {
    try{
        let LastDoc = await mascota.find({ }, {_id:0, id_mascota:1}).sort({id_mascota:-1}).limit(1);
        console.log(LastDoc);

        req.body.id_mascota = LastDoc[0].id_mascota+1;
        let Msc = await mascota.RegistrarMascota(req.body)
        res.status(201).send(Msc);
        console.log(LastDoc);
        
     }catch(err){
          res.status(400).send({ERROR:err});
      }
})
    module.exports = router;