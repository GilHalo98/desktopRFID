// Importamos los endpoints
import { ENDPOINTS } from "../endpoints";

const GetZona = async (
    parametros?: {
        limit?: number,
        offset?: number,
        id?: number,
        nombreZona?: string
        descripcionZona?: string,
        bitZona?: number
    }
) => {
    return ENDPOINTS.ZONA.CONSULTA(parametros);
};

const PostZona = async (
    formRegistro: FormData
) => {
    return ENDPOINTS.ZONA.REGISTRAR(formRegistro);
};

const PutZona = async (
    parametros: {
        id: number,
    },
    formModificacion: FormData
) => {
    return ENDPOINTS.ZONA.MODIFICAR(parametros, formModificacion);
};

const DeleteZona = async (
    parametros: {
        id: number,
    }
) => {
    return ENDPOINTS.ZONA.ELIMINAR(parametros);
};

export {
    GetZona,
    PostZona,
    PutZona,
    DeleteZona
};