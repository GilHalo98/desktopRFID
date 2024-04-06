function poblarPaginacion(
    totalPaginas: number,
    paginaActual: number,
    ventana: number
) {
    // Instanciamos una lista de las paginas a renderizar.
    var paginas = [];

    // Calculamos el limite de paginas inferior.
    const limiteInferior = paginaActual - ventana;

    // Calculamos el limite de paginas superior.
    const limiteSuperior = paginaActual + ventana;

    // Por cada pagina, en el total de paginas.
    for(var i = limiteInferior; i <= limiteSuperior; i++) {
        // Se agrega la pagina a la lista.
        if(i > 0 && i < totalPaginas + 1) {
            paginas.push(i);
        }
    }

    // Retornamos la lista.
    return paginas;
};

export {
    poblarPaginacion,
};