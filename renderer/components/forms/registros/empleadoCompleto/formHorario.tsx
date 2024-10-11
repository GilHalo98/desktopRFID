// funcionalidad de React.
import React, { SyntheticEvent } from 'react';

// Componentes de reacstrap.
import {
    Input, Label, FormGroup,
    Container, Row, Col
} from 'reactstrap';

// Componentes propios.
import FormTablaDias from './formTablaDias';
import FormListaDiasSimilares from './formListaDiasSimilares';

// Desempaquetado de datos.
import {
    desempaquetarDiasDescanso
} from './logic/desempaquetado';

// Modelo de datos.
import {
    HorarioCompleto
} from '../../../../utils/API/respuestas/horarioCompleto';

import {
    DiaLaboral
} from '../../../../utils/API/modelos/diaLaboral';

export default function FormRegistroHorario(
    props: {
        registro?: HorarioCompleto
    }
) {
    // Hooks de los datos del usuario.
    const[
        registroHorario,
        setRegistroHorario
    ] = React.useState(
        !props.registro?
            {} as HorarioCompleto : props.registro
    );

    // Hook que indica si el horario similar para toda la semana.
    const [
        diasSimilares,
        setDiasSimilares
    ] = React.useState(false);

    // Hook con lista de los dias de descansos registrados.
    const [
        listaDiasDescanso,
        setListaDiasDescanso
    ] = React.useState(
        desempaquetarDiasDescanso(
            !props.registro?
                undefined : props.registro.diaLaborals
        )
    );

    return(<>
        {/*Tiempo de tolerancia para checar en tiempo*/}
        <FormGroup>
            <Label for='tiempoToleranciaHorario'>
                Tiempo de tolerancia para checar sin retrazo
            </Label>

            <Input
                id='tiempoToleranciaHorario'
                type='time'
                defaultValue={registroHorario.tolerancia}
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
                id="diasSimilaresHorario"
                onChange={(evento: SyntheticEvent) => {
                    const input = evento.target as HTMLInputElement;

                    setDiasSimilares(input.checked)
                }}
            />

            <Label
                for="diasSimilaresHorario"
                check
            >
                Horario similar para toda la semana
            </Label>
        </FormGroup>

        {/* Renderizamos el horario */}
        {diasSimilares?
            <FormListaDiasSimilares
                diasDescanso={listaDiasDescanso}
                setDiasDescanso={setListaDiasDescanso}
            /> : <FormTablaDias
                diasDescanso={listaDiasDescanso}
                setDiasDescanso={setListaDiasDescanso}
                registro={props.registro}
            />
        }
    </>);
};