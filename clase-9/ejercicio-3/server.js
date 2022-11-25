const express = require("express");
const handlebars = require("express-handlebars");

const app = express();

app.engine("handlebars", handlebars.engine())

app.set("views", "./views")
app.set('view engine', 'handlebars');

app.get("/", (req, res) => {
    const data = {
        nombre: "Steve",
        apellido: "Rogers",
        edad: 109,
        email: "ilovenico@gmail.com",
        telefono: 35134234
    }

    res.render("datos", data);
})

const PORT = 8080;
app.listen(8080, () => console.log("Server is running at " + PORT))