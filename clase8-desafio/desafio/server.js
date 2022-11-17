const express = require("express");
const { Router } = express;

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use("/static", express.static("/public"))

const productos = [{
    title: "agua",
    price: 200,
    thumbnail: "img",
    id: 1
}, {
    title: "pepsi",
    price: 300,
    thumbnail: "img",
    id: 2
}, {
    title: "prity",
    price: 250,
    thumbnail: "img",
    id: 3
}
]


const routerProductos = new Router()

routerProductos.get("/", (req, res) => {
    res.json({ productos })
})

routerProductos.get("/:id", (req, res) => {
    const { id } = req.params

    if (isNaN(id)) {
        return res.json({ error: "No estas ingresando el numero correctamente" })
    }
    if (id < 1 || id > productos.length) {
        return res.json({ error: "El numero de productos es menor" })
    }

    const resultado = productos.filter((productos) => {
        return productos.id == id
    })

    res.send(resultado)
})

routerProductos.post("/", (req, res) => {

    const cantProductos = productos.length
    const productoId = cantProductos + 1;
    const productoNuevo = { ...req.body, id: productoId }
    productos.push(productoNuevo)

    res.send(productoNuevo)
})

routerProductos.put("/:id", (req, res) => {
    const { id } = req.params
    const productoNuevo = { ...req.body, productos }
    const productoAnterior = productos[parseInt(id) - 1]
    if (!productoAnterior) {
        res.send("Producto no disponible")
    }
    res.json({ ...productoNuevo })

})


app.use("/productos", routerProductos)

const PORT = 8080;
const server = app.listen(PORT, () => {
    console.log("El server esta escuchando en el " + PORT);
})