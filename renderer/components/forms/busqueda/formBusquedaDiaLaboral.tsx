'use client'

import React from "react";

import {
    Container, Row, Col,
    Input, Label
} from 'reactstrap';

// Modelo de datos.
import {
    Horario
} from "../../../utils/API/modelos/horario";

export default function FormBusquedaDiaLaboral(
    props: {
        parametrosBusqueda: {
            setIdDiaLaboral: Function,
            setDia: Function,
            setIdHorarioVinculado: Function
        },
        elementosOpciones: Horario[]
    }
) {
    const [
        idHorario,
        setIdHorario
    ] = React.useState("");

    React.useEffect(() => {
        props.parametrosBusqueda.setIdHorarioVinculado(idHorario);
    }, [
        idHorario
    ]);
    
    return(
        <Container>
            <Row>
                <Col>
                    <Input
                        id="idDiaLaboral"
                        placeholder="ID dia laboral"
                        type="text"
                        onChange={(input) => {
                            var id = null;
                            if(input.target.value) {
                                id = parseInt(input.target.value)
                            }
                            props.parametrosBusqueda.setDia(id);
                        }}
                    />
                </Col>

                {/*Input de dia*/}
                <Col>
                    <Input
                        id="diaLaboral"
                        type="select"
                        onChange={(input) => {
                            props.parametrosBusqueda.setDia(
                                input.target.value
                            );
                        }}
                    >
                        <option value={''}>
                            Todos los dias
                        </option>

                        <option value={0}>
                            Lunes
                        </option>

                        <option value={1}>
                            Martes
                        </option>

                        <option value={2}>
                            Miercoles
                        </option>

                        <option value={3}>
                            Jueves
                        </option>

                        <option value={4}>
                            Viernes
                        </option>

                        <option value={5}>
                            Sabado
                        </option>

                        <option value={6}>
                            Domingo
                        </option>
                    </Input>
                </Col>

                {/*Input de id del horario*/}
                <Col>
                    <Input
                        id="idTipoDispositivo"
                        type="select"
                        value={idHorario}
                        onChange={(input) => {
                            setIdHorario(
                                input.target.value
                            );
                        }}
                    >
                        <option value={''}>
                            Todos los horarios
                        </option>

                        {props.elementosOpciones.map(
                            (registro: Horario) => {
                                return(
                                    <option value={registro.id}>
                                        {registro.descripcionHorario}
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