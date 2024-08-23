// Importamos react.
import React, { SyntheticEvent } from 'react';

// Componentes de reactstrap.
import {
    Button,
    Container, Row, Col,
    Card, CardBody, CardHeader, CardText, CardTitle, Spinner, Input, Table
} from 'reactstrap';

export default function CardDatosProgramador(
    props: {
        pagina: Pagina
        funcionesOpciones: {
            onGuardarCambios: Function
        }
        datosOpciones: {
            listaProgramadores: string[]
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
                                Programador:
                                <Input
                                    id="programador"
                                    type="select"
                                    value={props.pagina.programa.programador}
                                    onChange={(evento: SyntheticEvent) => {
                                        const input = evento.target as HTMLSelectElement;

                                        props.funcionesOpciones.onGuardarCambios(
                                            input.value,
                                            'programa',
                                            'programador'
                                        );
                                    }}
                                >
                                    {props.datosOpciones.listaProgramadores.map((programador: string) => {
                                        return <option value={programador}>{programador}</option>
                                    })}
                                </Input>
                            </Col>
                        </Row>

                        <Row>
                            <Col style={{textAlign: 'center'}}>
                                <b>Ruta del programa:</b>
                                <Input
                                    id="rutaPrograma"
                                    type="file"
                                    onChange={(evento: SyntheticEvent) => {
                                        const input = evento.target as HTMLTextAreaElement;

                                        props.funcionesOpciones.onGuardarCambios(
                                            input.value,
                                            'programa',
                                            'rutaPrograma'
                                        );
                                    }}
                                />
                            </Col>
                        </Row>

                        <br/>

                        <Row>
                            <Col>
                                <Table dark responsive borderless>
                                    <thead style={{
                                        textAlign: 'center'
                                    }}>
                                        <tr>
                                            <th>Programa</th>
                                            <th>Tiempo de programa estimado</th>
                                        </tr>
                                    </thead>

                                    <tbody style={{
                                        textAlign: 'center'
                                    }}>
                                        <tr>
                                            <td>
                                                <Input
                                                    id="idPrograma"
                                                    type="text"
                                                    value={props.pagina.programa.nombrePrograma}
                                                    onChange={(evento: SyntheticEvent) => {
                                                        const input = evento.target as HTMLTextAreaElement;

                                                        props.funcionesOpciones.onGuardarCambios(
                                                            input.value,
                                                            'programa',
                                                            'nombrePrograma'
                                                        );
                                                    }}
                                                />
                                            </td>

                                            <td>
                                                <Input
                                                    id="tiempoPrograma"
                                                    type="time"
                                                    value={props.pagina.programa.tiempoPrograma}
                                                    onChange={(evento: SyntheticEvent) => {
                                                        const input = evento.target as HTMLTextAreaElement;

                                                        props.funcionesOpciones.onGuardarCambios(
                                                            input.value,
                                                            'programa',
                                                            'tiempoPrograma'
                                                        );
                                                    }}
                                                />
                                            </td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>
                    </Container>
                </CardBody>
            </Card>
        </React.Fragment>
    );
};