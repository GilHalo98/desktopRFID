import React from 'react';

import {
    Input, Label,
    Form, FormGroup,
    Container, Row, Col, Button
} from 'reactstrap';
import { guardarRegistro } from './logic/formLogic';

export default function FormRegistroTipoReporte(
    props: {
        toggleModal: Function,
        toggleRefresh: Function
    }
) {
    return(
        <Form onSubmit={(evento) => {
            evento.preventDefault();
            guardarRegistro(evento);
            props.toggleModal();
            props.toggleRefresh();
        }}>
            <FormGroup>
                <Label for="classificacionTipoReporte">
                    Clasificación del tipo de reporte
                </Label>

                <Input
                    id="classificacionTipoReporte"
                    name="campoClassificacionTipoReporte"
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