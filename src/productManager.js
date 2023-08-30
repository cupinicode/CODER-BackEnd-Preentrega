// Inicio de la clase

const fs = require("fs"); //Importo la librería par manejo de archivos
const { json } = require("stream/consumers");

class ProductManager{

    products; // Array de productos
    static id = 0; // Variable estática de la clase
    path="./productos.json"

    constructor() {
        this.products = []; // Al instanciar un objeto de esta clase, inicializo el array de productos
    }
    
    leerArchivo() { //Metodo de la clase que lee el archivo JSON y lo almacena en el array
        this.products = [] //Inicializo el array
        try{
            this.products = JSON.parse(fs.readFileSync(this.path)) //Leo el archivo JSON y lo cargo en el array de objetos
        }
        catch (error){  //Capturo el error (por ej, el archivo aun no existe)
            ProductManager.id=0 //Preparo el ID para cuando agregue el primer elemento 
            return
        }
        if (this.products.length > 0) //Controlo que el archivo JSON contenga al menos 1 objeto
            ProductManager.id = this.products[this.products.length - 1].id + 1 // Tomo el ultimo ID que figura en el archivo...
    }                                                         // ... como base para el nuevo ID, en caso de agregar un producto
    
    grabarArchivo = () => { //Método de la clase que graba el array en el archivo
        try{
            fs.writeFileSync(this.path, JSON.stringify(this.products))
        }
        catch{
            console.log((error) ? `Error al escribir el archivo ${this.path}` : `Archivo ${this.path} grabado correctamente`)
        }
    }
    
    addProduct(producto){ // Metodo para agregar un producto
        this.leerArchivo();
        producto.id = ProductManager.id; //Asigno el ID del producto, tomandolo desde la variable estatica
        this.products.push(producto); //Agrego el objeto al array de productos
        ProductManager.id++; // Invremento el ID, para prepararlo para el proximo producto a ingresar
        this.grabarArchivo() // Grabo el array en el archivo
    }
        
    getProducts() { // Método que lee el archivo, lo carga en un array y devuelve el array con todos los objetos ingresados hasta el momento
        this.leerArchivo();
        return this.products // Retorno el array completo
    }
    
    getProductById(id){ // Método que recibe por parámetro un ID, lee el archivo, lo carga en un array, busca el id y devuelve el producto
        this.leerArchivo();
        let encontrado = this.products.find((prod) => prod.id == id) // Lo busco entre los IDs de cada objeto del array
        if (!encontrado) { //Si no lo encuentro ...
            console.log("Not found"); // ... muestro el error por consola
            return "" // salgo del método
        }
        return encontrado // encontré el ID, por lo tanto retorno el objeto
    }

    updateProduct(id, nuevoDato){ //Recibo el ID del producto que debo modificar, junto con los nuevos datos
        this.leerArchivo();
        let encontrado = this.products.findIndex((x) => x.id === id)   // Lo busco entre los IDs de cada objeto del array
        if (encontrado === -1) { //Si no lo encuentro ...
            console.log("Not found"); // ... muestro el error por consola
            return "" // salgo del método
        }
        this.products[encontrado].title = nuevoDato.title                //Modifico el objeto corespondiente
        this.products[encontrado].description = nuevoDato.description    //con los nuevos datos
        this.products[encontrado].price = nuevoDato.price
        this.products[encontrado].code = nuevoDato.code
        this.products[encontrado].category = nuevoDato.category
        this.products[encontrado].status = nuevoDato.status
        this.products[encontrado].stock = nuevoDato.stock
        this.products[encontrado].thumbnail = nuevoDato.thumbnail
        this.grabarArchivo() // Grabo el archivo, para que impacten la modificacion
    }

    deleteProduct(id){ // Recibe el ID correspondiente al objeto a borrar
        this.leerArchivo();
        let encontrado = this.products.findIndex((x) => x.id === id)   // Lo busco entre los IDs de cada objeto del array
        if (encontrado === -1) { //Si no lo encuentro ...
            console.log("Not found"); // ... muestro el error por consola
            return "" // salgo del método
        }
        this.products.splice(encontrado,1) // Elimino el elemento del array usando el índice retornado por findIndex()
        this.grabarArchivo() // Actualizo el archivo
        return "El producto ha sido borrado"
    }
}

module.exports = ProductManager;

// Fin de la clase



