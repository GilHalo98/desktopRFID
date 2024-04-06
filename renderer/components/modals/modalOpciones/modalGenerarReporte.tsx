import React from 'react';

import {
    Button,
    Modal,
    Container, Row, Col,
    Card, CardBody, CardHeader, CardFooter, CardTitle, CardText
} from 'reactstrap';

export default function ModalGenerarReporte(
    props: {
        nombreTabla: string,
        modalActivo: boolean,
        toggleModal: Function,
        onOk: Function,
        onRechazar: Function
    }
) {
    // Hooks de las opciones de la tabla.

    return(
        <Modal isOpen={props.modalActivo} toggle={() => {
            props.toggleModal();
        }}>
            <Card
                className='cardModalAlerta'
                color="dark"
            >
                <CardHeader>
                    Opciones de tabla
                </CardHeader>

                <CardBody>
                    <CardTitle className='tituloModalOpcionesTabla'>
                        Genera un reporte de la tabla en formato pdf
                    </CardTitle>

                    {/*aqui va el form de las opciones de la tabla.*/}
                </CardBody>

                <CardFooter>
                    <Container>
                        <Row>
                            <Col>
                                <Button
                                    active
                                    outline
                                    block
                                    onClick={() => {
                                        props.onRechazar();
                                        props.toggleModal();
                                }}>
                                    Cancelar
                                </Button>
                            </Col>

                            <Col>
                                <Button
                                    active
                                    outline
                                    block
                                    color='success'
                                    onClick={() => {
                                        props.onOk();
                                        props.toggleModal();
                                }}>
                                    Generar Reporte
                                </Button>
                            </Col>
                        </Row>
                    </Container>
                </CardFooter>
            </Card>
        </Modal>
    );
};