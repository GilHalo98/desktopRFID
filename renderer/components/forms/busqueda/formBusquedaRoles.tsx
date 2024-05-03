'use client'

// React.
import React from 'react';

import {
    Container, Row, Col,
    Input, Label
} from 'reactstrap';
import { Permiso } from '../../../utils/API/modelos/permiso';

export default function FormBusquedaRol(
    props: {
        parametrosBusqueda: {
            setIdPermiso: Function,
            setRolTrabajador: Function,
            setIdRol: Function
        },
        elementosOpciones: Permiso[]
    }
) {

    const [
        idPermiso,
        setIdPermiso
    ] = React.useState("");

    React.useEffect(() => {
        props.parametrosBusqueda.setIdPermiso(idPermiso);
    }, [idPermiso]);

    return(
        <Container>
            <Row>
                <Col>
                    <Input
                        id="idRol"
                        placeholder="ID del rol"
                        type="text"
                        onChange={(input) => {
                            var id = null;
                            if(input.target.value) {
                                id = parseInt(input.target.value)
                            }
                            props.parametrosBusqueda.setIdRol(id);
                        }}
                    />
                </Col>

                <Col>
                    <Input
                        id="rolTrabajador"
                        placeholder="Nombre del Rol"
                        type="text"
                        onChange={(input) => {
                            props.parametrosBusqueda.setRolTrabajador(input.target.value);
                        }}
                    />
                </Col>

                <Col>
                    {/*Input de id del permiso*/}
                    <Input
                        id="idPermiso"
                        type="select"
                        value={idPermiso}
                        onChange={(input) => {
                            setIdPermiso(
                                input.target.value
                            );
                        }}
                    >
                        <option value={''}>
                            Todos los permisos
                        </option>

                        {props.elementosOpciones.map((registro: Permiso) => {
                            return(
                                <option value={registro.id}>
                                    {registro.descripcionPermiso}
                                </option>
                            );
                        })}
                    </Input>
                </Col>
            </Row>
        </Container>
    );
};