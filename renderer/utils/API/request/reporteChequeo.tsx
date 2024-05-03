// Importamos los endpoints
import { ENDPOINTS } from "../endpoints";

const GetReporteChequeo = async (
    parametros?: {
        limit?: number,
        offset?: number,
        id?: number,
        idReporteVinculado?: number,
        idEmpleadoVinculado?: number
    }
) => {
    return ENDPOINTS.REPORTE_CHEQUEO.CONSULTA(parametros);
};

const PostReporteChequeo = async (
    formRegistro: FormData
) => {
    return ENDPOINTS.REPORTE_CHEQUEO.REGISTRAR(formRegistro);
};

const PutReporteChequeo = async (
    parametros: {
        id: number,
    },
    formModificacion: FormData
) => {
    return ENDPOINTS.REPORTE_CHEQUEO.MODIFICAR(parametros, formModificacion);
};

const DeleteReporteChequeo = async (
    parametros: {
        id: number,
    }
) => {
    return ENDPOINTS.REPORTE_CHEQUEO.ELIMINAR(parametros);
};

export {
    GetReporteChequeo,
    PostReporteChequeo,
    PutReporteChequeo,
    DeleteReporteChequeo
};