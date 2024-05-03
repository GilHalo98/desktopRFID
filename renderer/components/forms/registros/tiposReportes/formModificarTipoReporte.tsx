import React from 'react';

import {
    Input, Label,
    Form, FormGroup,
    Container, Row, Col, Button
} from 'reactstrap';

import {
    TipoReporte
} from '../../../../utils/API/modelos/tipoReporte';

export default function FormModificarTipoReporte(
    props: {
        registro: TipoReporte,
        onModificarRegistro: Function,
        toggleModal: Function
    }
) {
    return(
        <Form onSubmit={(evento) => {
            evento.preventDefault();
            props.onModificarRegistro(evento, props.registro.id);
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
                    defaultValue={props.registro.nombreTipoReporte}
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
                    defaultValue={props.registro.descripcionTipoReporte}
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
                            }}>
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
                            Guardar Cambios
                        </Button>
                    </Col>
                </Row>
            </Container>
        </Form>
    );
};