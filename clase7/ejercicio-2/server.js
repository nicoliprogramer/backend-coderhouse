const express = require("express")
const app = express();


//verbs

app.get("/api/sumar/:num1/:num2", (req, res) => {
    const { num1, num2 } = req.params
    // console.log(req);
    res.send({ suma: Number(num1) + Number(num2) })
})


app.get("/api/sumar", (req, res) => {
    const { num1, num2 } = req.query // como consulta(?)

    res.send({ suma: Number(num1) + Number(num2) })

})


app.get("/api/operacion/:operacion", (req, res) => {
    const operacion = req.params.operacion
    res.send({ operacion: eval(operacion) })
})



app.post("/api", (req, res) => {
    res.send("ok post")
})

app.put("/api", (req, res) => {
    res.send("ok put")
})

app.delete("/api", (req, res) => {
    res.send("ok delete")
})

const PORT = 8080;

const server = app.listen(PORT, () => {
    console.log("Server escuchando en el " + PORT);
})