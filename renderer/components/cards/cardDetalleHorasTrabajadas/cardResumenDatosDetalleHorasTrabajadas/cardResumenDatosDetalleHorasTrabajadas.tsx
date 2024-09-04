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

export default function CardResumenDatosDetalleHorasTrabajadas(
    props: {
        datos: {
            accesosBanio: number
            accesosComedor: number
            accesosOficina: number
            inicioActividades: number
            finActividades: number
            totalActividades: number
        }
    }
) {
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
                                    <tr>
                                        <td>
                                            Accesos al Baño
                                        </td>

                                        <td>
                                            <Badge
                                                color="info"
                                                style={{
                                                    width: '100%'
                                                }}
                                            >
                                                {props.datos.accesosBanio}
                                            </Badge>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>
                                            Accesos al Comedor
                                        </td>

                                        <td>
                                            <Badge
                                                color="info"
                                                style={{
                                                    width: '100%'
                                                }}
                                            >
                                                {props.datos.accesosComedor}
                                            </Badge>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>
                                            Accesos a la Oficina
                                        </td>

                                        <td>
                                            <Badge
                                                color="info"
                                                style={{
                                                    width: '100%'
                                                }}
                                            >
                                                {props.datos.accesosOficina}
                                            </Badge>
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Table responsive dark>
                                <tbody>
                                    <tr>
                                        <td>
                                            Inicio de actividades
                                        </td>

                                        <td>
                                            <Badge
                                                color="info"
                                                style={{
                                                    width: '100%'
                                                }}
                                            >
                                                {props.datos.inicioActividades}
                                            </Badge>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>
                                            Fin de actividades
                                        </td>

                                        <td>
                                            <Badge
                                                color="info"
                                                style={{
                                                    width: '100%'
                                                }}
                                            >
                                                {props.datos.finActividades}
                                            </Badge>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>
                                            Total en actividades
                                        </td>

                                        <td>
                                            <Badge
                                                color="info"
                                                style={{
                                                    width: '100%'
                                                }}
                                            >
                                                {separarTiempo(msToTime(
                                                    props.datos.totalActividades
                                                ))}
                                            </Badge>
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Container>
            </CardBody>
        </Card>
    );
}