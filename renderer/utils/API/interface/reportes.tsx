// Importamos los request.
import {
    GetHorasTrabajadas,
    GetHistorialUsosMaquina,
    GetHistorialActividadMaquina,
    GetHistorialOperadoresMaquina,
    GetHorasTrabajadasDetalleGeneral,
    GetHorasTrabajadasDetalleTracker,
    GetHorasTrabajadasDetalleResumen,
    GetHorasTrabajadasDetalleChequeos,
    GetHorasTrabajadasDetalleDiasHorario,
    GetHorasTrabajadasDetalleAccesosZona,
    GetHorasTrabajadasDetalleIntentosAccesos,
    GetHorasTrabajadasDetalleRegistrosReporte,
    GetHorasTrabajadasDetalleIntentoActividad,
    GetHorasTrabajadasDetalleActividadDispositivo,
} from "../request/reportes";

import {
    GetEmpleado
} from "../request/empleado";

// Modelo de datos de los reportes
import {
    ReporteHorasTrabajadasDetalle,
    ReporteHorasTrabajadasDetallePorDia
} from "../../interfaces/reporteHorasTrabajadasDetalle";

function ConsultaHorasTrabajadas(
    onOk: Function,
    parametrosBusqueda?: {
        limit?: number,
        offset?: number,
        idEmpleadoVinculado?: string,
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

    // Instanciamos la promesa.
    const promesa = Promise.resolve(GetHorasTrabajadas(
        parametrosBusqueda
    ));

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

    // Instanciamos la promesa.
    const promesa = Promise.resolve(GetHistorialActividadMaquina(
        parametrosBusqueda
    ));

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

    // Instanciamos la promesa.
    const promesa = Promise.resolve(GetHistorialUsosMaquina(
        parametrosBusqueda
    ));

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

    // Instanciamos la promesa.
    const promesa = Promise.resolve(GetHistorialOperadoresMaquina(
        parametrosBusqueda
    ));

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

    // Instanciamos la promesa.
    const promesa = Promise.resolve(GetHorasTrabajadasDetalleGeneral(
        parametrosBusqueda
    ));

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

    // Instanciamos la promesa.
    const promesa = Promise.resolve(GetHorasTrabajadasDetalleTracker(
        parametrosBusqueda
    ));

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

    // Instanciamos la promesa.
    const promesa = Promise.resolve(GetHorasTrabajadasDetalleResumen(
        parametrosBusqueda
    ));

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

    // Instanciamos la promesa.
    const promesa = Promise.resolve(GetHorasTrabajadasDetalleChequeos(
        parametrosBusqueda
    ));

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

    // Instanciamos la promesa.
    const promesa = Promise.resolve(GetHorasTrabajadasDetalleAccesosZona(
        parametrosBusqueda
    ));

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

    // Instanciamos la promesa.
    const promesa = Promise.resolve(GetHorasTrabajadasDetalleIntentosAccesos(
        parametrosBusqueda
    ));

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

function ConsultaHorasTrabajadasDetalleRegistrosReporte(
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

    // Instanciamos la promesa.
    const promesa = Promise.resolve(GetHorasTrabajadasDetalleRegistrosReporte(
        parametrosBusqueda
    ));

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

    // Instanciamos la promesa.
    const promesa = Promise.resolve(GetHorasTrabajadasDetalleIntentoActividad(
        parametrosBusqueda
    ));

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

    // Instanciamos la promesa.
    const promesa = Promise.resolve(GetHorasTrabajadasDetalleActividadDispositivo(
        parametrosBusqueda
    ));

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

function ConsultaHorasTrabajadasDetalleDiasHorario(
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

    // Instanciamos la promesa.
    const promesa = Promise.resolve(GetHorasTrabajadasDetalleDiasHorario(
        parametrosBusqueda
    ));

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

/**
 * Request para el reporte completo.
 */

async function consultarReportesPorDia(
    dia: number,
    promesas: any [],
    parametrosBusqueda?: {
        idEmpleadoVinculado?: string,
        semanaReporte?: string
    }
) {
    // Consultamos los datos dependientes del dia de la semana.
    if(dia <= 7) {
        // Consultamos los registros de chequeos.
        promesas.push(Promise.resolve(GetHorasTrabajadasDetalleChequeos({
            idEmpleadoVinculado: parametrosBusqueda.idEmpleadoVinculado,
            semanaReporte: parametrosBusqueda.semanaReporte,
            dia: dia
        })));

        const registrosReporte = await GetHorasTrabajadasDetalleRegistrosReporte({
            idEmpleadoVinculado: parametrosBusqueda.idEmpleadoVinculado,
            semanaReporte: parametrosBusqueda.semanaReporte,
            dia: dia
        });

        // Desempaquetamos los datos de la consulta
        const listaIdsZonas: string [] = registrosReporte.data.registrosZonas;
        const listaIdsDispositivos: string [] = registrosReporte.data.registrosDispositivos;

        // Por cada zona.
        for(let i = 0; i < listaIdsZonas.length; i ++) {
            // Desempaquetamos el id de la zona.
            const idZona: string = listaIdsZonas[i];

            // Consultamos la lista de accesos por zona.
            promesas.push(Promise.resolve(
                GetHorasTrabajadasDetalleAccesosZona({
                    idEmpleadoVinculado: parametrosBusqueda.idEmpleadoVinculado,
                    idZonaVinculada: idZona,
                    semanaReporte: parametrosBusqueda.semanaReporte,
                    dia: dia
                })
            ));
        }

        // Por cada dispositivo.
        for(let i = 0; i < listaIdsDispositivos.length; i ++) {
            // Desempaquetamos el id del dispositivo.
            const idDispositivo: string = listaIdsDispositivos[i];

            // Consultamos la lista de accesos por zona.
            promesas.push(Promise.resolve(
                GetHorasTrabajadasDetalleActividadDispositivo({
                    idEmpleadoVinculado: parametrosBusqueda.idEmpleadoVinculado,
                    idDispositivoVinculado: idDispositivo,
                    semanaReporte: parametrosBusqueda.semanaReporte,
                    dia: dia
                })
            ));
        };

        // Recursamos la funcion con el día siguiente.
        await consultarReportesPorDia(
            dia + 1,
            promesas,
            parametrosBusqueda
        );
    }
};

function ReporteCompletoHorasTrabajadasDetalle(
    onOk: Function,
    parametrosBusqueda?: {
        idEmpleadoVinculado?: string,
        semanaReporte?: string
    },
    onError?: Function,
    onAntes?: Function,
    onFinalizar?: Function
) {
    /**
     * Esta interfaz recopila todos los request para generar un
     * documento con el reporte de las horas trabajadas a detalle del
     * empleado.
     */

    if(typeof onAntes != 'undefined') {
        // Ejecutamos la funcion de antes de realizar el request.
        onAntes();
    }

    // Instanciamos la lista de las promesas.
    const promesas: any [] = [];

    // Promesa de datos del empleado.
    promesas.push(Promise.resolve(GetEmpleado(
        { id: parametrosBusqueda.idEmpleadoVinculado }
    )));

    // Promesa de datos generales del reporte.
    promesas.push(Promise.resolve(GetHorasTrabajadasDetalleGeneral(
        parametrosBusqueda
    )));

    // Funcion recursiva asincrona para poder consultar los reportes
    // por dia.
    consultarReportesPorDia(
        1,
        promesas,
        parametrosBusqueda
    ).then(() => {
        // Resolvemos todas las promesas.
        Promise.all(promesas).then((respuestas: any []) => {
            // Formateamos la respuesta como el reporte.
            const reporte = {} as ReporteHorasTrabajadasDetalle;

            // Dia del reporte.
            let indexDia: number = -1;

            // Inicializamos los reportes por dia.
            reporte.porDia = [];
            for(let i = 0; i < 7; i++) {
                reporte.porDia.push({} as ReporteHorasTrabajadasDetallePorDia);
                reporte.porDia[i].accesos = [];
                reporte.porDia[i].actividades = [];
            }

            // Mapeamos los datos de las respuestas con el reporte.
            respuestas.forEach((respuesta: any, index: number) => {
                /**
                 * Evaluamos el index del reporte, dependidendo del index
                 * guardamos el reporte.
                 */
                switch(index) {
                    // Si es el primer reporte, se mapea a los
                    // datos del empleado.
                    case 0:
                        reporte.datosEmpleado = respuesta.data.registros[0];

                        break;

                    // Si es el segundo reporte, este se mapea
                    // en el general.
                    case 1:
                        reporte.general = respuesta.data.reporte;

                        break;
                
                    default:
                        // Desempaquetamos el dia del reporte.
                        indexDia = respuesta.config.params.dia - 1;

                        // Desempaquetamos los datos para saber el tipo
                        // de reporte a guardar.
                        const idZona = respuesta.config.params.idZonaVinculada;
                        const idEmpleado = respuesta.config.params.idEmpleadoVinculado;
                        const idDispositivo = respuesta.config.params.idDispositivoVinculado;

                        // Verificamos que el reporte sea de tipo acceso.
                        if(typeof idZona != 'undefined') {
                            // Guardamos los datos en el reporte.
                            reporte.porDia[
                                indexDia
                            ].accesos.push({
                                idZonaVinculada: idZona,
                                nombreZona: respuesta.data.zona.nombreZona,
                                reporte: respuesta.data.reporte
                            });

                        } else {
                            // Verificamos que el reporte sea de
                            // tipo actividad.
                            if(typeof idDispositivo != 'undefined') {
                                // Guardamos los datos en el reporte.
                                reporte.porDia[
                                    indexDia
                                ].actividades.push({
                                    idDispositivoVinculado: idDispositivo,
                                    nombreDispositivo: respuesta.data.dispositivo.nombreDispositivo,
                                    reporte: respuesta.data.reporte
                                });
                            } else {
                                // Verificamos que el reporte sea
                                // de tipo chequeos.
                                if(typeof idEmpleado != 'undefined') {
                                    reporte.porDia[
                                        indexDia
                                    ].chequeos = respuesta.data.reporte;
                                }
                            }
                        }

                        break;
                }
            });

            // Ejecutamos la funcion onOk.
            onOk(reporte);

        }).catch(error => {
            console.log(error);

            if(typeof onError != 'undefined') {
                // Al ocurrir un error con el reques, ejecutamos
                // la función.
                onError(error);
            }

        }).finally(() => {
            if(typeof onFinalizar != 'undefined') {
                // Al terminar el request, se ejecuta la función.
                onFinalizar();
            }
        });
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
    ReporteCompletoHorasTrabajadasDetalle,
    ConsultaHorasTrabajadasDetalleChequeos,
    ConsultaHorasTrabajadasDetalleDiasHorario,
    ConsultaHorasTrabajadasDetalleAccesosZona,
    ConsultaHorasTrabajadasDetalleIntentosAccesos,
    ConsultaHorasTrabajadasDetalleRegistrosReporte,
    ConsultaHorasTrabajadasDetalleIntentoActividad,
    ConsultaHorasTrabajadasDetalleActividadDispositivo,
};