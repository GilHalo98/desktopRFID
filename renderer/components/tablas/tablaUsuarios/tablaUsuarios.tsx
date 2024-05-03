'use client'

// React.
import React from 'react';

// Componentes propios.
import ModalVisualizarRegistro from '../../modals/modalOpciones/modalVisualizarRegistro';
import ModalModificarRegistro from '../../modals/modalOpciones/modalModificarRegistro';
import FormModificarUsuario from '../../forms/registros/usuarios/formModificarUsuario';
import FormRegistroUsuario from '../../forms/registros/usuarios/formRegistroUsuario';
import ModalAgregarRegistro from '../../modals/modalOpciones/modalAgregarRegistro';
import ModalRemoverRegistro from '../../modals/modalAlerta/modalRemoverRegistro';
import FormBusquedaUsuario from '../../forms/busqueda/formBusquedaUsuario';
import Display from '../../displays/display';
import Tabla from '../tabla';

// Importamos la funcionalidad de la tabla.
import {
    formatearRegistros,
    exportarDatos,
    guardarRegistro,
    modificarRegistro,
    eliminarRegistro,
    consultarRegistrosEmpleados,
    consultarRegistros
} from "./logic/registros";

import {
    generarNombreUsuario, generarPassword
} from './logic/autogen';

// Modelo de datos.
import { Usuario } from '../../../utils/API/modelos/usuario';

// Se eliminara
import {
    RemoverUsuario
} from '../../../utils/API/interface/usuarios';
import { Empleado } from '../../../utils/API/modelos/empleado';

export default function TablaUsuarios(
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
        idUsuario,
        setIdUsuario
    ] = React.useState(undefined);
    
    const [
        nombreUsuario,
        setNombreUsuario
    ] = React.useState(undefined);
    
    const [
        idEmpleado,
        setIdEmpleado
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
        estadoModalRemoverRegistro,
        setEstadoModalRemoverRegistro
    ] = React.useState(false);
    
    const [
        estadoModalModificarRegistro,
        setEstadoModalModificarRegistro
    ] = React.useState(false);

    const [
        estadoModalAgregarRegistro,
        setEstadoModalAgregarRegistro
    ] = React.useState(false);
    
    const [
        estadoModalVisualizarRegistro,
        setEstadoModalVisualizarRegistro
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

    // Hooks para el uso de la barra de busqueda, registro, etc.
    const [
        listaEmpleados,
        setListaEmpleados
    ] = React.useState([]);

    // Declaramos el useEffect de react para
    // actualizar el contenido de la vista.
    React.useEffect(() => {
        console.log('refresh');

        consultarRegistros(
            setListaRegistros,
            setTotalPaginas,
            setEnCarga,
            {
                limit: registrosPorPagina,
                offset: offset,
                id: idUsuario,
                nombreUsuario: nombreUsuario,
                idRegistroEmpleadoVinculado: idEmpleado
            }
        );

        consultarRegistrosEmpleados(
            setListaEmpleados,
            setEnCarga
        );
    }, [
        registrosPorPagina, 
        paginaActual,
        idUsuario,
        nombreUsuario,
        idEmpleado,
        refresh
    ]);

    // Titulo de la tabla.
    const tituloTabla = 'Tabla de Usuarios';

    // Cabeceras de la tabla.
    const cabeceras = [
        'ID',
        'Nombre de Usuario',
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
        setIdUsuario: setIdUsuario,
        setNombreUsuario: setNombreUsuario,
        setIdEmpleado: setIdEmpleado
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
                datosRegistro: Usuario[]
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
                <FormRegistroUsuario
                    elementosOpciones={listaEmpleados}
                    toggleModal={() => {setEstadoModalAgregarRegistro(
                        !estadoModalAgregarRegistro
                    )}}
                    onGuardarRegistro={(
                        evento: any,
                        registro: Empleado
                    ) => {guardarRegistro(
                        evento,
                        registro,
                        refresh,
                        setRefresh
                    )}}
                    onAutogenerarUsername={(
                        registro: Empleado,
                        setUsername: Function
                    ) => {setUsername(generarNombreUsuario(
                        registro.nombres
                        + " " 
                        + registro.apellidoPaterno
                        + " "
                        + registro.apellidoMaterno
                    ))}}
                    onAutogenerarPassword={(
                        registro: Empleado,
                        setPassword: Function
                    ) => {setPassword(generarPassword(
                        registro.fechaRegistroEmpleado
                    ))}}
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
                <FormModificarUsuario
                    registro={registroOperacion}
                    elementosOpciones={listaEmpleados}
                    toggleModal={() => {setEstadoModalModificarRegistro(
                        !estadoModalModificarRegistro
                    )}}
                    onModificarRegistro={(
                        evento: any,
                        registro: Empleado,
                        idRegistro: number
                    ) => {modificarRegistro(
                        evento,
                        registro,
                        idRegistro,
                        refresh,
                        setRefresh
                    )}}
                    onAutogenerarUsername={(
                        registro: Empleado,
                        setUsername: Function
                    ) => {
                        setUsername(generarNombreUsuario(
                        registro.nombres
                        + " " 
                        + registro.apellidoPaterno
                        + " "
                        + registro.apellidoMaterno
                    ))}}
                    onAutogenerarPassword={(
                        registro: Empleado,
                        setPassword: Function
                    ) => {setPassword(generarPassword(
                        registro.fechaRegistroEmpleado
                    ))}}
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
                    registro={registroOperacion}
                    propiedades={[
                        ['id'],
                        ['nombreUsuario'],
                        ['fechaRegistroUsuario'],
                    ]}
                    campos={[
                        'ID',
                        'Nombre de usuario',
                        'Fecha de registro'
                    ]}
                />
            </ModalRemoverRegistro>

            { /*Barra de busqueda del TipoReporte*/ }
            <FormBusquedaUsuario
                parametrosBusqueda={parametrosBusqueda}
                listaEmpleados={listaEmpleados}
            />
        </Tabla>
    );
};