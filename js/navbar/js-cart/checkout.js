function goToHome() {
    window.location.href = "index.html"; // Redireccionar al inicio
}

function showSection(step) {
    // Ocultar todas las secciones
    document.getElementById("section-1").style.display = "none";
    document.getElementById("section-2").style.display = "none";
    document.getElementById("section-3").style.display = "none";

    // Mostrar la sección seleccionada
    document.getElementById("section-" + step).style.display = "block";

    // Actualizar el estado del paso en el breadcrumb
    document.querySelectorAll(".step").forEach((el, index) => {
        if (index + 1 === step) {
            el.classList.add("active");
        } else {
            el.classList.remove("active");
        }
    });
}

// Inicializar el primer paso activo
document.addEventListener("DOMContentLoaded", () => {
    showSection(1); // Comienza mostrando el paso 1
});
function showSection(step) {
    // Ocultar todas las secciones
    document.querySelectorAll("#section-1, #section-2, #section-3").forEach(section => {
        section.classList.remove("active");
    });

    // Mostrar solo la sección seleccionada
    document.getElementById("section-" + step).classList.add("active");

    // Actualizar el estado de los pasos
    document.querySelectorAll(".step").forEach((el, index) => {
        el.classList.toggle("active", index + 1 === step);
    });
}


function showSection(step) {
    // Ocultar todas las secciones
    document.getElementById("section-1").style.display = "none";
    document.getElementById("section-2").style.display = "none";
    document.getElementById("section-3").style.display = "none";

    // Mostrar la sección seleccionada
    document.getElementById("section-" + step).style.display = "block";

    // Actualizar el estado del paso en el breadcrumb
    document.querySelectorAll(".step").forEach((el, index) => {
        el.classList.toggle("active", index + 1 === step);
    });
}

function submitOrder() {
    alert("Compra finalizada. ¡Gracias por tu compra!");
    window.location.href = "index.html"; // Redireccionar al inicio
}



function showTransferDetails() {
document.getElementById("transfer-details").style.display = "block";
}

function hideTransferDetails() {
document.getElementById("transfer-details").style.display = "none";
}

function previewImage(event) {
const previewContainer = document.getElementById("preview-container");
previewContainer.innerHTML = ""; // Limpia la vista previa actual

const file = event.target.files[0];
if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
        const imgPreview = document.createElement("img");
        imgPreview.src = e.target.result;
        imgPreview.alt = "Vista previa de la captura";
        imgPreview.style.maxWidth = "100%";
        imgPreview.style.marginTop = "10px";
        previewContainer.appendChild(imgPreview);
    };
    reader.readAsDataURL(file);
}
}

function submitOrder() {
    // Recopilar datos del formulario de checkout
    const orderData = {
      customer: {
        email: document.getElementById('email').value,
        nombre: document.getElementById('nombre').value,
        apellido: document.getElementById('apellido').value,
        // Agrega los demás campos según tu formulario
        direccion: document.getElementById('direccion').value,
        ciudad: document.getElementById('ciudad').value,
        provincia: document.getElementById('provincia').value,
        codigoPostal: document.getElementById('codigo-postal').value,
        dni: document.getElementById('dni').value,
      //  producto: document.getElementById('product-title').value,
     //   precio: document.getElementById('price').value
      },
      // Recuperar los productos del carrito almacenado en localStorage
      cart: JSON.parse(localStorage.getItem('cart')) || []
    };
  
    // Enviar los datos al script PHP (por ejemplo, "save_order.php")
    fetch('save_order.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData)
    })
    .then(response => response.json())
    .then(data => {
      if (data.status === 'success') {
        alert("Compra finalizada. ¡Gracias por tu compra!");
        // Limpiar el carrito
        localStorage.removeItem('cart');
        // Redirigir a una página de confirmación, si lo deseas
        window.location.href = "order_confirmation.html";
      } else {
        alert("Hubo un error al procesar la orden. Inténtalo nuevamente.");
      }
    })
    .catch(error => console.error("Error:", error));
  }
function submitOrder() {
  // Recopila la información del cliente (asegúrate de que los IDs coincidan con tus campos)
  const orderData = {
    customer: {
      email: document.getElementById('email').value,
      nombre: document.getElementById('nombre').value,
      apellido: document.getElementById('apellido').value,
      direccion: document.getElementById('direccion').value,
      ciudad: document.getElementById('ciudad').value,
      provincia: document.getElementById('provincia').value,
      codigoPostal: document.getElementById('codigo-postal').value,
      dni: document.getElementById('dni').value,
     // producto: document.getElementById('product-title').value,
    //precio: document.getElementById('total-price').value
    },
    // Recupera los productos del carrito almacenado en localStorage (o un array vacío)
    cart: JSON.parse(localStorage.getItem('cart')) || []
  };

  // --- Parte 1: Descargar archivo con la información ---
  const fileContent = JSON.stringify(orderData, null, 2);
  const blob = new Blob([fileContent], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const downloadLink = document.createElement('a');
  downloadLink.href = url;
  downloadLink.download = 'order.json';
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);

  // --- Parte 2: Enviar correo usando EmailJS ---
  emailjs.send("service_dwzmmm2", "template_v54i80e", {
      order_details: fileContent,
      to_email: "alexander.tripicchio@gmail.com"
    })
    .then(function(response) {
      console.log("SUCCESS", response.status, response.text);
      alert("Orden finalizada, se descargó el archivo y se envió el correo.");
      // Opcional: Limpiar el carrito
      localStorage.removeItem("cart");
      // Redirigir o realizar otra acción, si lo deseas.
    }, function(error) {
      console.error("FAILED", error);
      alert("Error al enviar el correo. Inténtalo nuevamente.");
    });
}

const precioFinal = localStorage.getItem("precioFinal");
const productosObtenidos = localStorage.getItem("productos")

// Insertarlo en la etiqueta <span>
document.getElementById("precio-recibido").innerText = precioFinal || "No disponible";

contenedorProductos = document.getElementById("cart-item")

contenedorProductos.innerHTML = productosObtenidos;
