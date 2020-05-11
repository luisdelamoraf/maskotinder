const express = require("express");
const randomize = require("randomatic");
const app = express()
const port = 3000;
const mongoose = require('./db/mongodb-connect');
const usuariosRouter = require("./routes/usuarios");
const mascotasRouter = require("./routes/mascotas");

//Middleware global
app.use(express.json())
app.use(express.static(__dirname+"/public"))

app.use("/",mascotasRouter);
app.use("/",usuariosRouter);



app.get('/', (req, res) => res.send('Users app +kotinder'))



//ÚLTIMA LÍNEA
app.listen(port, () => console.log("Ejecutando en el puerto " + port));