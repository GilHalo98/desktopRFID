import React from 'react';

import {
    Input, Label,
    Form, FormGroup,
    Container, Row, Col, Button
} from 'reactstrap';
import { modificarRegistro } from './logic/formLogic';
import { Empleado } from '../../../../utils/API/modelos/empleado';
import { Usuario } from '../../../../utils/API/modelos/usuario';

export default function FormModificarUsuario(
    props: {
        registro: Usuario,
        toggleModal: Function,
        toggleRefresh: Function,
        elementosOpciones: {
            listaEmpleados: Empleado[],
        }
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
                <Label for="nombreUsuario">
                    Nombre de usuario
                </Label>

                <Input
                    id="nombreUsuario"
                    name="campoDeNombreUsuario"
                    type="text"
                    defaultValue={props.registro.nombreUsuario}
                />
            </FormGroup>

            <FormGroup>
                <Label for="password">
                    Nueva password
                </Label>

                <Input
                    id="password"
                    name="campoDePassword"
                    type="password"
                />
            </FormGroup>

            <FormGroup>
                <Label for="idEmpleado">
                    Registro de empleado vinculado
                </Label>

                {/*Input de id de empleado*/}
                <Input
                    id="idEmpleado"
                    type="select"
                    defaultValue={props.registro.idRegistroEmpleadoVinculado}
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
            </FormGroup>

            <br/>

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