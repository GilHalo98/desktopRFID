'use client'

// React.
import React from 'react';

// Componentes de reactstrap.
import {
    Card, CardBody, CardFooter, CardHeader, CardTitle
} from 'reactstrap';

// Componentes de tremor.
import {
    DonutChart,
    Legend
} from '@tremor/react';

// Componentes propios.
import DisplayHorasMaquina from '../displays/displayHorasMaquina';
import { ReporteActividadMaquina } from '../../utils/API/respuestas/reporteActividadMaquina';

export default function GraficoActividadMaquina(
    props: {
        tituloGrafico: string,
        reporte: ReporteActividadMaquina
    }
) {
    const datos: {
        name: string,
        tiempo: number
    }[] = [
        {
            name: 'Tiempo activo',
            tiempo: props.reporte.tiempoActividadTotal
        },
        {
            name: 'Tiempo inactivo',
            tiempo: props.reporte.tiempoInactivoTotal
        }
    ];

    return(
        <Card color="dark">
            <CardHeader
                style={{textAlign: 'center'}}
                className='text-white'
            >
                {props.tituloGrafico}
            </CardHeader>

            <CardBody>
                <DonutChart
                    style={{"height": "50vh"}}
                    data={datos}
                    colors={['green', 'gray']}
                    category="tiempo"
                    variant='donut'
                    index="name"
                    showLabel={false}
                />

                <br/>

                <Legend
                    categories={datos.map((dato: any) => {
                        return dato.name;
                    })}
                    colors={['green', 'gray']}
                />

                <br/>

                <DisplayHorasMaquina
                    tiempoActivo={datos[0].tiempo}
                    tiempoInactivo={datos[1].tiempo}
                />
            </CardBody>
        </Card>
    );
};
