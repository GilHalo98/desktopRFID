'use client'

// React.
import React from 'react';

// Componentes de reacstrap.
import {
    Container, Row, Col,
    Input, Label
} from 'reactstrap';

// Modelo de datos.
import { Empleado } from '../../../utils/API/modelos/empleado';

// Altoritmo de busqueda.
import {
    buscarRegistroVinculado
} from '../../../utils/busquedaAcomodo';

export default function FormBusquedaUsuario(
    props: {
        parametrosBusqueda: {
            setIdUsuario: Function,
            setNombreUsuario: Function,
            setIdEmpleado: Function
        },
        listaEmpleados: Empleado[]
    }
) {

    const [
        idEmpleado,
        setIdEmpleado
    ] = React.useState("");

    React.useEffect(() => {
        props.parametrosBusqueda.setIdEmpleado(idEmpleado);
    }, [idEmpleado]);

    return(
        <Container>
            <Row>
                <Col>
                    <Input
                        id="idUsuario"
                        placeholder="ID del usuario"
                        type="text"
                        onChange={(evento) => {
                            var id = null;
                            if(evento.target.value) {
                                id = parseInt(evento.target.value)
                            }
                            props.parametrosBusqueda.setIdUsuario(id);
                        }}
                    />
                </Col>

                <Col>
                    <Input
                        id="nombreUsuario"
                        placeholder="Nombre de usuario"
                        type="text"
                        onChange={(evento) => {
                            props.parametrosBusqueda.setNombreUsuario(
                                evento.target.value
                            );
                        }}
                    />
                </Col>

                <Col>
                    {/*Input de id de empleado*/}
                    <Input
                        id="idEmpleado"
                        type="select"
                        value={idEmpleado}
                        onChange={(evento) => {
                            setIdEmpleado(
                                evento.target.value
                            );
                        }}
                    >
                        <option value={''}>
                            Todos los empleados
                        </option>

                        {props.listaEmpleados.map((
                            registro: Empleado,
                            index: number
                        ) => {
                            return(
                                <option value={registro.id}>
                                    {   
                                        registro.nombres
                                        + ' ' + registro.apellidoPaterno
                                        + ' ' + registro.apellidoMaterno
                                    }
                                </option>
                            );
                        })}
                    </Input>
                </Col>
            </Row>
        </Container>
    );
};