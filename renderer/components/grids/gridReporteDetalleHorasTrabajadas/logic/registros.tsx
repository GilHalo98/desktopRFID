import {
    ConsultaEmpleado
} from "../../../../utils/API/interface/empleado";

import {
    ConsultaHorasTrabajadasDetalleGeneral,
    ConsultaHorasTrabajadasDetalleTracker,
    ConsultaHorasTrabajadasDetalleResumen,
    ReporteCompletoHorasTrabajadasDetalle,
    ConsultaHorasTrabajadasDetalleChequeos,
    ConsultaHorasTrabajadasDetalleRegistrosReporte,
} from "../../../../utils/API/interface/reportes"

// Modelo de datos.
import {
    Reporte
} from "../../../../utils/API/modelos/reporte";

import {
    Empleado
} from "../../../../utils/API/modelos/empleado";

import {
    ReporteResumen
} from "../../../../utils/API/respuestas/reporteResumen";

import {
    ReporteGeneral
} from "../../../../utils/API/respuestas/reporteGeneral";

import {
    ReporteChequeoResumen
} from "../../../../utils/API/respuestas/reporteChequeoResumen";

import {
    ReporteHorasTrabajadasDetalle
} from "../../../../utils/interfaces/reporteHorasTrabajadasDetalle";

const ConsultaRegistroEmpleado = (
    setRegistro: Function,
    setEnCarga: Function,
    querry?: {
        limit?: number,
        offset?: number,
        id?: string,
        numeroTelefonico?: string,
        nombres?: string,
        apellidoPaterno?: string,
        apellidoMaterno?: string,
        idRolVinculado?: number
    },
    consultaConcatenada?: Function
) => {
    // Consultamos los dispositivos.
    return ConsultaEmpleado(
        (respuesta: any) => {
            setRegistro(respuesta.registros[0]);
        },
        querry,
        (error: any) => {
            console.log(error);
        },
        () => {
            setRegistro({} as Empleado);
            setEnCarga(true);
        },
        () => {
            if(!consultaConcatenada) {
                setEnCarga(false);
            } else {
                consultaConcatenada();
            }
        }
    );
};

// Consultamos el reporte general de las horas trabajadas a detalle.
const ReporteHorasTrabajadasDetalleGeneral = (
    setReporte: Function,
    setEnCarga: Function,
    querry?: {
        idEmpleadoVinculado?: string,
        semanaReporte?: string
    },
    consultaConcatenada?: Function
) => {
    // Consultamos los dispositivos.
    return ConsultaHorasTrabajadasDetalleGeneral(
        (respuesta: any) => {
            setReporte(respuesta.reporte);
        },
        querry,
        (error: any) => {
            console.log(error);
        },
        () => {
            setReporte({} as ReporteGeneral);
            setEnCarga(true);
        },
        () => {
            if(!consultaConcatenada) {
                setEnCarga(false);
            } else {
                consultaConcatenada();
            }
        }
    );
};

// Consultamos los datos del tracker.
const ReporteHorasTrabajadasDetalleTracker = (
    setReporte: Function,
    setEnCarga: Function,
    querry?: {
        idEmpleadoVinculado?: string,
        semanaReporte?: string,
        dia?: number
    },
    consultaConcatenada?: Function
) => {
    // Consultamos los dispositivos.
    return ConsultaHorasTrabajadasDetalleTracker(
        (respuesta: any) => {
            setReporte(respuesta.reporte);
        },
        querry,
        (error: any) => {
            console.log(error);
        },
        () => {
            setReporte([] as Reporte[]);
            setEnCarga(true);
        },
        () => {
            if(!consultaConcatenada) {
                setEnCarga(false);
            } else {
                consultaConcatenada();
            }
        }
    );
};

// Consultamos el reporte de chequeo de las horas trabajadas a detalle.
const ReporteHorasTrabajadasDetalleChequeo = (
    setReporteChequeo: Function,
    setReporteDescanso: Function,
    setEnCarga: Function,
    querry?: {
        idEmpleadoVinculado?: string,
        semanaReporte?: string,
        dia?: number
    },
    consultaConcatenada?: Function
) => {
    // Consultamos los dispositivos.
    return ConsultaHorasTrabajadasDetalleChequeos(
        (respuesta: any) => {
            setReporteChequeo({
                a: respuesta.reporte.entrada,
                b: respuesta.reporte.salida
            });

            setReporteDescanso({
                a: respuesta.reporte.inicioDescanso,
                b: respuesta.reporte.finDescanso
            });
        },
        querry,
        (error: any) => {
            console.log(error);
        },
        () => {
            setReporteChequeo({} as ReporteChequeoResumen);
            setReporteChequeo({} as ReporteChequeoResumen);
            setEnCarga(true);
        },
        () => {
            if(!consultaConcatenada) {
                setEnCarga(false);
            } else {
                consultaConcatenada();
            }
        }
    );
};

// Consultamos el resumen del reporte de horas trabajadas a detalle.
const ReporteHorasTrabajadasDetalleResumen = (
    setReporte: Function,
    setEnCarga: Function,
    querry?: {
        idEmpleadoVinculado?: string,
        semanaReporte?: string,
        dia?: number
    },
    consultaConcatenada?: Function
) => {
    // Consultamos los dispositivos.
    return ConsultaHorasTrabajadasDetalleResumen(
        (respuesta: any) => {
            setReporte(respuesta.reporte);
        },
        querry,
        (error: any) => {
            console.log(error);
        },
        () => {
            setReporte({} as ReporteResumen);
            setEnCarga(true);
        },
        () => {
            if(!consultaConcatenada) {
                setEnCarga(false);
            } else {
                consultaConcatenada();
            }
        }
    );
};

// Consultamos los registros de reportes vinculados al empleado,
// ya sea de acceso o de actividad.
const ReporteHorasTrabajadasDetalleRegistrosReporte = (
    setListaIDZonas: Function,
    setListaIDDispositivos: Function,
    setEnCarga: Function,
    querry?: {
        idEmpleadoVinculado?: string,
        semanaReporte?: string,
        dia?: number
    },
    consultaConcatenada?: Function
) => {
    // Consultamos los dispositivos.
    return ConsultaHorasTrabajadasDetalleRegistrosReporte(
        (respuesta: any) => {
            setListaIDZonas(respuesta.registrosZonas);
            setListaIDDispositivos(respuesta.registrosDispositivos);
        },
        querry,
        (error: any) => {
            console.log(error);
        },
        () => {
            setListaIDZonas([] as number []);
            setListaIDDispositivos([] as number []);
            setEnCarga(true);
        },
        () => {
            if(!consultaConcatenada) {
                setEnCarga(false);
            } else {
                consultaConcatenada();
            }
        }
    );
};

// Consulta los datos del reporte.
const ConsultarDatosReporte = (
    generarReporte: Function,
    querry?: {
        idEmpleadoVinculado?: string,
        semanaReporte?: string
    }
) => {
    ReporteCompletoHorasTrabajadasDetalle(
        (respuesta: ReporteHorasTrabajadasDetalle) => {
            generarReporte(respuesta);
        },
        querry,
        (error: any) => {
            console.log(error);
        }
    );
};

export {
    ConsultarDatosReporte,
    ConsultaRegistroEmpleado,
    ReporteHorasTrabajadasDetalleGeneral,
    ReporteHorasTrabajadasDetalleTracker,
    ReporteHorasTrabajadasDetalleResumen,
    ReporteHorasTrabajadasDetalleChequeo,
    ReporteHorasTrabajadasDetalleRegistrosReporte,
};