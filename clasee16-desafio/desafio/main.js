import {options} from "./options/mysqlconn.js"
import ClienteSQL from "./sqlContainer.js"

const sql = new ClienteSQL(options)

sql.crearTabla()
    .then(() => {
        console.log("1- tabla creada");


        const desayunos = [
            {nombre: "leche",codigo: "AB-12", precio: 50.56, stock: 30},
            {nombre: "dogi",codigo: "DB-1", precio: 10.56, stock: 10},
            {nombre: "caramelo",codigo: "AA-1", precio: 150, stock: 200},
            {nombre: "agua",codigo: "AB-11", precio: 20.56, stock: 600},
            {nombre: "alfajor",codigo: "GG-15", precio: 10.56, stock:100}
        ]

        return sql.insertarDesayunos(desayunos)
    })
    .then(() => {
        console.log("2- Desayunos insertados")

        return sql.listarDesayunos()
    })
    .then((desayunos) => {
        console.log(desayunos);

        console.log("3- desayunos listados")

        return sql.borrarDesayunos(3)
    })  
    .then(() =>{
        console.log("4- Desayuno 3 borrado")

        return sql.actualizarStock(0,2)
    })
    .then(() => {
        console.log("5- stock actualizado")

        return sql.listarDesayunos()
    })
    .then((desayunos) =>{
        console.log(desayunos)

        console.log("resultado final")
    })
    .finally(() =>{
        sql.close()
    })