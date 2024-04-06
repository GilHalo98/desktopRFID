// Importamos los request.
import { BASE_URL } from "../endpoints";
import {
    DeleteUsuario,
    GetUsuario,
    Login,
    PostUsuario,
    PutUsuario
} from "../request/usuario";

function LoginUsuario(
    datosLogin: {
        nombreUsuario: string,
        password: string,
        alwaysOn: boolean,
    },
    cambioPagina: Function,
    setEnCarga: Function | undefined
) {
    // Mostramos la pantalla en carga.
    if(setEnCarga) {
        setEnCarga(true);
    }

    // Flag que indica si la sesion fue aceptada.
    let tokenRecivido = false;

    // Realizamos el request.
    Login(datosLogin).then((respuesta) => {
        // Si se respondico con el token.
        if(respuesta.data.authorization) {
            // Indicamos que la sesion fue aceptada.
            tokenRecivido = true;

            // Guardamos el token de acceso.
            sessionStorage.setItem('token', respuesta.data.authorization);
        }

    }).catch((error) => {
        // Ocurrio un errr al realizar el request.
        console.log(error);

    }).finally(() => {
        // Si la sesion se inicio.
        if(tokenRecivido) {
            // Terminamos la sesion con el socket server.
            window.ipc.send('sesion_iniciada', {
                ipServer: BASE_URL,
                token: window.sessionStorage.getItem('token')
            });

            // Se hace el cambio de pagina.
            cambioPagina();
        }

        // Marcamos que la carga de datos termino.
        if(setEnCarga) {
            setEnCarga(false);
        }
    });
};

function ConsultaUsuario(
    limit: number,
    offset: number,
    id: number,
    nombreUsuario: string,
    idRegistroEmpleadoVinculado: number,
    setListaRegistros: Function,
    setTotalPaginas: Function,
    setEnCarga: Function | undefined
) {
    // Creamos los parametros de busqueda de la consulta.
    const parametrosBusqueda = {
        limit: limit,
        offset: offset,
        id : id,
        nombreUsuario: nombreUsuario,
        idRegistroEmpleadoVinculado: idRegistroEmpleadoVinculado,
    };

    // Mostramos la pantalla en carga.
    if(setEnCarga) {
        setEnCarga(true);
    }

    // Realizamos el request.
    GetUsuario(parametrosBusqueda).then((respuesta) => {
        // Guardamos los registros en la TipoReporte.
        setListaRegistros(respuesta.data.registros);

        if(setTotalPaginas) {
            // Guardamos el total de paginas en la variable.
            setTotalPaginas(Math.ceil(respuesta.data.totalRegistros / limit));
        }

    }).catch((error) => {
        // Ocurrio un errr al realizar el request.
        console.log(error);

    }).finally(() => {
        // Marcamos que la carga de datos termino.
        if(setEnCarga) {
            setEnCarga(false);
        }
    });
};

function RegistrarUsuario(
    formRegistro: FormData
) {
    // Realizamos el request.
    PostUsuario(formRegistro).then((respuesta) => {

    }).catch((error) => {
        // Ocurrio un errr al realizar el request.
        console.log(error);

    }).finally(() => {
    });
};

function ModificarUsuario(
    idRegistro: number,
    formRegistro: FormData
) {
    // Creamos los parametros de busqueda de la consulta.
    const parametrosBusqueda = {
        id: idRegistro,
    }

    // Realizamos el request.
    PutUsuario(parametrosBusqueda, formRegistro).then((respuesta) => {

    }).catch((error) => {
        // Ocurrio un errr al realizar el request.
        console.log(error);

    }).finally(() => {
    });
};

function RemoverUsuario(
    idRegistro: number
) {
    // Creamos los parametros de busqueda de la consulta.
    const parametrosBusqueda = {
        id: idRegistro
    }

    // Realizamos el request.
    DeleteUsuario(parametrosBusqueda).then((respuesta) => {

    }).catch((error) => {
        // Ocurrio un errr al realizar el request.
        console.log(error);

    }).finally(() => {
    });
}

export {
    LoginUsuario,
    ConsultaUsuario,
    RegistrarUsuario,
    ModificarUsuario,
    RemoverUsuario
};