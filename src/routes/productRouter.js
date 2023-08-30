import { Router } from "express"; // Importamos el módulo ROUTER de express


const router = Router() //Creo un router, instanciando el módulo

const products = [];

// Agrupamos los EndPoints para tenerlos todos juntos y ordenados
router.get("/", (req, res) => res.send(products)) //Agrego una ruta al router

router.post("/", (req, res) => {
    const perrito = req.body
    pets.push(perrito)
    res.status(200).send()
})


export default router; // exporto la variable router, por defecto (puedo importarla con cuanlquier nombre)