// Importamos los request.
import {
    GetHorario,
    PostHorario,
    PutHorario,
    DeleteHorario,
    GetHorarioCompleto,
    PutHorarioCompleto
} from "../request/horario";

function ConsultaHorario(
    onOk: Function,
    parametrosBusqueda?: {
        limit?: number,
        offset?: number,
        id?: number,
        descripcionHorario?: string,
        idEmpleadoVinculado?: number
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
    GetHorario(parametrosBusqueda).then((respuesta) => {
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

function RegistrarHorario(
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
    PostHorario(formRegistro).then((respuesta) => {
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

function ModificarHorario(
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
    PutHorario(parametrosBusqueda, formRegistro).then((respuesta) => {
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

function RemoverHorario(
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
    DeleteHorario(parametrosBusqueda).then((respuesta) => {
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

function ConsultaHorarioCompleto(
    onOk: Function,
    parametrosBusqueda?: {
        id?: number,
        numeroTelefonico?: string,
        nombres?: string,
        apellidoPaterno?: string,
        apellidoMaterno?: string,
        idRolVinculado?: number
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
    GetHorarioCompleto(parametrosBusqueda).then((respuesta) => {
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

function ModificarHorarioCompleto(
    idRegistro: number,
    formModificacion: FormData,
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
    PutHorarioCompleto(parametrosBusqueda, formModificacion).then((respuesta) => {
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
    ConsultaHorario,
    RegistrarHorario,
    ModificarHorario,
    RemoverHorario,
    ConsultaHorarioCompleto,
    ModificarHorarioCompleto
};