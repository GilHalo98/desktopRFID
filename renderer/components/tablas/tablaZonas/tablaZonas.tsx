'use client'

// React.
import React from 'react';

// Funciones propias.
import { formatearDatos } from '../../../utils/formatDataTabla';
import { funcionRefresh } from '../../../utils/refresh';

// Interfaz de API.
import { ConsultaZona, RemoverZona } from '../../../utils/API/interface/zona';

// Componentes propios.
import ModalVisualizarRegistro from '../../modals/modalOpciones/modalVisualizarRegistro';
import ModalModificarRegistro from '../../modals/modalOpciones/modalModificarRegistro';
import ModalAgregarRegistro from '../../modals/modalOpciones/modalAgregarRegistro';
import ModalRemoverRegistro from '../../modals/modalAlerta/modalRemoverRegistro';
import FormModificarZona from '../../forms/registros/zonas/formModificarZona';
import FormRegistroZona from '../../forms/registros/zonas/formRegistroZona';
import FormBusquedaZona from '../../forms/busqueda/formBusquedaZona';
import Display from '../../displays/display';
import Tabla from '../tabla';

export default function TablaZonas(
    props: {}
) {
    // Hook para el estado del indicador de carga.
    const [enCarga, setEnCarga] = React.useState(false);

    // Declaramos los hookers que vamos a usar.
    const [listaRegistros, setListaRegistros] = React.useState([]);
    const [offset, setOffset] = React.useState(0);
    const [totalPaginas, setTotalPaginas] = React.useState(1);
    const [paginaActual, setPaginaActual] = React.useState(1);

    // Hooks de la barra de busqueda.
    const [idZona, setIdZona] = React.useState(undefined);
    const [nombreZona, setNombreZona] = React.useState(undefined);
    const [descripcionZona, setDescripcionZona] = React.useState(undefined);
    const [bitZona, setBitZona] = React.useState(undefined);

    // Hooks de las opciones de la tabla.
    const [elementos, setElementos] = React.useState(12);
    const [opcionesRegistros, setOpcionesRegistros] = React.useState(false);
    const [refresh, setRefresh] = React.useState(true);
    const [tiempoRefresh, setTiempoRefresh] = React.useState(60);

    // Hooks del modal.
    const [estadoModalRemoverRegistro, setEstadoModalRemoverRegistro] = React.useState(false);
    const [estadoModalModificarRegistro, setEstadoModalModificarRegistro] = React.useState(false);

    const [estadoModalAgregarRegistro, setEstadoModalAgregarRegistro] = React.useState(false);
    const [estadoModalVisualizarRegistro, setEstadoModalVisualizarRegistro] = React.useState(false);

    // Hook del id del registro para operaciones
    const [idRegistroOperacion, setIdRegistroOperacion] = React.useState(undefined);
    const [registroOperacion, setRegistroOperacion] = React.useState(undefined);

    // Declaramos el useEffect de react para actualizar el contenido de la vista.
    React.useEffect(() => {
        console.log('refresh');

        setListaRegistros([]);

        ConsultaZona(
            elementos,
            offset,
            idZona,
            nombreZona,
            descripcionZona,
            bitZona,
            setListaRegistros,
            setTotalPaginas,
            setEnCarga
        );

    }, [
        elementos, 
        paginaActual,
        idZona,
        nombreZona,
        descripcionZona,
        bitZona,
        refresh
    ]);

    // El componente se refresca cada tiempo dado.
    setTimeout(() => {
        funcionRefresh(refresh, setRefresh);
    }, tiempoRefresh*1000);

    // Titulo de la tabla.
    const tituloTabla = 'Tabla de Zonas';

    // Cabeceras de la tabla.
    const cabeceras = [
        'ID',
        'Nombre de zona',
        'Descripcion',
        'Bit de accezo a zona',
        'Fecha de registro',
        'Última modificación'
    ];

    // Registros que se mostraran en la tabla.
    const formatearRegistros = (listaRegistros: any[]) => {
        return formatearDatos(
            listaRegistros,
            [
                ['id'],
                ['nombreZona'],
                ['descripcionZona'],
                ['bitZona'],
                ['fechaRegistroZona'],
                ['fechaModificacionZona']
            ],
            ['id', 'indexRegistro']
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
        setIdZona: setIdZona,
        setNombreZona: setNombreZona,
        setDescripcionZona: setDescripcionZona,
        setBitZona: setBitZona
    }

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
                <FormRegistroZona
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
                        ['nombreZona'],
                        ['descripcionZona'],
                        ['bitZona'],
                        ['fechaRegistroTipoReporte'],
                    ]}
                    campos={[
                        'ID',
                        'Nombre de zona',
                        'Descripcion',
                        'Bit de accezo a zona',
                        'Fecha de registro'
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
                <FormModificarZona
                    registro={registroOperacion}
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
                    RemoverZona(idRegistro);
                    funcionRefresh(refresh, setRefresh);
                }}
                onRechazar={() => {}}
            >
                <Display
                    registro={registroOperacion}
                    propiedades={[
                        ['id'],
                        ['nombreZona'],
                        ['descripcionZona'],
                        ['bitZona'],
                        ['fechaRegistroTipoReporte'],
                    ]}
                    campos={[
                        'ID',
                        'Nombre de zona',
                        'Descripcion',
                        'Bit de accezo a zona',
                        'Fecha de registro'
                    ]}
                />
            </ModalRemoverRegistro>

            { /*Barra de busqueda del TipoReporte*/ }
            <FormBusquedaZona
                parametrosBusqueda={parametrosBusqueda}
            />
        </Tabla>
    );
};