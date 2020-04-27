let IndiceEliminar;
let indice;

ObtenerUsuario()
obtenerMascota()
//GETmasc()

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
    <i class="fa fa-paw" aria-hidden="true"></i> ${usr_JSON.num_mascotas} mascotas añadidas
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
<div class="carrusel_padre">
<div id="carouselId" class="carousel slide" data-ride="carousel" >
    <ol class="carousel-indicators">
        <li data-target="#carouselId" data-slide-to="0" class="active"></li>
        <li data-target="#carouselId" data-slide-to="1"></li>
        <li data-target="#carouselId" data-slide-to="2"></li>
    </ol>
    <div class="carousel-inner" role="listbox">
        <div class="carousel-item active">
            <img class="imagen_carta" src="${msct_JSON.url1}">
        </div>
        <div class="carousel-item">
            <img class="imagen_carta" src="${msct_JSON.url2}" >
        </div>
        <div class="carousel-item">
            <img class="imagen_carta" src="${msct_JSON.url3}">
        </div>
    </div>
</div>
</div>
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
<hr>
<p align="right"><buttontype="button" class="btn btn-danger btn-circle" data-toggle="modal" data-target="#modalEliminar"><i class="fa fa-trash"></i></button>
</p>
</div>
</div>`
   document.getElementById("carta_mascota").innerHTML += HTML_Mascota
}

let registro = document.querySelector("#submitM");
registro.addEventListener("click", CatchSubMasc);

//FUNCIÓNES DE REGISTRO DE MASCOTAS
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
                            "cumpleaños":masc_cumpleaños,
                            "id":1,
                            "url1":"https://www.24petwatch.com/Portals/24petwatchv2/EasyDNNnews/302/title-img.png",
                            "url2":"https://www.24petwatch.com/Portals/24petwatchv2/EasyDNNnews/297/holiday-food-safety-header-img-300x300-2.png",
                            "url3":"https://img.clipartlook.com/cute-dog-clipart-clipart-panda-free-clipart-images-clip-art-pets-300_300.jpg" 
    }
    let msc_JSON = JSON.stringify(masc_registro);
    let exitoso = await fetch("http://localhost:3000/registro_mascotas",{
        method: "POST",
        headers: {"Content-Type": 'application/json',
                "x-auth": localStorage.token },
        body: msc_JSON,
    })
    console.log(msc_JSON);
    if (exitoso.status == 201){
        alert("Mascota Registrado Exitosamente")
        $('#model3').modal('hide');
    }else{
        alert("ERROR")
    }

    
}
async function GETmasc(){
    let successMasc = await fetch("http://localhost:3000/registro_mascotas",{
        method: "GET",
        headers: {"Content-Type": 'application/json'
        // ,
        // "x-auth": localStorage.token, "x-user-token": localStorage.token_usr
    }
    })

    let x = await successMasc.json()


    x.forEach((elemento) => {
        GETdata()
        async function GETdata (){
            let datosMasc = await fetch("http://localhost:3000/registro_mascotas"+[0],{
                method: "GET",
                headers: {"Content-Type": 'application/json'
                // ,
                // "x-auth": localStorage.token, "x-user-token": localStorage.token_usr
            }
            })
        let msct_JSON = await datosMasc.json()
        let insertarMasc = `
        <!-- Carrusel mascotas -->
        <div class="col-12 col-sm-6 col-md-4 col-lg-3">
        <div class="card card-block">Card</div>
        <div class="carrusel_padre">
        <div id="carouselId" class="carousel slide" data-ride="carousel" >
            <ol class="carousel-indicators">
                <li data-target="#carouselId" data-slide-to="0" class="active"></li>
                <li data-target="#carouselId" data-slide-to="1"></li>
                <li data-target="#carouselId" data-slide-to="2"></li>
            </ol>
            <div class="carousel-inner" role="listbox">
                <div class="carousel-item active">
                    <img class="imagen_carta" src="${msct_JSON.url1}">
                </div>
                <div class="carousel-item">
                    <img class="imagen_carta" src="${msct_JSON.url2}" >
                </div>
                <div class="carousel-item">
                    <img class="imagen_carta" src="${msct_JSON.url3}">
                </div>
            </div>
        </div>
        </div>
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
        <hr>
        <p align="right"><a href="">Eliminar</a></p>
        </div>
        </div>
        </div>`
        document.querySelector("#carta_mascota").innerHTML += insertarMasc
        }
    });

} 

//ELIMINAR MASCOTAS
function ValorEliminar(indice){
    IndiceEliminar = indice
  }
async function EliminarMascota(indice){
    event.preventDefault()
    let x = await fetch(`http://localhost:3000/EliminarMascota/1`,{
      method:"DELETE",
      headers:{"Content-Type": 'application/json',
    //   "x-auth": localStorage.token,
    //   "x-user-token": localStorage.token_usr 
      },
    })
   location.reload();
}

//MODAL DE ELIMINAR
let HTML_ModalEliminar = ` <div class="modal fade" id="modalEliminar" tabindex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
<div class="modal-dialog" role="document">
  <div class="modal-content">
    <div class="modal-header">
      <h5 class="modal-title">Eliminar Mascota</h5>
      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
        <button id="btn_confirmar" type="submit" class="btn btn-success mt-3" onclick="EliminarMascota()">Confirmar</button>
         <button type="button" class="btn btn-secondary mt-3" data-dismiss="modal">Cancelar</button>
    </div>
  </div>
</div>
</div>`
document.getElementById("modalEliminarMascota").innerHTML = HTML_ModalEliminar