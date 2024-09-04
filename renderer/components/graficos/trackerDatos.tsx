'use client'

// React.
import React from 'react';

// Componentes de tremor.
import {
    Tracker
} from '@tremor/react';

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