'use client'

import 'bootstrap/dist/css/bootstrap.css';

import React from 'react';

import {
    Card, Container, Row, Col, CardHeader, Badge, Alert, CardBody, ButtonGroup, Button, Table
} from 'reactstrap';

import SideBarLayout from '../../../../components/Layout/sideBarLayout';
import CardRegistroEmpleado from '../../../../components/cards/cardsRegistros/cardRegistroEmpleado';
import { DonutChart, Legend } from '@tremor/react';

export default function ListaReportes() {
    const prueba = [
        "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    ]

    const sales = [  {    name: 'New York',    sales: 980,  },  {    name: 'London',    sales: 456,  },  {    name: 'Hong Kong',    sales: 390,  },  {    name: 'San Francisco',    sales: 240,  },  {    name: 'Singapore',    sales: 190,  },  {    name: 'Zurich',    sales: 139,  },];

    return (
        <React.Fragment>
            <Container fluid>
                <Row>
                    <Col>
                        <Card color="dark">
                            <CardHeader className='text-white'>
                                Titulo
                            </CardHeader>

                            <CardBody>
                                <Table borderless dark responsive style={{'overflowX': 'scroll'}}>
                                    <thead>
                                        <tr>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        <tr>
                                        {prueba.map((item: any, index: number) => {
                                            return(
                                                <td>
                                                    <Button outline block color='warning'>
                                                        {item}
                                                    </Button>
                                                </td>
                                            );
                                        })}
                                        </tr>
                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Card color="danger" className='indicadorEstadoMaquina'>
                            <CardHeader>
                                <h3>BLOQUEADO</h3>
                            </CardHeader>
                        </Card>
                    </Col>
                </Row>

                <Row>
                    <Col sm={12} md={4}>
                        <Row>
                            <Col sm={12}>
                                <CardRegistroEmpleado
                                    registro={{
                                        id: 1,
                                        nombres: "a",
                                        apellidoPaterno: "a",
                                        apellidoMaterno: "a",
                                        numeroTelefonico: "a",
                                        edad: 1,
                                        fechaNacimiento: "a",
                                        fechaRegistroEmpleado: "a",
                                        fechaModificacionEmpleado: "a",
                                        idRolVinculado: 1,
                                        idImagenVinculada: 1,
                                    }}
                                    indexRegistro={4}
                                />
                            </Col>
                        </Row>

                        <br/>

                        <Row>
                            <Col sm={12}>
                                <Card color="dark">
                                    <CardHeader className='text-white'>
                                        Ultimos 5 operadores
                                    </CardHeader>

                                    <ul style={{"margin": '20px'}}>
                                        <li>
                                            <Alert>aaa</Alert>
                                        </li>
                                        <li>
                                            <Alert>aaa</Alert>
                                        </li>
                                        <li>
                                            <Alert>aaa</Alert>
                                        </li>
                                        <li>
                                            <Alert>aaa</Alert>
                                        </li>
                                        <li>
                                            <Alert>aaa</Alert>
                                        </li>
                                    </ul>
                                </Card>
                            </Col>
                        </Row>
                    </Col>

                    <Col sm={12} md={8}>
                        <Card
                            color="dark"
                            className='text-white'
                        >
                            <CardHeader>
                                Reporte de maquina
                            </CardHeader>

                            <CardBody>
                                <Container>
                                    <Row>
                                        <Col>
                                            Horas de actividad vs en pausa
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col/>
                                        <Col>
                                            <DonutChart
                                                style={{"height":"50vh"}}
                                                data={sales}
                                                category="sales"
                                                variant='donut'
                                                index="name"
                                            />
                                        </Col>
                                        <Col/>
                                    </Row>

                                    <Row>
                                        <Col/>
                                        <Col>
                                            <Legend
                                                categories={['New York', 'London', 'Hong Kong', 'San Francisco', 'Singapore']}
                                                colors={['blue', 'cyan', 'indigo', 'violet', 'fuchsia']}
                                            />
                                        </Col>
                                        <Col/>
                                    </Row>

                                    <Row>
                                        <Col>
                                            Tiempo total de actividad
                                        </Col>
                                    </Row>

                                    <hr/>

                                    <Row>
                                        <Col>
                                            <Table hover dark responsive borderless>
                                                <tbody>
                                                    <tr>
                                                        <th>a</th>
                                                        <td>aa</td>
                                                    </tr>

                                                    <tr>
                                                        <th>a</th>
                                                        <td>aa</td>
                                                    </tr>
                                                </tbody>
                                            </Table>
                                        </Col>
                                    </Row>
                                </Container>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    );
};

ListaReportes.getLayout = function(page) {
    return <SideBarLayout>{page}</SideBarLayout>;
};