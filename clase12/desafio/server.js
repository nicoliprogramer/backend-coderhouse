const {config} = require ("./options/mysqlconn")
const ClienteSQL = require ("./sqlContainer")

const chatConfig = require("./options/sqlite3")


// -------------------------------------------------------
const express = require('express');
const handlebars = require('express-handlebars');
const { Server } = require('socket.io');
const path = require('path');



const viewsFolder = path.join(__dirname, "views");

const app = express();

const PORT = 8080;

const server = app.listen(PORT, () => console.log("Server is runner in " + PORT));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"))

app.engine("handlebars", handlebars.engine());

app.set("views", viewsFolder);

app.set("view engine", "handlebars");

//Websocket

const io = new Server(server);


// --------------------------------------------------------------------------------------
const sql = new ClienteSQL(config)
const sqlChat = new ClienteSQL(chatConfig)

sql.crearTabla()
console.log("Tabla creada");
sql.crearChat()
console.log("Chat creado");

//---------------------------------------------------------------------------------------


//Detectar cada socket de un cliente que se conecte
io.on("connection", async (socket) => {
    console.log("Un nuevo cliente se ha conectado");


    //Chat
    const chat = await sqlChat.listarArticulos();
    socket.emit("messagesChat", chat);

    //Products
        const products = await sql.listarArticulos();
        socket.emit("products", products);

        // msj
       socket.on("newMsg", async (data) => {
        await sqlChat.insertarChat(data)

        // enviar msjs a todos los sockets
        const chat = await sqlChat.listarChat();
        io.sockets.emit("messagesChat", chat)
    })

    //Recibir Producto
    socket.on("newProduct", async (data) => {
        await sql.insertarArticulos(data)
        //Enviar productos actualizados
        const products = await sql.listarArticulos();
        io.sockets.emit("products", products)
    })
})

app.get('/', (req, res) => {
    res.render("home")
})