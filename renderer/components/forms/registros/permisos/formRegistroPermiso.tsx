import React from 'react';

import {
    Input, Label,
    Form, FormGroup,
    Container, Row, Col, Button
} from 'reactstrap';

import { Zona } from '../../../../utils/API/modelos/zona';

export default function FormRegistroPermiso(
    props: {
        elementosOpciones: Zona[],
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
                <Label for="descripcionPermiso">
                    Descripcion del permiso
                </Label>

                <Input
                    id="descripcionPermiso"
                    name="campoDescripcionPermiso"
                    type="text"
                />
            </FormGroup>

            <Label>
                Autorización
            </Label>

            <Container>
                <Row>
                    {props.elementosOpciones.map((
                        registro: Zona,
                        index: number
                    ) => {
                        return(
                            <Col sm={6}>
                                <FormGroup check>
                                    <Input
                                        type="checkbox"
                                        value={registro.bitZona}
                                    />

                                    <Label check>
                                        {registro.nombreZona}
                                    </Label>
                                </FormGroup>
                            </Col>
                        );
                    })}
                </Row>
            </Container>

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