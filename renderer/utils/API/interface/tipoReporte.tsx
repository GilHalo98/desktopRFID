// Importamos los request.
import {
    GetTipoReporte,
    PostTipoReporte,
    DeleteTipoReporte,
    PutTipoReporte 
} from "../request/tipoReporte";

function ConsultaTipoReporte(
    limit: number,
    offset: number,
    id: number,
    clasificacionReporte: string,
    setListaRegistros: Function,
    setTotalPaginas: Function,
    setEnCarga: Function | undefined
) {
    // Creamos los parametros de busqueda de la consulta.
    const parametrosBusqueda = {
        limit: limit,
        offset: offset,
        id: id,
        clasificacionReporte: clasificacionReporte
    };

    // Mostramos la pantalla en carga.
    if(setEnCarga) {
        setEnCarga(true);
    }

    // Realizamos el request.
    GetTipoReporte(parametrosBusqueda).then((respuesta) => {
        // Guardamos los registros en la TipoReporte.
        setListaRegistros(respuesta.data.registros);

        if(setTotalPaginas) {
            // Guardamos el total de paginas en la variable.
            setTotalPaginas(Math.ceil(respuesta.data.totalRegistros / limit));
        }

    }).catch((error) => {
        // Ocurrio un errr al realizar el request.
        console.log(error);

    }).finally(() => {
        // Marcamos que la carga de datos termino.
        if(setEnCarga) {
            setEnCarga(false);
        }
    });
};

function RegistrarTipoReporte(
    formRegistro: FormData
) {
    // Realizamos el request.
    PostTipoReporte(formRegistro).then((respuesta) => {

    }).catch((error) => {
        // Ocurrio un errr al realizar el request.
        console.log(error);

    }).finally(() => {
    });
};

function ModificarTipoReporte(
    idRegistro: number,
    formRegistro: FormData
) {
    // Creamos los parametros de busqueda de la consulta.
    const parametrosBusqueda = {
        id: idRegistro
    }

    // Realizamos el request.
    PutTipoReporte(parametrosBusqueda, formRegistro).then((respuesta) => {

    }).catch((error) => {
        // Ocurrio un errr al realizar el request.
        console.log(error);

    }).finally(() => {
    });
};

function RemoverTipoReporte(
    idRegistro: number
) {
    // Creamos los parametros de busqueda de la consulta.
    const parametrosBusqueda = {
        id: idRegistro
    }

    // Realizamos el request.
    DeleteTipoReporte(parametrosBusqueda).then((respuesta) => {

    }).catch((error) => {
        // Ocurrio un errr al realizar el request.
        console.log(error);

    }).finally(() => {
    });
};

export {
    ConsultaTipoReporte,
    RegistrarTipoReporte,
    RemoverTipoReporte,
    ModificarTipoReporte
};