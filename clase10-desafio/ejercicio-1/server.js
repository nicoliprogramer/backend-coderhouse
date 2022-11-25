// http://localhost:8080/datos?min=10&nivel=15&max=20&titulo=Medidor

const express = require("express");

const app = express();

app.set("views", "./views")
app.set("view engine", "pug")

app.get("/datos", (req, res) => {
    res.render("nivel", req.query)
})

const PORT = 8080;
app.listen(PORT, () => console.log("server escuchando en el: " + PORT))