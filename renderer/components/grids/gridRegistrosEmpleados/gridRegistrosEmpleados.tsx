'use client'

// React.
import React from 'react';

// Componentes propios.
import FormModificarRegistroEmpleadoCompleto from '../../forms/registros/empleadoCompleto/formModificarRegistroEmpleadoCompleto';
import ModalModificarRegistroEmpleadoCompleto from '../../modals/modalEmpleadoCompleto/modalModificarRegistroEmpleadoCompleto';
import FormModificarRegistroHorarioCompleto from '../../forms/registros/empleadoCompleto/formModificarRegistroHorarioCompleto';
import FormModificarRegistroUsuarioCompleto from '../../forms/registros/empleadoCompleto/formModificarRegistroUsuarioCompleto';
import FormRegistroEmpleadoCompleto from '../../forms/registros/empleadoCompleto/formRegistroEmpleadoCompleto';
import ModalRegistroEmpleadoCompleto from '../../modals/modalEmpleadoCompleto/modalRegistroEmpleadoCompleto';
import FormRegistroHorarioCompleto from '../../forms/registros/empleadoCompleto/formRegistroHorarioCompleto';
import FormRegistroUsuarioCompleto from '../../forms/registros/empleadoCompleto/formRegistroUsuarioCompleto';
import ModalVisualizarDatosDetalles from '../../modals/modalGrid/modalVisualizarDatosDetalles';
import ModalGuardarDatosTarjeta from '../../modals/modalGrid/modalGuardarDatosTarjeta';
import ModalConexionSerial from '../../modals/modalGrid/modalConexionSerial';
import Grid from '../grid';


// Importamos la funcionalidad de la tabla.
import {
    consultarRegistros,
    consultarRegistrosRoles
} from './logic/registros';

import {
    renderBarraBusqueda,
    renderizarCardsEmpleados
} from './logic/renders';

// Modelo de datos.

export default function TablaEmpleados(
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
        idRol,
        setIdRol
    ] = React.useState(undefined);

    const [
        nombres,
        setNombres
    ] = React.useState(undefined);
    
    const [
        apellidoPaterno,
        setApellidoPaterno
    ] = React.useState(undefined);

    const [
        apellidoMaterno,
        setApellidoMaterno
    ] = React.useState(undefined);

    const [
        numeroTelefonico,
        setNumeroTelefonico
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
        estadoModalAgregarRegistro,
        setEstadoModalAgregarRegistro
    ] = React.useState(false);

    const [
        estadoModalConexionSerial,
        setEstadoModalConexionSerial
    ] = React.useState(false);

    const [
        estadoModalGuardarDatosTarjeta,
        setEstadoModalGuardarDatosTarjeta
    ] = React.useState(false);

    const [
        estadoModalVisualizarDatosDetalles,
        setEstadoModalVisualizarDatosDetalles
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

    // Hook para los forms de registro
    // modificacion y la barra de busqueda.
    const [
        listaRoles,
        setListaRoles
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
                id: idEmpleado ,
                nombres: nombres,
                numeroTelefonico: apellidoPaterno,
                apellidoPaterno: apellidoMaterno,
                apellidoMaterno: numeroTelefonico,
                idRolVinculado: idRol
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
        apellidoPaterno,
        apellidoMaterno,
        numeroTelefonico,
        idRol,
        refresh
    ]);

    // Titulo del grid.
    const tituloGrid = 'Registros de Empleados';

    // Funciones de las opciones de los registros.
    const funcionesRegistros = {
        onGuardarDatosTarjeta: (
            idRegistro: number,
            indexRegistro: number
        ) => {
            setIdRegistroOperacion(idRegistro);

            setRegistroOperacion(
                listaRegistros[indexRegistro]
            );

            setEstadoModalGuardarDatosTarjeta(
                !estadoModalGuardarDatosTarjeta
            );

        },
        onVisualizarRegistro: (
            idRegistro: number,
            indexRegistro: number
        ) => {
            setIdRegistroOperacion(idRegistro);

            setRegistroOperacion(
                listaRegistros[indexRegistro]
            );

            setEstadoModalVisualizarDatosDetalles(
                !estadoModalVisualizarDatosDetalles
            );
        },
        onModificarRegistro: (
            idRegistro: number,
            indexRegistro: number
        ) => {
            setIdRegistroOperacion(idRegistro);

            setRegistroOperacion(
                listaRegistros[indexRegistro]
            );

            setEstadoModalModificarRegistro(
                !estadoModalModificarRegistro
            );
        }
    };

    // Opciones de la tabla.
    const opcionesGrid = {
        registrosPorPagina: registrosPorPagina,
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
        onRefrescarGrid: () => {setRefresh(
            !refresh
        )},
        onProbarSerial: () => {setEstadoModalConexionSerial(
            !estadoModalConexionSerial
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
        setOffset: setOffset
    };

    const parametrosBusqueda = {
        setIdEmpleado: setIdEmpleado,
        setNombres: setNombres,
        setApellidoPaterno: setApellidoPaterno,
        setApellidoMaterno: setApellidoMaterno,
        setNumeroTelefonico: setNumeroTelefonico,
        setIdRol: setIdRol
    };

    return(
        <Grid
            tituloGrid={tituloGrid}
            enCarga={enCarga}
            setEnCarga={setEnCarga}
            paginacion={paginacion}
            opcionesGrid={opcionesGrid}
            funcionesOpciones={funcionesOpciones}
            funcionesRegistros={funcionesRegistros}
            renderBarraBusqueda={() => {
                return renderBarraBusqueda(parametrosBusqueda, listaRoles);
            }}
        >
            {/*Modal de agregar registro*/}
            <ModalRegistroEmpleadoCompleto
                nombreTabla={tituloGrid}
                modalActivo={estadoModalAgregarRegistro}
                toggleModal={() => {setEstadoModalAgregarRegistro(
                    !estadoModalAgregarRegistro
                )}}
            >
                {/*Form de registro de empleado completo*/}
                <FormRegistroEmpleadoCompleto
                    elementosOpciones={listaRoles}
                    onGuardarRegistro={() => {}}
                    toggleModal={() => {setEstadoModalAgregarRegistro(
                        !estadoModalAgregarRegistro
                    )}}
                />

                {/*Form de registro de usuario completo*/}
                <FormRegistroUsuarioCompleto
                    elementosOpciones={[]}
                    onGuardarRegistro={() => {}}
                    toggleModal={() => {setEstadoModalAgregarRegistro(
                        !estadoModalAgregarRegistro
                    )}}
                    onAutogenerarPassword={() => {}}
                    onAutogenerarUsername={() => {}}
                />

                {/*Form de registro de horario completo*/}
                <FormRegistroHorarioCompleto
                    elementosOpciones={[]}
                    onGuardarRegistro={() => {}}
                    toggleModal={() => {setEstadoModalAgregarRegistro(
                        !estadoModalAgregarRegistro
                    )}}
                />
            </ModalRegistroEmpleadoCompleto>

            {/*Modal de modificar registro*/}
            <ModalModificarRegistroEmpleadoCompleto
                idRegistro={idRegistroOperacion}
                nombreTabla={tituloGrid}
                modalActivo={estadoModalModificarRegistro}
                toggleModal={() => {
                    setEstadoModalModificarRegistro(
                        !estadoModalModificarRegistro
                    );
                }}
            >
                {/*Form de registro de empleado completo*/}
                <FormModificarRegistroEmpleadoCompleto
                    elementosOpciones={listaRoles}
                    onGuardarRegistro={() => {}}
                    toggleModal={() => {setEstadoModalAgregarRegistro(
                        !estadoModalAgregarRegistro
                    )}}
                />

                {/*Form de registro de usuario completo*/}
                <FormModificarRegistroUsuarioCompleto
                    elementosOpciones={[]}
                    onGuardarRegistro={() => {}}
                    toggleModal={() => {setEstadoModalAgregarRegistro(
                        !estadoModalAgregarRegistro
                    )}}
                    onAutogenerarPassword={() => {}}
                    onAutogenerarUsername={() => {}}
                />

                {/*Form de registro de horario completo*/}
                <FormModificarRegistroHorarioCompleto
                    elementosOpciones={[]}
                    onGuardarRegistro={() => {}}
                    toggleModal={() => {setEstadoModalAgregarRegistro(
                        !estadoModalAgregarRegistro
                    )}}
                />
            </ModalModificarRegistroEmpleadoCompleto>

            {/*Modal de conexion con dispositivo por medio de serial*/}
            <ModalConexionSerial
                nombreGrid={tituloGrid}
                onConectarPorSerial={() => {}}
                modalActivo={estadoModalConexionSerial}
                toggleModal={() => {setEstadoModalConexionSerial(
                    !estadoModalConexionSerial
                )}}
            >
            </ModalConexionSerial>

            {/*Modal de guardar datos en tarjeta*/}
            <ModalGuardarDatosTarjeta
                nombreGrid={tituloGrid}
                registro={registroOperacion}
                onConectarPorSerial={() => {}}
                modalActivo={estadoModalGuardarDatosTarjeta}
                toggleModal={() => {setEstadoModalGuardarDatosTarjeta(
                    !estadoModalGuardarDatosTarjeta
                )}}
            >
            </ModalGuardarDatosTarjeta>

            {/*Modal para visualizar los datos del empelado a detalle*/}
            <ModalVisualizarDatosDetalles
                nombreGrid={tituloGrid}
                onConectarPorSerial={() => {}}
                modalActivo={estadoModalVisualizarDatosDetalles}
                toggleModal={() => {setEstadoModalVisualizarDatosDetalles(
                    !estadoModalVisualizarDatosDetalles
                )}}
            >
            </ModalVisualizarDatosDetalles>

            {/*Renderizamos las cards de los registros de los empleados*/}
            {renderizarCardsEmpleados(
                listaRegistros,
                funcionesRegistros
            )}
        </Grid>
    );
};
