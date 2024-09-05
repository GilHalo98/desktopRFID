import {
    numeroDiaANombreDia,
    msToTime
} from "../../../../utils/conversiones";

// Formatemos los datos para mostrarlos en el tracker.
const formatearDatosTracker = (datos: any[]) => {
    const datosFormateados: ItemTracker[] = [];

    datos.forEach((dato: {
        descripcion: string
        tipoReporte: number
        hora: string
    }) => {
        let color: "slate" | "gray" | "zinc" | "neutral" | "stone" | "red" | "orange" | "amber" | "yellow" | "lime" | "green" | "emerald" | "teal" | "cyan" | "sky" | "blue" | "indigo" | "violet" | "purple" | "fuchsia" | "pink" | "rose" = 'red';

        color = 'green';
        let tooltip: string = `${dato.descripcion} a las ${dato.hora}`;

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