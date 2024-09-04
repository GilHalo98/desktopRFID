import {
    numeroDiaANombreDia,
    msToTime
} from "../../../../utils/conversiones";

// Formatemos los datos para mostrarlos en el tracker.
const formatearDatosTracker = (datos: any[]) => {
    const datosFormateados: ItemTracker[] = [];

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

export {
    formatearDatosTracker
};