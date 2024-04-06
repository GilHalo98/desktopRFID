import React from 'react';

import {
    Input, Label,
    Form, FormGroup,
    Container, Row, Col, Button
} from 'reactstrap';
import { Zona } from '../../../../utils/API/modelos/zona';
import { guardarRegistro } from './logic/formLogic';

export default function FormRegistroPermiso(
    props: {
        elementosOpciones: Zona[],
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
                    {props.elementosOpciones.map((registro: Zona, index: number) => {
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