'use client'

// React.
import React from 'react';

// Interfaz de API.
import { ConsultaReporte, RemoverReporte } from '../../../utils/API/interface/reporte';
import { ConsultaTipoReporte } from '../../../utils/API/interface/tipoReporte';
import { ConsultaEmpleado } from '../../../utils/API/interface/empleado';
import { ConsultaZona } from '../../../utils/API/interface/zona';
import { ConsultaIoT } from '../../../utils/API/interface/IoT';

// Funciones propias.
import { formatearDatos } from '../../../utils/formatDataTabla';
import { funcionRefresh } from '../../../utils/refresh';

// Componentes propios.
import ModalVisualizarRegistro from '../../modals/modalOpciones/modalVisualizarRegistro';
import FormModificarReportes from '../../forms/registros/reportes/formModificarReporte';
import FormRegistroReportes from '../../forms/registros/reportes/formRegistroReportes';
import ModalModificarRegistro from '../../modals/modalOpciones/modalModificarRegistro';
import ModalAgregarRegistro from '../../modals/modalOpciones/modalAgregarRegistro';
import ModalRemoverRegistro from '../../modals/modalAlerta/modalRemoverRegistro';
import FormBusquedaReporte from '../../forms/busqueda/formBusquedaReporte';
import Display from '../../displays/display';
import Tabla from '../tabla';


export default function TablaReportes(
    props: {}
) {
    // Hook para el estado del indicador de carga.
    const [enCarga, setEnCarga] = React.useState(false);

    // Declaramos los hookers que vamos a usar.
    const [listaRegistros, setListaRegistros] = React.useState([]);
    const [totalPaginas, setTotalPaginas] = React.useState(1);
    const [paginaActual, setPaginaActual] = React.useState(1);
    const [offset, setOffset] = React.useState(0);

    // Hooks de la barra de busqueda.
    const [descripcionReporte, setDescripcionReporte] = React.useState(undefined);
    const [idDispositivoIoT, setIdDispositivoIoT] = React.useState(undefined);
    const [idTipoReporte, setIdTipoReporte] = React.useState(undefined);
    const [idEmpleado, setIdEmpleado] = React.useState(undefined);
    const [idReporte, setIdReporte] = React.useState(undefined);
    const [idZona, setIdZona] = React.useState(undefined);

    // Hooks de las opciones de la tabla.
    const [opcionesRegistros, setOpcionesRegistros] = React.useState(false);
    const [tiempoRefresh, setTiempoRefresh] = React.useState(60);
    const [elementos, setElementos] = React.useState(12);
    const [refresh, setRefresh] = React.useState(true);

    // Hooks del modal.
    const [estadoModalVisualizarRegistro, setEstadoModalVisualizarRegistro] = React.useState(false);
    const [estadoModalModificarRegistro, setEstadoModalModificarRegistro] = React.useState(false);
    const [estadoModalRemoverRegistro, setEstadoModalRemoverRegistro] = React.useState(false);
    const [estadoModalAgregarRegistro, setEstadoModalAgregarRegistro] = React.useState(false);

    // Hook del id del registro para operaciones
    const [idRegistroOperacion, setIdRegistroOperacion] = React.useState(undefined);
    const [registroOperacion, setRegistroOperacion] = React.useState(undefined);

    // Hooks para los menus de registros, busqueda y modificaciones.
    const [listaTiposReportes, setListaTiposReportes] = React.useState([]);
    const [listaDispositivos, setListaDispositivos] = React.useState([]);
    const [listaEmpleados, setListaEmpleados] = React.useState([]);
    const [listaZonas, setLisaZonas] = React.useState([]);

    // Declaramos el useEffect de react para actualizar el contenido de la vista.
    React.useEffect(() => {
        console.log('refresh');

        setListaRegistros([]);

        ConsultaReporte(
            elementos,
            offset,
            idReporte,
            descripcionReporte,
            idEmpleado,
            idDispositivoIoT,
            idTipoReporte,
            idZona,
            setListaRegistros,
            setTotalPaginas,
            setEnCarga
        );

        ConsultaTipoReporte(
            null,
            null,
            null,
            null,
            setListaTiposReportes,
            () => {},
            undefined
        );

        ConsultaEmpleado(
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            setListaEmpleados,
            () => {},
            undefined
        );

        ConsultaIoT(
            null,
            null,
            null,
            null,
            setListaDispositivos,
            () => {},
            undefined
        );

        ConsultaZona(
            null,
            null,
            null,
            null,
            null,
            null,
            setLisaZonas,
            () => {},
            undefined
        );

    }, [
        elementos, 
        paginaActual,
        idReporte,
        descripcionReporte,
        idTipoReporte,
        idDispositivoIoT,
        idEmpleado,
        idZona,
        refresh
    ]);

    // El componente se refresca cada tiempo dado.
    setTimeout(() => {
        funcionRefresh(refresh, setRefresh);
    }, tiempoRefresh*1000);

    // Titulo de la tabla.
    const tituloTabla = 'Tabla de Reportes';

    // Cabeceras de la tabla.
    const cabeceras = [
        'ID',
        'Descripcion',
        'Tipo de reporte',
        'Dispositivo',
        'Empleado',
        'Zona',
        'Fecha de registro',
        'Ultima modificacion'
    ];

    // Registros que se mostraran en la tabla.
    const formatearRegistros = (listaRegistros: any[]) => {
        return formatearDatos(
            listaRegistros,
            [
                ['id'],
                ['descripcionReporte'],
                ['tipoReporte', 'descripcionTipoReporte'],
                ['dispositivoIoT', 'descripcionDispositivo'],
                ['empleado', 'nombres'],
                ['zona', 'nombreZona'],
                ['fechaRegistroReporte'],
                ['fechaModificacionReporte'],
            ],
            [
                'id',
                'indexRegistro'
            ]
        );
    };

    // Funciones de las opciones de los registros.
    const funcionesRegistros = {
        onEliminar: (idRegistro: number, indexRegistro: number) => {
            setIdRegistroOperacion(idRegistro);
            setRegistroOperacion(listaRegistros[indexRegistro]);
            setEstadoModalRemoverRegistro(!estadoModalRemoverRegistro);
        },
        onModificar: (idRegistro: number, indexRegistro: number) => {
            setIdRegistroOperacion(idRegistro);
            setRegistroOperacion(listaRegistros[indexRegistro]);
            setEstadoModalModificarRegistro(!estadoModalModificarRegistro);
        },
        onVisualizar: (idRegistro: number, indexRegistro: number) => {
            setIdRegistroOperacion(idRegistro);
            setRegistroOperacion(listaRegistros[indexRegistro]);
            setEstadoModalVisualizarRegistro(!estadoModalVisualizarRegistro);
        },
        onGuardarConfiguracion: undefined
    };

    // Opciones de la tabla.
    const opcionesTabla = {
        elementos: elementos,
        opcionesRegistros: opcionesRegistros,
        tiempoRefresh: tiempoRefresh,
        setElementos: setElementos,
        setOpcionesRegistros: setOpcionesRegistros,
        setTiempoRefresh: setTiempoRefresh
    };

    // Funciones de las opciones de la tabla.
    const funcionesOpciones = {
        onExportarArchivo: undefined,
        onGenerarReporte: undefined,
        onAddRegistro: () => {
            setEstadoModalAgregarRegistro(!estadoModalAgregarRegistro);
        }
    };

    // Propiedades de la paginacion.
    const paginacion = {
        paginaActual: paginaActual,
        offset: offset,
        elementos: elementos,
        totalPaginas: totalPaginas,
        setPaginaActual: setPaginaActual,
        setOffset: setOffset,
    };

    const parametrosBusqueda = {
        setIdReporte: setIdReporte,
        setDescripcionReporte: setDescripcionReporte,
        setIdTipoReporte: setIdTipoReporte,
        setIdDispositivoIoT: setIdDispositivoIoT,
        setIdEmpleado: setIdEmpleado,
        setIdZona: setIdZona
    };

    const elementosOpciones = {
        listaTiposReportes: listaTiposReportes,
        listaEmpleados: listaEmpleados,
        listaDispositivos: listaDispositivos,
        listaZonas: listaZonas
    };

    return(
        <Tabla
            tituloTabla={tituloTabla}
            funcionesRegistros={funcionesRegistros}
            opcionesTabla={opcionesTabla}
            funcionesOpciones={funcionesOpciones}
            paginacion={paginacion}
            cabeceras={cabeceras}
            registros={formatearRegistros(listaRegistros)}
            enCarga={enCarga}
        >
            {/*Modal de agregar registro*/}
            <ModalAgregarRegistro
                nombreTabla={tituloTabla}
                modalActivo={estadoModalAgregarRegistro}
                toggleModal={() => {
                    setEstadoModalAgregarRegistro(!estadoModalAgregarRegistro);
                }}
            >
                <FormRegistroReportes
                    elementosOpciones={elementosOpciones}
                    toggleModal={() => {
                        setEstadoModalAgregarRegistro(!estadoModalAgregarRegistro);
                    }}
                    toggleRefresh={() => {
                        funcionRefresh(refresh, setRefresh);
                    }}
                />
            </ModalAgregarRegistro>

            {/*Modal de visualizar datos del registro*/}
            <ModalVisualizarRegistro
                idRegistro={idRegistroOperacion}
                modalActivo={estadoModalVisualizarRegistro}
                toggleModal={() => {
                    setEstadoModalVisualizarRegistro(!estadoModalVisualizarRegistro);
                }}
                onOk={() => {}}
                onRechazar={() => {}}
            >
                <Display
                    registro={registroOperacion}
                    propiedades={[
                        ['id'],
                        ['descripcionReporte'],
                        ['tipoReporte', 'clasificacionReporte'],
                        ['fechaRegistroReporte'],
                        ['empleado', 'nombres'],
                        ['dispositivoIoT', 'descripcionDispositivo'],
                        ['zona', 'nombreZona']
                    ]}
                    campos={[
                        'id',
                        'descripcion del reporte',
                        'resolucion del reporte',
                        'fecha de registro',
                        'Nombres del empleado',
                        'Dispositivo que registro el reporte',
                        'Zona donde se registro el reporte'
                    ]}
                />
            </ModalVisualizarRegistro>

            {/*Modal de modificar registro*/}
            <ModalModificarRegistro
                idRegistro={idRegistroOperacion}
                modalActivo={estadoModalModificarRegistro}
                toggleModal={() => {
                    setEstadoModalModificarRegistro(!estadoModalModificarRegistro);
                }}
            >
                <FormModificarReportes
                    registro={registroOperacion}
                    elementosOpciones={elementosOpciones}
                    toggleModal={() => {
                        setEstadoModalModificarRegistro(!estadoModalModificarRegistro);
                    }}
                    toggleRefresh={() => {
                        funcionRefresh(refresh, setRefresh);
                    }}
                />
            </ModalModificarRegistro>

            {/*Modal de alerta de remover registro*/}
            <ModalRemoverRegistro
                idRegistro={idRegistroOperacion}
                modalActivo={estadoModalRemoverRegistro}
                toggleModal={() => {
                    setEstadoModalRemoverRegistro(!estadoModalRemoverRegistro);
                }}
                onOk={(idRegistro: number) => {
                    RemoverReporte(idRegistro);
                    funcionRefresh(refresh, setRefresh);
                }}
                onRechazar={() => {}}
            >
                <Display
                    registro={registroOperacion}
                    propiedades={[
                        ['id'],
                        ['descripcionReporte'],
                        ['tipoReporte', 'clasificacionReporte'],
                        ['fechaRegistroReporte'],
                        ['empleado', 'nombres'],
                        ['dispositivoIoT', 'descripcionDispositivo'],
                        ['zona', 'nombreZona']
                    ]}
                    campos={[
                        'id',
                        'descripcion del reporte',
                        'resolucion del reporte',
                        'fecha de registro',
                        'Nombres del empleado',
                        'Dispositivo que registro el reporte',
                        'Zona donde se registro el reporte'
                    ]}
                />
            </ModalRemoverRegistro>

            { /*Barra de busqueda del Empleado*/ }
            <FormBusquedaReporte
                parametrosBusqueda={parametrosBusqueda}
                elementosOpciones={elementosOpciones}
            />
        </Tabla>
    );
};