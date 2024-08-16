'use client'

// React.
import React from 'react';

// Componentes propios.
import FormModificarDispositivos from '../../forms/registros/dispositivos/formModificarDispositivos';
import FormRegistroDispositivos from '../../forms/registros/dispositivos/formRegistroDispositivos';
import ModalModificarRegistro from '../../modals/modalOpciones/modalModificarRegistro';
import FormBusquedaDispositivo from '../../forms/busqueda/formBusquedaDispositivo';
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
    consultarRegistrosZonas,
    consultarRegistrosTiposDispositivos
} from './logic/registros';

// Modelo de datos.
import { DispositivoIoT } from '../../../utils/API/modelos/dispositivoIoT';

export default function TablaDispositivos(
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
        idDispositivo,
        setIdDispositivo
    ] = React.useState(undefined);

    const [
        idZona,
        setIdZona
    ] = React.useState(undefined);

    const [
        idTipoDispositivo,
        setIdTipoDispositivo
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

    // Hook para los forms de registro, modificacion y la barra de busqueda.
    const [
        listaZonas,
        setListaZonas
    ] = React.useState([]);

    const [
        listaTiposDispositivos,
        setListaTiposDispositivos
    ] = React.useState([]);

    // Declaramos el useEffect de react para actualizar el contenido de la vista.
    React.useEffect(() => {
        console.log('refresh');

        consultarRegistros(
            setListaRegistros,
            setTotalPaginas,
            setEnCarga,
            {
                limit: registrosPorPagina,
                offset: offset,
                id: idDispositivo ,
                idZonaVinculada: idZona ,
                idTipoDispositivoVinculado: idTipoDispositivo 
            }
        );

        consultarRegistrosZonas(
            setListaZonas,
            setEnCarga
        );

        consultarRegistrosTiposDispositivos(
            setListaTiposDispositivos,
            setEnCarga
        );

    }, [
        registrosPorPagina, 
        paginaActual,
        idDispositivo,
        idZona,
        idTipoDispositivo,
        refresh
    ]);

    // Titulo de la tabla.
    const tituloTabla = 'Tabla de Dispositivos IoT';

    // Cabeceras de la tabla.
    const cabeceras = [
        'ID',
        'Descripcion',
        'Tipo de dispositivo',
        'Zona donde se encuentra el dispositivo',
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
        setIdDispositivo: setIdDispositivo,
        setIdZona: setIdZona,
        setIdTipoDispositivo: setIdTipoDispositivo
    };

    const elementosOpciones = {
        listaZonas: listaZonas,
        listaTiposDispositivos: listaTiposDispositivos
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
                datosRegistro: DispositivoIoT[]
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
                <FormRegistroDispositivos
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
                <FormModificarDispositivos
                    elementosOpciones={elementosOpciones}
                    registro={registroOperacion}
                    onModificarRegistro={(
                        evento: any,
                        idRegistro: number
                    ) => {modificarRegistro(
                        evento,
                        idRegistro,
                        refresh,
                        setRefresh
                    )}}
                    toggleModal={() => {setEstadoModalModificarRegistro(
                        !estadoModalModificarRegistro
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
                        ['descripcionDispositivo'],
                        ['fechaRegistroIoT'],
                    ]}
                    nombresCampos={[
                        'ID',
                        'Descripcion',
                        'Fecha de registro'
                    ]}
                />
            </ModalRemoverRegistro>

            { /*Barra de busqueda del TipoReporte*/ }
            <FormBusquedaDispositivo
                parametrosBusqueda={parametrosBusqueda}
                elementosOpciones={elementosOpciones}
            />
        </Tabla>
    );
};