obtenerMascota()
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
   document.getElementById("carta_mascota").innerHTML += HTML_Mascota
}