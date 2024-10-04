// Importamos los request.
import {
    GetTipoReporte,
    PostTipoReporte,
    DeleteTipoReporte,
    PutTipoReporte 
} from "../request/tipoReporte";

function ConsultaTipoReporte(
    onOk: Function,
    parametrosBusqueda?: {
        limit?: number,
        offset?: number,
        id?: number,
        clasificacionReporte?: string
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
    const promesa = Promise.resolve(GetTipoReporte(parametrosBusqueda));

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

function RegistrarTipoReporte(
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
    const promesa = Promise.resolve(PostTipoReporte(formRegistro));

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

function ModificarTipoReporte(
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
    const promesa = Promise.resolve(PutTipoReporte(
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

function RemoverTipoReporte(
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
    const promesa = Promise.resolve(DeleteTipoReporte(parametrosBusqueda));

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
    ConsultaTipoReporte,
    RegistrarTipoReporte,
    RemoverTipoReporte,
    ModificarTipoReporte
};