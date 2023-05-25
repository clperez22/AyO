let apiUrl = " https://api.thecatapi.com/v1/images/search" 
async function actualizarGato(api){

    let obtenerGato = await fetch(api); 

    let dato = await obtenerGato.json(); 
    buscar_dato(dato);
}
    actualizarGato(apiUrl);

function buscar_dato(dato){
    let url = dato[0].url;
        
        let caja = document.querySelector(".imgin");
        dato.forEach(element => {
       let div = document.createElement("div");
        div.innerHTML = `<img class="imagenn" src="${element.url}">`;
        caja.appendChild(div);
    });
}
