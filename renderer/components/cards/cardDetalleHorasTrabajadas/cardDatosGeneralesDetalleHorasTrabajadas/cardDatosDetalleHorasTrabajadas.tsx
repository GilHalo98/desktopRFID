'use client'

// React.
import React from 'react';

// Componente de link de next.
import Link from 'next/link';

// Componentes de reacstrap.
import {
    ButtonGroup, Button,
    Container, Col, Row,
    Table, UncontrolledTooltip, Badge,
    Card, CardBody, CardHeader, CardText, CardTitle
} from 'reactstrap';

// Iconos usados.
import {
    mdiArrowLeftCircle,
    mdiRefreshCircle
} from '@mdi/js';

// Componente para mostrar los iconos.
import Icon from '@mdi/react';

// Funciones de tiempo
import {
    msToTime,
    separarTiempo,
    deserealizarSemana,
    rangoSemana
} from '../../../../utils/conversiones';

// Modelo de datos.
import {
    ReporteGeneral
} from '../../../../utils/API/respuestas/reporteGeneral';

export default function CardDatosDetalleHorasTrabajadas(
    props: {
        datos: ReporteGeneral
        semanaReporte: string
        href: string
        funcionesOpciones: {
            onGoBack: Function
            onRefresh: Function
        }
    }
) {
    // Rango del reporte de la semana.
    const rangoSemanaReporte = props.semanaReporte?
        deserealizarSemana(props.semanaReporte) : rangoSemana();

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
                                <Link href={{
                                    pathname: props.href
                                }}>
                                    <Button
                                        id="botonRegresar"
                                        className='botonIcono'
                                        outline
                                        color='success'
                                        onClick={() => {
                                            props.funcionesOpciones.onGoBack();
                                        }}
                                    >
                                        <Icon path={mdiArrowLeftCircle} size={1} />
                                    </Button>
                                </Link>

                                <Button
                                    id="botonRefresacar"
                                    className='botonIcono'
                                    outline
                                    color='primary'
                                    onClick={() => {
                                        props.funcionesOpciones.onRefresh();
                                    }}
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
                        rangoSemanaReporte[0].toLocaleDateString()
                    }</b> al <b>{
                        rangoSemanaReporte[1].toLocaleDateString()
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
                                Extras
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
                                {separarTiempo(msToTime(
                                    props.datos.tiempoTrabajoTotal?
                                        props.datos.tiempoTrabajoTotal : 0
                                ))}
                            </td>

                            <td>
                                <Badge color={props.datos.extras <= 0?
                                    '' : 'info'
                                } style={{
                                    width: '100%'
                                }}>
                                    {props.datos.extras}
                                </Badge>
                            </td>

                            <td>
                                <Badge color={props.datos.retraso <= 0?
                                    '' : 'warning'
                                } style={{
                                    width: '100%'
                                }}>
                                    {props.datos.retraso}
                                </Badge>
                            </td>

                            <td>
                                <Badge color={props.datos.faltas <= 0?
                                    '' : 'danger'
                                } style={{
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