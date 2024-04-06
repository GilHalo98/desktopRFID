import React from 'react';

import {
    Input, Label,
    Form, FormGroup,
    Container, Row, Col, Button
} from 'reactstrap';

import { Zona } from '../../../../utils/API/modelos/zona';
import { guardarRegistro } from './logic/formLogic';
import { TipoDispositivo } from '../../../../utils/API/modelos/tipoDispositivo';

export default function FormRegistroDispositivos(
    props: {
        elementosOpciones: {
            listaZonas: Zona[]
            listaTiposDispositivos: TipoDispositivo[]
        },
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
                <Label for="descripcionDispositivo">
                    Descripcion del Dispositivo IoT
                </Label>

                <Input
                    id="descripcionDispositivo"
                    name="campoDescripcionDispositivo"
                    type="text"
                />
            </FormGroup>

            <FormGroup>
                <Label for="zonaVinculado">
                    Zona donde se encuentra el dispositivo
                </Label>

                <Input
                    id="zonaVinculado"
                    type="select"
                >
                    {props.elementosOpciones.listaZonas.map((registro: Zona) => {
                        return(
                            <option value={registro.id}>
                                {registro.nombreZona}
                            </option>
                        );
                    })}
                </Input>
            </FormGroup>

            <FormGroup>
                <Label for="tipoDispositivoVinculado">
                    Tipo de dispositivo a registrar
                </Label>

                <Input
                    id="tipoDispositivoVinculado"
                    type="select"
                >
                    {props.elementosOpciones.listaTiposDispositivos.map((registro: TipoDispositivo) => {
                        return(
                            <option value={registro.id}>
                                {registro.nombreTipoDispositivo}
                            </option>
                        );
                    })}
                </Input>
            </FormGroup>

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