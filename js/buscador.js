document.addEventListener("DOMContentLoaded", () => {
    
    const searchInput = document.getElementById("searchInput");
    const resultsDiv = document.getElementById("results");
    const carritoIcon = document.getElementById("carrito-icon");
    const carritoModal = document.getElementById("carrito-modal");
    const btnFinalizarCompra = document.getElementById("btnFinalizarCompra");
    const carritoContenido = document.getElementById("carrito-contenido");
    const carritoCloseButton = document.querySelector(".carrito-close");
  


    let carrito = []; // Carrito vacío
  
    function buscarProducto(termino) {
      termino = termino.trim().toLowerCase();
      return bases_completas.filter((producto) =>
        producto.nombre.toLowerCase().includes(termino)
      );
    }
  
    function mostrarResultados(resultados) {
      resultsDiv.innerHTML = "";
  
      if (resultados.length === 0) {
        resultsDiv.innerHTML = "<p>No se encontraron resultados.</p>";
        return;
      }
  
      resultados.forEach((producto) => {
        const productoDiv = document.createElement("div");
        productoDiv.classList.add("producto");
        productoDiv.innerHTML = `
          <div class="item_bus">
            <img src="${producto.img}" class="imagenes">
            <h3 class="nombredelproducto">${producto.nombre}</h3>
            <p class="nombredelprecio">${"Precio: " + producto.precio.toFixed(2)}</p>
            <p class="nombredelmarca">${producto.marca}</p>
          </div>
        `;
  
        productoDiv.addEventListener("click", () => {
          mostrarVentanaEmergente(producto);
        });
  
        resultsDiv.appendChild(productoDiv);
      });
    }
  
    function mostrarVentanaEmergente(producto) {
      const modal = document.getElementById("modal");
      modal.innerHTML = `
        <div class="modal-content">
          <span class="close">&times;</span>
          <img class="modal-img" src="${producto.img}" alt="Imagen del producto">
          <h3 class="modal-nombre">${producto.nombre}</h3>
          <p class="modal-descripcion">${producto.descripcion}</p>
          <p class="modal-precio">${"Precio: " + producto.precio.toFixed(2)}</p>
          <input type="number" min="1" value="1" id="cantidad">
          <button class="agregarCarrito" data-nombre="${producto.nombre}" data-precio="${producto.precio}">Agregar al carrito</button>
        </div>
      `;
  
      modal.style.display = "block";
  
      const closeButton = modal.querySelector(".close");
      closeButton.onclick = function () {
        modal.style.display = "none";
      };
  
      window.onclick = function (event) {
        if (event.target === modal) {
          modal.style.display = "none";
        }
      };
  
      const agregarAlCarritoButton = modal.querySelector(".agregarCarrito");
  agregarAlCarritoButton.addEventListener("click", () => {
    const cantidadInput = modal.querySelector("#cantidad");
    const cantidad = parseInt(cantidadInput.value);
    const nombre = agregarAlCarritoButton.dataset.nombre;
    const precio = parseFloat(agregarAlCarritoButton.dataset.precio); 
  
        const index = carrito.findIndex(
          (item) => item.nombre === nombre && item.precio === precio
        );
        if (index !== -1) {
          carrito[index].cantidad += cantidad;
        } else {
          carrito.push({ nombre, precio, cantidad });
        }
        alert(`Se agregó ${cantidad} unidad(es) de ${nombre} al carrito.`);
  
        const totalCompra = calcularTotalCarrito(carrito);
        const totalCompraElement = document.getElementById("carrito-total");
      
  
        mostrarVentanaCarrito();
      });
    }
  
    function calcularTotalCarrito(carrito) {
      let total = 0;
      carrito.forEach((producto) => {
        total += producto.precio * producto.cantidad;
      });
      return total;
    }
  
    function mostrarVentanaCarrito() {
      carritoContenido.innerHTML = "";
  
      let totalCompra = 0; // Inicializamos el total de la compra

  carrito.forEach((producto) => {
    const productoDiv = document.createElement("div");
    productoDiv.classList.add("carrito-producto");
    productoDiv.innerHTML = `
      <span class="nombre_car">${producto.nombre}</span>
      <span class="nombre_cantidad">Cantidad: ${producto.cantidad}</span>
      <span class="nombre_precio">Precio: $${producto.precio}</span>
    `;
    carritoContenido.appendChild(productoDiv);

    // Calculamos el subtotal (precio por cantidad) de cada producto y lo sumamos al total
    totalCompra += producto.precio * producto.cantidad;
  });

  const totalDiv = document.createElement("div");
  totalDiv.classList.add("carrito-total");
  totalDiv.innerHTML = `
    <h3>Total de la compra: $${totalCompra.toFixed(2)}</h3>
  `;
  carritoContenido.appendChild(totalDiv);
  
      // Botón para seguir comprando
      const continuarComprandoButton = document.createElement("button");
      continuarComprandoButton.innerText = "Seguir comprando";
      continuarComprandoButton.classList.add("continuarComprando");
      carritoContenido.appendChild(continuarComprandoButton);
  
      continuarComprandoButton.addEventListener("click", () => {
        carritoModal.style.display = "none";
      });
  
      // Botón para finalizar la compra
      const finalizarCompraButton = document.createElement("button");
      finalizarCompraButton.innerText = "Finalizar compra";
      finalizarCompraButton.classList.add("finalizarCompra");
      carritoContenido.appendChild(finalizarCompraButton);
  
      finalizarCompraButton.addEventListener("click", () => {
        mostrarVentanaFinalizarCompra(totalCompra);
      });
  
      carritoModal.style.display = "block";
  
      carritoCloseButton.onclick = function () {
        carritoModal.style.display = "none";
      };
  
      window.onclick = function (event) {
        if (event.target === carritoModal) {
          carritoModal.style.display = "none";
        }
      };
    }
    let ventanaEmergenteActual = null;

function mostrarVentanaFinalizarCompra(totalCompra) {
  if (ventanaEmergenteActual) {
    document.body.removeChild(ventanaEmergenteActual);
  }

  const ventanaEmergente = document.createElement("div");
  ventanaEmergente.classList.add("ventana-emergente");
  ventanaEmergente.innerHTML = `
    <div class="contenido-ventana-emergente">
      <span class="cerrar-ventana-emergente">&times;</span>
      <h2 class= "totaldelacompra">Total de la compra: $${totalCompra.toFixed(2)}</h2>
      <form id="formulario-pago">
        <!-- Aquí el formulario para confirmar el pago y el pedido -->
        <label class="nombrefor"for="nombre">Nombre:</label>
        <input type="text" id="nombre" required>
        <label class="nombrefor"for="tarjeta">Número de tarjeta:</label>
        <input type="text" id="tarjeta" required>
        <label class="nombrefor"for="direccion">Dirección de envío:</label>
        <input type="text" id="direccion" required>
        <button type="submit" class="confirmar-compra">Confirmar compra</button>
      </form>
    </div>
  `
  ventanaEmergenteActual = null;
  ;

  document.body.appendChild(ventanaEmergente);
  ventanaEmergenteActual = ventanaEmergente;

  const cerrarVentanaEmergente = ventanaEmergente.querySelector(".cerrar-ventana-emergente");
  cerrarVentanaEmergente.onclick = function () {
    document.body.removeChild(ventanaEmergente);
    ventanaEmergenteActual = null;
  };

  const formularioPago = ventanaEmergente.querySelector("#formulario-pago");
  formularioPago.addEventListener("submit", (e) => {
    e.preventDefault();
    const nombre = formularioPago.querySelector("#nombre").value;
    const tarjeta = formularioPago.querySelector("#tarjeta").value;
    const direccion = formularioPago.querySelector("#direccion").value;
    // Aquí puedes realizar el procesamiento del formulario y el pago
    // (enviar los datos a un servidor, etc.)
    alert(`Gracias por tu compra, ${nombre}! El pedido será enviado a la siguiente dirección: ${direccion}.`);
    carrito = []; // Vaciar el carrito después de confirmar la compra
    carritoModal.style.display = "none";
    document.body.removeChild(ventanaEmergente);
    ventanaEmergenteActual = null;
  });
}

// Agregar el siguiente código para cerrar la ventana emergente de la compra
document.addEventListener("click", (event) => {
  if (event.target.classList.contains("agregarCarrito") || event.target.classList.contains("cerrar-ventana-emergente")) {
    const ventanaEmergente = document.querySelector(".ventana-emergente");
    if (ventanaEmergente) {
      document.body.removeChild(ventanaEmergente);
      ventanaEmergenteActual = null;
    }
  }
});
    searchInput.addEventListener("input", () => {
      const searchTerm = searchInput.value;
      const resultados = buscarProducto(searchTerm);
      mostrarResultados(resultados);
    });
  
    searchInput.addEventListener("keyup", (e) => {
      if (e.key === "Backspace" || e.key === "Delete") {
        const searchTerm = searchInput.value;
        if (searchTerm === "") {
          resultsDiv.innerHTML = "";
        }
      }
    });
  
    carritoIcon.addEventListener("click", () => {
      mostrarVentanaCarrito();
    });
  
    btnFinalizarCompra.addEventListener("click", () => {
      const totalCompra = calcularTotalCarrito(carrito);
      mostrarVentanaFinalizarCompra(totalCompra);
    });

    
    const formularioCompra = document.getElementById("formulario-pago");
    formularioCompra.addEventListener("click", (event) => {
      event.stopPropagation(); // Evitar que el evento llegue al documento principal y cierre las ventanas
      const ventanaEmergente = document.querySelector(".ventana-emergente");
      if (ventanaEmergente && ventanaEmergente !== ventanaEmergenteActual) {
        document.body.removeChild(ventanaEmergente);
        ventanaEmergenteActual = null;
      }
    });
  });
