const express = require("express")

const app = express()

app.get("/", (req, res) => {  // ruta en donde vamos a escribir
    res.send("Hola Matias Maranga")
})

app.get("/inicio", (req, res) => {  // ruta en donde vamos a escribir
    res.send("Hola Matias Minio")
})

const server = app.listen(8080, () => {
    console.log("Servidor eschuchando en el 8080");
})

server.on("error", (error) => console.log("hubo un error: " + error))


// get  / buscador(navegador)
// post  /  mandar mensajes en lo que nosotros registramos
// put  / editar informacion, por completo
// delete  / eliminar alguna informacion
// patch  /  editar informacion, en un pedazo