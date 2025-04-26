'use client'

// Router de next
import Router from 'next/router';

// React.
import React from 'react';

// Componentes propios.
import TrackerDatos from '../../graficos/trackerDatos';
import TablaParaHorasTrabajadas from '../tablaParaHorasTrabajadas';
import FormBusquedaHorasTrabajadas from '../../forms/busqueda/formBusquedaHorasTrabajadas';
import ModalHorasTrabajadasDetalle from '../../modals/modalInformacionDetalle/modalHorasTrabajadasDetalle';

// Importamos la funcionalidad de la tabla.
import {
    exportarDatos,
    formatearRegistros,
    consultarRegistros,
    consultarRegistrosRoles,
    consultarResumenDatosReporte
} from './logic/registros';

import {
    HorasTrabajadas
} from '../../../utils/API/respuestas/horasTrabajadas';

// Modelo de datos.
import {
    Horario
} from "../../../utils/API/modelos/horario";

import {
    msToTime, separarTiempo
} from '../../../utils/conversiones';

import {
    formatearDatosTracker, onGenerarDocumento
} from './logic/rutinas';

export default function TablaHorasTrabajadas(
    props: {}
) {
    // Hook para el estado del indicador de carga.
    const [
        enCarga,
        setEnCarga
    ] = React.useState(false);

    // Declaramos los hookers que vamos a usar.
    const [
        listaRegistros,
        setListaRegistros
    ] = React.useState([]);

    const [
        offset,
        setOffset
    ] = React.useState(0);

    const [
        totalPaginas,
        setTotalPaginas
    ] = React.useState(1);

    const [
        paginaActual,
        setPaginaActual
    ] = React.useState(1);

    // Hooks de la barra de busqueda.
    const [
        idEmpleado,
        setIdEmpleado
    ] = React.useState(undefined);

    const [
        nombres,
        setNombres
    ] = React.useState(undefined);

    const [
        idRolVinculado,
        setIdRolVinculado
    ] = React.useState(undefined);

    const [
        semanaReporte,
        setSemanaReporte
    ] = React.useState(undefined);

    // Hooks de las opciones de la tabla.
    const [
        registrosPorPagina,
        setRegistrosPorPagina
    ] = React.useState(12);

    const [
        opcionesRegistros,
        setOpcionesRegistros
    ] = React.useState(false);

    const [
        refresh,
        setRefresh
    ] = React.useState(true);

    // Hooks del modal.
    const [
        estadoModalVisualizarDetalle,
        setEstadoModalVisualizarDetalle
    ] = React.useState(false);

    // Hook del id del registro para operaciones
    const [
        idRegistroOperacion,
        setIdRegistroOperacion
    ] = React.useState(undefined);

    const [
        registroOperacion,
        setRegistroOperacion
    ] = React.useState(undefined);

    // Hook para los forms de registro, modificacion y
    // la barra de busqueda.
    const [
        listaRoles,
        setListaRoles
    ] = React.useState([]);

    // Declaramos el useEffect de react para actualizar
    // el contenido de la vista.
    React.useEffect(() => {
        console.log('refresh');

        consultarRegistros(
            setListaRegistros,
            setTotalPaginas,
            setEnCarga,
            {
                limit: registrosPorPagina,
                offset: offset,
                idEmpleadoVinculado: idEmpleado,
                nombres: nombres,
                idRolVinculado: idRolVinculado,
                semanaReporte: semanaReporte
            }
        );

        consultarRegistrosRoles(
            setListaRoles,
            setEnCarga
        );

    }, [
        registrosPorPagina, 
        paginaActual,
        idEmpleado,
        nombres,
        idRolVinculado,
        semanaReporte,
        refresh
    ]);

    // Titulo de la tabla.
    const tituloTabla = 'Tabla de Horas trabajadas';

    // Cabeceras de la tabla.
    const cabeceras = [
        'Nombre de empleado',
        'Registro de horas',
        'Horas trabajadas totales'
    ];

    // Funciones de las opciones de los registros.
    const funcionesRegistros = {
        onVisualizar: (
            idRegistro: number,
            indexRegistro: number
        ) => {
            setIdRegistroOperacion(
                idRegistro
            );

            setRegistroOperacion(
                listaRegistros[indexRegistro]
            );

            setEstadoModalVisualizarDetalle(
                !estadoModalVisualizarDetalle
            )
        },
        onVisualizarDetalles: (
            idRegistro: number,
            indexRegistro: number
        ) => {
            setIdRegistroOperacion(
                idRegistro
            );

            setRegistroOperacion(
                listaRegistros[indexRegistro]
            );

            // Se hace el cambio de pagina a
            // la pagina principal.
            Router.push({
                pathname: '/home/reportes/horasTrabajadas/horasTrabajadasDetalle',
                query: {
                    id: listaRegistros[indexRegistro].id,
                    semanaReporte: semanaReporte
                }
            });
        }
    };

    // Opciones de la tabla.
    const opcionesTabla = {
        registrosPorPagina: registrosPorPagina,
        opcionesRegistros: opcionesRegistros,
        guardarConfiguracion: (evento: any) => {
            setRegistrosPorPagina(evento.target[0].value ?
                parseInt(evento.target[0].value) : 0
            );

            setOpcionesRegistros(evento.target[1].checked);

            setPaginaActual(1);
            setOffset(0);
        }
    };

    // Funciones de las opciones de la tabla.
    const funcionesOpciones = {
        onRefrescarTabla: () => {setRefresh(
            !refresh
        )},
        onExportarDatos: () => {onGenerarDocumento(
            semanaReporte,
            "portrait",
            "pt",
            "letter"
        )},
        onCambiarConfiguracion: () => {console.log(
            "configuracion cambiada"
        )}
    };

    // Propiedades de la paginacion.
    const paginacion = {
        paginaActual: paginaActual,
        offset: offset,
        registrosPorPagina: registrosPorPagina,
        totalPaginas: totalPaginas,
        setPaginaActual: setPaginaActual,
        setOffset: setOffset,
    };

    const parametrosBusqueda = {
        setIdEmpleado: setIdEmpleado,
        setNombres: setNombres,
        setIdRolVinculado: setIdRolVinculado,
        setSemanaReporte: setSemanaReporte
    };

    // Formato especial de datos.
    const formatoEspecial = {
        "Registro de horas": (horasTrabajadas?: HorasTrabajadas[]) => {
            if(!horasTrabajadas) {
                return('¡No existe registro de horario para este empleado!');
            }

            return <TrackerDatos
                registros={horasTrabajadas}
                formaterDatosTracker={formatearDatosTracker}
            />;
        },
        "Horas trabajadas totales": (tiempoTrabajoTotal?: number) => {
            if(!tiempoTrabajoTotal) {
                return "Sin Registro";
            }
            return separarTiempo(msToTime(tiempoTrabajoTotal));
        }
    };

    return(
        <TablaParaHorasTrabajadas
            tituloTabla={tituloTabla}
            cabeceras={cabeceras}
            registros={formatearRegistros(listaRegistros)}
            enCarga={enCarga}
            setEnCarga={setEnCarga}
            exportarDatos={(
                exportarDatosEnVista: boolean,
                datosRegistro: Horario[]
            ) => {exportarDatos(
                exportarDatosEnVista,
                datosRegistro,
                cabeceras,
                setEnCarga
            )}}
            formatoEspecial={formatoEspecial}
            funcionesOpciones={funcionesOpciones}
            opcionesTabla={opcionesTabla}
            funcionesRegistros={funcionesRegistros}
            paginacion={paginacion}
        >
            {/*Modal de visualizar detalle de reporte*/}
            <ModalHorasTrabajadasDetalle
                nombreTabla={''}
                modalActivo={estadoModalVisualizarDetalle}
                toggleModal={() => {setEstadoModalVisualizarDetalle(
                    !estadoModalVisualizarDetalle
                )}}
                registro={registroOperacion}
                semanaReporte={semanaReporte}
            />

            { /*Barra de busqueda del TipoReporte*/ }
            <FormBusquedaHorasTrabajadas
                parametrosBusqueda={parametrosBusqueda}
                elementosOpciones={listaRoles}
            />
        </TablaParaHorasTrabajadas>
    );
};