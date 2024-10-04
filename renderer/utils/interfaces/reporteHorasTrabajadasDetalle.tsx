import { Empleado } from "../API/modelos/empleado";
import {
    ReporteAccesosDetalle
} from "../API/respuestas/reporteAccesosDetalle";

import {
    ReporteActividadDetalle
} from "../API/respuestas/reporteActividadDetalle";

import {
    ReporteChequeoResumenCompleto
} from "../API/respuestas/reporteChequeoResumen";

import {
    ReporteGeneral
} from "../API/respuestas/reporteGeneral";

/**
 * Modelos de datos del reporte de detalles de horas trabajadas.
 */

export interface ReporteHorasTrabajadasDetalleAccesos {
    idZonaVinculada: string,
    reporte: ReporteAccesosDetalle []
};

export interface ReporteHorasTrabajadasDetalleActividades {
    idDispositivoVinculado: string,
    reporte: ReporteActividadDetalle []
};

export interface ReporteHorasTrabajadasDetallePorDia {
    chequeos: ReporteChequeoResumenCompleto
    accesos: ReporteHorasTrabajadasDetalleAccesos []
    actividades: ReporteHorasTrabajadasDetalleActividades []
};

export interface ReporteHorasTrabajadasDetalle {
    datosEmpleado: Empleado
    general: ReporteGeneral
    porDia: ReporteHorasTrabajadasDetallePorDia []
};