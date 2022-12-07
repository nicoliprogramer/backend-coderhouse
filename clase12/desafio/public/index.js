const socketClient = io();

//Products

const productForm = document.getElementById("productForm");

productForm.addEventListener("submit", (event)=>{
    event.preventDefault();
    const product = {
        title: document.getElementById("title").value,
        price: document.getElementById("price").value,
        thumbnail: document.getElementById("thumbnail").value
    }
    //Enviar producto por socket
    socketClient.emit("newProduct", product)
})

const productsContainer = document.getElementById("productsContainer");

socketClient.on("products", async(data)=>{
    console.log(data)
    const templateTable = await fetch("./templates/table.handlebars");
    //Se convierte a formato del template
    const templateFormat = await templateTable.text();
    const template = Handlebars.compile(templateFormat);

    //  se genera el HTML con  el template y datos
    const html = template({products: data})
    productsContainer.innerHTML = html;
    console.log(html)
})

////////////////////

// chat

const chatContainer = document.getElementById("chatContainer");

socketClient.on("messagesChat", (data) => {
    console.log(data)
    let messages = "";
    data.forEach(element => {
        messages += `<p><span class="date">{${element.date}}</span>  <span class="author">${element.author}</span>
        : <span class="text">${element.text}</span></p>`
    });
    chatContainer.innerHTML = messages
})

// user
let user = "";
Swal.fire({
    title:"Bienvenido/a",
    text: "Ingrese su email",
    input: "email",
    allowOutsideClick: false
}).then(response =>{
    console.log(response)
    user = response.value;
    document.getElementById("username").innerHTML = `<span class="author">Bienvenido ${user}</span>`;
})

// enviar mensaje a server

const chatForm = document.getElementById("chatForm");

const messageChat = document.getElementById("messageChat");

chatForm.addEventListener("submit", (event)=>{
    event.preventDefault();
    const message = {
        date: new Date(Date.now()).toLocaleString(),
        author: user,
        text: messageChat.value
    }
    socketClient.emit("newMsg", message)
    messageChat.value="";
})