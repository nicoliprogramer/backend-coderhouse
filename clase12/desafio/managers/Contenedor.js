const fs = require('fs');
const path = require('path');

class Contenedor {

    constructor(filename) {
        this.filename = path.join(__dirname, "..", `files/${filename}`);
    }

    async save(product) {

        try {
            const products = await this.getAll();
            if (products.length > 0) {
                const lastId = products[products.length - 1].id + 1;
                product.id = lastId;
                console.log(product.id);
                products.push(product);
                await fs.promises.writeFile(this.filename, JSON.stringify(products, null, 2));
            } else {
                product.id = 1;
                await fs.promises.writeFile(this.filename, JSON.stringify([product], null, 2));
            }


        } catch (error) {
            console.log(error);
        }
    }

    async getById(id) {
        try {
            const products = await this.getAll();

            let item = products.find(product => product.id === id);
            return item;

        } catch (error) {
            console.log(error);
        }

    }

    async getAll() {

        try {
            const content = await fs.promises.readFile(this.filename, 'utf-8');
            if (content.length > 0) {
                let array = JSON.parse(content);
                return array;
            } else {
                return [];
            }

        }
        catch (error) {
            return "No se pudo leer el archivo";
        }


    }

    async deleteById(id) {
        try {
            const products = await this.getAll();

            const newProducts = products.filter(product => product.id !== id);
            console.log('¡El producto ha sido eliminado con exito!');

            await fs.promises.writeFile(this.filename, JSON.stringify(newProducts, null, 2));
        } catch (error) {
            return console.log(error);
        }
    }

    async deleteAll() {
        try {
            let content = await fs.promises.readFile(this.filename, 'utf-8');

            content = [];

            console.log("Se ha borrado todo");

            await fs.promises.writeFile(this.filename, JSON.stringify(content, null, 2))
        }
        catch (error) {
            console.log("Error", error);
        }
    }

    async getRandom() {
        const products = await this.getAll();
        let item = products[Math.floor(Math.random() * products.length)];
        return item;
    }
}

module.exports = Contenedor;