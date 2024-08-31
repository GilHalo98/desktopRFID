// Componentes de react.
import React from 'react';

// Iconos
import { mdiFileAlert } from '@mdi/js';

// Componente para renderizar los iconos.
import Icon from '@mdi/react';

// Componentes de reacstrap
import {
    Button, Table,
    Container, Col, Row,
    Modal, ModalHeader, ModalBody, ModalFooter,
    Card, CardHeader, CardBody, CardText, CardTitle, CardFooter, List,
} from 'reactstrap';

export default function ModalDatosIncompletosDibujo(
    props: {
        paginas: {
            pagina: Pagina,
            numeroPagina: number
        }[],
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
                    Datos incompletos en {props.paginas.length} paginas
                </CardHeader>

                {/*Body, muestra la informacioón importante de la alerta.*/}
                <CardBody>
                    <Container fluid>
                        <Row>
                            <Col sm={4}/>
                            <Col>
                                <Icon
                                    className='iconoBoton'
                                    path={mdiFileAlert}
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
                                    ¡Faltan datos en {
                                        props.paginas.length
                                    } paginas para poder generar el archivo del reporte!
                                </CardTitle>
                            </Col>
                        </Row>

                        <br/>

                        <Row>
                            <Col>
                                <CardText style={{
                                    textAlign: 'justify'
                                }}>
                                    Esto impide que se genere el reporte, para 
                                    poder  generar el reporte debe de 
                                    <b>llenar los campos faltantes</b> para 
                                    que se pueda generar el reporte. Las 
                                    paginas con campos faltantes son las 
                                    siguientes:
                                </CardText>
                            </Col>
                        </Row>

                        <br/>

                        <Row>
                            <Col>
                                <List type="unstyled" style={{
                                    textAlign: 'center'
                                }}>
                                    {props.paginas.map((registro: {
                                        pagina: Pagina,
                                        numeroPagina: number
                                    }) => {
                                        return(
                                            <li>
                                                Pagina {registro.numeroPagina}
                                            </li>
                                        );
                                    })}
                                </List>
                            </Col>
                        </Row>

                        <br/>

                        <Row>
                            <Col>
                                <Button
                                    block
                                    color='success'
                                    style={{
                                        border: 'none'
                                    }}
                                    onClick={() => {
                                        props.toggleModal();
                                }}>
                                    Entendido
                                </Button>
                            </Col>
                        </Row>
                    </Container>
                </CardBody>
            </Card>
        </Modal>
    );
};