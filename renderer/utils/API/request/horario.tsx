// Importamos los endpoints
import { ENDPOINTS } from "../endpoints";

const GetHorario = async (
    parametros?: {
        limit?: number,
        offset?: number,
        id?: number,
        descripcionHorario?: string,
        idEmpleadoVinculado?: number
    }
) => {
    return ENDPOINTS.HORARIO.CONSULTA(parametros);
};

const PostHorario = async (
    formRegistro: FormData
) => {
    return ENDPOINTS.HORARIO.REGISTRAR(formRegistro);
};

const PutHorario = async (
    parametros: {
        id: number,
    },
    formModificacion: FormData
) => {
    return ENDPOINTS.HORARIO.MODIFICAR(parametros, formModificacion);
};

const DeleteHorario = async (
    parametros: {
        id: number,
    }
) => {
    return ENDPOINTS.HORARIO.ELIMINAR(parametros);
};

export {
    GetHorario,
    PostHorario,
    PutHorario,
    DeleteHorario
};