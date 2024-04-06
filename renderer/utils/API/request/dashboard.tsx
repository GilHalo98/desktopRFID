// Importamos los endpoints
import { ENDPOINTS } from "../endpoints";

const GetAccesosRecientes = async (
    parametros: {
        limit: number,
        offset: number,
        id: string,
        descripcionReporte: string
    }
) => {
    return ENDPOINTS.DASHBOARD.ACCESOS_RECIENTES(parametros);
};

const GetAccesosPorDia = async (
    parametros: {}
) => {
    return ENDPOINTS.DASHBOARD.ACCESOS_POR_DIA(parametros);
};

const GetReportesPorTipo = async (
    parametros: {}
) => {
    return ENDPOINTS.DASHBOARD.REPORTE_POR_TIPO(parametros);
};

export {
    GetAccesosRecientes,
    GetAccesosPorDia,
    GetReportesPorTipo
};