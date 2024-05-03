// Importamos los endpoints
import { ENDPOINTS } from "../endpoints";

const GetDiaLaboral = async (
    parametros?: {
        limit?: number,
        offset?: number,
        id?: number,
        dia?: number,
        idHorarioVinculado?: number
    }
) => {
    return ENDPOINTS.DIA_LABORAL.CONSULTA(parametros);
};

const PostDiaLaboral = async (
    formRegistro: FormData
) => {
    return ENDPOINTS.DIA_LABORAL.REGISTRAR(formRegistro);
};

const PutDiaLaboral = async (
    parametros: {
        id: number,
    },
    formModificacion: FormData
) => {
    return ENDPOINTS.DIA_LABORAL.MODIFICAR(parametros, formModificacion);
};

const DeleteDiaLaboral = async (
    parametros: {
        id: number,
    }
) => {
    return ENDPOINTS.DIA_LABORAL.ELIMINAR(parametros);
};

export {
    GetDiaLaboral,
    PostDiaLaboral,
    PutDiaLaboral,
    DeleteDiaLaboral
};