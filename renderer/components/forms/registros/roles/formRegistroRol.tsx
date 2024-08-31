import React from 'react';

import {
    Input, Label,
    Form, FormGroup,
    Container, Row, Col, Button
} from 'reactstrap';

import { Permiso } from '../../../../utils/API/modelos/permiso';

export default function FormRegistroRol(
    props: {
        elementosOpciones: Permiso[],
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
                <Label for="descripcionRol">
                    Rol
                </Label>

                <Input
                    id="descripcionRol"
                    name="campoDescripcionRol"
                    type="text"
                />
            </FormGroup>

            <FormGroup>
                <Label for="descripcionRol">
                    Descripcion del rol
                </Label>

                <Input
                    id="descripcionRol"
                    name="campoDescripcionRol"
                    type="text"
                />
            </FormGroup>

            <FormGroup>
                <Label for="permisoVinculado">
                    Permiso vinculado del rol
                </Label>

                <Input
                    id="permisoVinculado"
                    type="select"
                >
                    {props.elementosOpciones.map((registro: Permiso) => {
                        return(
                            <option value={registro.id}>
                                {registro.descripcionPermiso}
                            </option>
                        );
                    })}
                </Input>
            </FormGroup>

            <FormGroup>
                <Label for="bitRol">
                    Bit de rol
                </Label>

                <Input
                    id="descripcionRol"
                    name="campoBitRol"
                    type="number"
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