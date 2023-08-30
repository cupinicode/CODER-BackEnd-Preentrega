import { Router } from "express"; // Importamos el módulo ROUTER de express
import { uploader } from "../middlewares/multer.js";

const router = Router() //Creo un router, instanciando el módulo

const users = [];

/*const userAuth = () => {return true}

const mid1 = (req, res, next) => { // Ese middleware se ejecuta primero, sólo en este router
   if (!userAuth(req))
    return res.status(401).send( {error: "Debes autentificarte"} )
   next()
}


*/

// Agrupamos los EndPoints para tenerlos todos juntos y ordenados
router.get("/", (req, res) => res.send(users)) //Agrego una ruta al router
router.post("/", uploader.single("file"), (req, res) => {
    const usuario = req.body
    users.push(usuario)
    res.status(200).send()
})

//EndPoint que permite subir archivos al servidor
router.post("/imagen", uploader.single("file"), (req, res) => { // le agregamos el middleware UPLOADER sólo a este endPoint
    res.send(req.file.path) //El método path de la propiedad file nos dice dónde se guardó el archivo
})

export default router; // exporto la variable router, por defecto (puedo importarla con cuanlquier nombre)