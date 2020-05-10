const router = require("express").Router();
const usuario = require("../db/usuario");

router.post("/api/users",validarBody, validarExistencia, async (req, res) => {
    try{
        let LastDoc = await usuario.find({ }, {_id:0, id:1}).sort({id:-1}).limit(1);
        req.body.id = LastDoc[0].id+1;
        let usr = await usuario.RegistrarUsuario(req.body)
        res.status(201).send(usr);
     }catch(err){
          res.status(400).send({ERROR:err});
      }
    
})

// router.get('/:id', async (req,res) => {
//     let id = Number(req.params.id);
//     let usuario = await usuario.findOne({id});
//     res.status(200).send(usuario);
// });
// router.post('/',async(req,res)=> {
//     console.log(req.body);
//     let LastID = await usuario.findOne({sort: {id: -1}})
//     req.body.id = LastID.id+1;
//     console.log(req.body);
//     let usuario = await usuario(req.body).save()
//     res.status(200).send()
// });

router.post("/api/login", validarLogin, validarExistenciaLogin, (req, res) => {
        // let login = users.findIndex(a => a.correo.includes(req.body.correo));
        // if (!users[login].token) {
        //     let login = users.findIndex(a => a.correo.includes(req.body.correo));
        //     users[login].token = randomize('Aa0', '10') + "-" + users[login].id;
        //     fs.writeFileSync('users.json', JSON.stringify(users));
        //     users = JSON.parse(fs.readFileSync('users.json'));
        // }
        res.status(201).send();
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

function validarLogin(req, res, next) {
    console.log("Middleware: validarLogin");
    if (req.body.correo && req.body.password) {
        console.log("Middleware: validarLogin COMPLETADO");
        next();
    } else {
        let faltantes = "Falta: ";
        if (!req.body.correo) {
            faltantes += " Correo,"
        };
        if (!req.body.password) {
            faltantes += " Password,"
        };
        res.status(401).send({
            ERROR: faltantes
        });
    }
}

function validarExistenciaLogin(req, res, next) {
    console.log("Middleware: validarExistenciaLogin");
    usuario.findOne({correo:req.body.correo, password:req.body.password},(err,doc)=>{
        if (err) throw err;
    console.log(doc.correo, doc.password);
    })
}
    //     if (users[login].password == req.body.password) {
    //         console.log("Middleware: validarExistenciaLogin COMPLETADO");
    //         next();
    //     } else {
    //         res.status(401).send({
    //             ERROR: "No coinciden usuario y contraseña"
    //         });
    //     }
    // } else {
    //     res.status(401).send({
    //         ERROR: "No coinciden usuario y contraseña"
    //     });
    // }

    // if (users.find(a => a.correo.includes(req.body.correo))) {
    //     let login = users.findIndex(a => a.correo.includes(req.body.correo))
        

module.exports = router;