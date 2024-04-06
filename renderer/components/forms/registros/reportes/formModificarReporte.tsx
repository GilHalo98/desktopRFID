import React from 'react';

import {
    Input, Label,
    Form, FormGroup,
    Container, Row, Col, Button
} from 'reactstrap';

import { modificarRegistro } from './logic/formLogic';
import { RespuestaConsultaReporte } from '../../../../utils/API/respuestas/consultaReporte';
import { DispositivoIoT } from '../../../../utils/API/modelos/dispositivoIoT';
import { Empleado } from '../../../../utils/API/modelos/empleado';
import { TipoReporte } from '../../../../utils/API/modelos/tipoReporte';
import { Zona } from '../../../../utils/API/modelos/zona';


export default function FormModificarReportes(
    props: {
        registro: RespuestaConsultaReporte,
        elementosOpciones: {
            listaTiposReportes: TipoReporte[],
            listaEmpleados: Empleado[],
            listaDispositivos: DispositivoIoT[],
            listaZonas: Zona[]
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
                <Label for="descripcionReporte">
                    Descripcion del reporte
                </Label>

                <Input
                    id="descripcionReporte"
                    name="campodescripcionReporte"
                    type="text"
                    defaultValue={props.registro.descripcionReporte}
                />
            </FormGroup>

            <FormGroup>
                <Label for="empleadoVinculado">
                    Empleado al que se le vincula el reporte
                </Label>

                <Input
                    id="empleadoVinculado"
                    type="select"
                    defaultValue={props.registro.idEmpleadoVinculado}
                >
                    {props.elementosOpciones.listaEmpleados.map((registro: Empleado) => {
                        return(
                            <option value={registro.id}>
                                {registro.nombres}
                            </option>
                        );
                    })}
                </Input>
            </FormGroup>

            <FormGroup>
                <Label for="tipoReporteVinculado">
                    Tipo de reporte
                </Label>

                <Input
                    id="tipoReporteVinculado"
                    type="select"
                    defaultValue={props.registro.idTipoReporteVinculado}
                >
                    {props.elementosOpciones.listaTiposReportes.map((registro: TipoReporte) => {
                        return(
                            <option value={registro.id}>
                                {registro.descripcionTipoReporte}
                            </option>
                        );
                    })}
                </Input>
            </FormGroup>

            <FormGroup>
                <Label for="dispositivoVinculado">
                    Dispositivo que genero el reporte
                </Label>

                <Input
                    id="dispositivoVinculado"
                    type="select"
                    defaultValue={props.registro.idRegistroDispositivoIoTVinculado}
                >
                    {props.elementosOpciones.listaDispositivos.map((registro: DispositivoIoT) => {
                        return(
                            <option value={registro.id}>
                                {registro.descripcionDispositivo}
                            </option>
                        );
                    })}
                </Input>
            </FormGroup>

            <FormGroup>
                <Label for="zonaVinculado">
                    Zona donde se encuentra el dispositivo
                </Label>

                <Input
                    id="zonaVinculado"
                    type="select"
                    defaultValue={props.registro.idRegistroZonaVinculada}
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