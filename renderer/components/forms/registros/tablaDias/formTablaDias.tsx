// funcionalidad de React.
import React, { SyntheticEvent } from 'react';

// Componentes de reacstrap.
import {
    Input,
    FormGroup,
    Table
} from 'reactstrap';

// Funcionalidad propia.

// Modelo de datos.
import {
    DiaLaboral
} from '../../../../utils/API/modelos/diaLaboral';

export default function FormTablaDias(
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
    const [
        diasDescanso,
        setDiasDescanso
    ] = React.useState(props.registros.map((registro: DiaLaboral) => {
        return registro.esDescanso;
    }));

    // Hook para refrescar el componente.
    const[
        refresh,
        setRefresh
    ] = React.useState(false);

    // Mapeamos los registros a una lista.
    const registros = props.registros? props.registros : [];
    
    // Use effect que refresca la vista.
    React.useEffect(() => {
        console.log('refresh');
    }, [refresh]);

    return(
        <Table hover dark responsive>
            {/* Cabecera de la tabla. */}
            <thead>
                <th/>
                <th>Es descanso</th>
                <th>Hora de entrada</th>
                <th>Hora de inicio de descanso</th>
                <th>Hora de termino de descanso</th>
                <th>Hora de salida</th>
            </thead>

            {/* Renderizamos el contenido de la tabla. */}
            <tbody>
                {props.listaDias.map((dia: {
                    nombreDia: string,
                    id: number
                }, index: number) => {
                    // Registro de dia laboral correspondiente.
                    let registroDiaLaboral: DiaLaboral = Object();

                    // Buscamos el registro del dia correspondiente.
                    registros.map((registro: DiaLaboral) => {
                        if(registro.dia == dia.id) {
                            registroDiaLaboral = registro;
                        }
                    });

                    return(
                        <tr>
                            <th>{dia.nombreDia}</th>
                            <td>
                                {/* Campo que indica si el dia es descansado */}
                                <FormGroup
                                    check
                                    style={{
                                        color: 'white',
                                        paddingLeft: '50%'
                                    }}
                                >
                                    <Input
                                        type="checkbox"
                                        id={"esDescanso" + dia.nombreDia}
                                        defaultChecked={
                                            diasDescanso[index]
                                        }
                                        onChange={(evento: SyntheticEvent) => {
                                            const input = evento.target as HTMLInputElement;

                                            diasDescanso[
                                                index
                                            ] = input.checked;

                                            setDiasDescanso(diasDescanso);

                                            props.setListaDiasDescanso(
                                                diasDescanso
                                            );

                                            setRefresh(!refresh);
                                        }}
                                    />
                                </FormGroup>
                            </td>

                            {/* Renderizamos los campos de las horas. */}
                            <td>
                                {/*Campo hora de entrada*/}
                                <FormGroup>
                                    <Input
                                        id={'horaEntrada' + dia.nombreDia}
                                        type='time'
                                        disabled={
                                            diasDescanso[index]
                                        }
                                        defaultValue={
                                            registroDiaLaboral.horaEntrada
                                        }
                                    />
                                </FormGroup>
                            </td>

                            <td>
                                {/*Campo hora de incio de descanso*/}
                                <FormGroup>
                                    <Input
                                        id={
                                            'horaSalidaDescanso'
                                            + dia.nombreDia
                                        }
                                        type='time'
                                        disabled={
                                            diasDescanso[index]
                                        }
                                        defaultValue={
                                            registroDiaLaboral.horaSalidaDescanso
                                        }
                                    />
                                </FormGroup>
                            </td>

                            <td>
                                {/*Campo hora de fin de descanso*/}
                                <FormGroup>
                                    <Input
                                        id={
                                            'horaEntradaDescanso'
                                            + dia.nombreDia
                                        }
                                        type='time'
                                        disabled={
                                            diasDescanso[index]
                                        }
                                        defaultValue={
                                            registroDiaLaboral.horaEntradaDescanso
                                        }
                                    />
                                </FormGroup>
                            </td>

                            <td>
                                {/*Campo hora de salida*/}
                                <FormGroup>
                                    <Input
                                        id={'horaSalida' + dia.nombreDia}
                                        type='time'
                                        disabled={
                                            diasDescanso[index]
                                        }
                                        defaultValue={
                                            registroDiaLaboral.horaSalida
                                        }
                                    />
                                </FormGroup>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </Table>
    );
};