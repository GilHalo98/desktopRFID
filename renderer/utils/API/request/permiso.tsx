// Importamos los endpoints
import { ENDPOINTS } from "../endpoints";

const GetPermiso = async (
    parametros: {
        limit: number,
        offset: number,
        id: string,
        descripcionPermiso: string,
    }
) => {
    return ENDPOINTS.PERMISO.CONSULTA(parametros);
};

const PostPermiso = async (
    formRegistro: FormData
) => {
    return ENDPOINTS.PERMISO.REGISTRAR(formRegistro);
};

const PutPermiso = async (
    parametros: {
        id: number,
    },
    formModificacion: FormData
) => {
    return ENDPOINTS.PERMISO.MODIFICAR(parametros, formModificacion);
};

const DeletePermiso = async (
    parametros: {
        id: number,
    }
) => {
    return ENDPOINTS.PERMISO.ELIMINAR(parametros);
};

export {
    GetPermiso,
    PostPermiso,
    PutPermiso,
    DeletePermiso
};