import knex from "knex"

class ClienteSQL {

    constructor(options) {
        this.knex = knex(options)
    }

    crearTabla() {
        this.knex.schema.hasTable("productsList")
            .then(() => {
                return this.knex.schema.createTable("productsList", table => {
                    table.increments("id").primary()
                    table.string("title", 20).notNullable()
                    table.string("thumbnail", 30).notNullable()
                    table.float("price")
                })
            .catch(() => {
                console.log("existente")
            })
        })
    }


    insertarArticulos(articulos) {
        return this.knex("productsList").insert(articulos)
    }

    listarArticulos() {
        return this.knex("productsList").select('*')
    }

    borrarArticulos(id) {
        return this.knex.from("productsList").where('id', '=', id).del()
    }

    actualizarStock(obj, id) {
        return this.knex.from("productsList").where('id', '=', id).update({obj})
    }


    crearChat() {
        this.knex.schema.hasTable("productsList")
            .then(() => {
                return this.knex.schema.createTable("unChat", table => {
                    table.increments("id").primary()
                    table.string("email", 30)
                    table.string("date", 50)
                    table.string("text", 50)
                })
            .catch(() => {
                console.log("existente")
            })
        })
    }

    insertarChat(msj) {
        return this.knex("unChat").insert(msj)
    }

    listarChat() {
        return this.knex("unChat").select('*')
    }

    close() {
        this.knex.destroy()
    }
}

export default ClienteSQL;