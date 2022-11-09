const http = require("http");

const server = http.createServer((request, response) => {
    const mensaje = getMensajeSegunHora()
    response.end(mensaje)
})

getMensajeSegunHora = () => {
    const hora = new Date().getHours()

    if (hora >= 6 && hora <= 12) {
        return "BUENOS DIAS!"
    }

    if (hora >= 13 && hora <= 19) {
        return "BUENAS TARDES!"
    }
    return "BUENAS NOCHES!"
}

const PORT = 8080

const connectedServer = server.listen(PORT, () => {
    console.log("Servidor escuchando en el " + PORT);
})