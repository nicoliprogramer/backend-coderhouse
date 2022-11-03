// OPERACIONES SINCRONICAS

const fs = require("fs")

let archivo = fs.readFileSync("./transacciones.js")  //lectura de un archivo en forma sincronica / borra todo 

fs.writeFileSync("transacciones.txt", "sadasda")  //escritura de un archivo en forma sincronica / sobreescribe

// appendFileSync // empieza escribir desde donde termina el archivo (agrega)

