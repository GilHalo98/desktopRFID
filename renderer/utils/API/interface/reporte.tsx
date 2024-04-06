// Importamos los request.
import {
    GetReporte,
    PostReporte,
    DeleteReporte,
    PutReporte 
} from "../request/reporte";

function ConsultaReporte(
    limit: number,
    offset: number,
    id: number,
    descripcionReporte: string,
    idEmpleadoVinculado: number,
    idRegistroDispositivoIoTVinculado: number,
    idTipoReporteVinculado: number,
    idRegistroZonaVinculada: number,
    setListaRegistros: Function,
    setTotalPaginas: Function,
    setEnCarga: Function | undefined
) {
    // Creamos los parametros de busqueda de la consulta.
    const parametrosBusqueda = {
        limit: limit,
        offset: offset,
        id: id,
        descripcionReporte: descripcionReporte,
        idEmpleadoVinculado: idEmpleadoVinculado,
        idRegistroDispositivoIoTVinculado: idRegistroDispositivoIoTVinculado,
        idTipoReporteVinculado: idTipoReporteVinculado,
        idRegistroZonaVinculada: idRegistroZonaVinculada,
    };

    // Mostramos la pantalla en carga.
    if(setEnCarga) {
        setEnCarga(true);
    }

    // Realizamos el request.
    GetReporte(parametrosBusqueda).then((respuesta) => {
        // Guardamos los registros en la Reporte.
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

function RegistrarReporte(
    formRegistro: FormData
) {
    // Realizamos el request.
    PostReporte(formRegistro).then((respuesta) => {

    }).catch((error) => {
        // Ocurrio un errr al realizar el request.
        console.log(error);

    }).finally(() => {
    });
};

function ModificarReporte(
    idRegistro: number,
    formRegistro: FormData
) {
    // Creamos el cuerpo del registro.
    const parametrosBusqueda = {
        id: idRegistro,
    };

    // Realizamos el request.
    PutReporte(parametrosBusqueda, formRegistro).then((respuesta) => {

    }).catch((error) => {
        // Ocurrio un errr al realizar el request.
        console.log(error);

    }).finally(() => {
    });
};

function RemoverReporte(
    idRegistro: number
) {
    // Creamos los parametros de busqueda de la consulta.
    const parametrosBusqueda = {
        id: idRegistro
    }

    // Realizamos el request.
    DeleteReporte(parametrosBusqueda).then((respuesta) => {

    }).catch((error) => {
        // Ocurrio un errr al realizar el request.
        console.log(error);

    }).finally(() => {
    });
};

export {
    ConsultaReporte,
    RegistrarReporte,
    RemoverReporte,
    ModificarReporte
};