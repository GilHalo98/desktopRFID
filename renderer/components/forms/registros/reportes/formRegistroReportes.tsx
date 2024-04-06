import React from 'react';

import {
    Input, Label,
    Form, FormGroup,
    Container, Row, Col, Button
} from 'reactstrap';


import { guardarRegistro } from './logic/formLogic';
import { TipoReporte } from '../../../../utils/API/modelos/tipoReporte';
import { Empleado } from '../../../../utils/API/modelos/empleado';
import { DispositivoIoT } from '../../../../utils/API/modelos/dispositivoIoT';
import { Zona } from '../../../../utils/API/modelos/zona';

export default function FormRegistroReportes(
    props: {
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
            guardarRegistro(evento);
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
                />
            </FormGroup>

            <FormGroup>
                <Label for="empleadoVinculado">
                    Empleado al que se le vincula el reporte
                </Label>

                <Input
                    id="empleadoVinculado"
                    type="select"
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