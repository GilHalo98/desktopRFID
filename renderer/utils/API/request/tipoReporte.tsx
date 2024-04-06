// Importamos los endpoints
import { ENDPOINTS } from "../endpoints";

const GetTipoReporte = async (
    parametros: {
        limit: number,
        offset: number,
        id: number,
        clasificacionReporte: string
    }
) => {
    return ENDPOINTS.TIPO_REPORTE.CONSULTA(parametros);
};

const PostTipoReporte = async (
    formRegistro: FormData
) => {
    return ENDPOINTS.TIPO_REPORTE.REGISTRAR(formRegistro);
};

const PutTipoReporte = async (
    parametros: {
        id: number,
    },
    formModificacion: FormData
) => {
    return ENDPOINTS.TIPO_REPORTE.MODIFICAR(parametros, formModificacion);
};

const DeleteTipoReporte = async (
    parametros: {
        id: number,
    }
) => {
    return ENDPOINTS.TIPO_REPORTE.ELIMINAR(parametros);
};

export {
    GetTipoReporte,
    PostTipoReporte,
    PutTipoReporte,
    DeleteTipoReporte
};