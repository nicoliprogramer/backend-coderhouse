const http = require("http");

const server = http.createServer((mensaje, respuesta) => {
    respuesta.end("hola Alan Sherar")
})

const connection = server.listen(8080, () => {
    console.log("Servidor escuchando  en el 8080");
})