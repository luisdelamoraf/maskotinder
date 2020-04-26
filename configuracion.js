async function editarUsuario(i){
    console.log(i);
    let z = await fetch(`https://users-dasw.herokuapp.com/api/users/${i}`,{
        method:"GET",
        headers:{"Content-Type": 'application/json',
        "x-auth": localStorage.token,
        "x-user-token": localStorage.token_usr 
        }
    })
    let valores_usr = await z.json()
    console.log(valores_usr);
    let nombre = valores_usr.nombre;
    let apellido = valores_usr.apellido;
    let correo = valores_usr.correo;
    let fecha = valores_usr.fecha;
    let url = valores_usr.url;
    let sexo = valores_usr.sexo;
    let password1 = valores_usr.password;


    $("#RegNombre").val(nombre)
    $("#RegApellidos").val(apellido)
    $("#RegEmail").val(correo)
    $("#RegPass1").val(password1)
    $("#RegPass2").val(password1)
    $("#RegFecha").val(fecha)
    $("#RegUrl").val(url)
    if(sexo =="H"){
      $("#RegSexoH").val("H")
      document.querySelector("#RegSexoH").setAttribute("checked","");
      document.querySelector("#RegSexoM").removeAttribute("checked");
    }else{
      document.querySelector("#RegSexoM").setAttribute("checked","");
      document.querySelector("#RegSexoH").removeAttribute("checked");
    }

    
    
}

async function ActualizarUsuario(){
    console.log("holaa");
    event.preventDefault();
    let Reg_sexo ="";
    let Reg_nombre = document.querySelector("#RegNombre").value;
    let Reg_apellido = document.querySelector("#RegApellidos").value;
    let Reg_correo = document.querySelector("#RegEmail").value;
    let Reg_fecha = document.querySelector("#RegFecha").value;
    let Reg_Pass = document.querySelector("#RegPass1").value;
    if (document.querySelector("#RegSexoH").checked == true){
        Reg_sexo = "H"
    }else{
        Reg_sexo ="M"
    }
    let Reg_url = document.querySelector("#RegUrl").value;
    let Reg = {
    "nombre":Reg_nombre,
    "apellido": Reg_apellido,
    "correo": Reg_correo,
    "url": Reg_url,
    "sexo": Reg_sexo,
    "fecha":Reg_fecha,
    "password":Reg_Pass
}
let regJson = JSON.stringify(Reg);
await fetch("https://users-dasw.herokuapp.com/api/users/"+Reg.correo,{
    method:"PUT",
    headers:{"Content-Type": 'application/json',
    "x-auth": localStorage.token,
    "x-user-token": localStorage.token_usr 
    },
    body: regJson
})
location.reload();
}