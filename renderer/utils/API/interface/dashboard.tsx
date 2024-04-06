// Importamos los request.
import {
    GetAccesosRecientes,
    GetAccesosPorDia,
    GetReportesPorTipo
} from "../request/dashboard";

function ConsultaAccesosRecientes(
    limit: number,
    offset: number,
    id: string,
    descripcionReporte: string,
    setListaRegistros: Function,
    setTotalPaginas: Function
) {
    // Creamos los parametros de busqueda de la consulta.
    const parametrosBusqueda = {
        limit: limit,
        offset: offset,
        id: id,
        descripcionReporte: descripcionReporte,
    };

    // Realizamos el request.
    GetAccesosRecientes(parametrosBusqueda).then((respuesta) => {
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
    });
};

function ReporteAccesosPorDia(
    setListaRegistros: Function,
) {
    // Creamos los parametros de busqueda de la consulta.
    const parametrosBusqueda = {
    };

    // Realizamos el request.
    GetAccesosPorDia(parametrosBusqueda).then((respuesta) => {
        // Guardamos los registros en la Reporte.
        setListaRegistros(respuesta.data);

    }).catch((error) => {
        // Ocurrio un errr al realizar el request.
        console.log(error);

    }).finally(() => {
    });
};

function ReportesPorTipo(
    setListaRegistros: Function,
) {
    // Creamos los parametros de busqueda de la consulta.
    const parametrosBusqueda = {
    };

    // Realizamos el request.
    GetReportesPorTipo(parametrosBusqueda).then((respuesta) => {
        // Guardamos los registros en la Reporte.
        setListaRegistros(respuesta.data.conteos);

    }).catch((error) => {
        // Ocurrio un errr al realizar el request.
        console.log(error);

    }).finally(() => {
    });
};

export {
    ConsultaAccesosRecientes,
    ReporteAccesosPorDia,
    ReportesPorTipo
};