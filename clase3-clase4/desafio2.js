const fs = require("fs");

class Contenedor {
    productArray = new Array();
    typeId;


    constructor(nombreArchivo) {
        this.nombreArchivo = nombreArchivo;

        if (fs.existsSync(nombreArchivo)) {
            this.productArray = JSON.parse(fs.readFileSync(this.nombreArchivo, "utf-8")); //lee el archivo
            this.typeId = this.#detId();
            console.log("Archivo Existente");
        } else {
            this.typeId = 0;
            fs.writeFileSync(this.nombreArchivo, JSON.stringify(this.productArray));    //sobrescribe en un archivo / primer indice:ruta del archivo y segundo indice: todo lo que queremos escribir
            console.log("Archivo NO existente");
        }
    }

    #detId() {
        if (this.productArray.length > 0) {
            let riseId = this.productArray.reduce((acc, item) => {
                return Math.max(acc, item.id)
            }, 0)
            return riseId + 1;
        } else {
            return 0;
        }
    }

    async save(Object) {
        try {              //sincronico
            if (!this.#thisIs(Object)) {
                Object["id"] = this.typeId + 1;
                this.typeId++;
                this.productArray.push(Object);
                await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(this.productArray));  //escribe en un archivo
                console.log("Se ha guardado el desayuno: " + Object.id + ".");
                return Promise.resolve(Object.id);  // crea promesa
            }
            else {
                console.log("Se han guardado los cambios");
            }
        }
        catch (error) {  //promesa rechazada (operacion falla)
            console.log(error);
        }
    }

    #thisIs(obje) {
        let resp = false;
        this.productArray.filter(component => {
            if (component.title == obje.title && component.price == obje.price && component.img == obje.img) {
                resp = true;
            }
        });
        return resp;
    }

    getById(id) {
        return this.productArray.find(p => p.id == id) || null
    }

    async getAll() {
        try {
            const data = await fs.promises.readFile(this.nombreArchivo, "utf-8");  //lee archivo
            this.productArray = JSON.parse(data);
            console.log(this.productArray);

        }
        catch (error) {
            console.log(error);
        }
    }

    async deleteById(id) {

        this.productArray = this.productArray.filter(p => p.id !== id)

        try {
            await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(this.productArray))   //escribe en un archivo
            return { id }
        }
        catch (error) {
            console.log(error);
        }

    }

    async deleteAll() {
        this.productArray = [];
        try {
            await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(this.productArray))  //escribe en un archivo
            console.log("Todo borrado");
        }
        catch (error) {
            console.log(error);
        }
    }
}




let desayuno = { title: "Desayuno Caja de Madera", price: 3.233, img: "./producto1.jpg" };
let desayuno2 = { title: "Desayuno Romántico", price: 2.555, img: "./producto2.jpg" };
let desayuno3 = { title: "Desayuno Cumpleaños", price: 4.000, img: "./producto3.jpg" };


const desayunosCordoba = new Contenedor("./productos.txt");
action = () => {

    desayunosCordoba.getAll()
        .then(() => desayunosCordoba.save(desayuno))
        .then(() => desayunosCordoba.save(desayuno2))
        .then(() => desayunosCordoba.save(desayuno3))
        .then(() => {
            console.log(desayunosCordoba.getById(8));
        })
}

action();


// callback es una funcion que se envia como argumento a otra funcion 