import {
    ConsultaEmpleadoCompleto
} from "../../../../../utils/API/interface/empleado";
import { EmpleadoCompleto } from "../../../../../utils/API/respuestas/empleadoCompleto";

// Consulta el registro del empleado.
const consultarRegistros = (
    setDatosRegistro: Function,
    setRegistrarUsuario: Function,
    setEnCarga: Function,
    querry: {
        id?: string
    }
) => {
    /**
     * Consulta el registro del empleado.
     */

    return ConsultaEmpleadoCompleto(
        (respuesta: any) => {
            const registro = respuesta.registros[0] as EmpleadoCompleto;

            setDatosRegistro(
                registro
            );

            setRegistrarUsuario(
                !registro.usuario? false : true
            );
        },
        querry,
        (error: any) => {
            console.log(error);
            setEnCarga(false);
        },
        () => {
            setDatosRegistro({} as EmpleadoCompleto);
            setEnCarga(true);
        },
        () => {
            setEnCarga(false);
        },
    );
};


export {
    consultarRegistros
};