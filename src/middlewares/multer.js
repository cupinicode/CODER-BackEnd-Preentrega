import multer from "multer";

const storage = multer.diskStorage({   //Defino dónde se almacenarán los datos
    destination : (req, file, cb) => cb(null,"./public"),   // En la carpeta public
    filename : (req, file, cb) => cb(null, file,originalname)
})

export const uploader = multer({ storage }) // Instancia de multer, con la configuración del storage creada antes