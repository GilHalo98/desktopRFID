'use client'

// React.
import React from 'react';

// Componentes de reacstrap.
import {
    Table, Badge,
    Container, Col, Row,
    Card, CardBody, CardHeader, CardText, CardTitle,
} from 'reactstrap';

// Rutinas
import {
    msToTime,
    separarTiempo
} from '../../../../utils/conversiones';

// Modelo de datos
import {
    ReporteResumen
} from '../../../../utils/API/respuestas/reporteResumen';

export default function CardResumenDatosDetalleHorasTrabajadas(
    props: {
        datos: ReporteResumen
    }
) {
    // Desempaquetamos los datos del reporte.
    const zonas: string[] = props.datos.accesos? Object.keys(props.datos.accesos) : [];
    const dispositivos: string[] = props.datos.actividades? Object.keys(props.datos.actividades) : [];

    return(
        <Card className="text-white" color="dark" style={{
            marginBottom: '10px'
        }}>
            <CardHeader>
                Resumen
            </CardHeader>

            <CardBody>
                <Container fluid>
                    <Row>
                        <Col>
                            <Table responsive dark>
                                <tbody>
                                    {dispositivos.map((dispositivo: string) => {
                                        if(props.datos.actividades[dispositivo] > 0) {
                                            return(
                                                <tr>
                                                    <td>
                                                        Actividades en {dispositivo}
                                                    </td>

                                                    <td>
                                                        <Badge
                                                            color="success"
                                                            style={{
                                                                width: '100%'
                                                            }}
                                                        >
                                                            {props.datos.actividades[dispositivo]}
                                                        </Badge>
                                                    </td>
                                                </tr>
                                            );
                                        }
                                    })}
                                </tbody>
                            </Table>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Table responsive dark>
                                <tbody>
                                    {zonas.map((zona: string) => {
                                        if(props.datos.accesos[zona] > 0) {
                                            return(
                                                <tr>
                                                    <td>
                                                        Accesos en {zona}
                                                    </td>

                                                    <td>
                                                        <Badge
                                                            color="success"
                                                            style={{
                                                                width: '100%'
                                                            }}
                                                        >
                                                            {props.datos.accesos[zona]}
                                                        </Badge>
                                                    </td>
                                                </tr>
                                            );
                                        }
                                    })}
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Container>
            </CardBody>
        </Card>
    );
};