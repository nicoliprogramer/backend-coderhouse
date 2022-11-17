const express = require("express");
const { Router } = express;

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/static", express.static(__dirname + "/public"))
// app.use(express.static("/new.png"))

const mascotas = []
const personas = []

const routerMascotas = new Router()

routerMascotas.get("/", (req, res) => {
    res.json(mascotas)
})

routerMascotas.post("/", (req, res) => {
    mascotas.push(req.body)
    res.json({ ok: "ok" })
})

const routerPersonas = new Router()

routerPersonas.get("/", (req, res) => {
    res.json(personas)
})

routerPersonas.post("/", (req, res) => {
    personas.push(req.body)
    res.json({ ok: "ok" })
})


app.use("/mascotas", routerMascotas)
app.use("/personas", routerPersonas)





const PORT = 8080;
const server = app.listen(PORT, () => {
    console.log(__dirname);   // ruta absoluta
    console.log("Server escuchando en el " + PORT);
})