// Componentes de react.
import React, { SyntheticEvent } from 'react';

// Iconos
import { mdiFileAlert } from '@mdi/js';

// Componente para renderizar los iconos.
import Icon from '@mdi/react';

// Componentes de reacstrap
import {
    Button, Table,
    Container, Col, Row,
    Modal, ModalHeader, ModalBody, ModalFooter,
    Card, CardHeader, CardBody, CardText, CardTitle, CardFooter, List, Input,
} from 'reactstrap';

export default function ModalCopiarContenidoDibujo(
    props: {
        paginas: Pagina[]
        indexPaginaActual: number
        modalActivo: boolean
        onOk: Function
        onCancelar: Function
        toggleModal: Function
    }
) {
    const [
        indexTarget,
        setIndexTarget
    ] = React.useState('0');

    return(
        <Modal size='lg' isOpen={props.modalActivo} toggle={() => {
            props.toggleModal();
        }}>
            <Card
                className='cardModalAlerta'
                color="dark"
            >
                <CardHeader style={{
                    textAlign: 'center',
                    fontSize: '28px',
                    fontWeight: 'bolder'
                }}>
                    Copiar datos de pagina
                </CardHeader>

                {/*Body, muestra la informacioón importante de la alerta.*/}
                <CardBody>
                    <Container fluid>
                        <Row>
                            <Col>
                                <CardTitle style={{
                                    textAlign: 'center',
                                    fontSize: '20px'
                                }}>
                                    Copiar contenido de una pagina a la 
                                    pagina actual.
                                </CardTitle>
                            </Col>
                        </Row>

                        <br/>

                        <Row>
                            <Col>
                                <CardText style={{
                                    textAlign: 'justify'
                                }}>
                                    Para poder copiar el contenido de 
                                    otra pagina a esta pagina, selecciona 
                                    la pagina de la cual se quiere copiar 
                                    la informacion.
                                </CardText>
                            </Col>
                        </Row>

                        <br/>

                        <Row>
                            <Col>
                                <Input
                                    type="select"
                                    onChange={(evento: SyntheticEvent) => {
                                        const input = evento.target as HTMLSelectElement;
                                        setIndexTarget(input.value);
                                    }}
                                >
                                    {props.paginas.map((pagina: Pagina, index: number) => {
                                        if(props.indexPaginaActual == index) {
                                            return <></>;
                                        }

                                        return (
                                            <option value={index}>
                                                pagina {index + 1}
                                            </option>
                                        );
                                    })}
                                </Input>
                            </Col>
                        </Row>

                        <br/>

                        <Row>
                            <Col>
                                <Button
                                    block
                                    color='danger'
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

                            <Col>
                                <Button
                                    block
                                    color='success'
                                    style={{
                                        border: 'none'
                                    }}
                                    onClick={() => {
                                        props.onOk(indexTarget);
                                        props.toggleModal();
                                }}>
                                    Copiar contenido
                                </Button>
                            </Col>
                        </Row>
                    </Container>
                </CardBody>
            </Card>
        </Modal>
    );
};