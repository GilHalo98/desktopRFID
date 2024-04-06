import React from 'react';

import {
    Input, Label,
    Form, FormGroup,
    Container, Row, Col, Button
} from 'reactstrap';

import { modificarRegistro } from './logic/formLogic';
import { Zona } from '../../../../utils/API/modelos/zona';
import { RespuestaConsultaDispositivos } from '../../../../utils/API/respuestas/consultaDispositivo';
import { TipoDispositivo } from '../../../../utils/API/modelos/tipoDispositivo';


export default function FormModificarDispositivos(
    props: {
        registro: RespuestaConsultaDispositivos,
        elementosOpciones: {
            listaZonas: Zona[],
            listaTiposDispositivos: TipoDispositivo[]
        },
        toggleModal: Function,
        toggleRefresh: Function
    }
) {
    return(
        <Form onSubmit={(evento) => {
            evento.preventDefault();
            modificarRegistro(evento, props.registro.id);
            props.toggleModal();
            props.toggleRefresh();
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
                    defaultValue={props.registro.idTipoDispositivoVinculado}
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