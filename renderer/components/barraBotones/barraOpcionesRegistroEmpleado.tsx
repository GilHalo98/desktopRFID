'use client'

// React.
import React from 'react';

// Componentes de reactstrap.
import {
    Button, ButtonGroup
} from 'reactstrap';

// Iconos usados.
import { MdEditDocument, MdDelete, MdRemoveRedEye } from "react-icons/md";
import { FaAddressCard } from "react-icons/fa6";

export default function BarraOpcionesRegistroEmpleado(
    props: {
        onEliminar: Function,
        onModificar: Function,
        onVisularizar: Function,
        onGuardarDatos: Function
    }
) {
    function renderizarEliminar() {
        if(props.onEliminar) {
            return(
                <Button
                className='botonIcono'
                color='danger'
                outline
                onClick={() => {
                    props.onEliminar();
                }}
            >
                <MdDelete/>
            </Button>
            );
        }
    };

    function renderizarModificar() {
        if(props.onModificar) {
            return(
                <Button
                className='botonIcono'
                color='warning'
                outline
                onClick={() => {
                    props.onModificar();
                }}
            >
                <MdEditDocument/>
            </Button>
            );
        }
    };

    function renderizarVisualizar() {
        if(props.onVisularizar) {
            return(
                <Button
                className='botonIcono'
                color='info'
                outline
                onClick={() => {
                    props.onVisularizar();
                }}
            >
                <MdRemoveRedEye/>
            </Button>
            );
        }
    };

    function renderizarGuardarDatos() {
        if(props.onGuardarDatos) {
            return(
                <Button
                className='botonIcono'
                color='primary'
                outline
                onClick={() => {
                    props.onGuardarDatos();
                }}
            >
                <FaAddressCard/>
            </Button>
            );
        }
    };

    return (
        <ButtonGroup>

{renderizarEliminar()}
{renderizarModificar()}
{renderizarVisualizar()}
{renderizarGuardarDatos()}
        </ButtonGroup>
    );
};