import { ConsultaEmpleadoCompleto } from "../../../../../utils/API/interface/empleado";

// Consulta los registros de los permisos filtrados.
const consultarRegistros = (
    setDatosRegistro: Function,
    setEnCarga: Function,
    querry: {
        id?: string
    }
) => {
    return ConsultaEmpleadoCompleto(
        (respuesta: any) => {
            setDatosRegistro(respuesta.registros[0]);
        },
        querry,
        (error: any) => {
            console.log(error);
            setEnCarga(false);
        },
        () => {
            setDatosRegistro(undefined);
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