// Importamos los request.
import {
    GetZona,
    PostZona,
    DeleteZona,
    PutZona 
} from "../request/zona";

function ConsultaZona(
    limit: number,
    offset: number,
    id: number,
    nombreZona: string,
    descripcionZona: string,
    bitZona: number,
    setListaRegistros: Function,
    setTotalPaginas: Function,
    setEnCarga: Function | undefined
) {
    // Creamos los parametros de busqueda de la consulta.
    const parametrosBusqueda = {
        limit: limit,
        offset: offset,
        id: id,
        nombreZona: nombreZona,
        descripcionZona: descripcionZona,
        bitZona: bitZona,
    };

    // Mostramos la pantalla en carga.
    if(setEnCarga) {
        setEnCarga(true);
    }

    // Realizamos el request.
    GetZona(parametrosBusqueda).then((respuesta) => {
        // Guardamos los registros en la Zona.
        setListaRegistros(respuesta.data.registros);

        if(setTotalPaginas) {
            // Guardamos el total de paginas en la variable.
            setTotalPaginas(Math.ceil(respuesta.data.totalRegistros / limit));
        }

    }).catch((error) => {
        // Ocurrio un errr al realizar el request.
        console.log(error);

    }).finally(() => {
        // Mostramos la pantalla en carga.
        if(setEnCarga) {
            setEnCarga(false);
        }
    });
};

function RegistrarZona(
    formRegistro: FormData
) {
    // Realizamos el request.
    PostZona(formRegistro).then((respuesta) => {

    }).catch((error) => {
        // Ocurrio un errr al realizar el request.
        console.log(error);

    }).finally(() => {
    });
};

function RemoverZona(
    idRegistro: number
) {
    // Creamos los parametros de busqueda de la consulta.
    const parametrosBusqueda = {
        id: idRegistro
    }

    // Realizamos el request.
    DeleteZona(parametrosBusqueda).then((respuesta) => {

    }).catch((error) => {
        // Ocurrio un errr al realizar el request.
        console.log(error);

    }).finally(() => {
    });
}

function ModificarZona(
    idRegistro: number,
    formRegistro: FormData
) {
    // Creamos los parametros de busqueda de la consulta.
    const parametrosBusqueda = {
        id: idRegistro,
    }

    // Realizamos el request.
    PutZona(parametrosBusqueda, formRegistro).then((respuesta) => {

    }).catch((error) => {
        // Ocurrio un errr al realizar el request.
        console.log(error);

    }).finally(() => {
    });
}

export {
    ConsultaZona,
    RegistrarZona,
    RemoverZona,
    ModificarZona
};