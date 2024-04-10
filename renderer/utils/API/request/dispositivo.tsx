// Importamos los endpoints
import { ENDPOINTS } from "../endpoints";

const GetDispositivo = async (
    parametros: {
        limit: number,
        offset: number,
        id: number,
        idZonaVinculada: number,
        idTipoDispositivoVinculado: number
    }
) => {
    return ENDPOINTS.DISPOSITIVO.CONSULTA(parametros);
};

const PostDispositivo = async (
    formRegistro: FormData
) => {
    return ENDPOINTS.DISPOSITIVO.REGISTRAR(formRegistro);
};

const PutDispositivo = async (
    parametros: {
        id: number,
    },
    formModificacion: FormData
) => {
    return ENDPOINTS.DISPOSITIVO.MODIFICAR(parametros, formModificacion);
};

const DeleteDispositivo = async (
    parametros: {
        id: number,
    }
) => {
    return ENDPOINTS.DISPOSITIVO.ELIMINAR(parametros);
};

const GetTokenDispositivo = async (
    parametros: {
        id: number,
    }
) => {
    return ENDPOINTS.DISPOSITIVO.GENERAR_TOKEN(parametros);
};

export {
    GetDispositivo,
    PostDispositivo,
    PutDispositivo,
    DeleteDispositivo,
    GetTokenDispositivo
};