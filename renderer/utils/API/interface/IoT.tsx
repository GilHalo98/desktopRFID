// Importamos los request.
import {
    GetIoT,
    PostIoT,
    DeleteIoT,
    PutIoT,
    GetTokenIoT
} from "../request/IoT";

function ConsultaIoT(
    limit: number,
    offset: number,
    id: number,
    idZonaVinculada: number,
    idTipoDispositivoVinculado: number,
    setListaRegistros: Function,
    setTotalPaginas: Function,
    setEnCarga: Function | undefined
) {
    // Creamos los parametros de busqueda de la consulta.
    const parametrosBusqueda = {
        limit: limit,
        offset: offset,
        id: id,
        idZonaVinculada: idZonaVinculada,
        idTipoDispositivoVinculado: idTipoDispositivoVinculado
    };

    // Mostramos la pantalla en carga.
    if(setEnCarga) {
        setEnCarga(true);
    }

    // Realizamos el request.
    GetIoT(parametrosBusqueda).then((respuesta) => {
        // Guardamos los registros en la IoT.
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

function RegistrarIoT(
    formRegistro: FormData
) {
    // Realizamos el request.
    PostIoT(formRegistro).then((respuesta) => {

    }).catch((error) => {
        // Ocurrio un errr al realizar el request.
        console.log(error);

    }).finally(() => {
    });
};

function ModificarIoT(
    idRegistro: number,
    formRegistro: FormData
) {
    // Creamos los parametros de busqueda de la consulta.
    const parametrosBusqueda = {
        id: idRegistro
    }

    // Realizamos el request.
    PutIoT(parametrosBusqueda, formRegistro).then((respuesta) => {

    }).catch((error) => {
        // Ocurrio un errr al realizar el request.
        console.log(error);

    }).finally(() => {
    });
};

function RemoverIoT(
    idRegistro: number
) {
    // Creamos los parametros de busqueda de la consulta.
    const parametrosBusqueda = {
        id: idRegistro
    }

    // Realizamos el request.
    DeleteIoT(parametrosBusqueda).then((respuesta) => {

    }).catch((error) => {
        // Ocurrio un errr al realizar el request.
        console.log(error);

    }).finally(() => {
    });
};

function GenerarTokenIoT(
    idRegistro: number,
    setTokenIoT: Function
) {
    // Creamos los parametros de busqueda de la consulta.
    const parametrosBusqueda = {
        id: idRegistro
    }

    // Realizamos el request.
    GetTokenIoT(parametrosBusqueda).then((respuesta) => {
        setTokenIoT(respuesta.data.authorization);
    }).catch((error) => {
        // Ocurrio un errr al realizar el request.
        console.log(error);

    }).finally(() => {
    });
};


export {
    ConsultaIoT,
    RegistrarIoT,
    RemoverIoT,
    ModificarIoT,
    GenerarTokenIoT
};