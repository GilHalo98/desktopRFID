function primeraPagina(
    setPaginaActual: Function,
    setOffset: Function
) {
    setPaginaActual(1);
    setOffset(0);
};

function anteriorPagina(
    paginaActual: number,
    offset: number,
    elementos: number,
    setPaginaActual: Function,
    setOffset: Function
) {
    setPaginaActual(paginaActual - 1);
    setOffset(offset - elementos);
};

function siguientePagina(
    paginaActual: number,
    offset: number,
    elementos: number,
    setPaginaActual: Function,
    setOffset: Function
) {
    setPaginaActual(paginaActual + 1);
    setOffset(offset + elementos);
};

function ultimaPagina(
    totalPaginas: number,
    elementos: number,
    setPaginaActual: Function,
    setOffset: Function
) {
    setPaginaActual(totalPaginas);
    setOffset(elementos*(totalPaginas - 1));
};


function haciaPagina(
    pagina: number,
    elementos: number,
    setPaginaActual: Function,
    setOffset: Function
) {
    setPaginaActual(pagina);
    setOffset((pagina - 1) * elementos);
};

export {
    primeraPagina,
    siguientePagina,
    ultimaPagina,
    anteriorPagina,
    haciaPagina
};