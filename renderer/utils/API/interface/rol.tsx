// Importamos los request.
import {
    GetRol,
    PostRol,
    DeleteRol,
    PutRol 
} from "../request/rol";

function ConsultaRol(
    limit: number,
    offset: number,
    id: number,
    rolTrabajador: string,
    descripcionRol: string,
    idPermisoVinculado: number,
    setListaRegistros: Function,
    setTotalPaginas: Function,
    setEnCarga: Function | undefined
) {
    // Creamos los parametros de busqueda de la consulta.
    const parametrosBusqueda = {
        limit: limit,
        offset: offset,
        id: id,
        rolTrabajador: rolTrabajador,
        descripcionRol: descripcionRol,
        idPermisoVinculado: idPermisoVinculado
    };

    // Mostramos la pantalla en carga.
    if(setEnCarga) {
        setEnCarga(true);
    }

    // Realizamos el request.
    GetRol(parametrosBusqueda).then((respuesta) => {
        // Guardamos los registros en la Rol.
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

function RegistrarRol(
    formRegistro: FormData
) {
    // Realizamos el request.
    PostRol(formRegistro).then((respuesta) => {

    }).catch((error) => {
        // Ocurrio un errr al realizar el request.
        console.log(error);

    }).finally(() => {
    });
};

function ModificarRol(
    idRegistro: number,
    formRegistro: FormData
) {
    // Creamos los parametros de busqueda de la consulta.
    const parametrosBusqueda = {
        id: idRegistro
    }

    // Realizamos el request.
    PutRol(parametrosBusqueda, formRegistro).then((respuesta) => {

    }).catch((error) => {
        // Ocurrio un errr al realizar el request.
        console.log(error);

    }).finally(() => {
    });
};

function RemoverRol(
    idRegistro: number
) {
    // Creamos los parametros de busqueda de la consulta.
    const parametrosBusqueda = {
        id: idRegistro
    }

    // Realizamos el request.
    DeleteRol(parametrosBusqueda).then((respuesta) => {

    }).catch((error) => {
        // Ocurrio un errr al realizar el request.
        console.log(error);

    }).finally(() => {
    });
};

export {
    ConsultaRol,
    RegistrarRol,
    RemoverRol,
    ModificarRol
};