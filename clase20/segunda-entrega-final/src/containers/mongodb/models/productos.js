import mongoose from "mongoose";

const productosCollection = "productos";

const ProductosSchema = new mongoose.Schema({
    timestamp: Numbercl,
    nombre: String,
    descripcion: String,
    codigo: String,
    precio: Number,
    foto: String,
    stock: Number
})

export const productos = mongoose.model(productosCollection, ProductosSchema)