// Importamos la interfaz con la API.
import {
    ConsultaRecurso
} from "../../../../utils/API/interface/recurso";

import {
    ConsultaRol
} from "../../../../utils/API/interface/rol";

// Modelo de datos.
import {
    Recurso
} from "../../../../utils/API/modelos/recurso";

import {
    Rol
} from "../../../../utils/API/modelos/rol";

// Consulta la imagen del empleado.
const consultarImagenEmpleado = (
    setRecurso: Function,
    setEnCarga: Function,
    querry: {
        limit?: number,
        offset?: number,
        id?: number,
        tipo?: string,
        nombre?: string
    },
    consultaConcatenada?: Function
) => {
    return ConsultaRecurso(
        (respuesta: any) => {
            setRecurso(respuesta.registros[0]);
        },
        querry,
        (error: any) => {
            console.log(error);
            setEnCarga(false);
        },
        () => {
            setRecurso({} as Recurso);
            setEnCarga(true);
        },
        () => {
            if(!consultaConcatenada) {
                setEnCarga(false);
            } else {
                consultaConcatenada();
            }
        }
    );
};

// Consulta la imagen del empleado.
const consultarRolEmpleado = (
    setRegistro: Function,
    setEnCarga: Function,
    querry: {
        limit?: number,
        offset?: number,
        id?: number,
        rolTrabajador?: string,
        descripcionRol?: string,
        idPermisoVinculado?: number
    },
    consultaConcatenada?: Function
) => {
    return ConsultaRol(
        (respuesta: any) => {
            setRegistro(respuesta.registros[0]);
        },
        querry,
        (error: any) => {
            console.log(error);
            setEnCarga(false);
        },
        () => {
            setRegistro({} as Rol);
            setEnCarga(true);
        },
        () => {
            if(!consultaConcatenada) {
                setEnCarga(false);
            } else {
                consultaConcatenada();
            }
        }
    );
};

export {
    consultarImagenEmpleado,
    consultarRolEmpleado
};