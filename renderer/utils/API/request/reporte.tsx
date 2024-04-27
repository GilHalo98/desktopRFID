// Importamos los endpoints
import { ENDPOINTS } from "../endpoints";

const GetReporte = async (
    parametros?: {
        limit?: number,
        offset?: number,
        id?: number,
        descripcionReporte?: string,
        idEmpleadoVinculado?: number,
        idRegistroDispositivoIoTVinculado?: number,
        idTipoReporteVinculado?: number,
        idRegistroZonaVinculada?: number,

    }
) => {
    return ENDPOINTS.REPORTE.CONSULTA(parametros);
};

const PostReporte = async (
    formRegistro: FormData
) => {
    return ENDPOINTS.REPORTE.REGISTRAR(formRegistro);
};

const PutReporte = async (
    parametros: {
        id: number,
    },
    formModificacion: FormData
) => {
    return ENDPOINTS.REPORTE.MODIFICAR(parametros, formModificacion);
};

const DeleteReporte = async (
    parametros: {
        id: number,
    }
) => {
    return ENDPOINTS.REPORTE.ELIMINAR(parametros);
};

export {
    GetReporte,
    PostReporte,
    PutReporte,
    DeleteReporte
};