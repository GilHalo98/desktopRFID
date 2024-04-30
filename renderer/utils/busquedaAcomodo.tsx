// Buscamos el registro vinculado perteneciente.
const buscarRegistroVinculado = (
    idBuscado: number,
    listaRegistros: any[]
) => {
    for(let i = 0; i < listaRegistros.length; i++) {
        const registro = listaRegistros[i];

        if(idBuscado == registro.id) {
            return registro;
        }
    }
}

export {
    buscarRegistroVinculado
};