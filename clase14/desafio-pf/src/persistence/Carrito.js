const fs=require('fs');


class Carrito {
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

    getCarritos() {
        let array = fs.readFileSync(this.nombreArchivo, 'utf-8');

        if (array.length === 0) {
            return [];
        } else {
            return JSON.parse(array); 
        }
        
    }

    getLastId(){
        let array = this.getCarritos();
        if (array.length === 0) {
            return 0;
        }
        let lastId = array[array.length - 1].id;
        return lastId;
    }
    
    getCarritoById = (id) => {

        let arrayInCarritos = this.getCarritos();

        let carrito = arrayInCarritos.find(carrito => carrito.id === parseInt(id));
        return carrito;
    }

    getProductosCarrito = (id) => {
        let carrito = this.getCarritoById(id);
        
        if(carrito === undefined) {
            return {error: 'El carrito no ha sido encontrado'};
        } else {
            return carrito.productos;
        }
    }

    checkProductoCarrito = (carrito, producto) => {

        const productoCarrito = carrito?.productos?.find(productoCarrito => productoCarrito.id === producto.id);
        if(productoCarrito === undefined) {
            return false;
        } 
        
        return true;
        
    }

    postProductoCarrito = (idCarrito, producto) => {
        let arrayInCarritos = this.getCarritos();
        let carrito = arrayInCarritos.find(carrito => carrito.id === parseInt(idCarrito));
        if(carrito === undefined) {
            return {error: 'El carrito no ha sido encontrado'};
        } else {

            if(this.checkProductoCarrito(carrito, producto)) {
                return {error: 'Producto existente en el carrito'};
            }

            carrito.productos.push(producto);
            let indicator = arrayInCarritos.indexOf(carrito);
            arrayInCarritos[indicator] = carrito;
            fs.writeFileSync(this.nombreArchivo, JSON.stringify(arrayInCarritos, null, 2));
            return true;
        }
    }

    postCarrito() {
        const newCarrito = {
            id: this.getLastId() + 1,
            timestamp: Date.now(),
            productos: []
        }
        let array = this.getCarritos();
        array.push(newCarrito);
        fs.writeFileSync(this.nombreArchivo, JSON.stringify(array, null, 2));
        return newCarrito;
    }

    deleteProductoCarrito = (idCarrito, idProducto) => {
        let arrayInCarritos = this.getCarritos();
        let carrito = arrayInCarritos.find(carrito => carrito.id === parseInt(idCarrito));
        if(carrito === undefined) {
            return {error: 'El carrito no ha sido encontrado'};
        } else {
            const producto = carrito.productos.find(producto => producto.id === parseInt(idProducto));
            if(producto === undefined) {
                return {error: 'Producto no encontrado en el carrito'};
            } else {
                const index = carrito.productos.indexOf(producto);
                carrito.productos.splice(index, 1);
                let indicator = arrayInCarritos.indexOf(carrito);
                arrayInCarritos[indicator] = carrito;
                fs.writeFileSync(this.nombreArchivo, JSON.stringify(arrayInCarritos, null, 2));
                return true;
            }
        }
    }

    
    deleteCarrito = (id) => {
        let arrayInCarritos = this.getCarritos();
        let carrito = arrayInCarritos.find(carrito => carrito.id === parseInt(id));
        if(carrito === undefined) {
            return {error: 'El carrito no ha sido encontrado'};
        } else {
            const index = arrayInCarritos.indexOf(carrito);
            arrayInCarritos.splice(index, 1);
            fs.writeFileSync(this.nombreArchivo, JSON.stringify(arrayInCarritos, null, 2));
            return true;
        }
    }
    
    deleteAll() {
        fs.writeFileSync(this.nombreArchivo, "");
    }
}


module.exports = Carrito;