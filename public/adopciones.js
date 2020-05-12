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
                <div type="button" onclick="infoClickMascotas(${elemento.id_mascota})">
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
// 

async function infoClickMascotas(x){

    msct = await fetch("http://localhost:3000/api/UnaMascota",{
        method: "GET",
        headers: {"Content-Type": 'application/json',
                "x-user-token": localStorage.token_usr,
                "IdMascota": x 
            }
    })
    let interesados = await msct.json()
    console.log(interesados.interesados);
    let HTML_info = ``
    document.getElementById("infoDisplay").innerHTML = HTML_info
    interesados.interesados.forEach((elemento)=>{
        GetData()
        async function GetData(){
        msct = await fetch("http://localhost:3000/api/UnUsuario",{
        method: "GET",
        headers: {"Content-Type": 'application/json',
                "x-user-token": localStorage.token_usr,
                "IdUsuario": elemento
            }
           
    })
    let usr_JSON = await msct.json()
    console.log(usr_JSON);
    
     HTML_info =     
    `
                            <div style>
								<div class="d-flex bd-highlight">
									<div class="img_cont">
										<img src="${usr_JSON.url}" class="rounded-circle user_img">
										<span class="online_icon"></span>
									</div>
									<table cellpadding="10">
									<tr>
										<td><h4 class="card-title">${usr_JSON.nombre}</h4>
											</td>
										<td><i class="fa fa-envelope" aria-hidden="true"></i> ${usr_JSON.correo}
											</td>
									</tr>
									<tr>
										<td><i class="fa fa-phone" aria-hidden="true"></i> ${usr_JSON.telefono}
											</td>
										<td><i class="fa fa-map-marker" aria-hidden="true"></i> ${usr_JSON.ubicacion}</td>
									</tr>
                                </div>
                            </div>
								
`
       document.getElementById("infoDisplay").innerHTML += HTML_info
    }
})

    
}

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
