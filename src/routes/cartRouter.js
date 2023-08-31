import { Router } from "express"; // Importamos el módulo ROUTER de express
//import { uploader } from "../middlewares/multer.js";
import CartManager from "../cartManager.js";
const cartManager = new CartManager(); // Instancio la clase

const router = Router() //Creo un router, instanciando el módulo

router.get("/", (req, res) => res.send(carts)) //Agrego una ruta al router
router.post("/", (req, res) => {
    const carrito = req.body
    carts.push(carrito)
    res.status(200).send()
})


export default router; // exporto la variable router, por defecto (puedo importarla con cuanlquier nombre)