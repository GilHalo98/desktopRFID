import React from 'react';

import {
    Button,
    Modal,
    Container, Row, Col,
    Card, CardBody, CardHeader, CardFooter, CardTitle, CardText
} from 'reactstrap';

export default function ModalModificarRegistroEmpleadoCompleto(
    props: {
        idRegistro: number,
        nombreTabla: string,
        modalActivo: boolean,
        toggleModal: Function,
        children?: any
    }
) {
    // Hook del numero de form para el registro.
    const [
        numeroForm,
        setNumeroForm
    ] = React.useState(0);

    return(
        <Modal
            size='lg'
            isOpen={props.modalActivo}
            toggle={() => {
                props.toggleModal();
            }}
        >
            <Card
                className='cardModalAlerta'
                color="dark"
            >
                <CardHeader>
                    Modificar Registro de Empleado
                </CardHeader>

                <CardBody>
                    <CardTitle className='tituloModalOpcionesTabla'>
                        Modificar registro de {props.nombreTabla}
                    </CardTitle>

                    {/*
                        Renderizamos el form en el
                        que se encuentra actualmente.
                    */}
                    {props.children[numeroForm]}

                    <Container>
                        <Row>
                            <Col>
                                <Button
                                    active
                                    outline
                                    block
                                    color='danger'
                                    onClick={() => {
                                        // Cerramos el modal.
                                        props.toggleModal();

                                        // Establecemos el form actual
                                        // al primero.
                                        setNumeroForm(0);
                                    }}
                                >
                                    Cancelar
                                    </Button>
                            </Col>

                            <Col sm={3}></Col>

                            <Col>
                                <Button
                                    active
                                    outline
                                    block
                                    disabled={
                                        // Si se encuentra en el primer
                                        // form deshabilitamos el boton
                                        // de anterior.
                                        numeroForm == 0? true : false
                                    }
                                    onClick={() => {
                                        // Nos movemos al
                                        // siguiente form.
                                        setNumeroForm(numeroForm - 1);
                                    }}
                                >
                                    Anterior
                                </Button>
                            </Col>

                            <Col>
                                <Button
                                    active
                                    outline
                                    block
                                    color='success'
                                    onClick={() => {
                                        // Calculamos el total de forms
                                        // que podemos ciclar.
                                        const totalForms = (
                                            props.children.length - 1
                                        );

                                        // Si existen forms de los
                                        // cuales podemos ciclar entonces
                                        // cambiamos de form.
                                        if(numeroForm < totalForms) {
                                            setNumeroForm(numeroForm + 1);

                                        // Si es el ultimo form al que
                                        // ciclar Se envia el registro
                                        // y se cierra el modal.
                                        } else {
                                            props.toggleModal();

                                            // tambien receteamos el
                                            // form actual.
                                            setNumeroForm(0);
                                        }
                                    }}
                                >
                                    {
                                        // Indicamos que texto
                                        // mostraremos en el boton.
                                        numeroForm < 2?
                                            "Siguiente" : "Guardar Cambios"
                                    }
                                </Button>
                            </Col>
                        </Row>
                    </Container>
                </CardBody>
            </Card>
        </Modal>
    );
};