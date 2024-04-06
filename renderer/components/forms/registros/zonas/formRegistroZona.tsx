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
                <Label for="nombreZona">
                    Nombre de la zona
                </Label>

                <Input
                    id="nombreZona"
                    name="campoNombreZona"
                    type="text"
                />
            </FormGroup>

            <FormGroup>
                <Label for="descripcionZona">
                    Descripción de la zona
                </Label>

                <Input
                    id="descripcionZona"
                    name="campoDescripcionZona"
                    type="text"
                />
            </FormGroup>


            <FormGroup>
                <Label for="bitZona">
                    Bit de acceso de la zona
                </Label>

                <Input
                    id="bitZona"
                    name="campoBitZona"
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