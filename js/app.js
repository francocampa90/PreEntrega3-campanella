// PRODUCTOS
const productos = [
    // cafes
    {
        id: "Brasil",
        titulo: "Brasil",
        imagen: "./img/cafe1.png",
        categoria: {
            nombre: "Arabica",
            id: "Arabica"
        },
        precio: 1000
    },
    {
        id: "Colombia",
        titulo: "Colombia",
        imagen: "./img/cafe2.png",
        categoria: {
            nombre: "Robusta",
            id: "Robusta"
        },
        precio: 1000
    },
    {
        id: "Etiopia",
        titulo: "Etiopia",
        imagen: "./img/cafe3.png",
        categoria: {
            nombre: "Liberica",
            id: "Liberica"
        },
        precio: 1000
    },
    {
        id: "Dark-Roast",
        titulo: "Dark Roast",
        imagen: "./img/cafe4.png",
        categoria: {
            nombre: "Oscuro",
            id: "Oscuro"
        },
        precio: 1000
    },
    {
        id: "Light-Roast",
        titulo: "Light Roast",
        imagen: "./img/cafe5.png",
        categoria: {
            nombre: "Excelsa",
            id: "Excelsa"
        },
        precio: 1000
    },
    {
        id: "Venezuela",
        titulo: "Venezuela",
        imagen: "./img/cafe6.png",
        categoria: {
            nombre: "Arabica",
            id: "Arabica"
        },
        precio: 1000
    },
    {
        id: "Burundi",
        titulo: "Burundi",
        imagen: "./img/cafe7.png",
        categoria: {
            nombre: "Excelsa",
            id: "Excelsa"
        },
        precio: 1000
    },
    {
        id: "Roast",
        titulo: "Roast",
        imagen: "./img/cafe8.png",
        categoria: {
            nombre: "Robusta",
            id: "Robusta"
        },
        precio: 1000
    },
    {
        id: "Guatemala",
        titulo: "Guatemala",
        imagen: "./img/cafe9.png",
        categoria: {
            nombre: "Robusta",
            id: "Robusta"
        },
        precio: 1000
    },
    {
        id: "Mexico",
        titulo: "Mexico",
        imagen: "./img/cafe10.png",
        categoria: {
            nombre: "Liberica",
            id: "Liberica"
        },
        precio: 1000
    },
    {
        id: "Rwanda",
        titulo: "Rwanda",
        imagen: "./img/cafe11.png",
        categoria: {
            nombre: "Oscuro",
            id: "Oscuro"
        },
        precio: 1000
    },
    {
        id: "Sumatra",
        titulo: "Sumatra",
        imagen: "./img/cafe12.png",
        categoria: {
            nombre: "Arabica",
            id: "Arabica"
        },
        precio: 1000
    }
    
];

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

cargarProductos(productos);

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
}

function actualizarNumerito(){
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
   // console.log(numerito);
    numerito.innerText = nuevoNumerito;
}



