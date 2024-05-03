'use client'

import React from "react";

import {
    Container, Row, Col,
    Input, Label
} from 'reactstrap';

// Modelo de datos.
import { Zona } from '../../../utils/API/modelos/zona';
import { TipoDispositivo } from '../../../utils/API/modelos/tipoDispositivo';

export default function FormBusquedaDispositivo(
    props: {
        parametrosBusqueda: {
            setIdDispositivo: Function,
            setIdZona: Function,
            setIdTipoDispositivo: Function
        },
        elementosOpciones: {
            listaZonas: Zona[],
            listaTiposDispositivos: TipoDispositivo[]
        }
    }
) {
    const [
        idZona,
        setIdZona
    ] = React.useState("");

    const [
        idTipoDispositivo,
        setIdTipoDispositivo
    ] = React.useState("");

    React.useEffect(() => {
        props.parametrosBusqueda.setIdZona(idZona);
    }, [
        idZona
    ]);

    React.useEffect(() => {
        props.parametrosBusqueda.setIdTipoDispositivo(idTipoDispositivo);
    }, [
        idTipoDispositivo
    ]);
    
    return(
        <Container>
            <Row>
                <Col>
                    <Input
                        id="idDispositivo"
                        placeholder="ID del dispositivo"
                        type="text"
                        onChange={(input) => {
                            var id = null;
                            if(input.target.value) {
                                id = parseInt(input.target.value)
                            }
                            props.parametrosBusqueda.setIdDispositivo(id);
                        }}
                    />
                </Col>

                {/*Input de id de la zona*/}
                <Col>
                    <Input
                        id="idZona"
                        type="select"
                        value={idZona}
                        onChange={(input) => {
                            setIdZona(
                                input.target.value
                            );
                        }}
                    >
                        <option value={''}>
                            Todas las Zonas
                        </option>

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
                </Col>

                {/*Input de id del tipo de dispositivo*/}
                <Col>
                    <Input
                        id="idTipoDispositivo"
                        type="select"
                        value={idTipoDispositivo}
                        onChange={(input) => {
                            setIdTipoDispositivo(
                                input.target.value
                            );
                        }}
                    >
                        <option value={''}>
                            Todas los tipos de dispositivos
                        </option>

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
                </Col>
            </Row>
        </Container>
    );
};