// Importamos los endpoints
import { ENDPOINTS } from "../endpoints";

const Login = async (
    cuerpo: {
        nombreUsuario: string,
        password: string,
        alwaysOn: boolean
    }
) => {
    return ENDPOINTS.USUARIO.LOGIN(cuerpo);
};

const GetUsuario = async (
    parametros: {
        limit: number,
        offset: number,
        id: number,
        nombreUsuario: string
        idRegistroEmpleadoVinculado: number,
    }
) => {
    return ENDPOINTS.USUARIO.CONSULTA(parametros);
};

const PostUsuario = async (
    formRegistro: FormData
) => {
    return ENDPOINTS.USUARIO.REGISTRAR(formRegistro);
};

const PutUsuario = async (
    parametros: {
        id: number,
    },
    formModificacion: FormData
) => {
    return ENDPOINTS.USUARIO.MODIFICAR(parametros, formModificacion);
};

const DeleteUsuario = async (
    parametros: {
        id: number
    }
) => {
    return ENDPOINTS.USUARIO.ELIMINAR(parametros);
};

export {
    Login,
    GetUsuario,
    PostUsuario,
    PutUsuario,
    DeleteUsuario
};