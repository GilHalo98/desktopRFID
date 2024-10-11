// funcionalidad de React.
import React, { SyntheticEvent } from 'react';

// Componentes de reacstrap.
import {
    Table,
    Container, Row, Col,
    Input, Label, FormGroup,
} from 'reactstrap';

// Funcionalidad propia.
import { numeroDiaANombreDia } from '../../../../utils/conversiones';

// Modelo de datos.
import {
    HorarioCompleto
} from '../../../../utils/API/respuestas/horarioCompleto';

import {
    DiaLaboral
} from '../../../../utils/API/modelos/diaLaboral';

export default function FormListaDiasSimilares(
    props: {
        diasDescanso: boolean[]
        setDiasDescanso: Function
    }
) {
    // Lista con los dias de la semana.
    const dias = [1, 2, 3, 4, 5, 6, 7];

    return(<>
        <Container>
            <Row>
                <Col>
                    <Table hover dark responsive>
                        <thead>
                            <tr style={{borderBottom: '100px'}}>
                                <th>Hora de entrada</th>
                                <th>Hora de salida</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                {/*Campo hora de entrada*/}
                                <td>
                                    <FormGroup>
                                        <Input
                                            id='horaEntradaHorario'
                                            type='time'
                                        />
                                    </FormGroup>
                                </td>

                                {/*Campo hora de salida*/}
                                <td>
                                    <FormGroup>
                                        <Input
                                            id='horaSalidaHorario'
                                            type='time'
                                        />
                                    </FormGroup>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Table hover dark responsive>
                        <thead>
                            <tr style={{borderBottom: '100px'}}>
                                <th/>
                                {props.diasDescanso.map((esDescanso: boolean, index: number) => {
                                    const nombreDia: string = numeroDiaANombreDia(
                                        index + 1
                                    );

                                    return(
                                        <th>{nombreDia}</th>
                                    );
                                })}
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td>Descanso</td>

                                {props.diasDescanso.map((esDescanso: boolean, index: number) => {
                                    const nombreDia: string = numeroDiaANombreDia(
                                        index + 1
                                    );

                                    return(
                                        <td>
                                            <FormGroup
                                                check
                                                style={{
                                                    color: 'white',
                                                    paddingLeft: '50%'
                                                }}
                                            >
                                                <Input
                                                    type="checkbox"
                                                    id={
                                                        "esDescansoHorario"
                                                        + nombreDia
                                                    }
                                                    defaultChecked={
                                                        esDescanso
                                                    }
                                                    onClick={(evento: SyntheticEvent) => {
                                                        const input = evento.target as HTMLInputElement;
            
                                                        props.diasDescanso[
                                                            index
                                                        ] = input.checked;
            
                                                        props.setDiasDescanso([
                                                            ...props.diasDescanso
                                                        ]);
                                                    }}
                                                />
                                            </FormGroup>
                                        </td>
                                    );
                                })}
                            </tr>
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    </>);
};