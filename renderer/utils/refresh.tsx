// Cambiamos el valor de refresh para activar el refrescamiento.
function funcionRefresh(
    refresh: boolean,
    setRefresh: Function
) {
    setRefresh(!refresh);
};

export {
    funcionRefresh
};