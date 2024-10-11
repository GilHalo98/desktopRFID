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

export default function FormTablaDias(
    props: {
        diasDescanso: boolean[]
        setDiasDescanso: Function
        registro?: HorarioCompleto
    }
) {
    // Hook de los dias de descanso.
    const [
        registroHorario,
        setRegistroHorario
    ] = React.useState(
        !props.registro?
            {} as HorarioCompleto : props.registro
    );

    // Lista con los dias de la semana.
    const dias = [1, 2, 3, 4, 5, 6, 7];

    return(<>
        <Table hover dark responsive>
            <thead>
                <th/>
                <th>Es descanso</th>
                <th>Hora de entrada</th>
                <th>Hora de salida</th>
            </thead>

            <tbody>
                {dias.map((dia: number, index: number) => {
                    const nombreDia: string = numeroDiaANombreDia(dia);

                    const registroDia: DiaLaboral = !registroHorario.diaLaborals?
                        undefined : registroHorario.diaLaborals[
                            index
                        ];

                    const defaultEntrada: string = !registroDia?
                        undefined : registroDia.horaEntrada;

                    const defaultSalida: string = !registroDia?
                        undefined : registroDia.horaSalida;

                    return(
                        <tr>
                            {/* Nombre del dia de la semana */}
                            <th>{nombreDia}</th>

                            {/* Campo que indica si el dia es descansado */}
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
                                        id={"esDescansoHorario" + nombreDia}
                                        defaultChecked={
                                            props.diasDescanso[index]
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

                            {/* Campo hora de entrada */}
                            <td>
                                <FormGroup>
                                    <Input
                                        id={'horaEntradaHorario' + nombreDia}
                                        type='time'
                                        disabled={props.diasDescanso[index]}
                                        defaultValue={defaultEntrada}
                                    />
                                </FormGroup>
                            </td>

                            {/* Campo hora de salida */}
                            <td>
                                <FormGroup>
                                    <Input
                                        id={'horaSalidaHorario' + nombreDia}
                                        type='time'
                                        disabled={props.diasDescanso[index]}
                                        defaultValue={defaultSalida}
                                    />
                                </FormGroup>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </Table>
    </>);
};