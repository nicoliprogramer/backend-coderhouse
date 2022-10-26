class Usuario {
    constructor(nombre, apellido, libros, mascotas) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }

    getFullName() {
        return `Buenas, yo soy ${this.nombre} ${this.apellido}` //
    }

    addMascota(newMascota) {
        return (this.mascotas.push(newMascota));
    }

    countMascotas() {
        return (`Mi número de mascotas es de: ${this.mascotas.length}`);
    }

    addBook(book, autor) {
        return (this.libros.push({ book, autor }));
    }

    getBooksNames() {
        const mapBooks = this.libros.map(book => book.book)
        console.log(`Poseo estos libros: ${mapBooks}`);
    }
};


const personaje = new Usuario("Arturo", "Asmel", [], []);
console.log(personaje.getFullName());


personaje.addMascota("elnegro");
personaje.addMascota("frodo");
console.log(personaje.countMascotas());


personaje.addBook("Biblia", "dios");
personaje.addBook(" Luna de Plutón", "Dross");
personaje.getBooksNames()