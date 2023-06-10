let productos = [];

fetch("./js/productos.json")
.then(response => response.json())
.then(data => {
    productos = data;
    cargarProductos(productos);
    
})


const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");





function cargarProductos(productosElegidos){

    contenedorProductos.innerHTML = ""; 

    productosElegidos.forEach(producto => {

        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
                    <div class="product-txt">
                        <h3 class="producto-titulo">${producto.titulo}</h3>
                        <p class="producto-precio">$${producto.precio}</p>
                        <button class="producto-agregar" id="${producto.id}" >Agregar</button>
                    </div>
        `;
        contenedorProductos.append(div);
    })

    actualizarBotonesAgregar();
    //console.log(botonesAgregar);
}



botonesCategorias.forEach(boton => { 
    boton.addEventListener("click", (e) => {

        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if(e.currentTarget.id != "todos"){
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText = productoCategoria.categoria.nombre;

            //console.log(productoCategoria);

            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosBoton);

        } else{
            tituloPrincipal.innerText = "Todos los Cafes";
            cargarProductos(productos)
        }
        
    })
});

//console.log(botonesAgregar);


//BOTON AGREGAR

function  actualizarBotonesAgregar(){
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}


let productosEnCarrito;


let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");


if(productosEnCarritoLS){

     productosEnCarrito = JSON.parse(productosEnCarritoLS);
     actualizarNumerito();
}else{
    productosEnCarrito = [];
}


function agregarAlCarrito(e){

    const idBoton = e.currentTarget.id;
    //console.log(idBoton);

    const productoAgregado = productos.find(producto => producto.id === idBoton);
    //console.log(productoAgregado);

    // console.log(productosEnCarrito.some(producto => producto.id === idBoton)) true o false

    if(productosEnCarrito.some(producto => producto.id === idBoton)){
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        // console.log(index);
        productosEnCarrito[index].cantidad++;

    }else{
        productoAgregado.cantidad  = 1; 
        productosEnCarrito.push(productoAgregado);
        //console.log(productosEnCarrito);
    }

    //console.log(productosEnCarrito);
    actualizarNumerito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));

    Toastify({
        text: "Agregaste a tu carrito",
        duration: 2000,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
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

function actualizarNumerito(){
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
   // console.log(numerito);
    numerito.innerText = nuevoNumerito;
}




const monedaEl_one = document.getElementById('moneda-uno');
const monedaEl_two = document.getElementById('moneda-dos');
const cantidadEl_one = document.getElementById('cantidad-uno');
const cantidadEl_two = document.getElementById('cantidad-dos');
const cambioEl = document.getElementById('cambio');
const tazaEl = document.getElementById('taza');


// Fetch Exchange Rate and Update the DOM
function calculate(){
    const moneda_one = monedaEl_one.value;
    const moneda_two = monedaEl_two.value;

   fetch(`https://api.exchangerate-api.com/v4/latest/${moneda_one}`)
   .then(res => res.json() )
   .then(data => {
       const taza = data.rates[moneda_two];
       
       cambioEl.innerText = `1 ${moneda_one} = ${taza} ${moneda_two}`;

       cantidadEl_two.value = (cantidadEl_one.value * taza).toFixed(2);

    } );
    
}

//Event listeners
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