const fs=require('fs');


class Producto {
    constructor(nombreArchivo) {
        this.nombreArchivo = nombreArchivo;
        this.id = 0;
    }

    createFile(){
        fs.writeFileSync(this.nombreArchivo, '');
    }

    checkIfFileExists(){
        if (!fs.existsSync(this.nombreArchivo)) {
            this.createFile();
        }
    }

    getProductos() {
        let array = fs.readFileSync(this.nombreArchivo, 'utf-8');
        if (array.length === 0) {
            return [];
        } else {
            return JSON.parse(array); 
        }
    }

    getLastId(){ 
        let array = this.getProductos();
        if (array.length === 0) {
            return 0;
        }
        let lastId = array[array.length - 1].id;
        return lastId;
    }
    
    getProductoById(id) {

        let array = this.getProductos();
        let objeto = array.find(objeto => objeto.id === parseInt(id));

        if (objeto === undefined) {
            return {error : 'El producto no ha sido encontrado'};
        } 

        return objeto;
    }

    postProducto(objeto) {
        let array = this.getProductos();
        this.id = this.getLastId() + 1;
        objeto.id = this.id;
        objeto.timestamp = Date.now();
        array.push(objeto);
        fs.writeFileSync(this.nombreArchivo, JSON.stringify(array, null, 2));
        return objeto;
    }


    putProducto(id, objeto) {

        let array = this.getProductos();

        try {

            let refreshObject = array.find(objeto => objeto.id === parseInt(id));

            if (refreshObject === undefined) {

                return {error: 'El producto no ha sido encontrado'};

            } else {

                let indicator = array.indexOf(refreshObject);
                objeto.id = parseInt(id);
                objeto.timestamp = Date.now();
                array[indicator] = objeto;
                fs.writeFileSync(this.nombreArchivo, JSON.stringify(array, null, 2));
                return objeto;

            }
        }
        catch (error) {
            return {error: 'El ID no corresponde para actualizar el producto'};
        }
    }

    deleteProducto(id) {
        let array = this.getProductos();
        let objeto = array.find(objeto => objeto.id === parseInt(id));

        if (objeto === undefined) {
            return {error: 'El ID no corresponde para eliminar el producto'};
        } else {

            let indicator = array.indexOf(objeto);
            array.splice(indicator, 1);
            fs.writeFileSync(this.nombreArchivo, JSON.stringify(array, null, 2));
            return objeto;
        }
    }
    
    deleteAll() {
        fs.writeFileSync(this.nombreArchivo, "");
    }
}


module.exports = Producto;