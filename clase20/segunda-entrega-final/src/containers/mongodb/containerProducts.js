import mongoose from "mongoose";
import * as models from "./models/productos.js"


const URL = "mongodb+srv://coderhouse:coderhouse@backend32190.mtjzroy.mongodb.net/ecommerce?retryWrites=true&w=majority"

mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}) 
console.log("conectados correctamente");


export class ContainerMongo { 

    async postProducts(data){ 
        const archAdd = new models.productos(data)
        const productInsert = await archAdd.save()
        return productInsert
    }

    async getProducts() {
        console.log(models);    
        const products = await models.productos.find({})
        return products;
        
    }

    async updateProduct(id, product){
        const productUpdate = await models.productos.updateOne({_id: id}, product)
        return productUpdate;
    }

    async deleteProduct(id){
        const productDelete = await models.productos.deleteOne({_id: id})
        return productDelete;
}
}


//   (async () => {
//     const container = new ContainerMongo()
//     const inserted = await container.postProducts({
//     "timestamp": 2243683245345,
//     "nombre": "Box Premium",
//     "descripcion": "Desayuno Sorpresa",
//     "codigo": "1234",
//     "precio": 1500,
//     "foto": "img.jpg",
//     "stock": 21
//   })

//     console.log('Ok', inserted);
//   })();