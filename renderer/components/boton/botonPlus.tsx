'use client'
import React, { ReactComponentElement } from 'react';

// Componentes de React.
import {
    Button,
    UncontrolledTooltip
} from 'reactstrap';

// Para renderizar iconos.
import Icon from '@mdi/react';

export default function BotonPlus(
    props: {
        texto: string,
        icono?: string,
        dimencionesIcono?: number
        mostrarTooltip?: boolean,
        ocultarTexto?: boolean
    }
) {
    // Extraemos las propiedades del componente.
    const texto = props.texto;

    const icono = props.icono;

    const dimencionesIcono = props.dimencionesIcono

    const mostrarTooltip = props.mostrarTooltip? true : false;

    const ocultarTexto = props.ocultarTexto? true : false;

    const renderIcono = () => {
        return(icono?
            <Icon className='iconoBoton'
                path={icono}
                size={dimencionesIcono? dimencionesIcono : 1}
            /> : null
        );
    };

    return(
        <Button>
            {renderIcono()}
            {ocultarTexto? null : texto}
        </Button>
    );
};