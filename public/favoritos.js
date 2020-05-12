obtenerFavoritos()
function alertLike(){
    alert("Se ha enviado la solicitud")
    location.reload()
}
async function obtenerFavoritos(){

    msct = await fetch("http://localhost:3000/api/mascotas",{
    method: "GET",
    headers: {"Content-Type": 'application/json',
            "x-user-token": localStorage.token_usr 
        }
})
let msct_JSON = await msct.json()
msct_JSON.forEach((elemento) => {
    let HTML_Mascota
    console.log(msct_JSON);
    if (elemento.nombre == undefined) {
        HTML_Mascota = `<h3 padding-left="">¡Ve a la pestaña principal para añadir favoritos!</h3>`
    }else{
     HTML_Mascota = `
    <button class="btn_fav" data-toggle="modal" data-target="#model${elemento.id_mascota}">
    <!-- Carta horizontal -->
    <div class="card_reduc">
        <!-- Carrusel mascotas -->
        <div class="carrusel_padre">
            <div id="carouselId${elemento.id_mascota}" class="carousel slide" data-ride="carousel" >
                <div class="carousel-inner">
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
    </div>
    </button>
    <!-- Modal 3 Añadir Mascota -->
        <div class="modal fade" id="model${elemento.id_mascota}" tabindex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true" >
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-body">
                    <!-- Carta -->
                    <div class="card_fav">
                        <!-- Carrusel mascotas -->
                        <div class="carrusel_padre">
                            <div id="carouselId${elemento.id_mascota}" class="carousel slide" data-ride="carousel" >
                                <div class="carousel-inner" >
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
                            <h4 class="card-title">${elemento.nombre}</h4>
                            <hr>
                            <i class="fa fa-info-circle" aria-hidden="true"></i> ${elemento.descripcion}
                            <hr>
                            <i class="fa fa-venus-mars" aria-hidden="true"></i> ${elemento.sexo}
                            <hr>
                            <i class="fa fa-birthday-cake" aria-hidden="true"></i>${elemento.cumpleaños}
                            <hr>
                        <i class="fa fa-map-marker" aria-hidden="true"></i> ${elemento.ubicacion}
                        </div>
                    </div>
                    </div>
                    <div class="botones_likes" style="padding-left: 60px; padding-bottom: 20px;">
                        <button id="btn_superlike" type="button" class="btn btn-info btn-circle btn-xl btn_superlike" title="Quitar de favoritos" onclick="elimFavs()"><i class="fa fa-minus-circle"></i>
                        </button>
                        <button id="btn_like" type="button" class="btn btn-success btn-circle btn-xl btn_like" title="Solicitar Adopción" onclick="alertLike()" ><i class="fa fa-heart"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `
}

   document.getElementById("favs").innerHTML += HTML_Mascota
})
}


async function elimFavs(){

        msct = await fetch(`http://localhost:3000/favoritos/1`,{
        method: "DELETE",
        headers: {"Content-Type": 'application/json'
                // "x-auth": localStorage.token,
                // "x-user-token": localStorage.token_usr 
            }
    })
    location.reload()
    }