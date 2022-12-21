const { options } = require("./options/mysqlconn.js");
const knex = require("knex")(options);

const usuarios = [
    {nombre: "nico", apellido: "marini", edad: 20, email: "nicom@gmail.com"},
    {nombre: "ele", apellido: "gan", edad: 21, email: "ele@gmail.com"},
    {nombre: "fede", apellido: "fas", edad: 10, email: "elmasfacha@gmail.com"}
]

knex("usuario").insert(usuarios)    
    .then(() => console.log("Se ingresaron correctamente"))
    .catch(error => console.log("el error es " + error))
    .finally(() => {
        knex.destroy()
    })