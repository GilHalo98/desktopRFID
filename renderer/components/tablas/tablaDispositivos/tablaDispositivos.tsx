'use client'

// React.
import React from 'react';

// Funciones propias.
import { formatearDatos } from '../../../utils/formatDataTabla';
import { funcionRefresh } from '../../../utils/refresh';

// Interfaz de API.
import { ConsultaZona } from '../../../utils/API/interface/zona';
import { ConsultaDispositivo, RemoverDispositivo } from '../../../utils/API/interface/dispositivo';
import { ConsultaTipoDispositivo } from '../../../utils/API/interface/tipoDispositivo';

// Componentes propios.
import FormRegistroDispositivos from '../../forms/registros/dispositivos/formRegistroDispositivos';
import FormModificarDispositivos from '../../forms/registros/dispositivos/formModificarDispositivos';
import ModalGuardarConfiguracionIoT from '../../modals/modalOpciones/modalGuardarConfiguracionIoT';
import ModalVisualizarRegistro from '../../modals/modalOpciones/modalVisualizarRegistro';
import MenuGuardarConfiguracionIoT from '../../forms/menus/menuGuardarConfiguracionIoT';
import ModalModificarRegistro from '../../modals/modalOpciones/modalModificarRegistro';
import FormBusquedaDispositivo from '../../forms/busqueda/formBusquedaDispositivo';
import ModalAgregarRegistro from '../../modals/modalOpciones/modalAgregarRegistro';
import ModalRemoverRegistro from '../../modals/modalAlerta/modalRemoverRegistro';
import Display from '../../displays/display';
import Tabla from '../tabla';

export default function TablaDispositivos(
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
    const [idDispositivo, setIdDispositivo] = React.useState(undefined);
    const [idZona, setIdZona] = React.useState(undefined);
    const [idTipoDispositivo, setIdTipoDispositivo] = React.useState(undefined);

    // Hooks de las opciones de la tabla.
    const [elementos, setElementos] = React.useState(12);
    const [opcionesRegistros, setOpcionesRegistros] = React.useState(false);
    const [refresh, setRefresh] = React.useState(true);
    const [tiempoRefresh, setTiempoRefresh] = React.useState(60);

    // Hooks del modal.
    const [estadoModalGuardarConfiguracionIoT, setEstadoModalGuardarConfiguracionIoT] = React.useState(false);
    const [estadoModalVisualizarRegistro, setEstadoModalVisualizarRegistro] = React.useState(false);
    const [estadoModalModificarRegistro, setEstadoModalModificarRegistro] = React.useState(false);
    const [estadoModalRemoverRegistro, setEstadoModalRemoverRegistro] = React.useState(false);
    const [estadoModalAgregarRegistro, setEstadoModalAgregarRegistro] = React.useState(false);

    // Hook del id del registro para operaciones
    const [idRegistroOperacion, setIdRegistroOperacion] = React.useState(undefined);
    const [registroOperacion, setRegistroOperacion] = React.useState(undefined);

    // Hook para los forms de registro, modificacion y la barra de busqueda.
    const [listaZonas, setLisaZonas] = React.useState([]);
    const [listaTiposDispositivos, setListaTiposDispositivos] = React.useState([]);

    // Declaramos el useEffect de react para actualizar el contenido de la vista.
    React.useEffect(() => {
        console.log('refresh');

        setListaRegistros([]);

        ConsultaDispositivo(
            elementos,
            offset,
            idDispositivo,
            idZona,
            idTipoDispositivo,
            setListaRegistros,
            setTotalPaginas,
            setEnCarga
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

        ConsultaTipoDispositivo(
            null,
            null,
            null,
            null,
            setListaTiposDispositivos,
            () => {},
            undefined
        );

    }, [
        elementos, 
        paginaActual,
        idDispositivo,
        idZona,
        idTipoDispositivo,
        refresh
    ]);

    // El componente se refresca cada tiempo dado.
    setTimeout(() => {
        funcionRefresh(refresh, setRefresh);
    }, tiempoRefresh*1000);

    // Titulo de la tabla.
    const tituloTabla = 'Tabla de Dispositivos IoT';

    // Cabeceras de la tabla.
    const cabeceras = [
        'ID',
        'Descripcion',
        'Tipo de dispositivo',
        'Zona donde se encuentra el dispositivo',
        'Fecha de registro',
        'Última modificación'
    ];

    // Registros que se mostraran en la tabla.
    const formatearRegistros = (listaRegistros: any[]) => {
        return formatearDatos(
            listaRegistros,
            [
                ['id'],
                ['descripcionDispositivo'],
                ['tipoDispositivo', 'nombreTipoDispositivo'],
                ['zona', 'nombreZona'],
                ['fechaRegistroIoT'],
                ['fechaModificacionIoT'],
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
        onGuardarConfiguracion: (idRegistro: number, indexRegistro: number) => {
            setIdRegistroOperacion(idRegistro);
            setRegistroOperacion(listaRegistros[indexRegistro]);
            setEstadoModalGuardarConfiguracionIoT(!estadoModalGuardarConfiguracionIoT);
        }
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
        setIdDispositivo: setIdDispositivo,
        setIdZona: setIdZona,
        setIdTipoDispositivo: setIdTipoDispositivo
    };

    const elementosOpciones = {
        listaZonas: listaZonas,
        listaTiposDispositivos: listaTiposDispositivos
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
            formatoEspecial={undefined}
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
                <FormRegistroDispositivos
                    toggleModal={() => {
                        setEstadoModalAgregarRegistro(!estadoModalAgregarRegistro);
                    }}
                    toggleRefresh={() => {
                        funcionRefresh(refresh, setRefresh);
                    }}
                    elementosOpciones={elementosOpciones}
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
                        ['descripcionDispositivo'],
                        ['fechaRegistroIoT'],
                    ]}
                    campos={[
                        'ID',
                        'Descripcion',
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
                <FormModificarDispositivos
                    registro={registroOperacion}
                    toggleModal={() => {
                        setEstadoModalModificarRegistro(!estadoModalModificarRegistro);
                    }}
                    toggleRefresh={() => {
                        funcionRefresh(refresh, setRefresh);
                    }}
                    elementosOpciones={elementosOpciones}
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
                    RemoverDispositivo(idRegistro);
                    funcionRefresh(refresh, setRefresh);
                }}
                onRechazar={() => {}}
            >
                <Display
                    registro={registroOperacion}
                    propiedades={[
                        ['id'],
                        ['descripcionDispositivo'],
                        ['fechaRegistroIoT'],
                    ]}
                    campos={[
                        'ID',
                        'Descripcion',
                        'Fecha de registro'
                    ]}
                />
            </ModalRemoverRegistro>

            {/*Modal de guardado de configuracion de dispositivo*/}
            <ModalGuardarConfiguracionIoT
                registro={registroOperacion}
                headerModal={'Guardar Configuracion'}
                tituloModal={'Guardar la configuracion del dispositivo IoT en este'}
                modalActivo={estadoModalGuardarConfiguracionIoT}
                toggleModal={() => {
                    setEstadoModalGuardarConfiguracionIoT(!estadoModalGuardarConfiguracionIoT)
                }}
                onOk={() => {}}
                onRechazar={() => {}}
            >
                <MenuGuardarConfiguracionIoT
                    registro={registroOperacion}
                    toggleModal={() => {
                        setEstadoModalGuardarConfiguracionIoT(!setEstadoModalGuardarConfiguracionIoT);
                    }}
                />

            </ModalGuardarConfiguracionIoT>

            { /*Barra de busqueda del TipoReporte*/ }
            <FormBusquedaDispositivo
                parametrosBusqueda={parametrosBusqueda}
                elementosOpciones={elementosOpciones}
            />
        </Tabla>
    );
};