'use client'

// React.
import React from 'react';

// Componentes de reactstrap.
import {
    Card, CardHeader, CardBody,
    Container, Row, Col,
    Button,
    Nav, NavItem, NavLink, ButtonGroup, Table
} from 'reactstrap';

// Componentes propios.
import FormBusquedaHistorialActividad from '../../forms/busqueda/formBusquedaHistorialActividad';
import BarraAccionesGrid from '../../barraBotones/barraAcciones/barraAccionesGrid/barraAccionesGrid';

// Funcionalidad del grid.

// Modelo de datos.
import { DispositivoIoT } from '../../../utils/API/modelos/dispositivoIoT';

export default function CardHeaderHistorialActividad(
    props: {
        indexRegistro: number,
        setIndexRegistro: Function,
        registros: DispositivoIoT[],
        parametrosBusqueda: {
            setIdDispositivo: Function,
            setDescripcionDispositivo: Function,
            setSemanaReporte: Function,
        },
        funcionesOpciones?: {
            onRefrescarGrid?: Function,
            onExportarDatos?: Function,
            onCambiarConfiguracion?: Function
        },
        children?: any,
    }
) {
    const renderHeader = () => {
        let texto = 'Cargando...';

        if(props.registros) {
            if(props.registros[props.indexRegistro]) {
                texto = 'Reporte de '+ props.registros[
                    props.indexRegistro
                ].descripcionDispositivo;
            }
        }

        return <>
            {texto}
        </>;
    };

    function prueba() {
        return 
    }

    return(
        <Card color="dark">
            <CardHeader className='text-white'>
                <Container>
                    <Row>
                        <Col>
                            {renderHeader()}
                        </Col>

                        <Col style={{textAlign:'right'}}>
                            <BarraAccionesGrid
                                onRefrescarGrid={
                                    props.funcionesOpciones.onRefrescarGrid
                                }
                                onExportarDatos={
                                    props.funcionesOpciones.onExportarDatos
                                }
                                onCambiarConfiguracion={
                                    props.funcionesOpciones.onCambiarConfiguracion
                                }
                            />
                        </Col>
                    </Row>
                </Container>
            </CardHeader>

            <CardBody>
                <Container>
                    <Row>
                        <Col>
                            <FormBusquedaHistorialActividad
                                parametrosBusqueda={props.parametrosBusqueda}
                            />
                        </Col>
                    </Row>

                    <br/>

                    <Row>
                        <Col>
                            <Table dark responsive borderless>
                                <tbody>
                                    <tr>
                                    {
                                        props.registros.map((
                                                registro: DispositivoIoT,
                                                index: number
                                            ) => {                                
                                            return(
                                                <td
                                                    style={{padding: '0%'}}
                                                >
                                                    <Button
                                                        block
                                                        outline
                                                        color='warning'
                                                        style={{
                                                            border: '0px',
                                                            borderRadius: '0px',
                                                            whiteSpace: 'nowrap'
                                                        }}
                                                        active={
                                                            index == props.indexRegistro?
                                                                true : false
                                                        }
                                                        onClick={() => {
                                                            props.setIndexRegistro(
                                                                index
                                                            );
                                                        }}
                                                    >
                                                        {registro.descripcionDispositivo}
                                                    </Button>
                                                </td>
                                            );
                                        })
                                    }
                                    </tr>
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Container>
            </CardBody>
        </Card>
    );
};