'use client'

// React.
import React from 'react';

// Componentes de reactstrap.
import {
    Button, ButtonGroup
} from 'reactstrap';

// Iconos usados.
import { MdEditDocument, MdDelete, MdRemoveRedEye } from "react-icons/md";
import { BiSolidMicrochip } from "react-icons/bi";

export default function BarraOpcionesRegistros(
    props: {
        idRegistro: number,
        indexRegistro: number,
        onEliminar: Function,
        onModificar: Function,
        onVisualizar: Function,
        onGuardarConfiguracion: Function | undefined
    }
) {
    // Renderiza el boton de exportar archivo.
    function renderizarGuardarConfiguracion() {
        if(!props.onGuardarConfiguracion) {
            return(<></>);
        }

        return(
            <Button
                className='botonIcono'
                color='primary'
                outline
                onClick={() => {
                    props.onGuardarConfiguracion(props.idRegistro, props.indexRegistro);
                }}
            >
                <BiSolidMicrochip/>
            </Button>
        );
    };

    return (
        <ButtonGroup size="sm">
            <Button
                className='botonIcono'
                color='info'
                outline
                onClick={() => {
                    props.onVisualizar(props.idRegistro, props.indexRegistro);
                }}
            >
                <MdRemoveRedEye/>
            </Button>

            <Button
                className='botonIcono'
                color='warning'
                outline
                onClick={() => {
                    props.onModificar(props.idRegistro, props.indexRegistro);
                }}
            >
                <MdEditDocument/>
            </Button>

            <Button
                className='botonIcono'
                color='danger'
                outline
                onClick={() => {
                    props.onEliminar(props.idRegistro, props.indexRegistro);
                }}
            >
                <MdDelete/>
            </Button>

            {renderizarGuardarConfiguracion()}
        </ButtonGroup>
    );
};