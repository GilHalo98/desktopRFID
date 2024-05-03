'use client'

// React
import React from 'react';

// Conponentes de reactstrap
import {
    Container, Row, Col,
    Input, Label
} from 'reactstrap';

// Modelo de datos.
import { TipoReporte } from '../../../utils/API/modelos/tipoReporte';

export default function FormBusquedaReporte(
    props: {
        parametrosBusqueda: {
            setIdReporte: Function,
            setDescripcionReporte: Function,
            setIdTipoReporte: Function,
        },
        elementosOpciones: TipoReporte[]
    }
) {
    const [
        idTipoReporte,
        setIdTipoReporte
    ] = React.useState("");

    React.useEffect(() => {
        props.parametrosBusqueda.setIdTipoReporte(idTipoReporte);
    }, [idTipoReporte]);

    return(
        <Container>
            <Row>
                {/*Input de id de reporte*/}
                <Col>
                    <Input
                        id="idReporte"
                        placeholder="ID del reporte"
                        type="text"
                        onChange={(evento) => {
                            var id = null;
                            if(evento.target.value) {
                                id = parseInt(evento.target.value)
                            }
                            props.parametrosBusqueda.setIdReporte(id);
                        }}
                    />
                </Col>

                {/*Input de descripcion de reporte*/}
                <Col>
                    <Input
                        id="descripcionReporte"
                        placeholder="Descripcion del reporte"
                        type="text"
                        onChange={(evento) => {
                            var descripcion = null;
                            if(evento.target.value) {
                                descripcion = evento.target.value;
                            }
                            props.parametrosBusqueda.setDescripcionReporte(descripcion);
                        }}
                    />
                </Col>
            </Row>

            <br/>

            <Row>
                {/*Input de id de tipo de reporte*/}
                <Col>
                    <Input
                        id="idTipoReporte"
                        type="select"
                        value={idTipoReporte}
                        onChange={(evento) => {
                            setIdTipoReporte(evento.target.value);
                        }}
                    >
                        <option value={''}>
                            Todos los tipos de reportes
                        </option>

                        {props.elementosOpciones.map((registro: any) => {
                            return(
                                <option value={registro.id}>
                                    {registro.descripcionTipoReporte}
                                </option>
                            );
                        })}
                    </Input>
                </Col>
            </Row>
        </Container>
    );
};