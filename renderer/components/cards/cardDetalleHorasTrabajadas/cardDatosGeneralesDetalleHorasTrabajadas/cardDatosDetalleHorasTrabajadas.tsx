'use client'

// React.
import React from 'react';

// Componentes de reacstrap.
import {
    Table,
    ButtonGroup, Button,
    Container, Col, Row,
    Card, CardBody, CardHeader, CardText, CardTitle, UncontrolledTooltip, Badge,
} from 'reactstrap';

// Iconos usados.
import {
    mdiArrowLeftCircle,
    mdiRefreshCircle
} from '@mdi/js';

// Componente para mostrar los iconos.
import Icon from '@mdi/react';
import { msToTime, separarTiempo } from '../../../../utils/conversiones';

// Componentes propios.

// Modelo de datos.

export default function CardDatosDetalleHorasTrabajadas(
    props: {
        datos: {
            tiempoLaboralTotal: number
            tiempoExtraTotal: number
            retrasos: number
            faltas: number
        }
        fechaReporteA: string,
        fechaReporteB: string
    }
) {
    return(
        <Card className="text-white" color="dark" style={{
            marginBottom: '10px'
        }}>
            <CardHeader>
                <Container>
                    <Row>
                        <Col>
                            Datos Generales
                        </Col>

                        <Col style={{textAlign:'right'}}>
                            <ButtonGroup size="sm">
                                <Button
                                    id="botonRegresar"
                                    className='botonIcono'
                                    outline
                                    color='success'
                                >
                                    <Icon path={mdiArrowLeftCircle} size={1} />
                                </Button>

                                <Button
                                    id="botonRefresacar"
                                    className='botonIcono'
                                    outline
                                    color='primary'
                                >
                                    <Icon path={mdiRefreshCircle} size={1} />
                                </Button>
                            </ButtonGroup>

                            <UncontrolledTooltip
                                placement="bottom"
                                target="botonRegresar"
                            >
                                Regresar
                            </UncontrolledTooltip>

                            <UncontrolledTooltip
                                placement="bottom"
                                target="botonRefresacar"
                            >
                                Refrescar pagina
                            </UncontrolledTooltip>
                        </Col>
                    </Row>
                </Container>
            </CardHeader>

            <CardBody>
                <CardTitle style={{
                    textAlign: 'center'
                }}>
                    Reporte laboral y de accesos del dia <b>{
                        props.fechaReporteA
                    }</b> al <b>{
                        props.fechaReporteB
                    }</b>
                </CardTitle>

                <Table responsive dark style={{
                    textAlign: 'center'
                }}>
                    <thead>
                        <tr>
                            <td>
                                Tiempo Laboral Total
                            </td>

                            <td>
                                Tiempo Extra Total
                            </td>

                            <td>
                                Retrasos
                            </td>

                            <td>
                                Faltas
                            </td>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td>
                                {separarTiempo(
                                    msToTime(props.datos.tiempoLaboralTotal))
                                }
                            </td>

                            <td>
                                {separarTiempo(
                                    msToTime(props.datos.tiempoExtraTotal))
                                }
                            </td>

                            <td>
                                <Badge color='danger' style={{
                                    width: '100%'
                                }}>
                                    {props.datos.retrasos}
                                </Badge>
                            </td>

                            <td>
                                <Badge style={{
                                    width: '100%'
                                }}>
                                    {props.datos.faltas}
                                </Badge>
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </CardBody>
        </Card>
    );
};