const numerosSalidos = {}

generarNumeroAleatorio = () => {
    return parseInt(Math.random() * 20) + 1;
}

for (let i = 1; i <= 10000; i++) {
    const numero = generarNumeroAleatorio();
    if (!numerosSalidos[numero]) {
        numerosSalidos[numero] = 1
    }

    numerosSalidos[numero]++

}

console.log(numerosSalidos);

//ns = ver & n = ama