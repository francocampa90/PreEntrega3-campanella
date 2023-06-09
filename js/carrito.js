let productosEnCarrito = localStorage.getItem("productos-en-carrito");
productosEnCarrito = JSON.parse(productosEnCarrito);


//console.log(productosEnCarrito);

const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorCarritoProductos = document.querySelector("#carrito-productos");
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
const contenedorCarritoComprado = document.querySelector("#carrito-comprado");



//BOTONES DEL CARRITO
let botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");

let botonesSumar = document.querySelectorAll(".carrito-producto-sumar");
let botonesRestar = document.querySelectorAll(".carrito-producto-restar");



const botonVaciar = document.querySelector("#carrito-acciones-vaciar");
const contenedorTotal = document.querySelector("#total");
const botonComprar = document.querySelector("#carrito-acciones-comprar");


const numerito = document.querySelector("#numerito");








function cargarProductosCarrito(){

    if (productosEnCarrito && productosEnCarrito.length > 0) {

        contenedorCarritoVacio.classList.add("disabled");
        contenedorCarritoProductos.classList.remove("disabled");
        contenedorCarritoAcciones.classList.remove("disabled");
        contenedorCarritoComprado.classList.add("disabled");
    
        contenedorCarritoProductos.innerHTML = "";
    
        productosEnCarrito.forEach(producto => {
    
            const div = document.createElement("div");
            div.classList.add("carrito-producto");
            div.innerHTML= `
                        <img class="carrito-producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
                        
                        <div class="carrito-producto-titulo">
                            <small>titulo</small>
                            <h3>${producto.titulo}</h3>
                        </div>
                        <div class="carrito-producto-cantidad">
                            <small>Cantidad</small>
                            <p>${producto.cantidad}</p>
                        </div>
                        <div class="carrito-producto-precio">
                            <small>precio</small>
                            <p>$${producto.precio}</p>
                        </div>
                        <div class="carrito-producto-subtotal">
                            <small>Subtotal</small>
                            <p>$${producto.precio * producto.cantidad}</p>
                        </div>
                       
                        <button class="carrito-producto-restar" id="${producto.id}">Restar</button>
                        <button class="carrito-producto-sumar" id="${producto.id}">Sumar</button>
                        <button class="carrito-producto-eliminar" id="${producto.id}">Eliminar</button>
    
            `;
           
    
    
            contenedorCarritoProductos.append(div);
        })
    
        actualizarNumerito();
        actualizarBotonesEliminar();
        actualizarBotonesSumar();
        actualizarBotonesRestar();

        actualizarTotal();
        
        
    
        function actualizarNumerito(){
            let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
           // console.log(numerito);
            numerito.innerText = nuevoNumerito;
        }
    
    
    } else {
    
        contenedorCarritoVacio.classList.remove("disabled");
        contenedorCarritoProductos.classList.add("disabled");
        contenedorCarritoAcciones.classList.add("disabled");
        contenedorCarritoComprado.classList.add("disabled");
         
    }

}

cargarProductosCarrito();



//BOTON ELIMINAR
function  actualizarBotonesEliminar(){
    botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");

    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);
    });
}

//BOTON SUMAR
function  actualizarBotonesSumar(){
    botonesSumar = document.querySelectorAll(".carrito-producto-sumar");

    botonesSumar.forEach(boton => {
        boton.addEventListener("click", sumarDelCarrito);
    });
}

//BOTON RESTAR
function  actualizarBotonesRestar(){
    botonesRestar = document.querySelectorAll(".carrito-producto-restar");

    botonesRestar.forEach(boton => {
        boton.addEventListener("click", restarDelCarrito);
    });
}





function eliminarDelCarrito(e){
    const idBoton = e.currentTarget.id;
    //console.log(idBoton);
    //console.log(productoEliminado);

    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
    //console.log(productosEnCarrito);
    productosEnCarrito.splice(index,1);
    //console.log(productosEnCarrito);
    cargarProductosCarrito();

    localStorage.setItem("productos-en-carrito",JSON.stringify(productosEnCarrito));


    Toastify({
        text: "¡Listo! Eliminaste el producto!",
        duration: 2000,
        gravity: "bottom", // `top` or `bottom`
        position: "center", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #F35200, #F35200)",
          borderRadius: "0.5rem",
        },
        offset: {
            x: '2rem', // horizontal axis - can be a number or a string indicating unity. eg: '2em'
            y: '3rem' // vertical axis - can be a number or a string indicating unity. eg: '2em'
          },
        onClick: function(){} // Callback after click
      }).showToast();



}



function sumarDelCarrito(e){

    const idBoton = e.currentTarget.id;
    const productoSuma = productosEnCarrito.find(producto => producto.id === idBoton);
    
    productosEnCarrito.some(producto => producto.id === idBoton)
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
    
    productosEnCarrito[index].cantidad++;
    cargarProductosCarrito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}




function restarDelCarrito(e){

    const idBoton = e.currentTarget.id;
   // console.log(idBoton);  // id
    const productoResta = productosEnCarrito.find(producto => producto.id === idBoton);
    //console.log(productoResta); // objeto

    productosEnCarrito.some(producto => producto.id === idBoton)
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
                
        productosEnCarrito[index].cantidad--;
       
        if(productosEnCarrito[index].cantidad <= 0)
        productosEnCarrito[index].cantidad = 1;
            

        if(productosEnCarrito[index].cantidad <= 0){
        productosEnCarrito[index].cantidad = 1;
        }

    

    //console.log(productosEnCarrito);
    cargarProductosCarrito();
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}



botonVaciar.addEventListener("click", vaciarCarrito);

function vaciarCarrito (){
    
    
    //Libreria sweetalert

    Swal.fire({
        title: 'Vas a vaciar tu carrito',
        html:'¿Estas seguto?',
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText:'Si',
        confirmButtonColor: '#F35200',
        cancelButtonColor: '#a8a6a6',
        cancelButtonText:'No'        
      }).then((result) => {
        if (result.isConfirmed){
            productosEnCarrito.length = 0;
            localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
            cargarProductosCarrito();
        }
      })

}

function actualizarTotal(){
    const totalCalculado = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    total.innerText = `$${totalCalculado}`;
}



botonComprar.addEventListener("click", comprarCarrito);

function comprarCarrito() {

    productosEnCarrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    
    contenedorCarritoVacio.classList.add("disabled");
    contenedorCarritoProductos.classList.add("disabled");
    contenedorCarritoAcciones.classList.add("disabled");
    contenedorCarritoComprado.classList.remove("disabled");

}




const monedaEl_one = document.getElementById('moneda-uno');
const monedaEl_two = document.getElementById('moneda-dos');
const cantidadEl_one = document.getElementById('cantidad-uno');
const cantidadEl_two = document.getElementById('cantidad-dos');

const cambioEl = document.getElementById('cambio');

const tazaEl = document.getElementById('taza');






async function calculate(){
    const moneda_one = monedaEl_one.value;
    const moneda_two = monedaEl_two.value;



    const cambioapi = await fetch(`https://api.exchangerate-api.com/v4/latest/${moneda_one}`);
    const data = await cambioapi.json();

       const taza = data.rates[moneda_two];
       cambioEl.innerText = `1 ${moneda_one} = ${taza} ${moneda_two}`;
       cantidadEl_two.value = (cantidadEl_one.value * taza).toFixed(2);
   
    
}

monedaEl_one.addEventListener('change', calculate);
cantidadEl_one.addEventListener('input', calculate);
monedaEl_two.addEventListener('change', calculate);
cantidadEl_two.addEventListener('input', calculate);

taza.addEventListener('click', () =>{
    const temp = monedaEl_one.value;
    monedaEl_one.value = monedaEl_two.value;
    monedaEl_two.value = temp;
    calculate();
} );


calculate();


