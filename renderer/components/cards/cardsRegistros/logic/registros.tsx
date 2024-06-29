// Modelo de permiso
import {
    Recurso
} from "../../../../utils/API/modelos/recurso";

// Importamos la interfaz con la API.
import {
    ConsultaRecurso
} from "../../../../utils/API/interface/recurso";

// Consulta la imagen del empleado.
const consultarImagenEmpleado = (
    setListaRegistros: Function,
    setTotalPaginas: Function,
    setEnCarga: Function,
    querry: {
        limit?: number,
        offset?: number,
        id?: number,
        tipo?: string,
        nombre?: string
    }
) => {
    return ConsultaRecurso(
        (respuesta: any) => {
            setListaRegistros(respuesta.registros);
            setTotalPaginas(Math.ceil(
                respuesta.totalRegistros / querry.limit
            ));
        },
        querry,
        (error: any) => {
            console.log(error);
            setEnCarga(false);
        },
        () => {
            setListaRegistros([]);
            setEnCarga(true);
        },
        () => {
            setEnCarga(false);
        }
    );
};

export {
    consultarImagenEmpleado
};