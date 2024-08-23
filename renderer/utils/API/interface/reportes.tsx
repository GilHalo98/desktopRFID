// Importamos los request.
import {
    GetHistorialActividadMaquina,
    GetHistorialOperadoresMaquina,
    GetHistorialUsosMaquina,
    GetHorasTrabajadas
} from "../request/reportes";

function ConsultaHorasTrabajadas(
    onOk: Function,
    parametrosBusqueda?: {
        limit?: number,
        offset?: number,
        id?: string,
        nombres?: string,
        idRolVinculado?: number,
        semanaReporte?: string
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
    GetHorasTrabajadas(parametrosBusqueda).then((respuesta) => {
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

function ConsultaHistorialActividadMaquina(
    onOk: Function,
    parametrosBusqueda?: {
        id?: number,
        descripcionDispositivo?: string,
        semanaReporte?: string
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
    GetHistorialActividadMaquina(parametrosBusqueda).then((respuesta) => {
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

function ConsultaHistorialUsosMaquina(
    onOk: Function,
    parametrosBusqueda?: {
        limit?: number,
        offset?: number,
        id?: number,
        descripcionDispositivo?: string,
        semanaReporte?: string
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
    GetHistorialUsosMaquina(parametrosBusqueda).then((respuesta) => {
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

function ConsultaHistorialOperadoresMaquina(
    onOk: Function,
    parametrosBusqueda?: {
        limit?: number,
        offset?: number,
        id?: number,
        descripcionDispositivo?: string,
        semanaReporte?: string
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
    GetHistorialOperadoresMaquina(parametrosBusqueda).then((respuesta) => {
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

export {
    ConsultaHistorialOperadoresMaquina,
    ConsultaHistorialActividadMaquina,
    ConsultaHistorialUsosMaquina,
    ConsultaHorasTrabajadas,
};