import React from 'react';

import {
    Input, Label,
    Form, FormGroup,
    Container, Row, Col, Button
} from 'reactstrap';

// Modelo de datos.
import {
    Zona
} from '../../../../utils/API/modelos/zona';

import {
    DispositivoIoT
} from '../../../../utils/API/modelos/dispositivoIoT';

import {
    TipoDispositivo
} from '../../../../utils/API/modelos/tipoDispositivo';


export default function FormModificarDispositivos(
    props: {
        registro: DispositivoIoT,
        elementosOpciones: {
            listaZonas: Zona[],
            listaTiposDispositivos: TipoDispositivo[]
        },
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
                <Label for="descripcionDispositivo">
                    Descripcion del reporte
                </Label>

                <Input
                    id="descripcionDispositivo"
                    name="campoDescripcionDispositivo"
                    type="text"
                    defaultValue={props.registro.descripcionDispositivo}
                />
            </FormGroup>

            <FormGroup>
                <Label for="zonaVinculado">
                    Zona donde se encuentra el dispositivo
                </Label>

                <Input
                    id="zonaVinculado"
                    type="select"
                    defaultValue={props.registro.idZonaVinculada}
                >
                    {props.elementosOpciones.listaZonas.map(
                        (registro: Zona) => {
                            return(
                                <option value={registro.id}>
                                    {registro.nombreZona}
                                </option>
                            );
                        }
                    )}
                </Input>
            </FormGroup>

            <FormGroup>
                <Label for="tipoDispositivoVinculado">
                    Tipo de dispositivo a registrar
                </Label>

                <Input
                    id="tipoDispositivoVinculado"
                    type="select"
                    defaultValue={
                        props.registro.id
                    }
                >
                    {props.elementosOpciones.listaTiposDispositivos.map(
                        (registro: TipoDispositivo) => {
                            return(
                                <option value={registro.id}>
                                    {registro.nombreTipoDispositivo}
                                </option>
                            );
                        }
                    )}
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