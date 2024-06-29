// Modelo de datos
import {
    Rol
} from "../../../../utils/API/modelos/rol";

import {
    Permiso
} from "../../../../utils/API/modelos/permiso";

// Importamos la interfaz con la API.
import {
    ConsultaRol
} from "../../../../utils/API/interface/rol";

import {
    ConsultaPermiso
} from "../../../../utils/API/interface/permiso";

const consultarDatosVinculados = (
    idRol: number,
    setRolVinculado: Function,
    setPermisoVinculado: Function,
    setEnCarga: Function
) => {
    return ConsultaRol(
        (respuesta: any) => {
            const registroRol: Rol = respuesta.registros[0]
            setRolVinculado(registroRol);

            ConsultaPermiso(
                (respuesta: any) => {
                    const registroPermiso: Permiso = respuesta.registros[0]
                    setPermisoVinculado(registroPermiso);
                },
                {
                    id: registroRol.idPermisoVinculado
                },
                (error: any) => {
                    console.log(error);
                    setEnCarga(false);
                },
                () => {
                    setPermisoVinculado(undefined);
                },
                () => {
                    setEnCarga(false);
                },
            );
        },
        {
            id: idRol
        },
        (error: any) => {
            console.log(error);
            setEnCarga(false);
        },
        () => {
            setRolVinculado(undefined);
            setEnCarga(true);
        },
        undefined
    );
};

export {
    consultarDatosVinculados
};