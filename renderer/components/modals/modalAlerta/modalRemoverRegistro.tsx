import React from 'react';

import {
    Button,
    Modal, ModalHeader, ModalBody, ModalFooter,
    Card, CardHeader, CardBody, CardText, CardTitle, CardFooter, Container, Col, Row
} from 'reactstrap';

export default function ModalRemoverRegistro(
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
                color="danger"
            >
                <CardHeader>
                    Eliminar Registro
                </CardHeader>

                {/*Body, muestra la informacioón importante de la alerta.*/}
                <CardBody>
                    <CardTitle className='tituloModalAlerta'>
                        ¿Estas seguro de que deseas eliminar el registro con id {props.idRegistro}?
                    </CardTitle>
                    <br/>

                    {props.children}

                    <br/>
                    <CardText>
                        Se removera el registro de manera permanente y no habra forma de recuperarlo al finalizar la operación.
                    </CardText>
                </CardBody>

                {/*Footer contiene los botones del modal*/}
                <CardFooter>
                    <Container>
                        <Row>
                            <Col>
                                <Button
                                    active
                                    outline
                                    block
                                    color="primary"
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
                                    onClick={() => {
                                        props.onOk(props.idRegistro);
                                        props.toggleModal();
                                }}>
                                    Aceptar
                                </Button>
                            </Col>
                        </Row>
                    </Container>
                </CardFooter>
            </Card>
        </Modal>
    );
};