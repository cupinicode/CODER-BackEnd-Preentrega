import { Router } from "express"; // Importamos el módulo ROUTER de express


const router = Router() //Creo un router, instanciando el módulo

// Agrupamos los EndPoints para tenerlos todos juntos y ordenados
router.get("/", (req, res) => res.send( { })) //Agrego una ruta al router
router.get("/goles", (req, res) => res.send( { } ))
router.get("/compras", (req, res) => res.send( { } ))


export default router; // exporto la variable router, por defecto (puedo importarla con cuanlquier nombre)