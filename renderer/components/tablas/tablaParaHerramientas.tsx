'use client'

// React.
import React from "react";

// Componentes de reacstrap
import {
    Button, Table,
    Container, Col, Row,
    Card, CardBody, CardHeader,
} from "reactstrap";

// Iconos.
import { mdiPlus } from "@mdi/js";
import Icon from "@mdi/react";

// Componentes propios.

// Modelo de datos.

export default function TablaParaHerramienta(
    props: {
        agregarHerramienta: Function
        children?: any
    }
) {
    return (
        <React.Fragment>
            <Card color='dark'>
                <CardHeader className='text-white'>
                    <Container>
                        <Row>
                            <Col>
                                Herramientas
                            </Col>

                            <Col style={{
                                textAlign: 'right'
                            }}>
                                <Button
                                    outline
                                    size="sm"
                                    color="success"
                                    onClick={() => {
                                        props.agregarHerramienta();
                                    }}
                                    style={{border: 'none'}}
                                >
                                    <Icon path={mdiPlus} size={1}/>
                                </Button>
                            </Col>
                        </Row>
                    </Container>
                </CardHeader>

                <CardBody>
                    <Table hover dark responsive>
                        <thead style={{
                            textAlign: 'center'
                        }}>
                            <tr key="header">
                                <th>Numero de herramienta</th>
                                <th>Tipo de herramienta</th>
                                <th>Medida de herramienta</th>
                                <th>Operacion de herramienta</th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody>
                            {props.children}
                        </tbody>
                    </Table>
                </CardBody>
            </Card>
        </React.Fragment>
    );
};