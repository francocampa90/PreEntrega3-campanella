let productos = [];


const listaProductos = async () => {
    const response = await  fetch("./js/productos.json")
    const data = await  response.json();
    productos = data;
    cargarProductos(productos);

}


listaProductos();





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





fetch("https://api.currencyfreaks.com/latest?apikey=4b2ff0ae5ce44f66aa8934855f451bcc")
  .then((result) => {
    // console.log(result);
    let myData = result.json();
    // console.log(myData);
    return myData;
  })
  .then((currency) => {
    let cantidad = document.querySelector(".cantidad");
    let arsprecio = document.querySelector(".ars span");
    
    arsprecio.innerHTML = Math.round(cantidad.innerHTML * currency.rates["ARS"]);
    
    // console.log(currency.rates);
    console.log(currency.rates["ARS"]);
    
  });