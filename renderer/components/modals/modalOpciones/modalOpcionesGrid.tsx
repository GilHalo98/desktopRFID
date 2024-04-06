import React from 'react';

import {
    Button,
    Modal,
    Container, Row, Col,
    Card, CardBody, CardHeader, CardFooter, CardTitle, CardText
} from 'reactstrap';

import MenuOpcionesGrid from '../../forms/menus/menuOpcionesGrid';

export default function ModalOpcionesGrid(
    props: {
        nombreGrid: string,
        propiedadesGrid: {
            elementos: number,
            tiempoRefresh: number
        },
        modalActivo: boolean,
        toggleModal: Function,
        onOk: Function,
        onRechazar: Function
    }
) {
    // Hooks de las opciones de la Grid.
    const [elementos, setElementos] = React.useState(props.propiedadesGrid.elementos);
    const [tiempoRefresh, setTiempoRefresh] = React.useState(props.propiedadesGrid.tiempoRefresh);

    return(
        <Modal isOpen={props.modalActivo} toggle={() => {
            props.toggleModal();
        }}>
            <Card
                className='cardModalAlerta'
                color="dark"
            >
                <CardHeader>
                    Opciones de Grid
                </CardHeader>

                <CardBody>
                    <CardTitle className='tituloModalOpcionesTabla'>
                        Opciones de Grid de {props.nombreGrid}
                    </CardTitle>

                    {/*aqui va el form de las opciones de la Grid.*/}
                    <MenuOpcionesGrid
                        registrosPorPagina={elementos}
                        setRegistrosPorPagina={setElementos}
                        tiempoRefresh={tiempoRefresh}
                        setTiempoRefresh={setTiempoRefresh}
                        ocultarOpcionesRegistros={false}
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