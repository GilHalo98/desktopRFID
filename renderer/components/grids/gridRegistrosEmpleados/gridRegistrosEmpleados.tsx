'use client'

// React.
import React from 'react';

// Componentes propios.
import FormModificarRegistroEmpleadoCompleto from '../../forms/registros/empleadoCompleto/formModificarRegistroEmpleadoCompleto';
import ModalModificarRegistroEmpleadoCompleto from '../../modals/modalEmpleadoCompleto/modalModificarRegistroEmpleadoCompleto';
import FormRegistroEmpleadoCompleto from '../../forms/registros/empleadoCompleto/formRegistroEmpleadoCompleto';
import ModalRegistroEmpleadoCompleto from '../../modals/modalEmpleadoCompleto/modalRegistroEmpleadoCompleto';
import ModalVisualizarDatosDetalles from '../../modals/modalGrid/modalVisualizarDatosDetalles';
import ModalGuardarDatosTarjeta from '../../modals/modalGrid/modalGuardarDatosTarjeta';
import ModalConexionSerial from '../../modals/modalGrid/modalConexionSerial';
import GridParaRegistrosDeEmpleados from '../gridParaRegistrosDeEmpleados';


// Importamos la funcionalidad de la tabla.
import {
    consultarRegistros,
    consultarRegistrosVinculados,
    guardarRegistro,
    modificarRegistro
} from './logic/registros';

import {
    renderBarraBusqueda,
    renderizarCardsEmpleados
} from './logic/renders';
import { Col, Row, Spinner } from 'reactstrap';

// Modelo de datos.

export default function GridRegistrosEmpleados(
    props: {}
) {
    // Hook para el estado del indicador de carga.
    const [
        enCarga,
        setEnCarga
    ] = React.useState(false);

    // Hooks para la paginacion.
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
        listaRegistros,
        setListaRegistros
    ] = React.useState(null);

    const [
        listaRegistrosVinculados,
        setListaRegistrosVinculados
    ] = React.useState([]);

    // Declaramos el useEffect de react para
    // actualizar el contenido de la vista.
    React.useEffect(() => {
        console.log('refresh');

        consultarRegistrosVinculados(
            setListaRegistrosVinculados,
            setEnCarga,
            () => {}
        );

    }, [refresh]);

    // Consultamos los registros.
    React.useEffect(() => {
        consultarRegistros(
            setListaRegistros,
            setTotalPaginas,
            setEnCarga,
            {
                limit: registrosPorPagina,
                offset: offset,
                id: idEmpleado ,
                nombres: nombres,
                numeroTelefonico: numeroTelefonico,
                apellidoPaterno: apellidoPaterno,
                apellidoMaterno: apellidoMaterno,
                idRolVinculado: idRol
            }
        );
    }, [
        listaRegistrosVinculados,
        registrosPorPagina,
        paginaActual,
        idEmpleado,
        nombres,
        apellidoPaterno,
        apellidoMaterno,
        numeroTelefonico,
        idRol,
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

    // Propiedades de la barra de busqueda.
    const parametrosBusqueda = {
        setId: setIdEmpleado,
        setNombres: setNombres,
        setApellidoPaterno: setApellidoPaterno,
        setApellidoMaterno: setApellidoMaterno,
        setNumeroTelefonico: setNumeroTelefonico,
        setIdRol: setIdRol
    };

    const poblarGrid = () => {
        if(!listaRegistros) {
            return(
                <Row>
                    <Col xs='auto'>
                        <Spinner
                            color="warning"
                            style={{
                                height: '100px',
                                width: '100px'
                            }}
                        />
                    </Col>
                </Row>
            );
        }

        return renderizarCardsEmpleados(
            listaRegistros,
            funcionesRegistros
        );
    };

    return(
        <GridParaRegistrosDeEmpleados
            tituloGrid={tituloGrid}
            elementosOpciones={listaRegistrosVinculados}
            parametrosBusqueda={parametrosBusqueda}
            opcionesGrid={opcionesGrid}
            funcionesOpciones={funcionesOpciones}
            paginacion={paginacion}
            funcionesRegistros={funcionesRegistros}
        >
            {/* Renderizamos el contenido del grid. */}
            {poblarGrid()}

            {/*Modal de agregar registro*/}
            <ModalRegistroEmpleadoCompleto
                nombreTabla={tituloGrid}
                modalActivo={estadoModalAgregarRegistro}
                toggleModal={() => {
                    setEstadoModalAgregarRegistro(
                        !estadoModalAgregarRegistro
                    );
                } }
            >
                {/*Form de registro de empleado completo*/}
                <FormRegistroEmpleadoCompleto
                    elementosOpciones={listaRegistrosVinculados}
                    onGuardarRegistro={(evento) => {
                        guardarRegistro(evento, refresh, setRefresh);
                    }}
                    onAutogenerarPassword={() => {
                    }}
                    onAutogenerarUsername={() => {
                    }}
                    toggleModal={() => {
                        setEstadoModalAgregarRegistro(
                            !estadoModalAgregarRegistro
                        );
                    }}
                />
            </ModalRegistroEmpleadoCompleto>

            {/*Modal de modificar registro*/}
            <ModalModificarRegistroEmpleadoCompleto
                nombreTabla={tituloGrid}
                modalActivo={estadoModalModificarRegistro}
                toggleModal={() => {
                    setEstadoModalModificarRegistro(
                        !estadoModalModificarRegistro
                    );
                }}
            >
                {/*Form para modificar registro de empleado completo*/}
                <FormModificarRegistroEmpleadoCompleto
                    idRegistro={idRegistroOperacion}
                    elementosOpciones={listaRegistrosVinculados}
                    onGuardarRegistro={(evento) => {
                        modificarRegistro(
                            evento,
                            idRegistroOperacion,
                            refresh,
                            setRefresh
                        );
                    }}
                    onAutogenerarPassword={() => {
                    }}
                    onAutogenerarUsername={() => {
                    }}
                    toggleModal={() => {
                        setEstadoModalModificarRegistro(
                            !estadoModalModificarRegistro
                        );
                    }}
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
            />

            {/*Modal de guardar datos en tarjeta*/}
            <ModalGuardarDatosTarjeta
                nombreGrid={tituloGrid}
                registro={registroOperacion}
                onConectarPorSerial={() => {}}
                modalActivo={estadoModalGuardarDatosTarjeta}
                toggleModal={() => {setEstadoModalGuardarDatosTarjeta(
                    !estadoModalGuardarDatosTarjeta
                )}}
            />

            {/*Modal para visualizar los datos del empelado a detalle*/}
            <ModalVisualizarDatosDetalles
                nombreGrid={tituloGrid}
                onConectarPorSerial={() => {}}
                modalActivo={estadoModalVisualizarDatosDetalles}
                toggleModal={() => {setEstadoModalVisualizarDatosDetalles(
                    !estadoModalVisualizarDatosDetalles
                )}}
            />
        </GridParaRegistrosDeEmpleados>
    );
};
