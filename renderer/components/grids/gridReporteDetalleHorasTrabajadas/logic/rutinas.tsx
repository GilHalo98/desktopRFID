// Funciones de tiempo.
import {
    fechaStrATiempo,
    a12HorasTiempo
} from "../../../../utils/conversiones";

// Modelo de datos.
import {
    Reporte
} from "../../../../utils/API/modelos/reporte";

// Formatemos los datos para mostrarlos en el tracker.
const formatearDatosTracker = (datos: Reporte[]) => {
    const datosFormateados: ItemTracker[] = [];

    datos.forEach((dato: Reporte) => {
        let color: "slate" | "gray" | "zinc" | "neutral" | "stone" | "red" | "orange" | "amber" | "yellow" | "lime" | "green" | "emerald" | "teal" | "cyan" | "sky" | "blue" | "indigo" | "violet" | "purple" | "fuchsia" | "pink" | "rose";

        const tiempo = a12HorasTiempo(fechaStrATiempo(
            dato.fechaRegistroReporte
        ));

        let tooltip: string = `${
            dato.descripcionReporte
        } a las ${tiempo}`;

        color = 'gray';

        switch (dato.idTipoReporteVinculado) {
            case 1:
                // Acceso garantizado
                color= 'gray';
                break;

            case 2:
                // Acceso negado
                color= 'red';
                break;

            case 3:
                // Salida de zona
                color= 'gray';
                break;

            case 4:
                // Tarjeta invalida
                color= 'yellow';
                break;

            case 5:
                // Datos de tarjeta inexistente
                color= 'red';
                break;

            case 6:
                // Credenciales invalidas
                color = 'red';
                break;

            case 7:
                // Dispositivo activado
                color = 'gray';
                break;

            case 8:
                // Dispositivo pausado
                color = 'gray';
                break;
        
            case 9:
                // Actividad iniciada
                color = 'gray';
                break;

            case 10:
                // Actividad finalizada
                color = 'gray';
                break;
        
            case 11:
                // Credenciales invialidas para inciar actividad
                color = 'red';
                break;

            case 12:
                // Chequeo de entrada
                color = 'green';
                break;

            case 13:
                // Chequeo de entrada con retraso
                color = 'yellow';
                break;
        
            case 14:
                // Chequeo de salida
                color = 'green';
                break;

            case 15:
                // Chequeo de salida con extras
                color = 'blue';
                break;

            case 16:
                // Chequeo de inicio de descanso
                color = 'green';
                break;

            case 17:
                // Chequeo de fin de descanso
                color = 'green';
                break;

            default:
                break;
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