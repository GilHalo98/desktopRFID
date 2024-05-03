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
    DiaLaboral
} from '../../../../utils/API/modelos/diaLaboral';

export default function FormModificarDiasLaborales(
    props: {
        registro: DiaLaboral,
        elementosOpciones: Horario[],
        onModificarRegistro: Function,
        toggleModal: Function
    }
) {
    const [
        esDescanso,
        setEsDescanso
    ] = React.useState(false);

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
            {/*Campo del registro de horario vinculado*/}
            <FormGroup>
                <Label for="horarioVinculado">
                    Horario vinculado del dia laboral
                </Label>

                <Input
                    id="horarioVinculado"
                    type="select"
                    defaultValue={props.registro.idHorarioVinculado}
                >
                    {props.elementosOpciones.map((registro: Horario) => {
                        return(
                            <option value={registro.id}>
                                {registro.descripcionHorario}
                            </option>
                        );
                    })}
                </Input>
            </FormGroup>

            {/*Campo que indica el dia laboral*/}
            <FormGroup>
                <Label for="diaLaboral">
                    Dia Laboral del registro
                </Label>

                <Input
                    id="diaLaboral"
                    type="select"
                    defaultValue={props.registro.dia}
                >
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
            </FormGroup>

            {/*Campo que indica si el dia es descansado*/}
            <FormGroup
                check
                style={{color: 'white'}}
            >
                <Input
                    type="checkbox"
                    id="esDescanso"
                    defaultChecked={props.registro.esDescanso}
                    onChange={(evento) => {
                        setEsDescanso(evento.target.checked);
                    }}
                />

                <Label
                    for="esDescanso"
                    check
                >
                    ¿Es descanso?
                </Label>
            </FormGroup>

            <Container>
                <Row>
                    <Col>
                        {/*Campo hora de entrada*/}
                        <FormGroup>
                            <Label for='horaEntrada'>
                                Hora de entrada
                            </Label>

                            <Input
                                id='horaEntrada'
                                type='time'
                                disabled={esDescanso}
                                defaultValue={quitarSegundos(
                                    props.registro.horaEntrada
                                )}
                            />
                        </FormGroup>
                    </Col>

                    <Col>
                        {/*Campo hora de salida*/}
                        <FormGroup>
                            <Label for='horaSalida'>
                                Hora de salida
                            </Label>

                            <Input
                                id='HoraSalida'
                                type='time'
                                disabled={esDescanso}
                                defaultValue={quitarSegundos(
                                    props.registro.horaSalida
                                )}
                            />
                        </FormGroup>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        {/*Campo hora de incio de descanso*/}
                        <FormGroup>
                            <Label for='horaInicioDescanso'>
                                Hora de inicio de descanso
                            </Label>

                            <Input
                                id='horaInicioDescanso'
                                type='time'
                                disabled={esDescanso}
                                defaultValue={quitarSegundos(
                                    props.registro.horaSalidaDescanso
                                )}
                            />
                        </FormGroup>                    
                    </Col>

                    <Col>
                        {/*Campo hora de fin de descanso*/}
                        <FormGroup>
                            <Label for='horaFinDescanso'>
                                Hora de fin de descanso
                            </Label>

                            <Input
                                id='horaFinDescanso'
                                type='time'
                                disabled={esDescanso}
                                defaultValue={quitarSegundos(
                                    props.registro.horaEntradaDescanso
                                )}
                            />
                        </FormGroup>                    
                    </Col>
                </Row>
            </Container>

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