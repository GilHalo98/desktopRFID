'use client'

// React.
import React from 'react';

// Componentes propios.
import FormModificarReportesActividad from '../../forms/registros/reportesActividades/formModificarReporteActividad';
import FormRegistroReportesActividad from '../../forms/registros/reportesActividades/formRegistroReportesActividad';
import FormBusquedaReporteActividad from '../../forms/busqueda/formBusquedaReporteActividad';
import ModalModificarRegistro from '../../modals/modalOpciones/modalModificarRegistro';
import ModalAgregarRegistro from '../../modals/modalOpciones/modalAgregarRegistro';
import ModalRemoverRegistro from '../../modals/modalAlerta/modalRemoverRegistro';
import Display from '../../displays/display';
import Tabla from '../tabla';

// Importamos la funcionalidad de la tabla.
import {
    formatearRegistros,
    exportarDatos,
    guardarRegistro,
    modificarRegistro,
    eliminarRegistro,
    consultarRegistros,
    consultarRegistrosReporte,
    consultarRegistrosEmpleados,
    consultarRegistrosDispositivos
} from "./logic/registros";

// Modelo de datos.
import {
    ReporteActividad
} from '../../../utils/API/modelos/reporteActividad';

export default function TablaReportesActividades(
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
        totalPaginas,
        setTotalPaginas
    ] = React.useState(1);

    const [
        paginaActual,
        setPaginaActual
    ] = React.useState(1);

    const [
        offset,
        setOffset
    ] = React.useState(0);

    // Hooks de la barra de busqueda.
    const [
        idReporteActividad,
        setIdReporteActividad
    ] = React.useState(undefined);

    const [
        idReporte,
        setIdReporte
    ] = React.useState(undefined);

    const [
        idEmpleado,
        setIdEmpleado
    ] = React.useState(undefined);

    const [
        idDispositivo,
        setIdDispositivo
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
        estadoModalModificarRegistro,
        setEstadoModalModificarRegistro
    ] = React.useState(false);

    const [
        estadoModalRemoverRegistro,
        setEstadoModalRemoverRegistro
    ] = React.useState(false);

    const [
        estadoModalAgregarRegistro,
        setEstadoModalAgregarRegistro
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

    // Hooks para los menus de registros, busqueda y modificaciones.
    const [
        listaReportes,
        setListaReportes
    ] = React.useState([]);

    const [
        listaEmpleados,
        setListaEmpleados
    ] = React.useState([]);

    const [
        listaDispositivos,
        setListaDispositivos
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
                id: idReporteActividad,
                idReporteVinculado: idReporte,
                idEmpleadoVinculado: idEmpleado,
                idDispositivoVinculado: idDispositivo
            }
        );

        consultarRegistrosReporte(
            setListaReportes,
            setEnCarga
        );

        consultarRegistrosEmpleados(
            setListaEmpleados,
            setEnCarga
        );

        consultarRegistrosDispositivos(
            setListaDispositivos,
            setEnCarga
        );
    }, [
        registrosPorPagina, 
        paginaActual,
        idReporteActividad,
        idReporte,
        idEmpleado,
        idDispositivo,
        refresh
    ]);

    // Titulo de la tabla.
    const tituloTabla = 'Tabla de Reportes de actividad';

    // Cabeceras de la tabla.
    const cabeceras = [
        'ID',
        'ID de reporte vinculado',
        'ID de empleado vinculado',
        'ID de dispositivo vinculado',
        'Fecha de registro',
        'Ultima modificacion'
    ];

    // Funciones de las opciones de los registros.
    const funcionesRegistros = {
        onEliminar: (
            idRegistro: number, 
            indexRegistro: number
        ) => {
            setIdRegistroOperacion(
                idRegistro
            );

            setRegistroOperacion(
                listaRegistros[indexRegistro]
            );

            setEstadoModalRemoverRegistro(
                !estadoModalRemoverRegistro
            );
        },
        onModificar: (
            idRegistro: number, 
            indexRegistro: number
        ) => {
            setIdRegistroOperacion(
                idRegistro
            );

            setRegistroOperacion(
                listaRegistros[indexRegistro]
            );

            setEstadoModalModificarRegistro(
                !estadoModalModificarRegistro
            );
        },
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
        onAgregarRegistro: () => {setEstadoModalAgregarRegistro(
            !estadoModalAgregarRegistro
        )},
        onRefrescarTabla: () => {setRefresh(
            !refresh
        )},
        onExportarDatos: () => {console.log(
            "datos exportados"
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
        setIdReporteActividad: setIdReporteActividad,
        setIdReporte: setIdReporte,
        setIdEmpleado: setIdEmpleado,
        setIdDispositivo: setIdDispositivo
    };

    const elementosOpciones = {
        listaReportes: listaReportes,
        listaEmpleados: listaEmpleados,
        listaDispositivos: listaDispositivos
    };

    // Formato especial de datos.
    const formatoEspecial = {
        "Fecha de registro": (fechaRegistro?: string) => {
            if(!fechaRegistro) {
                return "";
            }

            return fechaRegistro.replace("T", " ").slice(0, 19);
        },
        "Ultima modificacion": (fechaModificacion?: string) => {
            if(!fechaModificacion) {
                return "";
            }
            return fechaModificacion.replace("T", " ").slice(0, 19);
        }
    };

    return(
        <Tabla
            tituloTabla={tituloTabla}
            cabeceras={cabeceras}
            registros={formatearRegistros(listaRegistros)}
            enCarga={enCarga}
            setEnCarga={setEnCarga}
            exportarDatos={(
                exportarDatosEnVista: boolean,
                datosRegistro: ReporteActividad[]
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
            {/*Modal de agregar registro*/}
            <ModalAgregarRegistro
                nombreTabla={tituloTabla}
                modalActivo={estadoModalAgregarRegistro}
                toggleModal={() => {setEstadoModalAgregarRegistro(
                    !estadoModalAgregarRegistro
                )}}
            >
                <FormRegistroReportesActividad
                    elementosOpciones={elementosOpciones}
                    toggleModal={() => {setEstadoModalAgregarRegistro(
                        !estadoModalAgregarRegistro
                    )}}
                    onGuardarRegistro={(
                        evento: any
                    ) => {guardarRegistro(
                        evento,
                        refresh,
                        setRefresh
                    )}}
                />
            </ModalAgregarRegistro>

            {/*Modal de modificar registro*/}
            <ModalModificarRegistro
                idRegistro={idRegistroOperacion}
                modalActivo={estadoModalModificarRegistro}
                toggleModal={() => {setEstadoModalModificarRegistro(
                    !estadoModalModificarRegistro
                )}}
            >
                <FormModificarReportesActividad
                    registro={registroOperacion}
                    elementosOpciones={elementosOpciones}
                    toggleModal={() => {setEstadoModalModificarRegistro(
                        !estadoModalModificarRegistro
                    )}}
                    onModificarRegistro={(
                        evento: any
                    ) => {modificarRegistro(
                        evento,
                        idRegistroOperacion,
                        refresh,
                        setRefresh
                    )}}
                />
            </ModalModificarRegistro>

            {/*Modal de alerta de remover registro*/}
            <ModalRemoverRegistro
                idRegistro={idRegistroOperacion}
                modalActivo={estadoModalRemoverRegistro}
                toggleModal={() => {setEstadoModalRemoverRegistro(
                    !estadoModalRemoverRegistro
                )}}
                onOk={(
                    idRegistro: number
                ) => {eliminarRegistro(
                    idRegistro,
                    refresh,
                    setRefresh
                )}}
            >
                <Display
                    tituloDisplay={'nose'}
                    registro={registroOperacion}
                    campos={[
                        ['id'],
                        ['idReporteVinculado'],
                        ['idEmpleadoVinculado'],
                        ['idDispositivoVinculado'],
                        ['fechaRegistroReporteActividad'],
                        ['fechaModificacionReporteActividad']
                    ]}
                    nombresCampos={[
                        'ID',
                        'ID de reporte vinculado',
                        'ID de empleado vinculado',
                        'ID de dispositivo vinculado',
                        'Fecha de registro',
                        'Ultima modificacion'
                    ]}
                />
            </ModalRemoverRegistro>

            { /*Barra de busqueda del Empleado*/ }
            <FormBusquedaReporteActividad
                parametrosBusqueda={parametrosBusqueda}
                elementosOpciones={elementosOpciones}
            />
        </Tabla>
    );
};