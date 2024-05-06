'use client'

// React.
import React from 'react';

// Componentes de reactstrap.
import {
    Button, ButtonGroup
} from 'reactstrap';

// Iconos usados.
import { FaGear } from "react-icons/fa6";

export default function BarraAccionesLista(
    props: {
        onOpciones: Function
    }
) {
    // Renderiza el boton de opciones de la tabla.
    function renderizarOpciones() {
        if(!props.onOpciones) {
            return(<></>);
        }

        return(
            <Button
                className='botonIcono'
                outline
                color='warning'
                onClick={() => {
                    props.onOpciones();
                }}
            >
                <FaGear/>
            </Button>
        );
    };

    return (
        <ButtonGroup size="sm">
            {renderizarOpciones()}
        </ButtonGroup>
    );
};