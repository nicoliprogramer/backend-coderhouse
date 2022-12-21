import knex from "knex";

class ClienteSQL {

    constructor(options){
        this.knex = knex(options); 
    }

    crearTabla(){
        return this.knex.schema.hasTable("desayunos")
            .finally(() => {
                return this.knex.schema.createTable("desayunos", table => {
                    table.increments("id").primary()
                    table.string("nombre", 15).notNullable()
                    table.string("codigo", 10).notNullable()
                    table.float("precio")
                    table.integer("stock")
                })
            })
    }

    insertardesayunos(desayunos){
        return this.knex("desayunos").insert(desayunos)
    }

    listardesayunos(){
        return this.knex("desayunos").select("*")
    }

    borrardesayunos(id){
        return this.knex("desayunos").where("id", "=", id).del()
    }

    actualizarStock(stock, id){
        return this.knex.from("desayunos").where("id", "=", id).update({stock:stock})
    }

    close(){
        this.knex.destroy()
    }
}

export default ClienteSQL;