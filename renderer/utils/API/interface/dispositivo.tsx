// Importamos los request.
import {
    GetDispositivo,
    PostDispositivo,
    DeleteDispositivo,
    PutDispositivo,
    GetTokenDispositivo
} from "../request/dispositivo";

function ConsultaDispositivo(
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
    GetDispositivo(parametrosBusqueda).then((respuesta) => {
        // Guardamos los registros en la Dispositivo.
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

function RegistrarDispositivo(
    formRegistro: FormData
) {
    // Realizamos el request.
    PostDispositivo(formRegistro).then((respuesta) => {

    }).catch((error) => {
        // Ocurrio un errr al realizar el request.
        console.log(error);

    }).finally(() => {
    });
};

function ModificarDispositivo(
    idRegistro: number,
    formRegistro: FormData
) {
    // Creamos los parametros de busqueda de la consulta.
    const parametrosBusqueda = {
        id: idRegistro
    }

    // Realizamos el request.
    PutDispositivo(parametrosBusqueda, formRegistro).then((respuesta) => {

    }).catch((error) => {
        // Ocurrio un errr al realizar el request.
        console.log(error);

    }).finally(() => {
    });
};

function RemoverDispositivo(
    idRegistro: number
) {
    // Creamos los parametros de busqueda de la consulta.
    const parametrosBusqueda = {
        id: idRegistro
    }

    // Realizamos el request.
    DeleteDispositivo(parametrosBusqueda).then((respuesta) => {

    }).catch((error) => {
        // Ocurrio un errr al realizar el request.
        console.log(error);

    }).finally(() => {
    });
};

function GenerarTokenDispositivo(
    idRegistro: number,
    setTokenDispositivo: Function
) {
    // Creamos los parametros de busqueda de la consulta.
    const parametrosBusqueda = {
        id: idRegistro
    }

    // Realizamos el request.
    GetTokenDispositivo(parametrosBusqueda).then((respuesta) => {
        setTokenDispositivo(respuesta.data.authorization);
    }).catch((error) => {
        // Ocurrio un errr al realizar el request.
        console.log(error);

    }).finally(() => {
    });
};


export {
    ConsultaDispositivo,
    RegistrarDispositivo,
    RemoverDispositivo,
    ModificarDispositivo,
    GenerarTokenDispositivo
};