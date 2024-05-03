import React from 'react';

import {
    Input, Label,
    Form, FormGroup,
    Container, Row, Col, Button
} from 'reactstrap';

export default function FormRegistroTipoReporte(
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
                <Label for="nombreTipoReporte">
                    Nombre del tipo de reporte
                </Label>

                <Input
                    id="nombreTipoReporte"
                    name="campoNombreTipoReporte"
                    type="text"
                />
            </FormGroup>

            <FormGroup>
                <Label for="descripcionTipoReporte">
                    Descripción del tipo de reporte
                </Label>

                <Input
                    id="descripcionTipoReporte"
                    name="campoDescripcionTipoReporte"
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