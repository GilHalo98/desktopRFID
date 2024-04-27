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
    registrosPorPagina: number,
    setPaginaActual: Function,
    setOffset: Function
) {
    setPaginaActual(paginaActual - 1);
    setOffset(offset - registrosPorPagina);
};

function siguientePagina(
    paginaActual: number,
    offset: number,
    registrosPorPagina: number,
    setPaginaActual: Function,
    setOffset: Function
) {
    setPaginaActual(paginaActual + 1);
    setOffset(offset + registrosPorPagina);
};

function ultimaPagina(
    totalPaginas: number,
    registrosPorPagina: number,
    setPaginaActual: Function,
    setOffset: Function
) {
    setPaginaActual(totalPaginas);
    setOffset(registrosPorPagina*(totalPaginas - 1));
};


function haciaPagina(
    pagina: number,
    registrosPorPagina: number,
    setPaginaActual: Function,
    setOffset: Function
) {
    setPaginaActual(pagina);
    setOffset((pagina - 1) * registrosPorPagina);
};

export {
    primeraPagina,
    siguientePagina,
    ultimaPagina,
    anteriorPagina,
    haciaPagina
};