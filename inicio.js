let FormReg = document.querySelector("#ModReg");
let registro = document.querySelector("#btnRegistro");


FormReg.addEventListener("change",()=>{
    let inputForma = document.querySelectorAll(":invalid");
    if(inputForma.length==0){
        if(document.querySelector("#RegPass1").value == document.querySelector("#RegPass2").value){
            document.querySelector("#btnRegistro").removeAttribute("disabled");
        }else{
            document.querySelector("#btnRegistro").setAttribute("disabled","");
        }
    }
});


//REGISTRO DE USUARIOS
registro.addEventListener("click", CatchSubmit);

//FUNCIÓN DE REGISTRO DE USUARIOS
async function CatchSubmit(event){
    event.preventDefault();
    let usr_nombre = document.querySelector("#RegNombre").value;
    let usr_apellido = document.querySelector("#RegApellidos").value;
    let usr_email = document.querySelector("#RegEmail").value;
    let usr_password = document.querySelector("#RegPass1").value;
    let usr_registro = {
                            "nombre":usr_nombre,
                            "apellido":usr_apellido,
                            "correo":usr_email,
                            "password":usr_password
    }
    let usr_JSON = JSON.stringify(usr_registro);
    let exitoso = await fetch("http://localhost:3000/registro",{
        method: "POST",
        headers: {"Content-Type": 'application/json',
                "x-auth": localStorage.token },
        body: usr_JSON,
    })
    console.log(usr_JSON);
    if (exitoso.status == 201){
        alert("Usuario Registrado Exitosamente")
        $('#BtnModalRegistro').modal('hide');
    }else{
        alert("ERROR")
    }
}