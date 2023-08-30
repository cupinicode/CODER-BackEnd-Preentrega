// const express = require("express")

import express from "express";

import userRouter from "./routes/userRouter.js"
import productosRouter from "./routes/productosRouter.js"

const app = express() //instancio la aplicación

app.use("/user", userRouter) // Indico que para la ruta USER, voy a usar todos los EndPoints del router userRouter

app.use("/productos", productosRouter) // Indico que para la ruta PRODUCTOS, voy a usar todos los EndPoints del router productosRouter

app.listen(8080, () => console.log("Servidor escuchando en 8080"))