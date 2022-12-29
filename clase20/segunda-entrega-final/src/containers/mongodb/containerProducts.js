import mongoose from "mongoose";
import * as models from "./models/productos.js"


const URL = "mongodb+srv://coderhouse:coderhouse@backend32190.mtjzroy.mongodb.net/?retryWrites=true&w=majority"

await mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}) 
console.log("conectados correctamente");

try {
    //create
const newProductos = new models.productos(
    {
      "timestamp": 2243683245345,
      "nombre": "Box Premium",
      "descripcion": "Desayuno Sorpresa",
      "codigo": "1234",
      "precio": 1500,
      "foto": "img.jpg",
      "stock": 21
    }
    )
await newProductos.save()
console.log("Productos Creados");
console.log(newProductos);


} catch (error) {
    console.log("El error es: " + error);
}

export default class producto {

    async getProductos() {
        const collec = await query.get()
        collec.forEach( arch => {return arch.data()})
    }

    async getProductosById(id) {
        const collec = await query.doc(id).get()
        collec.forEach( arch => {return arch.data()})
    }

    async postProductos(producto){        
        await query.add(producto)
    }

    async updateProducto(id, producto){
        await query.doc(id).update(producto)
    }

    async deleteProducto(id){
        await query.doc(id).delete()
    }

}