import React from 'react';

// Componentes de tremor.
import {
    Tracker, Card
} from '@tremor/react';
import { msToTime, numeroDiaANombreDia } from '../../utils/conversiones';
import { HorasTrabajadas } from '../../utils/API/respuestas/horasTrabajadas';

interface Tracker {
    color: "slate" | "gray" | "zinc" | "neutral" | "stone" | "red" | "orange" | "amber" | "yellow" | "lime" | "green" | "emerald" | "teal" | "cyan" | "sky" | "blue" | "indigo" | "violet" | "purple" | "fuchsia" | "pink" | "rose";
    tooltip: string;
};

export default function DisplayHorasTrabajadas(
    props: {
        registros: HorasTrabajadas[],
    }
) {

    // Formatemos los datos para mostrarlos en el tracker.
    const formaterDatosTracker = (datos: HorasTrabajadas[]) => {
        const datosFormateados: Tracker[] = [];

        datos.forEach((dato: {
            dia: number,
            esDescanso: boolean,
            falto: boolean,
            llegoTarde: boolean,
            salioTarde: boolean,
            tiempoDescanso: number,
            tiempoTrabajo: number
        }) => {
            let color: "slate" | "gray" | "zinc" | "neutral" | "stone" | "red" | "orange" | "amber" | "yellow" | "lime" | "green" | "emerald" | "teal" | "cyan" | "sky" | "blue" | "indigo" | "violet" | "purple" | "fuchsia" | "pink" | "rose" = 'red';
            let tooltip: string = 'No hay datos registrados';

            if(dato.esDescanso) {
                color = 'gray';
                tooltip = numeroDiaANombreDia(dato.dia) + ' descanso';
                if(dato.tiempoTrabajo > 0) {
                    tooltip += ' laborado: ' + msToTime(
                        dato.tiempoTrabajo
                    );
                }

            } else if(dato.falto) {
                color = 'red'
                tooltip = numeroDiaANombreDia(dato.dia) + ' falto'

            } else if(dato.llegoTarde) {
                color = 'yellow'
                tooltip = numeroDiaANombreDia(
                    dato.dia
                ) + ' llego tarde: ' + msToTime(dato.tiempoTrabajo);

            } else if(dato.salioTarde) {
                color = 'blue'
                tooltip = numeroDiaANombreDia(
                    dato.dia
                ) + ' salio tarde: ' + msToTime(dato.tiempoTrabajo);

            } else if(dato.tiempoTrabajo > 0) {
                color = 'green';
                tooltip = numeroDiaANombreDia(
                    dato.dia
                ) + ': ' + msToTime(dato.tiempoTrabajo);
            }

            datosFormateados.push({
                color: color,
                tooltip: tooltip
            })
        });

        return datosFormateados;
    };

    if(!props.registros) {
        return "";
    }

    return <Tracker
        data={formaterDatosTracker(props.registros)}
    />;
    
};
