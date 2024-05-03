import React from 'react';

import {
    Input, Label,
    Form, FormGroup,
    Container, Row, Col, Button
} from 'reactstrap';

export default function FormRegistroTipoDispositivo(
    props: {
        onGuardarRegistro: Function,
        toggleModal: Function
    }
) {
    return(
        <Form onSubmit={(evento) => {
            evento.preventDefault();
            props.onGuardarRegistro(evento);
            props.toggleModal();
        }}>
            <FormGroup>
                <Label for="nombreTipoDispositivo">
                    Nombre del tipo de dispositivo
                </Label>

                <Input
                    id="nombreTipoDispositivo"
                    name="campoNombreTipoDispositivo"
                    type="text"
                />
            </FormGroup>

            <FormGroup>
                <Label for="descripcionTipoDispositivo">
                    Descripción del tipo de dispositivo
                </Label>

                <Input
                    id="descripcionTipoDispositivo"
                    name="campoDescripcionTipoDispositivo"
                    type="text"
                />
            </FormGroup>

            <br/>

            <Container>
                <Row>
                    <Col>
                        <Button
                            active
                            outline
                            block
                            onClick={() => {
                                props.toggleModal();
                            }}
                        >
                            Cancelar
                        </Button>
                    </Col>

                    <Col>
                        <Button
                            active
                            outline
                            block
                            color='success'
                        >
                            Registrar
                        </Button>
                    </Col>
                </Row>
            </Container>
        </Form>
    );
};