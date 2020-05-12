obtenerMascota()

async function obtenerMascota() {
    msct = await fetch("http://localhost:3000/api/mascotas", {
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
                HTML_Mascota =

                `
                <li>
                <div type="button" onclick="infoClickMascotas()">
                <div class="d-flex bd-highlight">
                    <div class="img_cont">
                        <img src="${elemento.url1}}" class="rounded-circle user_img">
                        <span class="online_icon"></span>
                    </div>
                    <div class="user_info">
                        <span>${elemento.nombre}</span>
                    </div>
                </div>
                </div>
                </li>`
            }
            document.getElementById("TusMascotas").innerHTML += HTML_Mascota
    });
}
// async function obtenerMascota(){
//     msct = await fetch("http://localhost:3000/api/mascotas",{
//     method: "GET",
//     headers: {"Content-Type": 'application/json',
//             // "x-auth": localStorage.token,
//             "x-user-token": localStorage.token_usr 
//         }
// })
// let msct_JSON = await msct.json()
// console.log(msct_JSON);
// let HTML_Mascota = 

// `
// <li>
// <div type="button" onclick="infoClickMascotas()">
// <div class="d-flex bd-highlight">
//     <div class="img_cont">
//         <img src="${elemento.url1}}" class="rounded-circle user_img">
//         <span class="online_icon"></span>
//     </div>
//     <div class="user_info">
//         <span>${elemento.nombre}</span>
//     </div>
// </div>
// </div>
// </li>`
//    document.getElementById("TusMascotas").innerHTML += HTML_Mascota
// }

// async function infoClickMascotas(){
//     msct = await fetch("http://localhost:3000/SolicitudUsr",{
//         method: "GET",
//         headers: {"Content-Type": 'application/json'
//                 // "x-auth": localStorage.token,
//                 // "x-user-token": localStorage.token_usr 
//             }
//     })
//     let msct_JSON = await msct.json()
//     let HTML_info = 
    
//     `
//                             <li>
// 								<div class="d-flex bd-highlight">
// 									<div class="img_cont">
// 										<img src="${msct_JSON.url}" class="rounded-circle user_img">
// 										<span class="online_icon"></span>
// 									</div>
// 									<table cellpadding="10">
// 									<tr>
// 										<td><h4 class="card-title">${msct_JSON.nombre}</h4>
// 											</td>
// 										<td><i class="fa fa-envelope" aria-hidden="true"></i> ${msct_JSON.correo}
// 											</td>
// 									</tr>
// 									<tr>
// 										<td><i class="fa fa-phone" aria-hidden="true"></i> ${msct_JSON.telefono}
// 											</td>
// 										<td><i class="fa fa-map-marker" aria-hidden="true"></i> ${msct_JSON.ubicacion}</td>
// 									</tr>
// 								</div>
// 								</li>
// `
//        document.getElementById("infoDisplay").innerHTML = HTML_info
// }
// async function infoClickSolicitud(){
//     usr = await fetch("http://localhost:3000/SolicitudUsr",{
//     method: "GET",
//     headers: {"Content-Type": 'application/json'
//             // "x-auth": localStorage.token,
//             // "x-user-token": localStorage.token_usr 
//         }
// })
// let usr_JSON = await usr.json()
// let HTML_Usuario =
// `
// <img class ="imagen_perfil" src="${usr_JSON.url}" alt="">
// <div class="carta-perfil-body">
//     <h4 class="card-title">${usr_JSON.nombre}</h4>
//     <hr>
//     <i class="fa fa-handshake" aria-hidden="true"></i> ${usr_JSON.acomodos} acomodos exitosos
//     <hr>
//     <i class="fa fa-envelope" aria-hidden="true"></i> ${usr_JSON.correo}
//     <hr>
//     <i class="fa fa-phone" aria-hidden="true"></i> ${usr_JSON.telefono}
//     <hr>
//     <i class="fa fa-map-marker" aria-hidden="true"></i> ${usr_JSON.ubicacion}
// </div>`
//    document.getElementById("infoDisplay").innerHTML = HTML_Usuario
// }
