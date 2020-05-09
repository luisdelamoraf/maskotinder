const express = require("express");
const randomize = require("randomatic");
const app = express();
const port = 3000;
const mongoose = require('./db/mongodb-connect');
const Usuario = require("./esquemas/usuarios.js");


//Middleware global
app.use(express.static(__dirname+"/public"))
app.use(express.json())

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
    if (users.find(a => a.correo.includes(req.body.correo)) || (users.find(a => a.nombre.includes(req.body.nombre)) && users.find(a => a.apellido.includes(req.body.apellido)))) {
        res.status(404).send({
            ERROR: "Ya existe usuario"
        });
    } else {
        console.log("Middleware: validarExistencia COMPLETADO");
        next();
    }
}

app.get('/', (req, res) => res.send('Users app +kotinder'))

//Registro de usuarios
app.route('/api/users')
    .post(validarBody, (req, res) => {
        let usuario = new Usuario()
        usuario.nombre = req.body.nombre
        usuario.apellido = req.body.apellido
        usuario.correo = req.body.correo
        usuario.password = req.body.password
        usuario.telefono = 0000000000,
        usuario.url = "https://aguadilla.inter.edu/wp-content/uploads/2019/03/default-profile-300x300.png",
        usuario.acomodos= 0,
        usuario.ubicacion= ""
        usuario.save().then((doc)=>console.log(doc));
        res.status(201).send(req.body);
    })



// Usuario.find({},(err,doc)=>{
//     if(doc){
//         console.log(doc);
//     }
//     if(err){
//         console.log(err);
//     }
// })



//ÚLTIMA LÍNEA
app.listen(port, () => console.log("Ejecutando en el puerto " + port));