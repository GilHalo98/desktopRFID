// Componentes de react.
import React from 'react';

// Iconos
import { mdiFileDocumentRemove } from '@mdi/js';

// Componente para renderizar los iconos.
import Icon from '@mdi/react';

// Componentes de reacstrap
import {
    Button, Table,
    Container, Col, Row,
    Modal, ModalHeader, ModalBody, ModalFooter,
    Card, CardHeader, CardBody, CardText, CardTitle, CardFooter, List,
} from 'reactstrap';

export default function ModalRemoverDibujo(
    props: {
        numeroPagina: number,
        onOk: Function,
        onCancelar: Function,
        modalActivo: boolean,
        toggleModal: Function
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
                <CardHeader style={{
                    textAlign: 'center',
                    fontSize: '28px',
                    fontWeight: 'bolder'
                }}>
                    Eliminar Paginas
                </CardHeader>

                {/*Body, muestra la informacioón importante de la alerta.*/}
                <CardBody>
                    <Container fluid>
                        <Row>
                            <Col sm={4}/>
                            <Col>
                                <Icon
                                    className='iconoBoton'
                                    path={mdiFileDocumentRemove}
                                    size={'auto'}
                                />
                            </Col>
                            <Col sm={4}/>
                        </Row>

                        <Row>
                            <Col>
                                <CardTitle style={{
                                    textAlign: 'center',
                                    fontSize: '20px'
                                }}>
                                    ¿Deseas eliminar la pagina {props.numeroPagina}?
                                </CardTitle>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <CardText style={{
                                    textAlign: 'justify'
                                }}>
                                    Al eliminar la pagina, toda la 
                                    configuración de esta pagina se 
                                    perdera de manera permanente.
                                </CardText>
                            </Col>
                        </Row>

                        <br/>

                        <Row>
                            <Col>
                                <Button
                                    block
                                    color='dark'
                                    style={{
                                        border: 'none'
                                    }}
                                    onClick={() => {
                                        props.onOk();
                                        props.toggleModal();
                                }}>
                                    Aceptar
                                </Button>
                            </Col>

                            <Col>
                                <Button
                                    block
                                    color='success'
                                    style={{
                                        border: 'none'
                                    }}
                                    onClick={() => {
                                        props.onCancelar();
                                        props.toggleModal();
                                }}>
                                    Cancelar
                                </Button>
                            </Col>
                        </Row>
                    </Container>
                </CardBody>
            </Card>
        </Modal>
    );
};
