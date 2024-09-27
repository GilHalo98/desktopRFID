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
    general: ReporteGeneral
    porDia: ReporteHorasTrabajadasDetallePorDia []
};