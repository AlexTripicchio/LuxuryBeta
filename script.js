/* ==============================
   FUNCIONES DE MENÚ Y CART
============================== */

// Función para mostrar/ocultar el menú principal
function toggleMenu() {
    const menu = document.getElementById("menu");
    menu.classList.toggle("show");
  }
  
  // Función para mostrar/ocultar el carrito (usada en el botón de cerrar)
  function toggleCart() {
    let cart = document.getElementById("cart-menu");
    if (cart.style.display === "block") {
      cart.style.display = "none";
    } else {
      cart.style.display = "block";
    }
  }
  
  /* ==============================
     FUNCIONES PARA ACTUALIZAR EL CARRITO
  ============================== */
  
  /* ==============================
   FUNCIONES PARA ACTUALIZAR EL CARRITO
============================== */

// Función para cambiar la cantidad de un ítem en el carrito
function changeQuantity(action, id) {
  let quantitySpan = document.getElementById("quantity-" + id);
  let priceSpan = document.getElementById("price-" + id);
  let cartItem = document.getElementById("cart-item-" + id);
  let price = parseInt(cartItem.getAttribute("data-price"));
  
  let quantity = parseInt(quantitySpan.innerText);
  if (action === "increase") {
    quantity++;
  } else if (action === "decrease" && quantity > 1) {
    quantity--;
  }

  quantitySpan.innerText = quantity;
  priceSpan.innerText = "$" + (quantity * price).toLocaleString();
  updateTotal();
}

// Función para actualizar el total del carrito
function updateTotal() {
  let total = 0;
  document.querySelectorAll(".cart-item").forEach(item => {
    let quantity = parseInt(item.querySelector("span[id^='quantity-']").innerText);
    let price = parseInt(item.getAttribute("data-price"));
    total += quantity * price;
  });
  document.getElementById("total-price").innerText = "$" + total.toLocaleString();
}

// Función para agregar un producto al carrito
function addtocart(button, productId) {
  // Obtener datos del producto desde el catálogo
  const carouselItem = button.closest('.carousel-item');
  const imgSrc = carouselItem.querySelector('.img-container img').src;
  const productTitle = carouselItem.querySelector('.product-title').innerText;
  const priceText = carouselItem.querySelector('.price').innerText;
  const price = parseInt(priceText.replace('$','').replace(',', ''));
  const quantityInput = carouselItem.querySelector('.quantity-add input');
  const quantity = parseInt(quantityInput.value);

  let cartItemsContainer = document.getElementById('cart-items');
  
  // Verificar si el producto ya existe en el carrito
  let existingItem = document.getElementById("cart-item-" + productId);
  if(existingItem) {
    // Actualizar cantidad y precio del producto existente
    let quantitySpan = document.getElementById("quantity-" + productId);
    let currentQuantity = parseInt(quantitySpan.innerText);
    let newQuantity = currentQuantity + quantity;
    quantitySpan.innerText = newQuantity;
    let priceElement = document.getElementById("price-" + productId);
    priceElement.innerText = "$" + (newQuantity * price).toLocaleString();
  } else {
    // Crear un nuevo elemento para el carrito
    let newCartItem = document.createElement('div');
    newCartItem.classList.add('cart-item');
    newCartItem.setAttribute('data-price', price);
    newCartItem.id = "cart-item-" + productId;

    newCartItem.innerHTML = `
      <img src="${imgSrc}" alt="Producto">
      <div class="item-details">
        <h4>${productTitle}</h4>
        <div class="quantity-controls">
          <button onclick="changeQuantity('decrease', ${productId})">-</button>
          <span id="quantity-${productId}">${quantity}</span>
          <button onclick="changeQuantity('increase', ${productId})">+</button>
        </div>
        <p class="item-price" id="price-${productId}">$${(price * quantity).toLocaleString()}</p>
      </div>
      <button class="remove-item" onclick="removeItem(${productId})">✕</button>
    `;

    cartItemsContainer.appendChild(newCartItem);
  }

  // Actualizar contador de carrito
  let cartCountSpan = document.getElementById('cart-count');
  let currentCount = parseInt(cartCountSpan.innerText);
  cartCountSpan.innerText = currentCount + quantity;

  updateTotal();
}

// Función para remover un producto del carrito
function removeItem(id) {
  let cartItem = document.getElementById("cart-item-" + id);
  if(cartItem) {
    // Restar la cantidad del producto removido del contador
    let quantitySpan = document.getElementById("quantity-" + id);
    let quantity = parseInt(quantitySpan.innerText);
    let cartCountSpan = document.getElementById('cart-count');
    let currentCount = parseInt(cartCountSpan.innerText);
    cartCountSpan.innerText = currentCount - quantity;

    // Eliminar el elemento del carrito
    cartItem.remove();
    updateTotal();
  }
}

// Función para alternar la visualización del menú del carrito
function toggleCartMenu() {
  const cartMenu = document.getElementById('cart-menu');
  // Alternar la visibilidad
  if(cartMenu.hasAttribute('hidden')){
    cartMenu.removeAttribute('hidden');
  } else {
    cartMenu.setAttribute('hidden', true);
  }
}

// Función para cerrar el carrito (similar a toggle)
function toggleCart() {
  const cartMenu = document.getElementById('cart-menu');
  cartMenu.setAttribute('hidden', true);
}

/* ==============================
   EVENTOS PARA ICONOS DEL CARRITO Y USUARIO
============================== */
let isCartOpen = false;
let isUserMenuOpen = false;

document.querySelector(".cart-icon").addEventListener("click", function() {
  isCartOpen = !isCartOpen;
  document.getElementById('cart-menu').style.display = isCartOpen ? 'block' : 'none';
});

document.querySelector(".user-icon")?.addEventListener("click", function() {
  // Si el carrito está abierto, lo cierra
  if (isCartOpen) {
    toggleCart();
  }
  isUserMenuOpen = !isUserMenuOpen;
  document.querySelector('.close-button').style.display = isUserMenuOpen ? 'block' : 'none';
});

// Función para cerrar el carrito
function closeCart() {
  isCartOpen = false;
  document.querySelector('.close-button').style.display = 'none';
}

// Función para cerrar el carrito (utilizada en el icono de usuario)
function toggleCart() {
  isCartOpen = false;
  document.getElementById('cart-menu').style.display = 'none';
}

// Función alternativa para el menú móvil (si se utiliza)
function toggleMobileMenu() {
  document.getElementById("main-nav").querySelector("ul").classList.toggle("show");
}
  
  /* ==============================
     INICIALIZACIÓN DEL CATÁLOGO AL CARGAR LA PÁGINA
  ============================== */
  document.addEventListener("DOMContentLoaded", function() {
    let catalogos = document.querySelectorAll(".carousel");
    let primerCatalogo = catalogos[0];
  
    // Activa el primer catálogo al cargar
    if (primerCatalogo) {
      primerCatalogo.classList.add("activo");
      primerCatalogo.style.display = "flex";
    }
  });
  
  /* ==============================
     FUNCIONES DEL CATÁLOGO DE PRODUCTOS
  ============================== */
  
  // Muestra el catálogo seleccionado y oculta los demás
  function showCatalog(catalogId) {
    let catalogos = document.querySelectorAll(".carousel");
  
    catalogos.forEach(cat => {
      cat.classList.remove("activo");
      cat.style.display = "none";
    });
  
    let catalogoSeleccionado = document.getElementById(catalogId);
    if (catalogoSeleccionado) {
      catalogoSeleccionado.style.display = "flex";
      setTimeout(() => {
        catalogoSeleccionado.classList.add("activo");
      }, 10);
    }

    
  }
  
  /* ==============================
     EVENTOS PARA NAVEGACIÓN DEL CARRUSEL
  ============================== */
  
  // Navegación mediante botones con la clase "carousel-button" (si existen)
  document.querySelectorAll(".carousel-button").forEach(button => {
    button.addEventListener("click", function () {
      let direction = this.getAttribute("data-direction");
      let carousel = this.closest(".catalog").querySelector(".carousel");
      let scrollAmount = carousel.offsetWidth; // Se mueve el ancho completo
  
      if (direction === "next") {
        carousel.scrollLeft += scrollAmount;
      } else {
        carousel.scrollLeft -= scrollAmount;
      }
    });
  });
  
  // // Navegación del carrusel utilizando botones "prev" y "next"
  // const carousel = document.querySelector('.carousel');
  // const prevBtn = document.querySelector('.prev');
  // const nextBtn = document.querySelector('.next');
  // let scrollAmount = 0;
  // let scrollPerClick = 260; // Ajusta según el ancho de tu tarjeta
  
  // prevBtn.addEventListener('click', () => {
  //   scrollAmount -= scrollPerClick;
  //   if (scrollAmount < 0) scrollAmount = 0;
  //   carousel.scrollTo({ left: scrollAmount, behavior: 'smooth' });
  // });
  
  // nextBtn.addEventListener('click', () => {
  //   scrollAmount += scrollPerClick;
  //   // Opcional: limitar scrollAmount si se desea que no se pase del final
  //   carousel.scrollTo({ left: scrollAmount, behavior: 'smooth' });
  // });
  // document.querySelectorAll('.carousel').forEach(carousel => {
  //   let scrollAmount = 0;
  //   const scrollPerClick = 260; // Ajusta según el ancho de tu tarjeta
  //   const prevBtn = carousel.querySelector('.prev');
  //   const nextBtn = carousel.querySelector('.next');
    
  //   prevBtn.addEventListener('click', () => {
  //     scrollAmount -= scrollPerClick;
  //     if (scrollAmount < 0) scrollAmount = 0;
  //     carousel.scrollTo({ left: scrollAmount, behavior: 'smooth' });
  //   });
    
  //   nextBtn.addEventListener('click', () => {
  //     scrollAmount += scrollPerClick;
  //     carousel.scrollTo({ left: scrollAmount, behavior: 'smooth' });
  //   });
  // });



 // Script para el Modal de Autenticación -->

    document.addEventListener("DOMContentLoaded", function () {
      const modal = document.getElementById("auth-modal");
      const loginRegisterBtn = document.getElementById("login-register");
      const closeModal = document.getElementById("close-modal");
      const showLoginBtn = document.getElementById("show-login");
      const showRegisterBtn = document.getElementById("show-register");
      const loginFormDiv = document.getElementById("login-form");
      const registerFormDiv = document.getElementById("register-form");
      const loginForm = document.getElementById("loginForm");
      const registerForm = document.getElementById("registerForm");

      // Abrir modal al hacer click en "Iniciar Sesión / Registro"
      loginRegisterBtn.addEventListener("click", () => {
        modal.style.display = "block";
      });

      // Cerrar modal al pulsar el botón de cerrar
      closeModal.addEventListener("click", () => {
        modal.style.display = "none";
      });

      // Cambiar entre Login y Registro
      showLoginBtn.addEventListener("click", () => {
        loginFormDiv.style.display = "block";
        registerFormDiv.style.display = "none";
        showLoginBtn.classList.add("active");
        showRegisterBtn.classList.remove("active");
      });

      showRegisterBtn.addEventListener("click", () => {
        loginFormDiv.style.display = "none";
        registerFormDiv.style.display = "block";
        showRegisterBtn.classList.add("active");
        showLoginBtn.classList.remove("active");
      });

      // Manejo del formulario de inicio de sesión
      loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = document.getElementById("login-email").value;
        const password = document.getElementById("login-password").value;
        // Se simula la validación de usuario (en un caso real, se consultaría a un servidor)
        let users = JSON.parse(localStorage.getItem("users")) || [];
        const user = users.find((u) => u.email === email && u.password === password);
        if (user) {
          alert("Inicio de sesión exitoso!");
          modal.style.display = "none";
        } else {
          alert("Credenciales incorrectas.");
        }
      });

      // Manejo del formulario de registro
      registerForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = document.getElementById("register-email").value;
        const password = document.getElementById("register-password").value;
        const confirmPassword = document.getElementById("register-confirm-password").value;
        if (password !== confirmPassword) {
          alert("Las contraseñas no coinciden.");
          return;
        }
        // Se guarda el nuevo usuario en localStorage (simulando guardar en un "documento" interno)
        let users = JSON.parse(localStorage.getItem("users")) || [];
        if (users.find((u) => u.email === email)) {
          alert("El correo ya está registrado.");
          return;
        }
        users.push({ email, password });
        localStorage.setItem("users", JSON.stringify(users));
        alert("Registro exitoso! Ahora puedes iniciar sesión.");
        // Se cambia a la pestaña de login
        showLoginBtn.click();
      });
    });


    // FINALIZAR COMPRA CARRITO
function finalizarCompra() {

    const precioFinal = document.getElementById("total-price").innerText; // Cambia esto por el valor real del carrito
    const productos = document.getElementById("cart-items").innerHTML;

    // Guardar los datos en localStorage
    localStorage.setItem("precioFinal", precioFinal);
    localStorage.setItem("productos", productos);

    // Redirigir a la página de pago
    window.location.href = "finalizar-compra.html";

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
