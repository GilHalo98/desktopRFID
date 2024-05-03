// Importamos los endpoints
import { ENDPOINTS } from "../endpoints";

const GetReporteActividad = async (
    parametros?: {
        limit?: number,
        offset?: number,
        id?: number,
        idReporteVinculado?: number,
        idEmpleadoVinculado?: number,
        idDispositivoVinculado?: number
    }
) => {
    return ENDPOINTS.REPORTE_ACTIVIDAD.CONSULTA(parametros);
};

const PostReporteActividad = async (
    formRegistro: FormData
) => {
    return ENDPOINTS.REPORTE_ACTIVIDAD.REGISTRAR(formRegistro);
};

const PutReporteActividad = async (
    parametros: {
        id: number,
    },
    formModificacion: FormData
) => {
    return ENDPOINTS.REPORTE_ACTIVIDAD.MODIFICAR(parametros, formModificacion);
};

const DeleteReporteActividad = async (
    parametros: {
        id: number,
    }
) => {
    return ENDPOINTS.REPORTE_ACTIVIDAD.ELIMINAR(parametros);
};

export {
    GetReporteActividad,
    PostReporteActividad,
    PutReporteActividad,
    DeleteReporteActividad
};