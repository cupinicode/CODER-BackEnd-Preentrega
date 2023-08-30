// const express = require("express")

import express, { urlencoded } from "express";

import petRouter from "./routes/petRouter.js"
import userRouter from "./routes/userRouter.js"

const app = express() //instancio la aplicación
app.use(express.json()) // middleware para procesar solicitudes y leer json
app.use(express.urlencoded({ extended: true}))

//express.static sólo puede servir carpetas dentro del mismo proyecto.  
app.use("/static", express.static("public")) // Para poder acceder a una carpeta estática desde una URL

app.use("/api/users", userRouter) // Indico que para la ruta USER, voy a usar todos los EndPoints del router userRouter

app.use("/api/pets", petRouter) // Indico que para la ruta PRODUCTOS, voy a usar todos los EndPoints del router productosRouter

app.listen(8080, () => console.log("Servidor escuchando en 8080"))