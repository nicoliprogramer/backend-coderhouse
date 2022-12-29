import mongoose from "mongoose";
import * as models from "./models/usuario.js"

const URL = "mongodb+srv://coderhouse:coderhouse@backend32190.mtjzroy.mongodb.net/ecommerce?retryWrites=true&w=majority"

try{
await mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}) 

console.log("conectados correctamente");

    const usuarios = await models.usuarios.find()
    console.log(usuarios);

    const newUsuario = new models.usuarios({
        nombre: "Federico",
        apellido: "Perez",
        dni: "343434324"
    })
    await newUsuario.save()
    console.log("Usuario agregado correctamente");


}catch(err){
    console.log(err);
}finally{
    mongoose.disconnect()
}