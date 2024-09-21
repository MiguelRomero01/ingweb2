
var carritoVisible = false;
var carritoArray_LocalStorage = []
carritoArray_LocalStorage = JSON.parse(localStorage.getItem('carritoArray_LocalStorage')) || [];

//esperamos que todos los elementos de la pagina carguen para continuar con el script
if(document.readyState=='loading'){
    document.addEventListener('DOMContentLoaded',ready)
}else{
    ready();
}

function ready(){
    //agregamos la funcionalidad de los botones eliminar del carrito
    var botonesEliminarItem = document.getElementsByClassName('btn-eliminar');
    for(var i=0; i < botonesEliminarItem.length; i++){
        var button = botonesEliminarItem[i];
        button.addEventListener('click', eliminarItemCarrito);
    }

    //agrego funcionalidad al boton sumar cantidad
    var botonesSumarCantidad = document.getElementsByClassName('sumar-cantidad');
    for(var i = 0; i < botonesSumarCantidad.length; i++){
        var button = botonesSumarCantidad[i];
        button.addEventListener('click', sumarCantidad);
    }

    //agrego funcionalidad al boton restar cantidad
    var botonesRestarCantidad = document.getElementsByClassName('restar-cantidad');
    for(var i = 0; i < botonesRestarCantidad.length; i++){
        var button = botonesRestarCantidad[i];
        button.addEventListener('click', restarCantidad);
    }

    //Agrego funcionalidad a los botones agregar al carrito
    var botonesAgregarAlCarrito = document.getElementsByClassName('boton-item');
    for(var i = 0; i<botonesAgregarAlCarrito.length; i++){
        var button = botonesAgregarAlCarrito[i];
        button.addEventListener('click', botonesAgregarAlCarritoClicked);
    }   
}
function eliminarItemCarrito(event){
    var buttonClicked = event.target;
    var carritoItem = buttonClicked.parentElement.parentElement;
    var titulo = carritoItem.getElementsByClassName('carrito-item-titulo')[0].innerText;

    // Log para verificar si el título es correcto
    console.log("Eliminando del carrito:", titulo);

    // Eliminar del DOM
    carritoItem.remove();

    // Actualizar el total del carrito
    actualizarTotalCarrito();

    // Eliminar del localStorage
    eliminarItem_LocalStorage(titulo);
}

//Actualiza el total del carrito
function actualizarTotalCarrito(){
    var carritoContenedor = document.getElementsByClassName('carrito')[0];
    var carritoItems = carritoContenedor.getElementsByClassName('carrito-item');
    const IVA = 19
    let subtotal = 0
    var total = 0

    //recorremos cada elemento del carrito para actualizar el total
    for(var i = 0; i < carritoItems.length; i++){
        var item = carritoItems[i];
        var precioElemento = item.getElementsByClassName('carrito-item-precio')[0];

        //quitamos el simbolo peso del punto de milesimo
        var precio = parseFloat(precioElemento.innerText.replace('$','').replace('.',''));

        var cantidadItem = item.getElementsByClassName('carrito-item-cantidad')[0];
        var cantidad = cantidadItem.value;
        
        subtotal = subtotal + (precio*cantidad);
        total = (subtotal*(IVA/100))+subtotal;
    }
    subtotal = Math.round(subtotal*100)/100;
    total = Math.round(total*100)/100;

    document.querySelectorAll('.carrito-precio-subtotal')[0].innerText = '$' + subtotal.toLocaleString("es");
    document.getElementsByClassName('carrito-precio-IVA')[0].innerHTML = IVA + '%';
    document.getElementsByClassName('carrito-precio-total')[0].innerText = '$' + total.toLocaleString("es");
}

//aumento en uno la cantidad del elemento seleccionado
function sumarCantidad(event){
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    var cantidadActual = selector.getElementsByClassName('carrito-item-cantidad')[0].value;

    cantidadActual++
    selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;

    //actualizamos el total
    actualizarTotalCarrito()
}

function restarCantidad(event){
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    var cantidadActual = selector.getElementsByClassName('carrito-item-cantidad')[0].value;

    cantidadActual--
    //controlamos que no sea menor a 1
    if(cantidadActual>=1){
    selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;
    //actualizamos el total
    actualizarTotalCarrito()
    }
}

function botonesAgregarAlCarritoClicked(event){
    var button = event.target;
    var item = button.parentElement;
    var titulo = item.getElementsByClassName('titulo-item')[0].innerText;
    var precio = item.getElementsByClassName('precio-item')[0].innerText;
    var imageSrc = item.getElementsByClassName('card-img-top')[0].src;

    //la siguiente funcion agrega el elemento al carrito
    agregarItemCarrito(titulo, precio, imageSrc);

    //la siguiente funcion agrega el elemento al localstorage
    try{
        guardarCarritoLocalStorage(titulo,precio,imageSrc)
        console.log("Se añadió")
    }catch(e){
        console.log("error",e)
    }
}

function agregarItemCarrito(titulo, precio, imageSrc) {
    var item = document.createElement('div');
    item.classList.add('item'); 
    var itemsCarrito = document.getElementsByClassName('carrito-items')[0];

    var itemCarritoContenido = `
    <div class="carrito-item">
        <img src="${imageSrc}" width="80px">
        <div class="carrito-items-detalles">
            <span class="carrito-item-titulo">${titulo}</span> <!-- Corregido aquí -->
            <div class="selector-cantidad">
                <i class="fa-solid fa-minus restar-cantidad"></i>
                <input type="text" value="1" class="carrito-item-cantidad" disabled> 
                <i class="fa-solid fa-plus sumar-cantidad"></i>
            </div>
            <span class="carrito-item-precio">${precio}</span>
        </div>
        <span class="btn-eliminar"><i class="fa-solid fa-trash"></i></span>
    </div>
    `;
    
    item.innerHTML = itemCarritoContenido;
    itemsCarrito.append(item);

    // Agregamos eventos a los nuevos elementos
    item.getElementsByClassName('btn-eliminar')[0].addEventListener('click', eliminarItemCarrito);
    item.getElementsByClassName('sumar-cantidad')[0].addEventListener('click', sumarCantidad);
    item.getElementsByClassName('restar-cantidad')[0].addEventListener('click', restarCantidad);
    actualizarTotalCarrito()
}

function pagarClicked(event){
    var carritoItems=document.getElementsByClassName('carrito-items')[0];
    
    //controla si el carrito tiene items
    if(carritoItems.children.length > 0){
        alert('Gracias por su compra')
        while(carritoItems.hasChildNodes()){
            carritoItems.removeChild(carritoItems.firstChild);
        }
        actualizarTotalCarrito()
        eliminarLocalStorage()
    }
    else{
        alert("No tienes articulos en el carrito")
    }
}

function guardarCarritoLocalStorage(titulo,precio,imageSrc) {
    let currentproduct_dict = { titulo: titulo, precio: precio, imagen: imageSrc}
    carritoArray_LocalStorage.push(currentproduct_dict)
    console.log(carritoArray_LocalStorage)
    localStorage.setItem('carritoArray_LocalStorage', JSON.stringify(carritoArray_LocalStorage)); // Convertimos a JSON
}

function cargarCarritoLocalStorage() {
    const carritoGuardado = localStorage.getItem('carritoArray_LocalStorage');
    if (carritoGuardado) {
        const itemsCarrito = JSON.parse(carritoGuardado);
        itemsCarrito.forEach(item => {
            agregarItemCarrito(item.titulo, item.precio, item.imagen);
        });
    }
}

function eliminarLocalStorage() {
    localStorage.removeItem('carritoArray_LocalStorage');
    carritoArray_LocalStorage = []; 
}
function eliminarItem_LocalStorage(titulo) {
    // Normalizar el título para evitar problemas de comparación
    var tituloNormalizado = titulo.trim().toLowerCase();

    // Filtrar el array para eliminar el ítem cuyo título coincida (normalizado)
    carritoArray_LocalStorage = carritoArray_LocalStorage.filter(item => {
        var tituloItemNormalizado = item.titulo.trim().toLowerCase();
        return tituloItemNormalizado !== tituloNormalizado;
    });

    // Guardar el array actualizado en el localStorage
    localStorage.setItem('carritoArray_LocalStorage', JSON.stringify(carritoArray_LocalStorage));

    // Log para ver el estado después de eliminar
    console.log("Array después de eliminar:", carritoArray_LocalStorage);
}


function Btn_ActualizarCarro_LocalStorage(){
    cargarCarritoLocalStorage()
}