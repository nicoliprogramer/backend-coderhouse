import mongoose from "mongoose";
import * as models from "./models/productos.js"


const URL = "mongodb+srv://coderhouse:coderhouse@backend32190.mtjzroy.mongodb.net/?retryWrites=true&w=majority"

await mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}) 
console.log("conectados correctamente");


export class containerMongo {

    async postProducts(data){        
        const archAdd = new models(data)
        const productInsert = await archAdd.save()
        return productInsert;
    }

    async getProducts(id) {
        const productId = id
        if(productId){
            const product = await models.findById(productId)
            return product
        }else{
            const product = models.find()
            return product
        }
    }

    async updateProduct(id, product){
        const productUpdate = await models.updateOne({_id: id}, product)
        return productUpdate;
    }

    async deleteProduct(id){
        const productDelete = await models.deleteOne({_id: id})
        return productDelete;
}
}