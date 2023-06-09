/************** NAV SCROLL **************/
/**************************************/
window.addEventListener("scroll", () => {
  var header = document.querySelector(".navegador");
  header.classList.toggle("sticky", window.scrollY > 0);
});

/*************** NAV ***************/
/**************************************/
const navmenu = document.querySelector(".nav_menu");
const navlist = document.querySelector(".nav_list");
const btnVolver = document.querySelector(".btn_volver");
const dropdown = document.querySelector(".dropdown");
const cerrarNav = document.querySelector(".cerrarNav");

dropdown.addEventListener("click", () => {
  btnVolver.classList.add("btn_volver_active");
});

btnVolver.addEventListener("click", () => {
  btnVolver.classList.remove("btn_volver_active");
});

cerrarNav.addEventListener("click", () => {
  menuToggle.classList.remove("active");
  navlist.classList.remove("show_menu");
});

/*************** MENU BTN ***************/
/**************************************/
const menuToggle = document.querySelector(".toggle");
menuToggle.addEventListener("click", () => {
  menuToggle.classList.toggle("active");
  navmenu.classList.toggle("show_menu");
});

/************* CARRITO BOX *************/
/**************************************/
let shoppingCart = document.querySelector(".shopping-cart");
let tbody = document.querySelector(".tbody");
let carrito = [];

document.querySelector("#cart-btn").onclick = () => {
  shoppingCart.classList.toggle("active");
};

let btnCerrarCarrito = document.querySelector(".cerrarCarrito");
btnCerrarCarrito.addEventListener("click", () => {
  shoppingCart.classList.remove("active");
});

window.onscroll = () => {
  shoppingCart.classList.remove("active");
  menuToggle.classList.remove("active");
  navlist.classList.remove("show_menu");
};

function addItemCarrito(newItem) {
  const numCantidad = tbody.getElementsByClassName("cantidad");
  for (let i = 0; i < carrito.length; i++) {
    if (carrito[i].tittle.trim() === newItem.tittle.trim()) {
      carrito[i].cantidad++;
      const spanValue = numCantidad[i];
      spanValue.value++;
      carritoTotal();
      return null;
    }
  }
  carrito.push(newItem);
  renderCarrito();
}

/********Crear div en Mi Carrito de clase .tbody********/
function renderCarrito() {
  tbody.innerHTML = "";
  carrito.map((item) => {
    let div = document.createElement("div");
    div.classList.add("itemCarrito");
    let contenido = `
    <div class="box">
    <i class="fas fa-trash btn-eliminar-item"></i>
    <img src=${item.img} alt="" />
    <div class="contenido">
    <h3 class="tittle">${item.tittle}</h3>
    <span class="precio">${item.precio}</span>
    <input type="number" min="1" value=${item.cantidad} class="cantidad">
    </div>
    </div>
    `;
    div.innerHTML = contenido;
    tbody.append(div);
    div
      .querySelector(".btn-eliminar-item")
      .addEventListener("click", removeItemCarrito);
    div.querySelector(".cantidad").addEventListener("change", sumaCantidad);
  });
  carritoTotal();
}

function carritoTotal() {
  let total = 0;
  const itemTotal = document.querySelector(".total");
  carrito.forEach((item) => {
    const precio = Number(item.precio.replace("$", ""));
    total = total + precio * item.cantidad;
  });
  itemTotal.innerHTML = `Total : $${total}`;
}

/********Boton eliminar del carrito********/
function removeItemCarrito(e) {
  const btnEliminar = e.target;
  const div = btnEliminar.closest(".box");
  const tittle = div.querySelector(".tittle").textContent;
  for (let i = 0; i < carrito.length; i++) {
    if (carrito[i].tittle.trim() === tittle.trim()) {
      carrito.splice(i, 1);
    }
  }
  div.remove();
  carritoTotal();
}

/********Si editamos manualmente la cantidad desde el input********/
function sumaCantidad(e) {
  const sumaInput = e.target;
  const div = sumaInput.closest(".itemCarrito");
  const tittle = div.querySelector(".tittle").textContent;
  carrito.forEach((item) => {
    if (item.tittle.trim() === tittle) {
      sumaInput.value < 1 ? (sumaInput.value = 1) : sumaInput.value;
      item.cantidad = sumaInput.value;
      carritoTotal();
    }
  });
}

/************* BOTON VER MAS SUMINISTROS *************/
/****************************************************/
let verMas = document.querySelector(".btn_sum");
let verMenos = document.querySelector(".btn_sum_menos");
let suministrosBox = document.querySelectorAll(".suministros_box.ocultar");

verMas.addEventListener("click", () => {
  suministrosBox[0].classList.remove("ocultar");
  suministrosBox[1].classList.remove("ocultar");
  suministrosBox[2].classList.remove("ocultar");
  verMenos.classList.remove("ocultar");
  verMas.classList.add("ocultar");
});

verMenos.addEventListener("click", () => {
  suministrosBox[0].classList.add("ocultar");
  suministrosBox[1].classList.add("ocultar");
  suministrosBox[2].classList.add("ocultar");
  verMenos.classList.add("ocultar");
  verMas.classList.remove("ocultar");
});
