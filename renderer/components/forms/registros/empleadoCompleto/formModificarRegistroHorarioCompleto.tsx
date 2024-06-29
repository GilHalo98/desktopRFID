// Funcionalidad de react.
import React from 'react';

// Componentes de reacstrap.
import {
    Table,
    Alert,
    Input, Label,
    Form, FormGroup,
    Container, Row, Col, Button
} from 'reactstrap';

// Funcionalidad propia.
import {
    renderDiasSimilares,
    renderTablaDias
} from './logic/renders';

// Modelos de datos.
import {
    Horario
} from '../../../../utils/API/modelos/horario';

export default function FormModificarRegistroHorarioCompleto(
    props: {
        elementosOpciones: Horario[],
        onGuardarRegistro: Function,
        toggleModal: Function
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

    const [
        refresh,
        setRefresh
    ] = React.useState(false)

    // Lista de dias.
    const listaDias = [
        { nombreDia: 'Lunes', id: 0 },
        { nombreDia: 'Martes', id: 1 },
        { nombreDia: 'Miercoles', id: 2 },
        { nombreDia: 'Jueves', id: 3 },
        { nombreDia: 'Viernes', id: 4 },
        { nombreDia: 'Sabado', id: 5 },
        { nombreDia: 'Domingo', id: 6 }
    ]

    // Permite refrescar la vista.
    React.useEffect(() => {}, [refresh]);

    return(
        <Form onSubmit={(evento) => {
            evento.preventDefault();
            props.onGuardarRegistro(evento);
            props.toggleModal();
        }}>
            {/*Renderizamos la tabla de los dias laborales o la lista*/}
            {diasSimilares?
                renderDiasSimilares(
                    listaDias,
                    listaDiasDescanso,
                    refresh,
                    setRefresh
                ) : renderTablaDias(
                    listaDias,
                    listaDiasDescanso,
                    refresh,
                    setRefresh
                )
            }

            {/*Tiempo de tolerancia para checar en tiempo*/}
            <FormGroup>
                <Label for='tiempoTolerancia'>
                    Tiempo de tolerancia para checar sin retrazo
                </Label>

                <Input
                    id='tiempoTolerancia'
                    type='time'
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
                    onChange={(evento) => {
                        setDiasSimilares(evento.target.checked)
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
        </Form>
    );
};