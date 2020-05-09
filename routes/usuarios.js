const router = require("express").Router();
const usuario = require("../db/usuario");

router.post("/api/users",validarBody, validarExistencia, (req, res) => {
    usuario.RegistrarUsuario(req.body)
    res.status(201).send(req.body);
})

//Middlewares a rutas

function validarBody(req, res, next) {
    console.log("Middleware: validarBody");
    if (req.body.nombre && req.body.apellido && req.body.correo && req.body.password) {
        console.log("Middleware: validarBody COMPLETADO");
        next();
    } else {
        let faltantes = "Falta: ";
        if (!req.body.nombre) {
            faltantes += "Nombre,"
        };
        if (!req.body.apellido) {
            faltantes += " Apellido,"
        };
        if (!req.body.correo) {
            faltantes += " Correo,"
        };
        if (!req.body.password) {
            faltantes += " Password,"
        };
        console.log("Middleware: validarBody COMPLETADO");
        res.status(400).send({
            ERROR: faltantes
        });
    }
}

function validarExistencia(req, res, next) {
    console.log("Middleware: validarExistencia");
    usuario.find({correo:req.body.correo}, (err,docs)=>{
        if(docs){
            console.log("Middleware: validarExistencia COMPLETADO");
            next();
        }
        if(err){
            res.status(404).send({ERROR:"Ya existe un usuario registrado con este correo"});
        }
    })
}

module.exports = router;