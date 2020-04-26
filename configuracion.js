editarUsuario()
async function editarUsuario(){
    console.log();
    let z = await fetch(`http://localhost:3000/usuario`,{
        method:"GET",
        headers:{"Content-Type": 'application/json'
        // ,
        // "x-auth": localStorage.token,
        // "x-user-token": localStorage.token_usr 
        }
    })
    let valores_usr = await z.json()
    let nombre = valores_usr.nombre;
    let apellido = valores_usr.apellido;
    let correo = valores_usr.correo;
    let Tel = valores_usr.telefono;
    let password1 = valores_usr.password;
    let url = valores_usr.url;


    $("#NombreP").val(nombre)
    $("#ApellidoP").val(apellido)
    $("#CorreoP").val(correo)
    $("#PasswordP").val(password1)
    $("#PassConfP").val(password1)
    $("#TelP").val(Tel)
    $("#urlP").val(url)

    
    
}

async function ActualizarUsuario(){
    event.preventDefault();
    let Reg_nombre = document.querySelector("#NombreP").value;
    let Reg_apellido = document.querySelector("#ApellidoP").value;
    let Reg_correo = document.querySelector("#CorreoP").value;
    let Reg_tel = document.querySelector("#TelP").value;
    let Reg_Pass = document.querySelector("#PasswordP").value;
    let Reg_url = document.querySelector("#urlP").value;
    let Reg = {
    "nombre":Reg_nombre,
    "apellido": Reg_apellido,
    "correo": Reg_correo,
    "telefono":Reg_tel,
    "password":Reg_Pass,
    "url":Reg_url
}
let regJson = JSON.stringify(Reg);
await fetch("http://localhost:3000/usuario",{
    method:"PUT",
    headers:{"Content-Type": 'application/json'
    //,
    // "x-auth": localStorage.token,
    // "x-user-token": localStorage.token_usr 
    },
    body: regJson
})
location.reload();
}