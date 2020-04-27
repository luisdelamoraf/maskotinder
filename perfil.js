ObtenerUsuario()
obtenerMascota()

async function ObtenerUsuario(){
    usr = await fetch("http://localhost:3000/usuario",{
    method: "GET",
    headers: {"Content-Type": 'application/json'
            // "x-auth": localStorage.token,
            // "x-user-token": localStorage.token_usr 
        }
})
let usr_JSON = await usr.json()
let HTML_Usuario =`<p align="right"><a href="Configuración.html">Editar</a></p>
<img class ="imagen_perfil" src="${usr_JSON.url}" alt="">
<div class="carta-perfil-body">
    <h4 class="card-title">${usr_JSON.nombre}</h4>
    <hr>
    <i class="fa fa-handshake" aria-hidden="true"></i> ${usr_JSON.acomodos} acomodos exitosos
    <hr>
    <i class="fa fa-envelope" aria-hidden="true"></i> ${usr_JSON.correo}
    <hr>
    <i class="fa fa-phone" aria-hidden="true"></i> ${usr_JSON.telefono}
    <hr>
    <i class="fa fa-map-marker" aria-hidden="true"></i> ${usr_JSON.ubicacion}
</div>`
   document.getElementById("carta_perfil").innerHTML += HTML_Usuario
}

async function obtenerMascota(){
    msct = await fetch("http://localhost:3000/mascotas",{
    method: "GET",
    headers: {"Content-Type": 'application/json'
            // "x-auth": localStorage.token,
            // "x-user-token": localStorage.token_usr 
        }
})
let msct_JSON = await msct.json()
let HTML_Mascota = 

`
<div class="card-body">
<h4 class="card-title" id="nombre" >${msct_JSON.nombre}</h4>
<hr>
<i class="fa fa-info-circle" aria-hidden="true" id="descripcion"></i>${msct_JSON.descripcion}
<hr>
<i class="fa fa-venus-mars" aria-hidden="true" ></i> ${msct_JSON.sexo}
<hr>
<i class="fa fa-birthday-cake" aria-hidden="true"></i> ${msct_JSON.cumpleaños}
<hr>
<i class="fa fa-map-marker" aria-hidden="true"></i> ${msct_JSON.ubicacion}
</div>
</div>`
   document.getElementById("carta_mascota").innerHTML += HTML_Mascota
}


registro.addEventListener("click", CatchSubMasc);

//FUNCIÓN DE REGISTRO DE MASCOTAS
async function CatchSubMasc(event){
    event.preventDefault();
    let masc_nombre = document.querySelector("#nombreM").value;
    let masc_especie = document.querySelector("#especieM").value;
    let masc_descripcion = document.querySelector("#descripcionM").value;
    let masc_sexo = document.querySelector("#sexoM").value;
    let masc_cumpleaños = document.querySelector("#cumpleañosM").value;
    let masc_registro = {
                            "nombre":masc_nombre,
                            "especie":masc_especie,
                            "descripcion":masc_descripcion,
                            "sexo":masc_sexo,
                            "cumpleaños":masc_cumpleaños
    }
    let msc_JSON = JSON.stringify(masc_registro);
    let exitoso = await fetch("http://localhost:3000/mascotas",{
        method: "POST",
        headers: {"Content-Type": 'application/json',
                "x-auth": localStorage.token },
        body: msc_JSON,
    })
    console.log(msc_JSON);
    if (exitoso.status == 201){
        alert("Usuario Registrado Exitosamente")
        $('#BtnModalRegistro').modal('hide');
    }else{
        alert("ERROR")
    }
}
