// Importamos los endpoints
import { ENDPOINTS } from "../endpoints";

const GetRol = async (
    parametros?: {
        limit?: number,
        offset?: number,
        id?: number,
        rolTrabajador?: string,
        descripcionRol?: string,
        idPermisoVinculado?: number
    }
) => {
    return ENDPOINTS.ROL.CONSULTA(parametros);
};

const PostRol = async (
    formRegistro: FormData
) => {
    return ENDPOINTS.ROL.REGISTRAR(formRegistro);
};

const PutRol = async (
    parametros: {
        id: number,
    },
    formModificacion: FormData
) => {
    return ENDPOINTS.ROL.MODIFICAR(parametros, formModificacion);
};

const DeleteRol = async (
    parametros: {
        id: number,
    }
) => {
    return ENDPOINTS.ROL.ELIMINAR(parametros);
};

export {
    GetRol,
    PostRol,
    PutRol,
    DeleteRol
};