// Inicio de la clase

const fs = require("fs"); //Importo la librería par manejo de archivos
const { json } = require("stream/consumers");

class CartManager{

    carts; // array de carritos
    static id = 0; // Variable estática de la clase
    path="./carritos.json"

    constructor() {
        this.carts = []; // Al instanciar un objeto de esta clase, inicializo el array de carritos
    }
    
    leerArchivo() { //Metodo de la clase que lee el archivo JSON y lo almacena en el array de carritos
        this.carts = [] //Inicializo el array
        try{
            this.carts = JSON.parse(fs.readFileSync(this.path)) //Leo el archivo JSON y lo cargo en el array de carritos
        }
        catch (error){  //Capturo el error (por ej, el archivo aun no existe)
            CartManager.id=0 //Preparo el ID para cuando agregue el primer elemento 
            return
        }
        if (this.carts.length > 0) //Controlo que el archivo JSON contenga al menos 1 objeto
            CartManager.id = this.carts[this.carts.length - 1].id + 1 // Tomo el ultimo ID que figura en el archivo...
    }                                                         // ... como base para el nuevo ID, en caso de agregar un nuevo producto
    
    grabarArchivo = () => { //Método de la clase que graba el array en el archivo
        try{
            fs.writeFileSync(this.path, JSON.stringify(this.carts))
        }
        catch{
            console.log((error) ? `Error al escribir el archivo ${this.path}` : `Archivo ${this.path} grabado correctamente`)
        }
    }
    
    addCart(){ // Metodo para agregar un nuevo carrito
        this.leerArchivo();
        cart.id = CartManager.id; //Asigno el ID del producto, tomandolo desde la variable estatica
        cart.products = []; // Inicializo el carrito
        this.carts.push(cart); //Agrego el carrito al array 
        CartManager.id++; // Invremento el ID, para prepararlo para el proximo
        this.grabarArchivo() // Grabo el array de carritos en el archivo
    }
        
    getCartById(id){ // Método que recibe por parámetro un ID, lee el archivo, lo carga en un array, busca el id y devuelve el producto
        this.leerArchivo();
        let encontrado = this.carts.find((carrito) => carrito.id == id) // Lo busco entre los IDs de cada objeto del array
        if (!encontrado) { //Si no lo encuentro ...
            console.log("Not found"); // ... muestro el error por consola
            return "" // salgo del método
        }
        return encontrado.products // encontré el ID, por lo tanto retorno el array de productos
    }

    addProductToCart(cartId, productId){ //Recibo el ID del producto que debo modificar, junto con los nuevos datos
        this.leerArchivo();
        let carritoEncontrado = this.carts.findIndex((x) => x.id === id)   // Lo busco entre los IDs de cada objeto del array
        if (carritoEncontrado === -1) { //Si no lo encuentro ...
            console.log("Not found"); // ... muestro el error por consola
            return "" // salgo del método
        }
        let productoEncontrado = this.carts[carritoEncontrado].findIndex((x) => x.id === productId)        
        if (productoEncontrado === -1) { // El prod. no estaba aún en el carrito
            let producto = {
                id: productId,
                quantity: 1
            }
            this.carts[carritoEncontrado].products.push(producto)
        }else{
            this.carts[carritoEncontrado].products[productoEncontrado].quantity++ // Le sumo 1 a la cantidad
        }

        this.grabarArchivo() // Grabo el archivo, para que impacten la modificacion
    }
}


module.exports = CartManager;

// Fin de la clase
