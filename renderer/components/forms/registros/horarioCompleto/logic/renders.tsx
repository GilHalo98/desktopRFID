// Importamos react.
import React from "react";

// Evento que maneja el form.
import { SyntheticEvent } from "react";

// Componentes de reactstrap.
import {
    Container, Row, Col, Button
} from "reactstrap";

// Renderizamos la barra de botones.
function renderBarraBotones(
    toggleModal: Function
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
                        }}
                    >
                        Cancelar
                        </Button>
                </Col>

                <Col sm={4}/>

                <Col>
                    <Button
                        active
                        outline
                        block
                        color='success'
                    >
                        Guardar cambios
                    </Button>
                </Col>
            </Row>
        </Container>
    );
};

export {
    renderBarraBotones
};