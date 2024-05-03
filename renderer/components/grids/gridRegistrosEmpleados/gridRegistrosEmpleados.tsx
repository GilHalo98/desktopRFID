'use client'

// React.
import React from 'react';

// Componentes de reactstrap.
import {
    Card, CardHeader,
    Container, Row, Col, CardBody, Spinner,
} from 'reactstrap';

// Funciones propias.
import { funcionRefresh } from '../../../utils/refresh';


// Interfaz de API.
import { RespuestaConsultaEmpleado } from '../../../utils/API/respuestas/consultaEmpleado';
import { ConsultaRol } from '../../../utils/API/interface/rol';
import {
    ConsultaEmpleado, RemoverEmpleado
} from '../../../utils/API/interface/empleado';

// Componentes de la vista.
import FormModificarEmpleado from '../../forms/registros/empleados/formModificarEmpleados';
import ModalVisualizarRegistro from '../../modals/modalOpciones/modalVisualizarRegistro';
import FormRegistroEmpleado from '../../forms/registros/empleados/formRegistroEmpleados';
import ModalModificarRegistro from '../../modals/modalOpciones/modalModificarRegistro';
import ModalAgregarRegistro from '../../modals/modalOpciones/modalAgregarRegistro';
import CardRegistroEmpleado from '../../cards/cardsRegistros/cardRegistroEmpleado';
import ModalRemoverRegistro from '../../modals/modalAlerta/modalRemoverRegistro';
import ModalGrabarTarjeta from '../../modals/modalOpciones/modalGrabarTarjeta';
import FormBusquedaEmpleado from '../../forms/busqueda/formBusquedaEmpleado';
import MenuGrabarTarjeta from '../../forms/menus/menuGrabarTarjeta';
import Display from '../../displays/display';
import Grid from '../grid';

export default function GridRegistrosEmpleados(
    props: {
    }
) {
    // Hook para el estado del indicador de carga.
    const [enCarga, setEnCarga] = React.useState(false);

    // Declaramos los hooks que vamos a usar.
    const [listaRegistros, setListaRegistros] = React.useState([]);
    const [offset, setOffset] = React.useState(0);
    const [totalPaginas, setTotalPaginas] = React.useState(1);
    const [paginaActual, setPaginaActual] = React.useState(1);

    // Hooks de las opciones de la tabla.
    const [elementos, setElementos] = React.useState(10);
    const [refresh, setRefresh] = React.useState(true);
    const [tiempoRefresh, setTiempoRefresh] = React.useState(60);

    // Hooks para la busqueda de registros del empleado.
    const [idEmpleado, setIdEmpleado] = React.useState(undefined);
    const [numeroTelefonico, setNumeroTelefonico] = React.useState(undefined);
    const [nombresEmpleado, setNombresEmpleado] = React.useState(undefined);
    const [apellidoPaterno, setApellidoPaterno] = React.useState(undefined);
    const [apellidoMaterno, setApellidoMaterno] = React.useState(undefined);
    const [rolEmpleado, setRolEmpleado] = React.useState(undefined);

    // Estado de los modals
    const [estadoModalAgregarRegistro, setEstadoModalAgregarRegistro] = React.useState(false);
    const [estadoModalRemoverRegistro, setEstadoModalRemoverRegistro] = React.useState(false);
    const [estadoModalModificarRegistro, setEstadoModalModificarRegistro] = React.useState(false);
    const [estadoModalVisualizarRegistro, setEstadoModalVisualizarRegistro] = React.useState(false);
    const [estadoModalGuardarRegistro, setEstadoModalGuardarRegistro] = React.useState(false);

    // Hooks para las operaciones de los registros.
    const [idRegistroOperacion, setIdRegistroOperacion] = React.useState(undefined);
    const [registroOperacion, setRegistroOperacion] = React.useState(undefined);

    // Hook para la conexión con el dispositivo grabador de tarjetas.
    const [datosDispostivo, setDatosDispositivo] = React.useState({ path: undefined, baudRate: undefined});

    // Hooks para los forms de registros y modificacion de registros.
    const [listaRoles, setListaRoles] = React.useState([]);

    // Declaramos el useEffect de react para actualizar el contenido de la vista.
    React.useEffect(() => {
        console.log('refresh');

        setListaRegistros([]);
        // setListaRoles([]);

        ConsultaEmpleado(
            elementos,
            offset,
            idEmpleado,
            numeroTelefonico,
            nombresEmpleado,
            apellidoPaterno,
            apellidoMaterno,
            rolEmpleado,
            setListaRegistros,
            setTotalPaginas,
            setEnCarga
        );

        ConsultaRol(
            null,
            null,
            null,
            null,
            null,
            null,
            setListaRoles,
            () => {},
            undefined
        );
    }, [
        elementos,
        paginaActual,
        idEmpleado,
        numeroTelefonico,
        nombresEmpleado,
        apellidoPaterno,
        apellidoMaterno,
        rolEmpleado,
        refresh
    ]);

    // El componente se refresca cada tiempo dado.
    setTimeout(() => {
        funcionRefresh(refresh, setRefresh);
    }, tiempoRefresh*1000);

    // Titulo de la tabla.
    const tituloGrid = 'Registro de empleados';

    // Pasar esta funcion a un iterador.
    function poblarGrid(elementos: RespuestaConsultaEmpleado[]) {
        return(elementos.map((elemento: RespuestaConsultaEmpleado, index: number) => {
            return(
                <Col
                    sm='12'
                    md='6'
                    lg='4'
                    xl='3'
                >
                    <CardRegistroEmpleado
                        datosOperacion={{
                            setIdRegistroOperacion: setIdRegistroOperacion,
                            idRegistro: elemento.id,
                            setRegistroOperacion: (indexRegistro) => {
                                setRegistroOperacion(listaRegistros[indexRegistro]);
                            },
                            indexRegistro: index
                        }}
                        registro={elemento}
                        toggleModals={{
                            setEstadoModalRemoverRegistro: () => {
                                setEstadoModalRemoverRegistro(!estadoModalRemoverRegistro)
                            },
                            setEstadoModalModificarRegistro: () => {
                                setEstadoModalModificarRegistro(!estadoModalModificarRegistro)
                            },
                            setEstadoModalVisualizarRegistro: () => {
                                setEstadoModalVisualizarRegistro(!estadoModalVisualizarRegistro)
                            },
                            setEstadoModalGuardarRegistro: () => {
                                setEstadoModalGuardarRegistro(!estadoModalGuardarRegistro)
                            }
                        }}
                    />
                </Col>
            );
        }));
    };

    const controlGrid = {
        display: (enCarga? 'none' : '')
    };

    const controlSpinner = {
        display: (enCarga? '' : 'none')
    };

    const parametrosBusqueda = {
        setIdEmpleado: setIdEmpleado,
        setNumeroTelefonico: setNumeroTelefonico,
        setNombresEmpleado: setNombresEmpleado,
        setApellidoPaterno: setApellidoPaterno,
        setApellidoMaterno: setApellidoMaterno,
        setRolEmpleado: setRolEmpleado
    }

    const elementosOpciones = {
        listaRoles: listaRoles
    };


    return(
        <Grid
            tituloGrid={tituloGrid}
            paginacion={{
                paginaActual: paginaActual,
                offset: offset,
                elementos: elementos,
                totalPaginas: totalPaginas,
                setPaginaActual: setPaginaActual,
                setOffset: setOffset
            }}
            opcionesGrid={{
                elementos: elementos,
                tiempoRefresh: tiempoRefresh,
                setTiempoRefresh: setTiempoRefresh,
                setElementos: setElementos,
            }}
            barraOpciones={{
                toggleModalRegistro: () => {
                    setEstadoModalAgregarRegistro(!estadoModalAgregarRegistro);
                }
            }}
        >
            {/*Body del grid de empleados*/}
            <Container>
                <Row>
                    <Card color='dark'>
                        <CardBody>
                            { /*Barra de busqueda del Empleado*/ }
                            <FormBusquedaEmpleado
                                parametrosBusqueda={parametrosBusqueda}
                                elementosOpciones={elementosOpciones}
                            />
                        </CardBody>
                    </Card>
                </Row><br/>

                <Row style={controlGrid}>
                    { /*Cards de los empleados renderizados en el grid*/ }
                    {poblarGrid(listaRegistros)}
                </Row>

                <Row style={controlSpinner}>
                        <Col/>
                            <Col xs='auto'>
                                { /*Spinner del grid de empleados*/ }
                                <Spinner
                                    color="warning"
                                    style={{
                                        height: '100px',
                                        width: '100px'
                                    }}
                                />
                            </Col>
                        <Col/>
                    </Row>
            </Container>

            {/*Modal de registro de empleados*/}
            <ModalAgregarRegistro
                nombreTabla={tituloGrid}
                modalActivo={estadoModalAgregarRegistro}
                toggleModal={() => {
                    setEstadoModalAgregarRegistro(!estadoModalAgregarRegistro);
                }}
            >
                <FormRegistroEmpleado
                    elementosOpciones={elementosOpciones}
                    toggleModal={() => {
                        setEstadoModalAgregarRegistro(!estadoModalAgregarRegistro);
                    }}
                    toggleRefresh={() => {
                        funcionRefresh(refresh, setRefresh);
                    }}
                />
            </ModalAgregarRegistro>

            {/*Modal de eliminar registro*/}
            <ModalRemoverRegistro
                idRegistro={idRegistroOperacion}
                modalActivo={estadoModalRemoverRegistro}
                toggleModal={() => {
                    setEstadoModalRemoverRegistro(!estadoModalRemoverRegistro);
                }}
                onOk={(idRegistro: number) => {
                    RemoverEmpleado(idRegistro);
                    funcionRefresh(refresh, setRefresh);
                }}
                onRechazar={() => {}}
            >
                <Display
                    registro={registroOperacion}
                    propiedades={[
                        ['id'],
                        ['nombres'],
                        ['apellidoPaterno'],
                        ['apellidoMaterno'],
                        ['fechaRegistroEmpleado'],
                    ]}
                    campos={[
                        'id',
                        'Nombres del empleado',
                        'Apellido paterno',
                        'Apellido paterno',
                        'fecha de registro'
                    ]}
                />
            </ModalRemoverRegistro>

            {/*Modal de modificar registro*/}
            <ModalModificarRegistro
                idRegistro={idRegistroOperacion}
                modalActivo={estadoModalModificarRegistro}
                toggleModal={
                    () => {setEstadoModalModificarRegistro(
                        !estadoModalModificarRegistro
                    );}
                }
            >
                <FormModificarEmpleado
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

            {/*Modal de visualizar registro*/}
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
                        ['nombres'],
                        ['apellidoPaterno'],
                        ['apellidoMaterno'],
                        ['fechaRegistroEmpleado'],
                    ]}
                    campos={[
                        'id',
                        'Nombres del empleado',
                        'Apellido paterno',
                        'Apellido paterno',
                        'fecha de registro'
                    ]}
                />
            </ModalVisualizarRegistro>

            {/*Modal de guardar registro*/}
            <ModalGrabarTarjeta
                registro={registroOperacion}
                headerModal='Grabar Datos'
                tituloModal='Grabar datos de empleado en tarjeta'
                modalActivo={estadoModalGuardarRegistro}
                toggleModal={() => {
                    setEstadoModalGuardarRegistro(!estadoModalGuardarRegistro)
                }}
            >
                <MenuGrabarTarjeta
                    registro={registroOperacion}
                    toggleModal={() => {
                        setEstadoModalGuardarRegistro(!estadoModalGuardarRegistro)
                    }}
                />
            </ModalGrabarTarjeta>
        </Grid>
    );
};