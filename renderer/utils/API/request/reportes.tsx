// Importamos los endpoints
import { ENDPOINTS } from "../endpoints";

const GetHorasTrabajadas = async (
    parametros?: {
        limit?: number,
        offset?: number,
        id?: string,
        nombres?: string,
        idRolVinculado?: number,
        semanaReporte?: string
    }
) => {
    return ENDPOINTS.REPORTES.HORAS_TRABAJADAS(parametros);
};

const GetHorasTrabajadasConDescanso = async (
    parametros?: {
        limit?: number,
        offset?: number,
        idEmpleadoVinculado?: string,
        nombres?: string,
        idRolVinculado?: number,
        semanaReporte?: string
    }
) => {
    return ENDPOINTS.REPORTES.HORAS_TRABAJADAS(parametros);
};

const GetHistorialActividadMaquina = async (
    parametros?: {
        id?: number,
        descripcionDispositivo?: string,
        semanaReporte?: string
    }
) => {
    return ENDPOINTS.REPORTES.HISTORIAL_ACTIVIDAD_MAQUINA(parametros);
};

const GetHistorialUsosMaquina = async (
    parametros?: {
        limit?: number,
        offset?: number,
        id?: number,
        descripcionDispositivo?: string,
        semanaReporte?: string
    }
) => {
    return ENDPOINTS.REPORTES.HISTORIAL_USOS_MAQUINA(parametros);
};

const GetHistorialOperadoresMaquina = async (
    parametros?: {
        limit?: number,
        offset?: number,
        id?: number,
        descripcionDispositivo?: string,
        semanaReporte?: string
    }
) => {
    return ENDPOINTS.REPORTES.HISTORIAL_OPERADORES_MAQUINA(parametros);
};

/**
 * Requests de la vista del reporte de horas trabajadas a detalle.
 */
const GetHorasTrabajadasDetalleGeneral = async (
    parametros?: {
        idEmpleadoVinculado?: string,
        semanaReporte?: string
    }
) => {
    return ENDPOINTS.REPORTES.HORAS_TRABAJADAS_DETALLE.GENERAL(
        parametros
    );
};

const GetHorasTrabajadasDetalleGeneralConDescanso = async (
    parametros?: {
        idEmpleadoVinculado?: string,
        semanaReporte?: string
    }
) => {
    return ENDPOINTS.REPORTES.HORAS_TRABAJADAS_DETALLE.GENERAL_CON_DESCANSO(
        parametros
    );
};

const GetHorasTrabajadasDetalleTracker = async (
    parametros?: {
        idEmpleadoVinculado?: string,
        semanaReporte?: string,
        dia?: number
    }
) => {
    return ENDPOINTS.REPORTES.HORAS_TRABAJADAS_DETALLE.TRACKER(
        parametros
    );
};

const GetHorasTrabajadasDetalleChequeos = async (
    parametros?: {
        idEmpleadoVinculado?: string,
        semanaReporte?: string,
        dia?: number
    }
) => {
    return ENDPOINTS.REPORTES.HORAS_TRABAJADAS_DETALLE.CHEQUEOS(
        parametros
    );
};

const GetHorasTrabajadasDetalleChequeosConDescanso = async (
    parametros?: {
        idEmpleadoVinculado?: string,
        semanaReporte?: string,
        dia?: number
    }
) => {
    return ENDPOINTS.REPORTES.HORAS_TRABAJADAS_DETALLE.CHEQUEOS_CON_DESCANSO(
        parametros
    );
};

const GetHorasTrabajadasDetalleResumen = async (
    parametros?: {
        idEmpleadoVinculado?: string,
        semanaReporte?: string,
        dia?: number
    }
) => {
    return ENDPOINTS.REPORTES.HORAS_TRABAJADAS_DETALLE.RESUMEN(
        parametros
    );
};

const GetHorasTrabajadasDetalleRegistrosReporte = async (
    parametros?: {
        idEmpleadoVinculado?: string,
        semanaReporte?: string,
        dia?: number
    }
) => {
    return ENDPOINTS.REPORTES.HORAS_TRABAJADAS_DETALLE.REGISTROS_CON_REPORTES(
        parametros
    );
};

const GetHorasTrabajadasDetalleIntentosAccesos = async (
    parametros?: {
        limit?: number,
        offset?: number,
        idEmpleadoVinculado?: string,
        semanaReporte?: string,
        dia?: number
    }
) => {
    return ENDPOINTS.REPORTES.HORAS_TRABAJADAS_DETALLE.ACCESOS.INTENTOS(
        parametros
    );
};

const GetHorasTrabajadasDetalleAccesosZona = async (
    parametros?: {
        limit?: number,
        offset?: number,
        idEmpleadoVinculado?: string,
        idZonaVinculada?: string,
        semanaReporte?: string,
        dia?: number
    }
) => {
    return ENDPOINTS.REPORTES.HORAS_TRABAJADAS_DETALLE.ACCESOS.ZONA(
        parametros
    );
};

const GetHorasTrabajadasDetalleIntentoActividad = async (
    parametros?: {
        limit?: number,
        offset?: number,
        idEmpleadoVinculado?: string,
        idDispositivoVinculado?: string,
        semanaReporte?: string,
        dia?: number
    }
) => {
    return ENDPOINTS.REPORTES.HORAS_TRABAJADAS_DETALLE.ACTIVIDAD.INTENTOS(
        parametros
    );
};

const GetHorasTrabajadasDetalleActividadDispositivo = async (
    parametros?: {
        limit?: number,
        offset?: number,
        idEmpleadoVinculado?: string,
        idDispositivoVinculado?: string,
        semanaReporte?: string,
        dia?: number
    }
) => {
    return ENDPOINTS.REPORTES.HORAS_TRABAJADAS_DETALLE.ACTIVIDAD.DISPOSITIVO(
        parametros
    );
};

const GetHorasTrabajadasDetalleDiasHorario = async (
    parametros?: {
        idEmpleadoVinculado?: string,
        semanaReporte?: string,
        dia?: number
    }
) => {
    return ENDPOINTS.REPORTES.HORAS_TRABAJADAS_DETALLE.DIAS_HORARIO(
        parametros
    );
};

const GetResumenHorasTrabajadas = async (
    parametros?: {
        semanaReporte?: string
    }
) => {
    return ENDPOINTS.REPORTES.RESUMEN_HORAS_TRABAJADAS(parametros);
};

export {
    GetHorasTrabajadas,
    GetHistorialUsosMaquina,
    GetResumenHorasTrabajadas,
    GetHistorialActividadMaquina,
    GetHistorialOperadoresMaquina,
    GetHorasTrabajadasConDescanso,
    GetHorasTrabajadasDetalleGeneral,
    GetHorasTrabajadasDetalleTracker,
    GetHorasTrabajadasDetalleResumen,
    GetHorasTrabajadasDetalleChequeos,
    GetHorasTrabajadasDetalleDiasHorario,
    GetHorasTrabajadasDetalleAccesosZona,
    GetHorasTrabajadasDetalleIntentosAccesos,
    GetHorasTrabajadasDetalleRegistrosReporte,
    GetHorasTrabajadasDetalleIntentoActividad,
    GetHorasTrabajadasDetalleGeneralConDescanso,
    GetHorasTrabajadasDetalleChequeosConDescanso,
    GetHorasTrabajadasDetalleActividadDispositivo,
};