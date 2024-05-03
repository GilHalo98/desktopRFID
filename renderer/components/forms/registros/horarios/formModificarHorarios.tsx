import React from 'react';

import {
    Input, Label,
    Form, FormGroup,
    Container, Row, Col, Button
} from 'reactstrap';

// Modelos de datos.
import {
    Horario
} from '../../../../utils/API/modelos/horario';

import {
    Empleado
} from '../../../../utils/API/modelos/empleado';

export default function FormModificarHorarios(
    props: {
        registro: Horario,
        elementosOpciones: Empleado[],
        onModificarRegistro: Function,
        toggleModal: Function
    }
) {
    const quitarSegundos = (tiempo: string) => {
        const tiempoAux = tiempo.split(":");
        return tiempoAux[0] + ":" + tiempoAux[1];
    }

    return(
        <Form onSubmit={(evento) => {
            evento.preventDefault();
            props.onModificarRegistro(evento, props.registro.id);
            props.toggleModal();
        }}>
            {/*Campo del registro de empleado vinculado*/}
            <FormGroup>
                <Label for="horarioVinculado">
                    Horario vinculado del dia laboral
                </Label>

                <Input
                    id="horarioVinculado"
                    type="select"
                    defaultValue={props.registro.idEmpleadoVinculado}
                >
                    {props.elementosOpciones.map((registro: Empleado) => {
                        return(
                            <option value={registro.id}>
                                {
                                    registro.nombres
                                    + " "
                                    + registro.apellidoPaterno
                                    + " "
                                    + registro.apellidoMaterno
                                }
                            </option>
                        );
                    })}
                </Input>
            </FormGroup>

            {/*Campo de descripcion de horario*/}
            <FormGroup>
                <Label for="descripcionHorario">
                    Descripcion del horario
                </Label>

                <Input
                    id="descripcionHorario"
                    type="text"
                    defaultValue={props.registro.descripcionHorario}
                />
            </FormGroup>

            {/*Campo de tolerancia*/}
            <FormGroup>
                <Label
                    for="tolerancia"
                >
                    Tiempo de tolerancia par la entrada y salida
                </Label>

                <Input
                    type="time"
                    id="tolerancia"
                    defaultValue={quitarSegundos(
                        props.registro.tolerancia
                    )}
                />
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