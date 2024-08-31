// Importamos react.
import React, { SyntheticEvent } from 'react';

// Componentes de reactstrap.
import {
    Input, Label,
    Card, CardBody,
    Container, Row, Col, InputGroup,
} from 'reactstrap';

// Modelos de datos.
import {
    Empleado
} from '../../../utils/API/modelos/empleado';

export default function CardDatosProgramador(
    props: {
        pagina: Pagina
        funcionesOpciones: {
            onGuardarCambios: Function
        }
        datosOpciones: {
            listaProgramadores: Empleado[]
        }
    }
) {
    if(!props.pagina.programa) {
        return <></>
    }

    return(
        <React.Fragment>
            <Card color='dark'>
                <CardBody className="text-white">
                    <Container>
                        <Row>
                            <Col style={{
                                textAlign: 'center'
                            }}>
                                <Label>
                                    Programador:
                                </Label>

                                    <Input
                                        id="programador"
                                        type="text"
                                        list="empleados"
                                        value={props.pagina.programa.programador}
                                        onChange={(evento: SyntheticEvent) => {
                                            const input = evento.target as HTMLSelectElement;

                                            props.funcionesOpciones.onGuardarCambios(
                                                input.value,
                                                'programa',
                                                'programador'
                                            );
                                        }}
                                    />

                                    <datalist id="empleados">
                                        {props.datosOpciones.listaProgramadores.map((
                                            registro: Empleado
                                        ) => {
                                            return(
                                                <option value={
                                                    `${registro.nombres} ${registro.apellidoPaterno} ${registro.apellidoMaterno}`
                                                }/>
                                            );
                                        })}
                                    </datalist>
                            </Col>

                            <Col style={{
                                textAlign: 'center'
                            }}>
                                <Label>
                                    Ruta del programa:
                                </Label>

                                <Input
                                    id="rutaPrograma"
                                    type="file"
                                    accept=".gcode"
                                    onChange={(evento: SyntheticEvent) => {
                                        const input = evento.target as HTMLInputElement;

                                        props.funcionesOpciones.onGuardarCambios(
                                            input.files[0].path,
                                            'programa',
                                            'ruta'
                                        );
                                    }}
                                />
                            </Col>
                        </Row>

                        <br/>

                        <Row>
                            <Col style={{
                                textAlign: 'center'
                            }}>
                                <Label>
                                    Programa
                                </Label>

                                <Input
                                    id="idPrograma"
                                    type="text"
                                    value={props.pagina.programa.nombre}
                                    onChange={(evento: SyntheticEvent) => {
                                        const input = evento.target as HTMLTextAreaElement;

                                        props.funcionesOpciones.onGuardarCambios(
                                            input.value,
                                            'programa',
                                            'nombre'
                                        );
                                    }}
                                />
                            </Col>

                            <Col style={{
                                textAlign: 'center'
                            }}>
                                <Label>
                                    Tiempo de programa estimado
                                </Label>

                                <Input
                                    id="tiempoPrograma"
                                    type="time"
                                    value={props.pagina.programa.tiempo}
                                    onChange={(evento: SyntheticEvent) => {
                                        const input = evento.target as HTMLTextAreaElement;

                                        props.funcionesOpciones.onGuardarCambios(
                                            input.value,
                                            'programa',
                                            'tiempo'
                                        );
                                    }}
                                />
                            </Col>
                        </Row>
                    </Container>
                </CardBody>
            </Card>
        </React.Fragment>
    );
};