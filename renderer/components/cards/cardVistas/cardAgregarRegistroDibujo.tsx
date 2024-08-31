// Importamos react.
import React, { SyntheticEvent } from 'react';

// Iconos
import { mdiFileDocumentAlert } from '@mdi/js';

// Componente para renderizar los iconos.
import Icon from '@mdi/react';

// Componentes de reactstrap.
import {
    Card, CardBody, CardHeader, CardText,
    CardTitle,
    Col, Container, Row,
} from 'reactstrap';

export default function CardAgregarRegistroDibujo(
    props: {
    }
) {
    return(
        <React.Fragment>
            <Card color='warning'>
                <CardHeader style={{
                    textAlign: 'center',
                    fontSize: '28px',
                    fontWeight: 'bolder'
                }}>
                    Agregar pagina
                </CardHeader>

                <CardBody>
                    <Container fluid>
                        <Row>
                            <Col sm={4}/>
                            <Col>
                                <Icon
                                    className='iconoBoton'
                                    path={mdiFileDocumentAlert}
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
                                    ¡No se encuentran pagias registradas!
                                </CardTitle>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <CardText style={{
                                    textAlign: 'justify'
                                }}>
                                    Para poder empezar a generar un reporte 
                                    agrege una pagina,esto se puede lograr 
                                    precionando <b>el primer boton de la parte 
                                    superior derecha</b> del menu de opciones 
                                    de la cabecera de la ventana.
                                </CardText>
                            </Col>
                        </Row>
                    </Container>
                </CardBody>
            </Card>
        </React.Fragment>
    );
};