editarUsuario()
ubicacion()

let IndiceEliminar;
let indice;
async function ubicacion(){
 let USR = await fetch(`http://localhost:3000/api/users`,{
    method:"GET",
    headers:{"Content-Type": 'application/json',
    "x-user-token": localStorage.token_usr 
    }
})
let valores_ubi = await USR.json()
    let HTML_ubi = `
    <h6>Ubicación</h6>
    <h6>${valores_ubi.ubicacion}</h6>`
    document.querySelector("#ubicacion").innerHTML = HTML_ubi
}

async function editarUsuario(){
    let z = await fetch(`http://localhost:3000/api/users`,{
        method:"GET",
        headers:{"Content-Type": 'application/json',
        "x-user-token": localStorage.token_usr 
        }
    })
    let valores_usr = await z.json()
    let nombre = valores_usr.nombre;
    let apellido = valores_usr.apellido;
    let correo = valores_usr.correo;
    let Tel = valores_usr.telefono;
    let password1 = valores_usr.password;
    let url = valores_usr.url;
    let ubicacion = valores_usr.ubicacion;

    $("#NombreP").val(nombre)
    $("#ApellidoP").val(apellido)
    $("#CorreoP").val(correo)
    $("#PasswordP").val(password1)
    $("#PassConfP").val(password1)
    $("#TelP").val(Tel)
    $("#urlP").val(url)
    $("#ubicacionP").val(ubicacion)
}

async function ActualizarUsuario(){
    event.preventDefault();
    let Reg_nombre = document.querySelector("#NombreP").value;
    let Reg_apellido = document.querySelector("#ApellidoP").value;
    let Reg_correo = document.querySelector("#CorreoP").value;
    let Reg_tel = document.querySelector("#TelP").value;
    let Reg_Pass = document.querySelector("#PasswordP").value;
    let Reg_url = document.querySelector("#urlP").value;
    let Reg_ubicacion = document.querySelector("#ubicacionP").value;
    let Reg = {
    "nombre":Reg_nombre,
    "apellido": Reg_apellido,
    "correo": Reg_correo,
    "telefono":Reg_tel,
    "password":Reg_Pass,
    "url":Reg_url,
    "ubicacion":Reg_ubicacion
}
let regJson = JSON.stringify(Reg);
let x = await fetch("http://localhost:3000/api/users",{
    method:"PUT",
    headers:{"Content-Type": 'application/json',
      "x-user-token": localStorage.token_usr 
    },
    body: regJson
})

if (x.status == 200) { 
  alert("Perfil actualizado correctamente")
  location.reload();
} else {
  console.log(x.status);   
}




}

//ELIMINAR USUARIO
function ValorEliminar(indice){
    IndiceEliminar = indice
  }
async function EliminarUsuario(indice){
    event.preventDefault()
    let x = await fetch(`http://localhost:3000/api/users`,{
      method:"DELETE",
      headers:{"Content-Type": 'application/json',
        "x-user-token": localStorage.token_usr 
      },
    })
    if (x.status == 200){
        window.location.href = "inicio.html"
    }
}

//MODAL DE ELIMINAR
let HTML_ModalEliminar = ` <div class="modal fade" id="modalEliminar" tabindex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
<div class="modal-dialog" role="document">
  <div class="modal-content">
    <div class="modal-header">
      <h5 class="modal-title">Eliminar Perfil</h5>
      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
    <div>
    Esta acción eliminará permanentemente tu cuenta
    </div>
        <button id="btn_confirmar" type="submit" class="btn btn-success mt-3" onclick="EliminarUsuario()">Confirmar</button>
         <button type="button" class="btn btn-secondary mt-3" data-dismiss="modal">Cancelar</button>
    </div>
  </div>
</div>
</div>`
document.getElementById("modalEliminarUsuario").innerHTML = HTML_ModalEliminar