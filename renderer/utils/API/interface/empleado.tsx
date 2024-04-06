// Importamos los request.
import {
    GetEmpleado,
    PostEmpleado,
    DeleteEmpleado,
    PutEmpleado 
} from "../request/empleado";

function ConsultaEmpleado(
    limit: number,
    offset: number,
    id: string,
    numeroTelefonico: string,
    nombres: string,
    apellidoPaterno: string,
    apellidoMaterno: string,
    idRolVinculado: number,
    setListaRegistros: Function,
    setTotalPaginas: Function,
    setEnCarga: Function | undefined
) {
    // Creamos los parametros de busqueda de la consulta.
    const parametrosBusqueda = {
        limit: limit,
        offset: offset,
        id: id,
        numeroTelefonico: numeroTelefonico,
        nombres: nombres,
        apellidoPaterno: apellidoPaterno,
        apellidoMaterno: apellidoMaterno,
        idRolVinculado: idRolVinculado,
    };

    // Mostramos la pantalla en carga.
    if(setEnCarga) {
        setEnCarga(true);
    }

    // Realizamos el request.
    GetEmpleado(parametrosBusqueda).then((respuesta) => {
        // Guardamos los registros en la Empleado.
        setListaRegistros(respuesta.data.registros);

        if(setTotalPaginas) {
            // Guardamos el total de paginas en la variable.
            setTotalPaginas(Math.ceil(respuesta.data.totalRegistros / limit));
        }

    }).catch((error) => {
        // Ocurrio un errr al realizar el request.
        console.log(error);

    }).finally(() => {
        // Mostramos la pantalla en carga.
        if(setEnCarga) {
            setEnCarga(false);
        }
    });
};

function RegistrarEmpleado(
    formRegistro: FormData
) {
    // Realizamos el request.
    PostEmpleado(formRegistro).then((respuesta) => {

    }).catch((error) => {
        // Ocurrio un errr al realizar el request.
        console.log(error);

    }).finally(() => {
    });
};

function ModificarEmpleado(
    idRegistro: number,
    formRegistro: FormData
) {
    // Creamos los parametros de busqueda de la consulta.
    const parametrosBusqueda = {
        id: idRegistro
    };

    // Realizamos el request.
    PutEmpleado(parametrosBusqueda, formRegistro).then((respuesta) => {
        console.log(respuesta.data.codigoRespuesta);

    }).catch((error) => {
        // Ocurrio un errr al realizar el request.
        console.log(error);

    }).finally(() => {
    });
};

function RemoverEmpleado(
    idRegistro: number
) {
    // Creamos los parametros de busqueda de la consulta.
    const parametrosBusqueda = {
        id: idRegistro
    }

    // Realizamos el request.
    DeleteEmpleado(parametrosBusqueda).then((respuesta) => {

    }).catch((error) => {
        // Ocurrio un errr al realizar el request.
        console.log(error);

    }).finally(() => {
    });
};

export {
    ConsultaEmpleado,
    RegistrarEmpleado,
    RemoverEmpleado,
    ModificarEmpleado
};