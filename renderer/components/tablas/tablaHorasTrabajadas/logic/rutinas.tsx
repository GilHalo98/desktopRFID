// Funcionalidad
import {
    numeroDiaANombreDia,
    msToTime,
    fechaStrATiempo,
    a12HorasTiempo,
    separarTiempo
} from "../../../../utils/conversiones";

// Modelo de datos.
import {
    HorasTrabajadas
} from "../../../../utils/API/respuestas/horasTrabajadas";

// Formatemos los datos para mostrarlos en el tracker.
const formatearDatosTracker = (datos: HorasTrabajadas[]) => {
    const datosFormateados: ItemTracker[] = [];

    datos.forEach((dato: HorasTrabajadas) => {
        let color: "slate" | "gray" | "zinc" | "neutral" | "stone" | "red" | "orange" | "amber" | "yellow" | "lime" | "green" | "emerald" | "teal" | "cyan" | "sky" | "blue" | "indigo" | "violet" | "purple" | "fuchsia" | "pink" | "rose" = 'gray';
        let tooltip: string = 'Sin Registro';

        if(!dato.diaFueraDeRango) {
            const tiempoEnTrabajo: string = separarTiempo(msToTime(
                dato.tiempoTrabajo
            ));
    
            const nombreDia: string = numeroDiaANombreDia(dato.dia);
    
            if(dato.esDescanso) {
                color = dato.tiempoTrabajo > 0? 'lime' : 'gray';
                tooltip = `${nombreDia} descanso${
                    dato.tiempoTrabajo > 0?
                        ` laborado: ${tiempoEnTrabajo}` : ''
                }`;
    
            } else if(dato.falto) {
                color = 'red'
                tooltip = `${nombreDia} falto`;
    
            } else if(dato.llegoTarde) {
                color = 'yellow'
                tooltip = `${nombreDia} llego tarde: ${tiempoEnTrabajo}`;
    
            } else if(dato.salioTarde) {
                color = 'blue'
                tooltip = `${nombreDia} salio tarde: ${tiempoEnTrabajo}`;
    
            } else if(dato.tiempoTrabajo > 0) {
                color = 'green';
                tooltip = `${nombreDia}: ${tiempoEnTrabajo}`;

            } else if(!dato.detalle.entrada || !dato.detalle.salida) {
                color = 'orange';
                tooltip = `No realizo registro de chequeo de ${
                    !dato.detalle.entrada?
                        'entrada' : 'salida'
                }`;
            }
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