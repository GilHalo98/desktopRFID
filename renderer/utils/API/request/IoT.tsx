// Importamos los endpoints
import { ENDPOINTS } from "../endpoints";

const GetIoT = async (
    parametros: {
        limit: number,
        offset: number,
        id: number,
        idZonaVinculada: number,
        idTipoDispositivoVinculado: number
    }
) => {
    return ENDPOINTS.IOT.CONSULTA(parametros);
};

const PostIoT = async (
    formRegistro: FormData
) => {
    return ENDPOINTS.IOT.REGISTRAR(formRegistro);
};

const PutIoT = async (
    parametros: {
        id: number,
    },
    formModificacion: FormData
) => {
    return ENDPOINTS.IOT.MODIFICAR(parametros, formModificacion);
};

const DeleteIoT = async (
    parametros: {
        id: number,
    }
) => {
    return ENDPOINTS.IOT.ELIMINAR(parametros);
};

const GetTokenIoT = async (
    parametros: {
        id: number,
    }
) => {
    return ENDPOINTS.IOT.GENERAR_TOKEN(parametros);
};

export {
    GetIoT,
    PostIoT,
    PutIoT,
    DeleteIoT,
    GetTokenIoT
};