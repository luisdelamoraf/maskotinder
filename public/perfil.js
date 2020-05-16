let IndiceEliminar;
let indice;
let IndiceEditar;
let ubicacion

ObtenerUsuario()
obtenerMascota()


async function EditarMascota(id) {
    IndiceEditar= id
    let z = await fetch(`/api/UnaMascota`, {
      method: "GET",
      headers: {
        "Content-Type": 'application/json',
        "x-user-token": localStorage.token_usr,
        "IdMascota": id
      }
    })
    let valores_msct = await z.json()
    let especie = valores_msct.especie;
    let nombre = valores_msct.nombre;
    let descripcion = valores_msct.descripcion;
    let sexo = valores_msct.sexo;
    let cumpleaños = valores_msct.cumpleaños;
    let url1 = valores_msct.url1;
    let url2 = valores_msct.url2;
    let url3 = valores_msct.url3;
  
    $("#especieMSCT").val(especie)
    $("#nombreMSCT").val(nombre)
    $("#descripcionMSCT").val(descripcion)
    $("#sexoMSCT").val(sexo)
    $("#cumpleañosMSCT").val(cumpleaños)
    $("#url1MSCT").val(url1)
    $("#url2MSCT").val(url2)
    $("#url3MSCT").val(url3)
  }

async function ActualizarMascota() {
    event.preventDefault();
    let Reg_especie = document.querySelector("#especieMSCT").value;
    let Reg_nombre = document.querySelector("#nombreMSCT").value;
    let Reg_descripcion = document.querySelector("#descripcionMSCT").value;
    let Reg_sexo = document.querySelector("#sexoMSCT").value;
    let Reg_cumpleaños = document.querySelector("#cumpleañosMSCT").value;
    let Reg_url1 = document.querySelector("#url1MSCT").value;
    let Reg_url2 = document.querySelector("#url2MSCT").value;
    let Reg_url3 = document.querySelector("#url3MSCT").value;
    let Reg = {
        "id_mascota": IndiceEditar,
        "especie": Reg_especie, 
        "nombre": Reg_nombre,
        "descripcion": Reg_descripcion,
        "sexo": Reg_sexo,
        "cumpleaños": Reg_cumpleaños,
        "url1": Reg_url1,
        "url2": Reg_url2,
        "url3": Reg_url3,
        "ubicacion": ubicacion
    }
    let regJson = JSON.stringify(Reg);
    let x = await fetch("/api/mascotasEditar", {
      method: "PUT",
      headers: {
        "Content-Type": 'application/json',
        "x-user-token": localStorage.token_usr
      },
      body: regJson
    })
  
    if (x.status == 200) {
      alert("Mascota actualizada correctamente")
      location.reload();
    } else {
      console.log(x.status);
    }
  }

async function ObtenerUsuario() {
    usr = await fetch("/api/users", {
        method: "GET",
        headers: {
            "Content-Type": 'application/json',
            "x-user-token": localStorage.token_usr
        }
    })
    let usr_JSON = await usr.json()
    ubicacion = usr_JSON.ubicacion
    let HTML_Usuario = `<p align="right"><a href="Configuración.html">Editar</a></p>
<img class ="imagen_perfil" src="${usr_JSON.url}" alt="">
<div class="carta-perfil-body">
    <h4 class="card-title">${usr_JSON.nombre}</h4>
    <hr>
    <i class="fa fa-paw" aria-hidden="true"></i> ${usr_JSON.acomodos} mascotas añadidas
    <hr>
    <i class="fa fa-envelope" aria-hidden="true"></i> ${usr_JSON.correo}
    <hr>
    <i class="fa fa-phone" aria-hidden="true"></i> ${usr_JSON.telefono}
    <hr>
    <i class="fa fa-map-marker" aria-hidden="true"></i> ${usr_JSON.ubicacion}
</div>`
    document.getElementById("carta_perfil").innerHTML += HTML_Usuario
}

async function obtenerMascota() {
    msct = await fetch("/api/mascotas", {
        method: "GET",
        headers: {
            "Content-Type": 'application/json',
            "x-user-token": localStorage.token_usr
        }
    })
    let x = await msct.json();
    x.forEach((elemento) => {
            let HTML_Mascota
            if (elemento.nombre == undefined) {
                HTML_Mascota = `<h6 align="center">Todavia no tienes mascotas</h6>`
            } else {
                let sexo
                if(elemento.sexo == "H"){
                    sexo = "Hembra"
                }else{
                    sexo ="Macho"
                }
                HTML_Mascota =

                    `      
                    <div class="card" id="carta_mascota"> 
    <div class="carrusel_padre">
    <div id="carouselId${elemento.id_mascota}" class="carousel slide" data-ride="carousel" >
        <ol class="carousel-indicators">
            <li data-target="#carouselId${elemento.id_mascota}" data-slide-to="0" class="active"></li>
            <li data-target="#carouselId${elemento.id_mascota}" data-slide-to="1"></li>
            <li data-target="#carouselId${elemento.id_mascota}" data-slide-to="2"></li>
        </ol>
        <div class="carousel-inner" role="listbox">
            <div class="carousel-item active">
                <img class="imagen_carta" src="${elemento.url1}">
            </div>
            <div class="carousel-item">
                <img class="imagen_carta" src="${elemento.url2}" >
            </div>
            <div class="carousel-item">
                <img class="imagen_carta" src="${elemento.url3}">
            </div>
        </div>
    </div>
    </div>
    <div class="card-body">
    <h4 class="card-title" id="nombre" >${elemento.nombre}</h4>
    <hr>
    <i class="fa fa-info-circle" aria-hidden="true" id="descripcion"></i>${elemento.descripcion}
    <hr>
    <i class="fa fa-venus-mars" aria-hidden="true" ></i> ${sexo}
    <hr>
    <i class="fa fa-birthday-cake" aria-hidden="true"></i> ${elemento.cumpleaños}
    <hr>
    <i class="fa fa-map-marker" aria-hidden="true"></i> ${elemento.ubicacion}
    <hr>
    <div style="float: left;">
    <buttontype="button" class="btn btn-success btn-circle" id="btnGuardar" data-toggle="modal" data-target="#model4" onclick="EditarMascota(${elemento.id_mascota})"><i class="fa fa-wrench "></i></button>
    </div>
    <p align="right"><buttontype="button" class="btn btn-danger btn-circle" data-toggle="modal" data-target="#modalEliminar" onclick="ValorEliminar(${elemento.id_mascota})"><i class="fa fa-trash"></i></button>
    </p>
    </div>
    </div>
    </div>
    `
            }
            document.getElementById("insertarCartaMasc").innerHTML += HTML_Mascota
    });
}

let registro = document.querySelector("#submitM");
registro.addEventListener("click", CatchSubMasc);

//FUNCIÓNES DE REGISTRO DE MASCOTAS
async function CatchSubMasc(event) {
    event.preventDefault();
    let masc_nombre = document.querySelector("#nombreM").value;
    let masc_especie = document.querySelector("#especieM").value;
    let masc_descripcion = document.querySelector("#descripcionM").value;
    let masc_sexo = document.querySelector("#sexoM").value;
    let masc_cumpleaños = document.querySelector("#cumpleañosM").value;
    let masc_url1 = document.querySelector("#url1").value;
    let masc_url2 = document.querySelector("#url2").value;
    let masc_url3 = document.querySelector("#url3").value;
    let masc_registro = {

        "nombre": masc_nombre,
        "especie": masc_especie,
        "descripcion": masc_descripcion,
        "sexo": masc_sexo,
        "cumpleaños": masc_cumpleaños,
        "url1": masc_url1,
        "url2": masc_url2,
        "url3": masc_url3,
        "token_usr": localStorage.token_usr
    }
    let msc_JSON = JSON.stringify(masc_registro);
    let exitoso = await fetch("/api/mascotas", {
        method: "POST",
        headers: {
            "Content-Type": 'application/json',
            "x-user-token": localStorage.token_usr
        },
        body: msc_JSON,
    })
    if (exitoso.status == 201) {
        alert("Mascota Registrado Exitosamente")
        location.reload();
    } else {
        alert("ERROR")
    }


}
async function GETmasc() {
    let successMasc = await fetch("/registro_mascotas", {
        method: "GET",
        headers: {
            "Content-Type": 'application/json' ,
            "x-user-token": localStorage.token_usr
        }
    })

    let x = await successMasc.json()


    x.forEach((elemento) => {
        GETdata()
        async function GETdata() {
            let datosMasc = await fetch("/registro_mascotas" + [0], {
                method: "GET",
                headers: {
                    "Content-Type": 'application/json'
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
                </>
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
function ValorEliminar(indice) {
    IndiceEliminar = indice.toString()
}
async function EliminarMascota() {
    event.preventDefault()
    let xhr = new XMLHttpRequest();
    xhr.open('DELETE', "/api/mascotas");
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('x-user-token', localStorage.token_usr);
    xhr.send([JSON.stringify({"i":IndiceEliminar})]);
    xhr.onload = function () {
        if (xhr.status == 200) { 
            location.reload();
        } else {
            console.log(JSON.parse(xhr.response));   
        }
    }
}

//MODAL DE ELIMINAR MASCOTA
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

//MODAL DE EDITAR MASCOTA
let HTML_ModalEditar=`   <div class="modal fade" id="model4" tabindex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
<div class="modal-dialog" role="document">
    <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title">Editar Mascota</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
        </div>
        <div class="modal-body">
            <div class="form-group form">
                <label for="especie">Especie</label>
                <div class="input-group"></div>
                <div class= "input-group-prepend">
                    <span class="input-group-text" id="basic-addon1"> <i class="fas fa-bug"></i></span>
                    <select class="custom-select" id="especieMSCT">
                        <option value="1">Perro</option>
                        <option value="2">Gato</option>
                        <option value="3">Ave</option>
                        <option value="4">Reptil</option>
                        <option value="5">Roedor</option>
                        <option value="6">Arácnido</option>
                        <option value="7">Pez</option>
                    </select>
                </div>
            </div>
            <div class="form-group form">
            <label for="Nombre">Nombre</label>
            <div class="input-group">
                <div class= "input-group-prepend">
                    <span class="input-group-text" id="basic-addon1"> <i class="fas fa-paw"></i></span>
                </div>
            <input type="text" name="Nombre" id="nombreMSCT" class="form-control" placeholder="Nombre de tu mascota" aria-describedby="helpId">
            </div>
            </div>
            <div class="form-group form">
                <label for="Descripción">Descripción</label>
                <div class="input-group">
                <div class= "input-group-prepend">
                    <span class="input-group-text" id="basic-addon1"> <i class="fas fa-info-circle"></i></span>
                </div>
            <input type="text" name="Descripción" id="descripcionMSCT" class="form-control" placeholder="Gustos, personalidad..." aria-describedby="helpId">
                </div>
            </div>
            <div class="form-group form">
                    <label for="Sexo">Sexo</label>
                    <div class="input-group"></div>
                    <div class= "input-group-prepend">
                        <span class="input-group-text" id="basic-addon1"> <i class="fas fa-venus-mars"></i></span>
                        <select class="custom-select" id="sexoMSCT">
                            <option value="M"> Macho</option>
                            <option value="H">Hembra</option>
                        </select>
                    </div>
            </div>
            <div class="form-group form">
                <label for="Cumpleaños">Cumpleaños</label>
                <div class="input-group">
                <div class= "input-group-prepend">
                    <span class="input-group-text" id="basic-addon1"> <i class="fas fa-birthday-cake"></i></span>
                </div>
            <input type="date" name="Cumpleaños" id="cumpleañosMSCT" class="form-control" aria-describedby="helpId">
                </div>
            </div>
            <div class="form-group form">
                <label for="Cumpleaños">Imágenes</label>
                <div class="input-group">
                    <div class= "input-group-prepend">
                        <span class="input-group-text" id="basic-addon1"> <i class="fas fa-camera"></i></span>
                </div>
                    <input type="text" name="url1" id="url1MSCT" class="form-control" aria-describedby="helpId">
                </div>
                <div class="input-group">
                    <div class= "input-group-prepend">
                        <span class="input-group-text" id="basic-addon1"> <i class="fas fa-camera"></i></span>
                </div>
                    <input type="text" name="url1" id="url2MSCT" class="form-control" aria-describedby="helpId">
                </div>
                <div class="input-group">
                    <div class= "input-group-prepend">
                        <span class="input-group-text" id="basic-addon1"> <i class="fas fa-camera"></i></span>
                </div>
                    <input type="text" name="url1" id="url3MSCT" class="form-control" aria-describedby="helpId">
                </div>
            </div>
            <hr>
            <button type="submit" class="btn btn-success" data-dismiss="modal" onclick="ActualizarMascota()">Confirmar</button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
        </div>
    </div>
</div>
</div>`
document.getElementById("modalEditarMascota").innerHTML = HTML_ModalEditar