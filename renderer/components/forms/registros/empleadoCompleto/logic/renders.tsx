// Importamos React.
import React from "react";

// Evento que maneja el form.
import { SyntheticEvent } from "react";

// Componentes de reactstrap.
import {
    Spinner,
    Container, Row, Col, Button
} from "reactstrap";

// Funcion para renderizar el spinner de carga.
function renderSpinnerCarga(
    controlSpinner: {
        display: string
    }
) {
    return(
        <Row style={controlSpinner}>
            <Col/>
                <Col xs='auto'>
                    <Spinner
                        color="warning"
                        style={{
                            height: '100px',
                            width: '100px'
                        }}
                    />
                </Col>
            <Col/>
        </Row>
    );
};

// Renderizamos la barra de botones.
function renderBarraBotones(
    numeroForm: number,
    setNumeroForm: Function,
    toggleModal: Function,
    controlBotonSiguiente: {
        display: string
    },
    controlBotonRegistro: {
        display: string
    },
    onOk: Function
) {
    return(
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
                            toggleModal();

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

                <Col style={controlBotonSiguiente}>
                    <Button
                        active
                        outline
                        block
                        color='success'
                        onClick={() => {
                            // Si existen forms de los
                            // cuales podemos ciclar entonces
                            // cambiamos de form.
                            if(numeroForm < 2) {
                                setNumeroForm(numeroForm + 1);

                            // Si es el ultimo form al que
                            // ciclar Se envia el registro
                            // y se cierra el modal.
                            } else {
                                toggleModal();

                                // tambien receteamos el
                                // form actual.
                                setNumeroForm(0);
                            }
                        }}
                    >
                        Siguiente
                    </Button>
                </Col>

                <Col style={controlBotonRegistro}>
                    <Button
                        active
                        outline
                        block
                        color='success'

                        onClickCapture={(evento: SyntheticEvent) => {
                            onOk(evento);
                        }}
                    >
                        Registrar
                    </Button>
                </Col>
            </Row>
        </Container>
    );
};

export {
    renderSpinnerCarga,
    renderBarraBotones
};
