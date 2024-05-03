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

export default function FormRegistroDiasLaborales(
    props: {
        elementosOpciones: Horario[],
        onGuardarRegistro: Function,
        toggleModal: Function
    }
) {
    const [
        esDescanso,
        setEsDescanso
    ] = React.useState(false);

    return(
        <Form onSubmit={(evento) => {
            evento.preventDefault();
            props.onGuardarRegistro(evento);
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
                            }}
                        >
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
                            Registrar
                        </Button>
                    </Col>
                </Row>
            </Container>
        </Form>
    );
};