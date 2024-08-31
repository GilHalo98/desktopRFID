'use client'

// React.
import React from "react";

// Funcionalidad de la vista.
import {
    onEliminarPagina,
    onImprimirArchivo,
    onAgregarNuevaPagina,
    onDuplicarContenido
} from "./logic/rutinas";

// Componentes propios.
import GridParaReporteDeDibujos from "../gridParaReporteDeDibujos";

// Renders
import {
    renderizarContenido
} from "./logic/renders";

// Consultas de datos a db.
import {
    consultarRegistrosEmpleados
} from "./logic/registros";

// Modelo de datos.
import {
    Empleado
} from "../../../utils/API/modelos/empleado";

export default function GridReporteDibujos() {
    // Hooks generales.
    const [
        enCarga,
        setEnCarga
    ] = React.useState(true);

    // Hooks del funcionamiento de la vista.
    const [
        indexPaginaActual,
        setIndexPaginaActual
    ] = React.useState(0);

    // Hook de paginas de reportes.
    const [
        paginas,
        setPaginas
    ] = React.useState([] as Pagina[]);

    const [
        pagina,
        setPagina
    ] = React.useState({} as Pagina);

    const [
        paginasNoOk,
        setPaginasNoOk,
    ] = React.useState([] as {
        pagina: Pagina,
        numeroPagina: number
    }[]);

    // Hooks de datos de consultas.
    const [
        listaRegistros,
        setListaRegistros
    ] = React.useState([] as Empleado[]);

    // Consultamos datos al api.
    React.useEffect(() => {
        consultarRegistrosEmpleados(
            setListaRegistros,
            setEnCarga
        );
    }, []);

    // Actualizamos la vista cada vez que se modifica la
    // lista de paginas.
    React.useEffect(() => {
        console.log('refresh');

        // Si el index actual es menor que 0, se pasa a la primera hoja.
        if(indexPaginaActual < 0) {
            setIndexPaginaActual(0);
        }

        // Guardamos los cambios echos en las paginas.
        setPagina(paginas[indexPaginaActual]);

    }, [paginas, indexPaginaActual, paginasNoOk]);

    return (
        <GridParaReporteDeDibujos
            enCarga={enCarga}
            paginas={paginas}
            paginasNoOk={paginasNoOk}
            indexPaginaActual={indexPaginaActual}
            setIndexPaginaActual={setIndexPaginaActual}
            funcionesOpciones={{
                onEliminarPagina: () => {
                    onEliminarPagina(
                        paginas,
                        setPaginas,
                        indexPaginaActual,
                        setIndexPaginaActual
                    );
                },
                onImprimirArchivo: (
                    orientacionHoja: "p" | "portrait" | "l" | "landscape",
                    unidadesHoja: "pt" | "px" | "in" | "mm" | "cm" | "ex" | "em" | "pc",
                    formatoHoja: string,
                    toggleModalError: Function,
                    setProgresoRenderizado: Function,
                    toggleModalGenerarReporte: Function
                ) => {
                    onImprimirArchivo(
                        paginas,
                        paginasNoOk,
                        setPaginasNoOk,
                        orientacionHoja,
                        unidadesHoja,
                        formatoHoja,
                        toggleModalError,
                        setProgresoRenderizado,
                        toggleModalGenerarReporte
                    );
                },
                onAgregarNuevaPagina: () => {
                    onAgregarNuevaPagina(
                        paginas,
                        setPaginas
                    );
                },
                onDuplicarContenido: (
                    index: number
                )  => {
                    onDuplicarContenido(
                        index,
                        indexPaginaActual,
                        setPaginas,
                        paginas
                    );
                }
            }}
        >

            {renderizarContenido(
                pagina,
                setPaginas,
                paginas,
                listaRegistros
            )}
        </GridParaReporteDeDibujos>
    );
};
