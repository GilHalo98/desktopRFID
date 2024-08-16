// funcionalidad de React.
import React, { SyntheticEvent } from 'react';

// Componentes de reacstrap.
import {
    Input,
    FormGroup,
    Table,
    Container, Row, Col
} from 'reactstrap';

// Funcionalidad propia.

// Modelo de datos.
import {
    DiaLaboral
} from '../../../../utils/API/modelos/diaLaboral';

export default function FormListaDias(
   props: {
        listaDias: {
            nombreDia: string,
            id: number
        }[],
        listaDiasDescanso: boolean[],
        setListaDiasDescanso: Function,
        registros?: DiaLaboral[]
    }
) {
    // Hooks de la lista.
    const diasDescanso = props.listaDiasDescanso.map(
        (esDescanso: boolean) => {
            return esDescanso;
        }
    );

    // Mapeamos los registros a una lista.
    const registros = props.registros?
        props.registros : [];

    return(
        <Container>
            <Row>
                <Col>
                    <Table hover dark responsive>
                        <thead>
                            <tr style={{borderBottom: '100px'}}>
                                <th>Hora de entrada</th>
                                <th>Hora de inicio de descanso</th>
                                <th>Hora de termino de descanso</th>
                                <th>Hora de salida</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td>
                                    {/*Campo hora de entrada*/}
                                    <FormGroup>
                                        <Input
                                            id='horaEntrada'
                                            type='time'
                                        />
                                    </FormGroup>
                                </td>
                                <td>
                                    {/*Campo hora de incio de descanso*/}
                                    <FormGroup>
                                        <Input
                                            id='horaInicioDescanso'
                                            type='time'
                                        />
                                    </FormGroup>
                                </td>
                                <td>
                                    {/*Campo hora de fin de descanso*/}
                                    <FormGroup>
                                        <Input
                                            id='horaFinDescanso'
                                            type='time'
                                        />
                                    </FormGroup>
                                </td>
                                <td>
                                    {/*Campo hora de salida*/}
                                    <FormGroup>
                                        <Input
                                            id='HoraSalida'
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
                                {props.listaDias.map((dia: {
                                    nombreDia: string,
                                    id: number
                                }) => {return(
                                    <th>{dia.nombreDia}</th>
                                )})}
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td>Descanso</td>
                                {props.listaDias.map((dia: {
                                    nombreDia: string,
                                    id: number
                                }, index: number) => {return(
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
                                                    "esDescanso"
                                                    + dia.nombreDia
                                                }
                                                defaultChecked={
                                                    diasDescanso[index]
                                                }
                                                onChange={(evento: SyntheticEvent) => {
                                                    const input = evento.target as HTMLButtonElement;

                                                    diasDescanso[
                                                        index
                                                    ] = input.checked

                                                    props.setListaDiasDescanso(diasDescanso);
                                                }}
                                            />
                                        </FormGroup>
                                    </td>
                                )})}
                            </tr>
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
};