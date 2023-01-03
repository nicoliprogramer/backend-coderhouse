import admin from "firebase-admin";
import  serviceAccount from './config/backen32190-firebase-adminsdk-akqwa-0070e8f209.json' assert { type: "json" };;

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
  

const db = admin.firestore()

const query = db.collection("carritos")


export class ContainerCarrito {

    async getCarrito() {
        const todosLosProductos = await query.get()
        todosLosProductos.forEach( producto => {
            console.log(producto.data());
            return producto.data()
        })

    }
 

    async postCarrito(){        
        const newCarrito = await query.add({timestamp:12321312, productos: []})
        return newCarrito
    }

    async postProductoCarrito(CarritoId, producto){        
        const carrito = await query.doc(CarritoId).get()
        const listProducts = carrito.data().productos
        listProducts.push(producto)
        await query.doc(CarritoId).update({productos: listProducts})
    }


    async deleteCarrito(id){
        await query.doc(id).delete()
    }

    async deleteProductoCarrito(CarritoId, id){
        const carrito = await query.doc(CarritoId).get()
        const listProducts = carrito.data().productos

        let producto = listProducts.find(arch => arch.id === parseInt(id))
        
        if(producto == undefined){
            return console.log("producto no encontrado")
        }else {
        const include = listProducts.indexOf(producto);
            listProducts.splice(include, 1);
            await query.doc(carrito).update({productos: listProducts})
            return listProducts;
        }
    }
}
