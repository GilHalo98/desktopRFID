'use client'

// React.
import React from 'react';

// Componentes de tremor.
import {
    Tracker
} from '@tremor/react';

// Modelo de datos.
import {
    Reporte
} from '../../utils/API/modelos/reporte';

export default function TrackerDatos (
    props: {
        registros: any[]
        formaterDatosTracker: Function
    }
) {
    if(!props.registros) {
        return <></>;
    }

    return <Tracker
        data={props.formaterDatosTracker(props.registros)}
    />;
};