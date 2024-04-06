'use client'


import {
    Container, Row, Col,
    Input, Label
} from 'reactstrap';
import { Empleado } from '../../../utils/API/modelos/empleado';

export default function FormBusquedaUsuario(
    props: {
        parametrosBusqueda: {
            setIdUsuario: Function,
            setNombreUsuario: Function,
            setIdEmpleado: Function
        },
        elementosOpciones: {
            listaEmpleados: Empleado[],
        }
    }
) {
    return(
        <Container>
            <Row>
                <Col>
                    <Input
                        id="idUsuario"
                        placeholder="ID del usuario"
                        type="text"
                        onChange={(input) => {
                            var id = null;
                            if(input.target.value) {
                                id = parseInt(input.target.value)
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
                        onChange={(input) => {
                            props.parametrosBusqueda.setNombreUsuario(
                                input.target.value
                            );
                        }}
                    />
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
            </Row>
        </Container>
    );
};