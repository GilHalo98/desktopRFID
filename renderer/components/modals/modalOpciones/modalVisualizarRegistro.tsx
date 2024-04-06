import React from 'react';

import {
    Button,
    Modal,
    Container, Row, Col,
    Card, CardBody, CardHeader, CardFooter, CardTitle, CardText
} from 'reactstrap';

export default function ModalVisualizarRegistro(
    props: {
        idRegistro: number,
        modalActivo: boolean,
        toggleModal: Function,
        onOk: Function,
        onRechazar: Function,
        children: any
    }
) {
    return(
        <Modal isOpen={props.modalActivo} toggle={() => {
            props.toggleModal();
        }}>
            <Card
                className='cardModalAlerta'
                color="dark"
            >
                <CardHeader>
                    Visualizar Registro
                </CardHeader>

                <CardBody>
                    <CardTitle className='tituloModalOpcionesTabla'>
                        Visualizar Datos a detalle de {props.idRegistro}
                    </CardTitle>

                    {props.children}
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
                                    Guardar Cambios
                                </Button>
                            </Col>
                        </Row>
                    </Container>
                </CardFooter>
            </Card>
        </Modal>
    );
};