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

const GetHorarioCompleto = async (
    parametros?: {
        id?: number,
        numeroTelefonico?: string,
        nombres?: string,
        apellidoPaterno?: string,
        apellidoMaterno?: string,
        idRolVinculado?: number,
    }
) => {
    return ENDPOINTS.HORARIO.COMPLETO.CONSULTA(parametros);
};

const PutHorarioCompleto = async (
    parametros: {
        id: number,
    },
    formModificacion: FormData
) => {
    return ENDPOINTS.HORARIO.COMPLETO.MODIFICAR(parametros, formModificacion);
};

export {
    GetHorario,
    PostHorario,
    PutHorario,
    DeleteHorario,
    GetHorarioCompleto,
    PutHorarioCompleto
};