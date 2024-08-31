// Importamos la interfaz con la API.
import {
    ConsultaEmpleado
} from "../../../../utils/API/interface/empleado";

// Consultamos los registros de los dispositivos.
const consultarRegistrosEmpleados = (
    setListaRegistros: Function,
    setEnCarga: Function,
    consultaConcatenada?: Function
) => {
    // Consultamos los dispositivos.
    return ConsultaEmpleado(
        (respuesta: any) => {
            setListaRegistros(respuesta.registros);
        },
        {
            idRolVinculado: 5
        },
        (error: any) => {
            console.log(error);
        },
        () => {
            setListaRegistros([]);
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
    consultarRegistrosEmpleados
};
