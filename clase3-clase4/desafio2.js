const fs = require("fs");

class Contenedor {
    productArray = new Array();
    typeId;


    constructor(nombreArchivo) {
        this.nombreArchivo = nombreArchivo;

        if (fs.existsSync(nombreArchivo)) {
            this.productArray = JSON.parse(fs.readFileSync(this.nombreArchivo, "utf-8"));
            this.typeId = this.#detId();
            console.log("Archivo Existente");
        } else {
            this.typeId = 0;
            fs.writeFileSync(this.
                nombreArchivo, JSON.stringify(this.productArray));
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
        try {
            if (!this.#thisIs(Object)) {
                Object["id"] = this.typeId + 1;
                this.typeId++;
                this.productArray.push(Object);
                await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(this.productArray));
                console.log("Se ha guardado el desayuno: " + Object.id + ".");
                return Promise.resolve(Object.id);
            }
            else {
                console.log("Se han guardado los cambios");
            }
        }
        catch (error) {
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
        let obj = null;
        this.productArray.map((component) => {
            if (component.id == id) {
                obj = component;
            }
        })
        return obj;
    }

    async getAll() {
        try {
            const data = await fs.promises.readFile(this.nombreArchivo, "utf-8");
            this.productArray = JSON.parse(data);
            return this.productArray;
        }
        catch (error) {
            console.log(error);
        }
    }

    async deleteById(Number) {
        let select = false;
        for (let i = 0; i < this.productArray.length; i++) {
            if (this.productArray[i].Number === Number) {
                select = true;
                this.productArray.splice(i, 1);
                i--;
            }
        }

        if (select) {
            try {
                await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(this.productArray))
                console.log("Lo Borraste");
            }
            catch (error) {
                console.log(error);
            }
        }

    }

    async deleteAll() {
        this.productArray = [];
        try {
            await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(this.productArray))
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