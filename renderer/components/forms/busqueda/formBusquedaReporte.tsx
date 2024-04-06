'use client'

// React
import React from 'react';

// Conponentes de reactstrap
import {
    Container, Row, Col,
    Input, Label
} from 'reactstrap';
import { DispositivoIoT } from '../../../utils/API/modelos/dispositivoIoT';
import { Empleado } from '../../../utils/API/modelos/empleado';
import { TipoReporte } from '../../../utils/API/modelos/tipoReporte';
import { Zona } from '../../../utils/API/modelos/zona';

export default function FormBusquedaReporte(
    props: {
        parametrosBusqueda: {
            setIdReporte: Function,
            setDescripcionReporte: Function,
            setIdTipoReporte: Function,
            setIdDispositivoIoT: Function,
            setIdEmpleado: Function,
            setIdZona: Function
        },
        elementosOpciones: {
            listaTiposReportes: TipoReporte[],
            listaEmpleados: Empleado[],
            listaDispositivos: DispositivoIoT[],
            listaZonas: Zona[]
        }
    }
) {
    return(
        <Container>
            <Row>
                <Col>
                    {/*Input de id de reporte*/}
                    <Input
                        id="idReporte"
                        placeholder="ID del reporte"
                        type="text"
                        onChange={(input) => {
                            var id = null;
                            if(input.target.value) {
                                id = parseInt(input.target.value)
                            }
                            props.parametrosBusqueda.setIdReporte(id);
                        }}
                    />
                </Col>

                <Col>
                    {/*Input de descripcion de reporte*/}
                    <Input
                        id="descripcionReporte"
                        placeholder="Descripcion del reporte"
                        type="text"
                        onChange={(input) => {
                            var descripcion = null;
                            if(input.target.value) {
                                descripcion = input.target.value;
                            }
                            props.parametrosBusqueda.setDescripcionReporte(descripcion);
                        }}
                    />
                </Col>
            </Row>

            <br/>

            <Row>
                <Col>
                    {/*Input de id de tipo de reporte*/}
                    <Input
                        id="idTipoReporte"
                        type="select"
                        onChange={(input) => {
                            props.parametrosBusqueda.setIdTipoReporte(input.target.value);
                        }}
                    >
                        <option value={''}>
                            Todos los tipos de reportes
                        </option>

                        {props.elementosOpciones.listaTiposReportes.map((registro: any) => {
                            return(
                                <option value={registro.id}>
                                    {registro.descripcionTipoReporte}
                                </option>
                            );
                        })}
                    </Input>
                </Col>

                <Col>
                    {/*Input de id de dispositivo*/}
                    <Input
                        id="idDispositivo"
                        type="select"
                        onChange={(input) => {
                            props.parametrosBusqueda.setIdDispositivoIoT(input.target.value);
                        }}
                    >
                        <option value={''}>
                            Todos los dispositivos
                        </option>

                        {props.elementosOpciones.listaDispositivos.map((registro: any) => {
                            return(
                                <option value={registro.id}>
                                    {registro.descripcionDispositivo}
                                </option>
                            );
                        })}
                    </Input>
                </Col>

                <Col>
                    {/*Input de id de empleado*/}
                    <Input
                        id="idEmpleado"
                        type="select"
                        onChange={(input) => {
                            props.parametrosBusqueda.setIdEmpleado(input.target.value);
                        }}
                    >
                        <option value={''}>
                            Todos los empleados
                        </option>

                        {props.elementosOpciones.listaEmpleados.map((registro: any) => {
                            return(
                                <option value={registro.id}>
                                    {registro.nombres}
                                </option>
                            );
                        })}
                    </Input>
                </Col>

                <Col>
                    {/*Input de id de zona*/}
                    <Input
                        id="idZona"
                        type="select"
                        onChange={(input) => {
                            props.parametrosBusqueda.setIdZona(input.target.value);
                        }}
                    >
                        <option value={''}>
                            Todos las Zonas
                        </option>

                        {props.elementosOpciones.listaZonas.map((registro: any) => {
                            return(
                                <option value={registro.id}>
                                    {registro.nombreZona}
                                </option>
                            );
                        })}
                    </Input>
                </Col>
            </Row>
        </Container>
    );
};