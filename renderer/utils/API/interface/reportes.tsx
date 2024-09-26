// Importamos los request.
import {
    GetHorasTrabajadas,
    GetHistorialUsosMaquina,
    GetHistorialActividadMaquina,
    GetHistorialOperadoresMaquina,
    getHorasTrabajadasDetalleGeneral,
    getHorasTrabajadasDetalleTracker,
    getHorasTrabajadasDetalleResumen,
    getHorasTrabajadasDetalleChequeos,
    getHorasTrabajadasDetalleAccesosZona,
    getHorasTrabajadasDetalleIntentosAccesos,
    getHorasTrabajadasDetalleRegistrosReporte,
    getHorasTrabajadasDetalleIntentoActividad,
    getHorasTrabajadasDetalleActividadDispositivo,
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

/**
 * Requests de la vista del reporte de horas trabajadas a detalle.
 */

function ConsultaHorasTrabajadasDetalleGeneral(
    onOk: Function,
    parametrosBusqueda?: {
        idEmpleadoVinculado?: string,
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
    getHorasTrabajadasDetalleGeneral(
        parametrosBusqueda
    ).then((respuesta) => {
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

function ConsultaHorasTrabajadasDetalleTracker(
    onOk: Function,
    parametrosBusqueda?: {
        idEmpleadoVinculado?: string,
        semanaReporte?: string,
        dia?: number
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
    getHorasTrabajadasDetalleTracker(
        parametrosBusqueda
    ).then((respuesta) => {
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

function ConsultaHorasTrabajadasDetalleResumen(
    onOk: Function,
    parametrosBusqueda?: {
        idEmpleadoVinculado?: string,
        semanaReporte?: string,
        dia?: number
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
    getHorasTrabajadasDetalleResumen(
        parametrosBusqueda
    ).then((respuesta) => {
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

function ConsultaHorasTrabajadasDetalleChequeos(
    onOk: Function,
    parametrosBusqueda?: {
        idEmpleadoVinculado?: string,
        semanaReporte?: string,
        dia?: number
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
    getHorasTrabajadasDetalleChequeos(
        parametrosBusqueda
    ).then((respuesta) => {
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

function ConsultaHorasTrabajadasDetalleAccesosZona(
    onOk: Function,
    parametrosBusqueda?: {
        limit?: number,
        offset?: number,
        idEmpleadoVinculado?: string,
        idZonaVinculada?: string,
        semanaReporte?: string,
        dia?: number
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
    getHorasTrabajadasDetalleAccesosZona(
        parametrosBusqueda
    ).then((respuesta) => {
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

function ConsultaHorasTrabajadasDetalleIntentosAccesos(
    onOk: Function,
    parametrosBusqueda?: {
        limit?: number,
        offset?: number,
        idEmpleadoVinculado?: string,
        semanaReporte?: string,
        dia?: number
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
    getHorasTrabajadasDetalleIntentosAccesos(
        parametrosBusqueda
    ).then((respuesta) => {
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

function ConsultaHorasTrabajadasDetalleRegistrosReporte(
    onOk: Function,
    parametrosBusqueda?: {
        idEmpleadoVinculado?: string,
        idZonaVinculada?: string,
        semanaReporte?: string,
        dia?: number
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
    getHorasTrabajadasDetalleRegistrosReporte(
        parametrosBusqueda
    ).then((respuesta) => {
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

function ConsultaHorasTrabajadasDetalleIntentoActividad(
    onOk: Function,
    parametrosBusqueda?: {
        limit?: number,
        offset?: number,
        idEmpleadoVinculado?: string,
        idDispositivoVinculado?: string,
        semanaReporte?: string,
        dia?: number
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
    getHorasTrabajadasDetalleIntentoActividad(
        parametrosBusqueda
    ).then((respuesta) => {
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

function ConsultaHorasTrabajadasDetalleActividadDispositivo(
    onOk: Function,
    parametrosBusqueda?: {
        limit?: number,
        offset?: number,
        idEmpleadoVinculado?: string,
        idDispositivoVinculado?: string,
        semanaReporte?: string,
        dia?: number
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
    getHorasTrabajadasDetalleActividadDispositivo(
        parametrosBusqueda
    ).then((respuesta) => {
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
    ConsultaHorasTrabajadas,
    ConsultaHistorialUsosMaquina,
    ConsultaHistorialActividadMaquina,
    ConsultaHistorialOperadoresMaquina,
    ConsultaHorasTrabajadasDetalleGeneral,
    ConsultaHorasTrabajadasDetalleTracker,
    ConsultaHorasTrabajadasDetalleResumen,
    ConsultaHorasTrabajadasDetalleChequeos,
    ConsultaHorasTrabajadasDetalleAccesosZona,
    ConsultaHorasTrabajadasDetalleIntentosAccesos,
    ConsultaHorasTrabajadasDetalleRegistrosReporte,
    ConsultaHorasTrabajadasDetalleIntentoActividad,
    ConsultaHorasTrabajadasDetalleActividadDispositivo,
};