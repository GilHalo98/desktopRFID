// funcionalidad de React.
import React, { SyntheticEvent } from 'react';

// Componentes de reacstrap.
import {
    Input, Label,
    Form, FormGroup,
    Container, Row, Col, Button, Spinner
} from 'reactstrap';

// Funcionalidad propia.
import {
    renderBarraBotones
} from './logic/renders';

// Modelo de datos.
import { HorarioCompleto } from '../../../../utils/API/respuestas/horarioCompleto';
import FormTablaDias from '../tablaDias/formTablaDias';
import { DiaLaboral } from '../../../../utils/API/modelos/diaLaboral';
import FormListaDias from '../listaDias/formListaDias';

export default function FormModificarRegistroHorarioCompleto(
    props: {
        registro: HorarioCompleto,
        onGuardarRegistro: Function,
        toggleModal: Function,
    }
) {
    // Hook de los datos a registrar.
    const [
        listaDiasDescanso,
        setListaDiasDescanso
    ] = React.useState([
        false,
        false,
        false,
        false,
        false,
        false,
        false
    ]);

    // Hook para indicar si todos los dias tendran horario similar.
    const [
        diasSimilares,
        setDiasSimilares
    ] = React.useState(false);

    // Lista de dias.
    const listaDias = [
        { nombreDia: 'Lunes', id: 0 },
        { nombreDia: 'Martes', id: 1 },
        { nombreDia: 'Miercoles', id: 2 },
        { nombreDia: 'Jueves', id: 3 },
        { nombreDia: 'Viernes', id: 4 },
        { nombreDia: 'Sabado', id: 5 },
        { nombreDia: 'Domingo', id: 6 }
    ];

    const renderHorario = () => {
        if(diasSimilares) {
            return <FormListaDias
                listaDias={listaDias}
                listaDiasDescanso={listaDiasDescanso}
                setListaDiasDescanso={setListaDiasDescanso}
                registros={props.registro.diaLaborals}
            />;
        }

        return <FormTablaDias
            listaDias={listaDias}
            listaDiasDescanso={listaDiasDescanso}
            setListaDiasDescanso={setListaDiasDescanso}
            registros={props.registro.diaLaborals}
        />;
    };

    if(!props.registro) {
        return "";
    }

    // Una vez recuperados los datos, mostramos los valores default.
    return(
        <Form onSubmit={(evento: SyntheticEvent) => {
            evento.preventDefault();
            props.toggleModal();

            props.onGuardarRegistro(evento);
        }}>
            <Container>
                <Row>
                    {/*Tiempo de tolerancia para checar en tiempo*/}
                    <FormGroup>
                        <Label for='tiempoTolerancia'>
                            Tiempo de tolerancia para checar sin retrazo
                        </Label>

                        <Input
                            id='tiempoTolerancia'
                            type='time'
                            defaultValue={props.registro.tolerancia}
                        />
                    </FormGroup>

                    {/*
                        Campo que indica si todos los dias tienen
                        la misma hora de entrada y salida.
                    */}
                    <FormGroup
                        check
                        style={{color: 'white'}}
                    >
                        <Input
                            type="checkbox"
                            id="horarioSimilar"
                            onChange={(evento: SyntheticEvent) => {
                                const input = evento.target as HTMLButtonElement;

                                setDiasSimilares(input.checked)
                            }}
                        />

                        <Label
                            for="horarioSimilar"
                            check
                        >
                            Horario similar para toda la semana
                        </Label>
                    </FormGroup>

                    <br/>

                    {renderHorario()}

                    {/* Renderizamos la barra de botones. */}
                    {renderBarraBotones(
                        props.toggleModal
                    )}
                </Row>
            </Container>
        </Form>
    );
};