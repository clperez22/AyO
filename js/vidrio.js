import { tapas } from "./DVidrios.js";

function ola(){

    let cajita = document.querySelector(".tapaderas")
    
    tapas.forEach(element => {

        let gio = document.createElement("div")
        gio.classList.add("item")
        gio.innerHTML= `
        <img src= "${element["img"]}" class="imagenes_re">
            <p class="nombres"> <b>${element["nombre"]} </b></p>
            <p class="descripcion">${element["descripcion"]} </p>
            <p class="precios">${element["precio"]} </p>
            <p class="marcas">${element["marca"]} </p>

          
        `
        cajita.appendChild(gio)
    });
}
ola();