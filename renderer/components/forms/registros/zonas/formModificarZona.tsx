import React from 'react';

import {
    Input, Label,
    Form, FormGroup,
    Container, Row, Col, Button
} from 'reactstrap';

import { Zona } from '../../../../utils/API/modelos/zona';

export default function FormModificarTipoReporte(
    props: {
        registro: Zona,
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
                <Label for="nombreZona">
                    Nombre de la zona
                </Label>

                <Input
                    id="nombreZona"
                    name="campoNombreZona"
                    type="text"
                    defaultValue={props.registro.nombreZona}
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
                    defaultValue={props.registro.descripcionZona}
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
                    defaultValue={props.registro.bitZona}
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