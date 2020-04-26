ObtenerUsuario()

async function ObtenerUsuario(){
    usr = await fetch("http://localhost:3000/usuario",{
    method: "GET",
    headers: {"Content-Type": 'application/json'
            // "x-auth": localStorage.token,
            // "x-user-token": localStorage.token_usr 
        }
})
let usr_JSON = await usr.json()
let HTML_Usuario =`
<p align="right"><a href="Configuración.html">Editar</a></p>
<img class ="imagen_perfil" src="${usr_JSON.url}" alt="">
<div class="carta-perfil-body">
    <h4 class="card-title">Nombre</h4>
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