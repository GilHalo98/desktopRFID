// Importamos los request.
import {
    GetReporteDispositivo,
    PostReporteDispositivo,
    PutReporteDispositivo,
    DeleteReporteDispositivo
} from "../request/reporteDispositivo";

function ConsultaReporteDispositivo(
    onOk: Function,
    parametrosBusqueda?: {
        limit?: number,
        offset?: number,
        id?: number,
        idReporteVinculado?: number,
        idEmpleadoVinculado?: number,
        idDispositivoVinculado?: number
    },
    onError?: Function,
    onAntes?: Function,
    onFinalizar?: Function
) {
    if(typeof onAntes != 'undefined') {
        // Ejecutamos la funcion de antes de realizar el request.
        onAntes();
    }

    // Realizamos el request.
    GetReporteDispositivo(parametrosBusqueda).then((respuesta) => {
        // Al cumplirse el request, se ejecuta la función.
        onOk(respuesta.data);

    }).catch((error) => {
        if(typeof onError != 'undefined') {
            // Al ocurrir un error con el reques, ejecutamos la función.
            onError(error);
        }

    }).finally(() => {
        if(typeof onFinalizar != 'undefined') {
            // Al terminar el request, se ejecuta la función.
            onFinalizar();
        }

    });
};

function RegistrarReporteDispositivo(
    formRegistro: FormData,
    onOk?: Function,
    onError?: Function,
    onAntes?: Function,
    onFinalizar?: Function
) {
    if(typeof onAntes != 'undefined') {
        // Ejecutamos la funcion de onAntes.
        onAntes();
    }

    // Realizamos el request.
    PostReporteDispositivo(formRegistro).then((respuesta) => {
        if(typeof onOk != 'undefined') {
            // Ejecutamos la funcion de onOk.
            onOk(respuesta.data);
        }

    }).catch((error) => {
        // Ocurrio un errr al realizar el request.
        if(typeof onError != 'undefined') {
            // Ejecutamos la funcion de onError.
            onError(error);
        }

    }).finally(() => {
        if(typeof onFinalizar != 'undefined') {
            // Ejecutamos la funcion de onFinalizar.
            onFinalizar();
        }

    });
};

function ModificarReporteDispositivo(
    idRegistro: number,
    formRegistro: FormData,
    onOk?: Function,
    onError?: Function,
    onAntes?: Function,
    onFinalizar?: Function
) {
    // Creamos los parametros de busqueda de la consulta.
    const parametrosBusqueda = {
        id: idRegistro
    }

    if(typeof onAntes != 'undefined') {
        // Ejecutamos la funcion de onAntes.
        onAntes();
    }

    // Realizamos el request.
    PutReporteDispositivo(parametrosBusqueda, formRegistro).then((respuesta) => {
        if(typeof onOk != 'undefined') {
            // Ejecutamos la funcion de onOk.
            onOk(respuesta.data);
        }

    }).catch((error) => {
        // Ocurrio un errr al realizar el request.
        if(typeof onError != 'undefined') {
            // Ejecutamos la funcion de onError.
            onError(error);
        }

    }).finally(() => {
        if(typeof onFinalizar != 'undefined') {
            // Ejecutamos la funcion de onFinalizar.
            onFinalizar();
        }

    });
};

function RemoverReporteDispositivo(
    idRegistro: number,
    onOk?: Function,
    onError?: Function,
    onAntes?: Function,
    onFinalizar?: Function
) {
    // Creamos los parametros de busqueda de la consulta.
    const parametrosBusqueda = {
        id: idRegistro
    }

    if(typeof onAntes != 'undefined') {
        // Ejecutamos la funcion de onAntes.
        onAntes();
    }

    // Realizamos el request.
    DeleteReporteDispositivo(parametrosBusqueda).then((respuesta) => {
        if(typeof onOk != 'undefined') {
            // Ejecutamos la funcion de onOk.
            onOk(respuesta.data);
        }

    }).catch((error) => {
        // Ocurrio un errr al realizar el request.
        if(typeof onError != 'undefined') {
            // Ejecutamos la funcion de onError.
            onError(error);
        }

    }).finally(() => {
        if(typeof onFinalizar != 'undefined') {
            // Ejecutamos la funcion de onFinalizar.
            onFinalizar();
        }

    });
};

export {
    ConsultaReporteDispositivo,
    RegistrarReporteDispositivo,
    ModificarReporteDispositivo,
    RemoverReporteDispositivo
};