/*
const delay = ret => { for (let i = 0; i < ret * 3e6; i++); } // ret es la retencion, es la variable de tiempo(delay)

hacerTarea = (num) => {
    console.log("haciendo tarea " + num);
    delay(500)
}

console.log("inicio de tareas");
hacerTarea(1);
hacerTarea(2);
hacerTarea(3);
hacerTarea(4);
console.log("fin de tareas");
console.log("otras tareas...");
*/

/*
hacerTarea = (num, cb) => {
    console.log("haciendo tarea " + num);
    setTimeout(cb, 1000);
}

console.log("inicio de tareas");
hacerTarea(1, () => {
    hacerTarea(2, () => {
        hacerTarea(3, () => {
            hacerTarea(4, () => {

                setTimeout(() => )
                console.log("fin de tareas");
            })
        })
    })
})

console.log("otras tareas...");
*/

/*
const fin = () => console.log("termine");

mostrarLetras = (str, cb) => {
    let i = 0;
    const timer = setInterval(() => {
        if (i < str.length) {
            console.log(str[i]);
            i++;
        } else {
            clearInterval(timer)
            cb()
        }
    }, 1000)
}

// mostrarLetras("Coder", fin)

setTimeout(() => { mostrarLetras("coder", fin) }, 100)
*/

/*
const manejadorDeArchivos = require("fs")

try {
    manejadorDeArchivos.writeFileSync("./fyh.txt", new Date().toLocaleString())
    // manejadorDeArchivos.appendFileSync("./fyh.txt", "holi juan")
} catch (error) {
    throw new Error("Error en la escritura del archivo: " + error)
}

try {
    const fechayhora = manejadorDeArchivos.readFileSync("./fyh.txt", "utf-8")
    console.log(fechayhora);
} catch (error) {
    throw new Error("Error en la lectura del archivo:" + error)
}
*/


/*
const fs = require("fs")

fs.readFile("./package.json", "utf-8", (error, data) => {  // ASINCRONA
    if (error) {
        console.log("hubo un error en la lectura");
        throw new Error("Hubo un error en la lectura: " + error)
    }

    console.log("la lectura fue exitosa");

    const info = {
        contenidoStr: data,
        contenidoObj: JSON.parse(data),
        size: data.length
    }

    console.log(info);

    fs.writeFile("./info.txt", JSON.stringify(info, null, 2), error => {
        if (error) {
            console.log("hubo un error en la escritura");
            throw new Error("Hubo un error en la escritura: " + error)
        }

        console.log("la escritura fue exitosa");
    })
})

// console.log("hola"); //asincrono
*/



const fs = require("fs")
fs.promises.readFile("./info.txt", "utf-8")
    .then(data => {
        const info = JSON.parse(data);
        console.log(info);

        const pkgObj = info.contenidoObj

        pkgObj.author = "Coderhouse"

        fs.promises.writeFile("./package.json.coder", JSON.stringify(pkgObj, null, 2))
            .then(() => {
                console.log("escritura exitosa");
            })
            .catch((error) => {
                console.log("error en la escritura");
            })
    })
    .catch(error => console.log("error en la lectura") + error)