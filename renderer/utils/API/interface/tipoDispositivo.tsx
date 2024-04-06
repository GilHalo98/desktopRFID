// Importamos los request.
import {
    GetTipoDispositivo,
    PostTipoDispositivo,
    DeleteTipoDispositivo,
    PutTipoDispositivo 
} from "../request/tipoDispositivo";

function ConsultaTipoDispositivo(
    limit: number,
    offset: number,
    id: number,
    nombreTipoDispositivo: string,
    setListaRegistros: Function,
    setTotalPaginas: Function,
    setEnCarga: Function | undefined
) {
    // Creamos los parametros de busqueda de la consulta.
    const parametrosBusqueda = {
        limit: limit,
        offset: offset,
        id: id,
        nombreTipoDispositivo: nombreTipoDispositivo
    };

    // Mostramos la pantalla en carga.
    if(setEnCarga) {
        setEnCarga(true);
    }

    // Realizamos el request.
    GetTipoDispositivo(parametrosBusqueda).then((respuesta) => {
        // Guardamos los registros en la TipoDispositivo.
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

function RegistrarTipoDispositivo(
    formRegistro: FormData
) {
    // Realizamos el request.
    PostTipoDispositivo(formRegistro).then((respuesta) => {

    }).catch((error) => {
        // Ocurrio un errr al realizar el request.
        console.log(error);

    }).finally(() => {
    });
};

function ModificarTipoDispositivo(
    idRegistro: number,
    formRegistro: FormData
) {
    // Creamos los parametros de busqueda de la consulta.
    const parametrosBusqueda = {
        id: idRegistro
    }

    // Realizamos el request.
    PutTipoDispositivo(parametrosBusqueda, formRegistro).then((respuesta) => {

    }).catch((error) => {
        // Ocurrio un errr al realizar el request.
        console.log(error);

    }).finally(() => {
    });
};

function RemoverTipoDispositivo(
    idRegistro: number
) {
    // Creamos los parametros de busqueda de la consulta.
    const parametrosBusqueda = {
        id: idRegistro
    }

    // Realizamos el request.
    DeleteTipoDispositivo(parametrosBusqueda).then((respuesta) => {

    }).catch((error) => {
        // Ocurrio un errr al realizar el request.
        console.log(error);

    }).finally(() => {
    });
};

export {
    ConsultaTipoDispositivo,
    RegistrarTipoDispositivo,
    RemoverTipoDispositivo,
    ModificarTipoDispositivo
};