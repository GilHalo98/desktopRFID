// Importamos los request.
import {
    GetReporteActividad,
    PostReporteActividad,
    PutReporteActividad,
    DeleteReporteActividad
} from "../request/reporteActividad";

function ConsultaReporteActividad(
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

    // Instanciamos la promesa.
    const promesa = Promise.resolve(GetReporteActividad(parametrosBusqueda));

    // Realizamos el request.
    promesa.then((respuesta) => {
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

function RegistrarReporteActividad(
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

    // Instanciamos la promesa.
    const promesa = Promise.resolve(PostReporteActividad(formRegistro));

    // Realizamos el request.
    promesa.then((respuesta) => {
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

function ModificarReporteActividad(
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

    // Instanciamos la promesa.
    const promesa = Promise.resolve(PutReporteActividad(
        parametrosBusqueda,
        formRegistro
    ));

    // Realizamos el request.
    promesa.then((respuesta) => {
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

function RemoverReporteActividad(
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

    // Instanciamos la promesa.
    const promesa = Promise.resolve(DeleteReporteActividad(parametrosBusqueda));

    // Realizamos el request.
    promesa.then((respuesta) => {
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
    ConsultaReporteActividad,
    RegistrarReporteActividad,
    ModificarReporteActividad,
    RemoverReporteActividad
};