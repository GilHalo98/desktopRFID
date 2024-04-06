'use client'

// React.
import React from 'react';

// Componentes de reactstrap.
import {
    Button, ButtonGroup
} from 'reactstrap';

// Iconos usados.
import { FaGear } from "react-icons/fa6";
import { BsDatabaseFillAdd } from "react-icons/bs";
import { TbReportAnalytics } from "react-icons/tb";
import { FaFileExport } from "react-icons/fa6";

export default function BarraAccionesTabla(
    props: {
        onExportarArchivo: Function | undefined,
        onGenerarReporte: Function | undefined,
        onAddRegistro: Function | undefined,
        onOpciones: Function | undefined
    }
) {
    // Renderiza el boton de exportar archivo.
    function renderizarExportarArchivo() {
        if(!props.onExportarArchivo) {
            return(<></>);
        }

        return(
            <Button
                className='botonIcono'
                outline
                color='warning'
                onClick={() => {
                    props.onExportarArchivo();
                }}
            >
                <FaFileExport/>
            </Button>
        );
    };

    // Renderiza el boton de generar reportes.
    function renderizarGenerarReporte() {
        if(!props.onGenerarReporte) {
            return(<></>);
        }

        return(
            <Button
                className='botonIcono'
                outline
                color='warning'
                onClick={() => {
                    props.onGenerarReporte()
                }}
            >
                <TbReportAnalytics/>
            </Button>
        );
    };

    // Renderiza el boton de agrear registro.
    function renderizarAddRegistro() {
        if(!props.onAddRegistro) {
            return(<></>);
        }

        return(
            <Button
                className='botonIcono'
                outline
                color='warning'
                onClick={() => {
                    props.onAddRegistro();
                }}
            >
                <BsDatabaseFillAdd/>
            </Button>
        );
    };

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
            {renderizarExportarArchivo()}

            {renderizarGenerarReporte()}

            {renderizarAddRegistro()}

            {renderizarOpciones()}
        </ButtonGroup>
    );
};