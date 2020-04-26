console.log("hola mundo");
let FormReg = document.querySelector("#ModReg");
console.log(FormReg);


FormReg.addEventListener("onclick",()=>{
    console.log("inicio");
    let inputForma = document.querySelectorAll(":invalid");
    if(inputForma.length==0){
        if(document.querySelector("#RegPass1").value == document.querySelector("#RegPass2").value){
            console.log("jaló");
            document.querySelector("#btnRegistro").removeAttribute("disabled");
        }else{
            document.querySelector("#btnRegistro").setAttribute("disabled","");
            console.log("no jaló");
        }
    }
});