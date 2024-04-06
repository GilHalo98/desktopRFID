// Importamos los endpoints
import { ENDPOINTS } from "../endpoints";

const GetEmpleado = async (
    parametros: {
        limit: number,
        offset: number,
        id: string,
        numeroTelefonico: string,
        nombres: string,
        apellidoPaterno: string,
        apellidoMaterno: string,
        idRolVinculado: number,
    }
) => {
    return ENDPOINTS.EMPLEADO.CONSULTA(parametros);
};

const PostEmpleado = async (
    formRegistro: FormData
) => {
    return ENDPOINTS.EMPLEADO.REGISTRAR(formRegistro);
};

const PutEmpleado = async (
    parametros: {
        id: number,
    },
    formModificacion: FormData
) => {
    return ENDPOINTS.EMPLEADO.MODIFICAR(parametros, formModificacion);
};

const DeleteEmpleado = async (
    parametros: {
        id: number,
    }
) => {
    return ENDPOINTS.EMPLEADO.ELIMINAR(parametros);
};

export {
    GetEmpleado,
    PostEmpleado,
    PutEmpleado,
    DeleteEmpleado
};