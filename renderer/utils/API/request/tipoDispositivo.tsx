// Importamos los endpoints
import { ENDPOINTS } from "../endpoints";

const GetTipoDispositivo = async (
    parametros: {
        limit: number,
        offset: number,
        id: number,
        nombreTipoDispositivo: string
    }
) => {
    return ENDPOINTS.TIPO_DISPOSITIVO.CONSULTA(parametros);
};

const PostTipoDispositivo = async (
    formRegistro: FormData
) => {
    return ENDPOINTS.TIPO_DISPOSITIVO.REGISTRAR(formRegistro);
};

const PutTipoDispositivo = async (
    parametros: {
        id: number,
    },
    formModificacion: FormData
) => {
    return ENDPOINTS.TIPO_DISPOSITIVO.MODIFICAR(parametros, formModificacion);
};

const DeleteTipoDispositivo = async (
    parametros: {
        id: number,
    }
) => {
    return ENDPOINTS.TIPO_DISPOSITIVO.ELIMINAR(parametros);
};

export {
    GetTipoDispositivo,
    PostTipoDispositivo,
    PutTipoDispositivo,
    DeleteTipoDispositivo
};