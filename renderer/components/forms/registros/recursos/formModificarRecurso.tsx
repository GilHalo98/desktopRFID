import React from 'react';

import {
    Input, Label,
    Form, FormGroup,
    Container, Row, Col, Button
} from 'reactstrap';

// Modelo de datos.
import {
    Recurso
} from '../../../../utils/API/modelos/recurso';

export default function FormModificarRecurso(
    props: {
        registro: Recurso,
        onModificarRegistro: Function,
        toggleModal: Function
    }
) {
    return(
        <Form onSubmit={(evento) => {
            evento.preventDefault();
            props.onModificarRegistro(
                evento,
                props.registro.id
            );
            props.toggleModal();
        }}>
            {/*Campo de carga de imagen del empleado*/}
            <FormGroup>
                <Label for="imagenEmpleado">
                    Foto del empleado
                </Label>
                <Input
                    id="imagenEmpleado"
                    name="file"
                    type="file"
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