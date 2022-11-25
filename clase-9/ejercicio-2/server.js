const express = require("express");
const { promises: fs } = require("fs");

const app = express()



app.engine("cte", async (filePath, options, callback) => {
    try {
        const template = await fs.readFile(filePath)
        const html = template.toString()
            .replace("^^titulo$$", options.titulo)
            .replace("^^mensaje$$", options.mensaje)
            .replace("^^autor$$", options.autor)
            .replace("^^version$$", options.version)
            .replace("^^nombre$$", options.nombre)
            .replace("^^apellido$$", options.apellido)
            .replace("^^fyh$$", options.fyh)
        return callback(null, html)
    } catch (error) {
        return callback(error)
    }
})

app.set("views", "./views");
app.set("view engine", "cte");

app.get("/cte1", (req, res) => {
    const obj = {
        titulo: "vamos",
        mensaje: "boquita",
        autor: "gallardo",
        version: "9.12.28"
    }

    res.render("plantilla1", obj)
})

app.get("/cte2", (req, res) => {
    const obj = {
        nombre: "nico",
        apellido: "marini",
        fyh: new Date().toLocaleString()
    }

    res.render("plantilla2", obj)
})
const PORT = 8080;
const server = app.listen(PORT, () => {
    console.log("servidor escuchando en el: " + PORT);
})