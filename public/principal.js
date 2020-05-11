obtenerMascota()
let cont = 0
let msct_JSON
async function SolicitarAdopcion(){
    usr = await fetch("http://localhost:3000/api/users", {
        method: "GET",
        headers: {
            "Content-Type": 'application/json',
            "x-user-token": localStorage.token_usr
        }
    })
    let usr_JSON = await usr.json()
    msct_JSON.interesados.push(usr_JSON.id)

    let xhr = new XMLHttpRequest();
    xhr.open('PUT', "/api/mascotas");
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('x-user-token', localStorage.token_usr);
    xhr.send([JSON.stringify(msct_JSON)]);
    xhr.onload = function () {
        if (xhr.status == 201) { 
            cont ++
            alert("Se ha enviado la solicitud");
            obtenerMascota();
        } else {
            console.log(JSON.parse(xhr.response));   
        }
    }
}
// async function postFavs(){
//     //Actualizar usr
    
//         msct = await fetch("http://localhost:3000/api/mascotas",{
//         method: "GET",
//         headers: {"Content-Type": 'application/json'
//                 // "x-auth": localStorage.token,
//                 // "x-user-token": localStorage.token_usr 
//             }
//     })
//     let msct_JSON = await msct.json()
//         let masc_registro = {
//                                 "nombre":msct_JSON.nombre,
//                                 "especie":msct_JSON.especie,
//                                 "descripcion":msct_JSON.descripcion,
//                                 "sexo":msct_JSON.sexo,
//                                 "cumpleaños":msct_JSON.cumpleaños,
//                                 "id":1,
//                                 "url1":"https://www.24petwatch.com/Portals/24petwatchv2/EasyDNNnews/302/title-img.png",
//                                 "url2":"https://www.24petwatch.com/Portals/24petwatchv2/EasyDNNnews/297/holiday-food-safety-header-img-300x300-2.png",
//                                 "url3":"https://img.clipartlook.com/cute-dog-clipart-clipart-panda-free-clipart-images-clip-art-pets-300_300.jpg" 
//         }
//     let regJson = JSON.stringify(masc_registro);
//     await fetch("http://localhost:3000/favoritos",{
//         method:"POST",
//         headers:{"Content-Type": 'application/json'
//         //,
//         // "x-auth": localStorage.token,
//         // "x-user-token": localStorage.token_usr 
//         },
//         body: regJson
//     })
//     obtenerMascota()
//     }

async function obtenerMascota(){
    msct = await fetch("http://localhost:3000/api/CatalogoMascotas",{
    method: "GET",
    headers: {"Content-Type": 'application/json',
            "x-user-token": localStorage.token_usr 
        }
})
let arreglo_Msct = await msct.json()
if(cont+1 > arreglo_Msct.length){
    HTML_Mascota =`<h4>Ya no hay krnal</h4>`
    document.getElementById("carta_mascota").innerHTML = HTML_Mascota
}else{
    msct_JSON = arreglo_Msct[cont]
    HTML_Mascota= `
        <!-- Carrusel mascotas -->
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
            <h4 class="card-title">${msct_JSON.nombre}</h4>
            <hr>
            <i class="fa fa-info-circle" aria-hidden="true"></i> ${msct_JSON.descripcion}
            <hr>
            <i class="fa fa-venus-mars" aria-hidden="true"></i> ${msct_JSON.sexo}
            <hr>
            <i class="fa fa-birthday-cake" aria-hidden="true"></i> ${msct_JSON.cumpleaños}
            <hr>
        <i class="fa fa-map-marker" aria-hidden="true"></i> ${msct_JSON.ubicacion}
        </div>`
    }
document.getElementById("carta_mascota").innerHTML = HTML_Mascota
}
