'use client'

// React.
import React from 'react';

// Componentes de reactstrap.
import {
    Table, Button, Alert,
    Container, Row, Col,
    List, ListGroupItem, ListGroup,
    Card, CardBody, CardTitle, CardSubtitle, CardText, CardHeader,
} from 'reactstrap';

// Componentes propios.
import ModalOpcionesLista from '../modals/modalOpciones/modalOpcionesLista';
import BarraAccionesLista from '../barraBotones/barraAcciones/barraAccionesLista/barraAccionesLista';

export default function Lista(
    props: {
        tituloLista: string,
        children: any
    }
) {
    const [
        estadoModalOpciones,
        setEstadoModalOpciones
    ] = React.useState(false);

    return(
        <Card color='dark'>
            <CardHeader className='text-white'>
                <Container>
                    <Row>
                        <Col>
                            {props.tituloLista}
                        </Col>

                        <Col style={{textAlign:'right'}}>
                            {   /*
                                    Esta barra de opciones permite modificar las
                                    opciones de la lista como el tiempo de refrescamiento, etc.
                                */
                            }
                            <BarraAccionesLista
                                onOpciones={() => {
                                    setEstadoModalOpciones(!estadoModalOpciones);                
                                }}
                            />
                        </Col>
                    </Row>
                </Container>
            </CardHeader>

            <CardBody>
                <List>
                    {props.children}
                </List>
            </CardBody>

            {/*Modal de opciones de tabla*/}
            <ModalOpcionesLista
                nombreTabla={props.tituloLista}
                propiedadesTabla={{
                    elementos: 10,
                    opcionesRegistros: true,
                    tiempoRefresh: 1
                }}
                modalActivo={estadoModalOpciones}
                toggleModal={() => {
                    setEstadoModalOpciones(!estadoModalOpciones);
                }}
                onOk={() => {}}
                onRechazar={() => {}}
            />
        </Card>
    );
};