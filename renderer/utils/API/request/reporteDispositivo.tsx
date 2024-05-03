// Importamos los endpoints
import { ENDPOINTS } from "../endpoints";

const GetReporteDispositivo = async (
    parametros?: {
        limit?: number,
        offset?: number,
        id?: number,
        idReporteVinculado?: number,
        idDispositivoVinculado?: number
    }
) => {
    return ENDPOINTS.REPORTE_DISPOSITIVO.CONSULTA(parametros);
};

const PostReporteDispositivo = async (
    formRegistro: FormData
) => {
    return ENDPOINTS.REPORTE_DISPOSITIVO.REGISTRAR(formRegistro);
};

const PutReporteDispositivo = async (
    parametros: {
        id: number,
    },
    formModificacion: FormData
) => {
    return ENDPOINTS.REPORTE_DISPOSITIVO.MODIFICAR(parametros, formModificacion);
};

const DeleteReporteDispositivo = async (
    parametros: {
        id: number,
    }
) => {
    return ENDPOINTS.REPORTE_DISPOSITIVO.ELIMINAR(parametros);
};

export {
    GetReporteDispositivo,
    PostReporteDispositivo,
    PutReporteDispositivo,
    DeleteReporteDispositivo
};