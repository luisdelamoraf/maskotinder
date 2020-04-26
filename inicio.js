let forma = document.querySelector("#reg");


forma.addEventListener("change",()=>{
    let inputForma = document.querySelectorAll(":invalid");
    if(inputForma.length==0){
        if(document.querySelector("#RegPass1").value == document.querySelector("#RegPass2").value){
            document.querySelector("#btnRegistro").removeAttribute("disabled");
        }else{
            document.querySelector("#btnRegistro").setAttribute("disabled","");
        }
    }
});