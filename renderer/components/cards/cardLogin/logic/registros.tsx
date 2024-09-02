// Router de next
import Router from 'next/router';

// Funcionalidad
import {
    LoginUsuario
} from '../../../../utils/API/interface/usuarios';

// URL base del servidor para poder conectar con el servidor sockets.
import {
    BASE_URL
} from '../../../../utils/API/endpoints';

// Funcion de inicio de sesion.
const iniciarSesion = (
    datosLogin: {
        nombreUsuario: string,
        password: string,
        alwaysOn: boolean,
    },
    setEnCarga: Function,
    consultaConcatenada?: Function
) => {
    return LoginUsuario(
        datosLogin,
        (respuesta: any) => {
            // Si la autorizacion fue existorsa.
            if(respuesta.authorization) {
                // Guardamos el token de acceso.
                sessionStorage.setItem(
                    'token',
                    respuesta.authorization
                );

                // Guardamos el rol del usuario.
                sessionStorage.setItem(
                    'rol',
                    respuesta.rol
                );
            }
        },
        (error: any) => {
            console.log(error);

            // Terminamos la pantalla de carga.
            setEnCarga(false);
        },
        () => {
            // Establecemos la carga de los datos de la pagina.
            setEnCarga(true);
        },
        () => {
            // Si existe un token guardado.
            if(window.sessionStorage.getItem('token')) {
                // Iniciamos la sesion con el servidor socket.
                window.ipc.send('sesion_iniciada', {
                    ipServer: BASE_URL,
                    token: window.sessionStorage.getItem('token')
                });

                // Se hace el cambio de pagina a
                // la pagina principal.
                Router.push('/home');
            }

            if(!consultaConcatenada) {
                setEnCarga(false);

            } else {
                consultaConcatenada();
            }
        }
    );
};

export {
    iniciarSesion
}