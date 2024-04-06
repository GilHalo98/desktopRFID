import React from 'react';

import {
    Button,
    Modal,
    Container, Row, Col,
    Card, CardBody, CardHeader, CardFooter, CardTitle, CardText
} from 'reactstrap';

import MenuOpcionesLista from '../../forms/menus/menuOpcionesLista';

export default function ModalOpcionesLista(
    props: {
        nombreTabla: string,
        propiedadesTabla: {
            elementos: number,
            opcionesRegistros: boolean,
            tiempoRefresh: number
        },
        modalActivo: boolean,
        toggleModal: Function,
        onOk: Function,
        onRechazar: Function
    }
) {
    // Hooks de las opciones de la tabla.
    const [elementos, setElementos] = React.useState(props.propiedadesTabla.elementos);
    const [opcionesRegistros, setOpcionesRegistros] = React.useState(props.propiedadesTabla.opcionesRegistros);
    const [tiempoRefresh, setTiempoRefresh] = React.useState(props.propiedadesTabla.tiempoRefresh);

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
                        Opciones de tabla de {props.nombreTabla}
                    </CardTitle>

                    {/*aqui va el form de las opciones de la tabla.*/}
                    <MenuOpcionesLista
                        registrosEnLista={elementos}
                        setRegistrosEnLista={setElementos}
                        tiempoRefresh={tiempoRefresh}
                        setTiempoRefresh={setTiempoRefresh}
                    />
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
                                        props.onOk(
                                            elementos,
                                            opcionesRegistros,
                                            tiempoRefresh
                                        );
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