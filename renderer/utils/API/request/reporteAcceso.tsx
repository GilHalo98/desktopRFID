// Importamos los endpoints
import { ENDPOINTS } from "../endpoints";

const GetReporteAcceso = async (
    parametros?: {
        limit?: number,
        offset?: number,
        id?: number,
        idReporteVinculado?: number,
        idEmpleadoVinculado?: number,
        idZonaVinculado?: number
    }
) => {
    return ENDPOINTS.REPORTE_ACCESO.CONSULTA(parametros);
};

const PostReporteAcceso = async (
    formRegistro: FormData
) => {
    return ENDPOINTS.REPORTE_ACCESO.REGISTRAR(formRegistro);
};

const PutReporteAcceso = async (
    parametros: {
        id: number,
    },
    formModificacion: FormData
) => {
    return ENDPOINTS.REPORTE_ACCESO.MODIFICAR(parametros, formModificacion);
};

const DeleteReporteAcceso = async (
    parametros: {
        id: number,
    }
) => {
    return ENDPOINTS.REPORTE_ACCESO.ELIMINAR(parametros);
};

export {
    GetReporteAcceso,
    PostReporteAcceso,
    PutReporteAcceso,
    DeleteReporteAcceso
};