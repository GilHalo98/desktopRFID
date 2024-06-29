'use client'

// React.
import React from 'react';

// Componentes de reactstrap.
import {
    Spinner,
    Table, Button,
    Container, Row, Col,
    Card, CardBody, CardTitle, CardSubtitle, CardText, CardHeader, List,
} from 'reactstrap';

// Funcionalidad de la tabla.
import {
    renderBarraOpcionesHorarioEmpleados,
    renderContenidoTablaDispositivos,
    renderHeaderOpcionesDispositivos,
    renderBarraOpcionesDispositivos,
    renderModalExportarDatosTabla,
    renderModalOpcionesTabla,
    renderPaginacion,
    renderCabecera,
    renderContenidoTablaHorarioEmpleados,
} from "./logic/renders";

export default function TablaParaHorarioDeEmpleado(
    props: {
        tituloTabla: string,
        cabeceras: string[],
        registros: any[],
        enCarga?: boolean,
        setEnCarga?: Function,
        exportarDatos?: Function,
        formatoEspecial?: Object,
        paginacion?: {
            paginaActual: number,
            offset: number,
            registrosPorPagina: number,
            totalPaginas: number,
            setPaginaActual: Function,
            setOffset: Function
        },
        funcionesOpciones?: {
            onRefrescarTabla?: Function,
            onModificarRegistro?: Function,
            onCambiarConfiguracion?: Function
        },
        opcionesTabla?: {
            registrosPorPagina?: number,
            opcionesRegistros?: boolean,
            tiempoRefrescamiento?: number,
            guardarConfiguracion: Function
        },
        children?: any
    }
) {
    // Estado del modal de opciones de la tabla.
    const [
        estadoModalOpcionesTabla,
        setEstadoModalOpcionesTabla
    ] = React.useState(false);

    // Estado del modal de exportar datos de la tabla.
    const [
        estadoModalExportarDatosTabla,
        setEstadoModalExportarDatosTabla
    ] = React.useState(false);

    const controlTabla = {
        display: (props.enCarga? 'none' : '')
    };

    const controlSpinner = {
        display: (props.enCarga? '' : 'none')
    };

    return(
        <Card color='dark'>
            <CardHeader className='text-white'>
                <Container>
                    <Row>
                        <Col>
                            {props.tituloTabla}
                        </Col>

                        <Col style={{textAlign:'right'}}>
                            {/*Render de opciones de tabla*/}
                            {renderBarraOpcionesHorarioEmpleados(
                                () => {},
                                () => {setEstadoModalOpcionesTabla(
                                        !estadoModalOpcionesTabla
                                )},
                                () => {props.setEnCarga(
                                    !props.enCarga
                                )},
                                props.funcionesOpciones,
                                props.opcionesTabla
                            )}
                        </Col>
                    </Row>
                </Container>
            </CardHeader>

            <CardBody>
                <CardTitle>
                    {props.children}
                </CardTitle>

                <Container>
                    <Row style={controlTabla}>
                        <Table hover dark responsive>
                            <thead className='cabeceraTablaRegistros'>
                                <tr key="header">
                                    {/*Renderizamos la cabecera*/}
                                    {renderCabecera(props.cabeceras)}
                                </tr>
                            </thead>

                            <tbody>
                                {/*Poblamos la tabla.*/}
                                {renderContenidoTablaHorarioEmpleados(
                                    props.cabeceras,
                                    props.registros,
                                    props.formatoEspecial,
                                    props.opcionesTabla
                                )}
                            </tbody>
                        </Table>

                        {/*Paginación de la tabla.*/}
                        {renderPaginacion(props.paginacion)}
                    </Row>

                    <Row style={controlSpinner}>
                        <Col/>
                            <Col xs='auto'>
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
            </CardBody>

            {/*Modal de opciones de tabla*/}
            {renderModalOpcionesTabla(
                props.tituloTabla,
                estadoModalOpcionesTabla,
                () => {setEstadoModalOpcionesTabla(
                    !estadoModalOpcionesTabla
                )},
                props.opcionesTabla,
                props.funcionesOpciones
            )}

            {/*Modal para exportar los datos a un archivo xlsx*/}
            {renderModalExportarDatosTabla(
                props.tituloTabla,
                estadoModalExportarDatosTabla,
                () => {setEstadoModalExportarDatosTabla(
                    !estadoModalExportarDatosTabla
                )},
                props.exportarDatos
            )}
        </Card>
    );
};