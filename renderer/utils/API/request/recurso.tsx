// Importamos los endpoints
import { ENDPOINTS } from "../endpoints";

const GetRecurso = async (
    parametros?: {
        limit?: number,
        offset?: number,
        id?: number,
        tipo?: string,
        nombre?: string
    }
) => {
    return ENDPOINTS.RECURSO.CONSULTA(parametros);
};

const PostRecurso = async (
    formRegistro: FormData
) => {
    return ENDPOINTS.RECURSO.REGISTRAR(formRegistro);
};

const PutRecurso = async (
    parametros: {
        id: number,
    },
    formModificacion: FormData
) => {
    return ENDPOINTS.RECURSO.MODIFICAR(parametros, formModificacion);
};

const DeleteRecurso = async (
    parametros: {
        id: number,
    }
) => {
    return ENDPOINTS.RECURSO.ELIMINAR(parametros);
};

export {
    GetRecurso,
    PostRecurso,
    PutRecurso,
    DeleteRecurso
};