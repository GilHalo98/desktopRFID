// Importamos la interfaz con la API.
import {
    ConsultaDispositivo
} from "../../../../utils/API/interface/dispositivo";

import {
    ConsultaHistorialActividadMaquina,
    ConsultaHistorialOperadoresMaquina
} from "../../../../utils/API/interface/reportes";

// Consultamos los registros de los dispositivos.
const consultarRegistrosDispositivos = (
    setListaRegistros: Function,
    setEnCarga: Function,
    consultaConcatenada?: Function
) => {
    // Consultamos los dispositivos.
    return ConsultaDispositivo(
        (respuesta: any) => {
            setListaRegistros(respuesta.registros);
        },
        {
            idTipoDispositivoVinculado: 3
        },
        (error: any) => {
            console.log(error);
        },
        () => {
            setListaRegistros(null);
            setEnCarga(true);
        },
        () => {
            if(!consultaConcatenada) {
                setEnCarga(false);
            } else {
                consultaConcatenada();
            }
        }
    );
};

// Consultamos el reporte de actividad de la maquina.
const consultarReporteActividadMaquina = (
    setListaRegistros: Function,
    setEnCarga: Function,
    querry: {
        id?: number,
        descripcionDispositivo?: string,
        semanaReporte?: string
    },
    consultaConcatenada?: Function
) => {
    // Consultamos los dispositivos.
    return ConsultaHistorialActividadMaquina(
        (respuesta: any) => {
            setListaRegistros({
                tiempoActividadTotal: respuesta.tiempoActividadTotal,
                tiempoInactivoTotal: respuesta.tiempoInactivoTotal
            });
        },
        querry,
        (error: any) => {
            console.log(error);
        },
        () => {
            setListaRegistros(null);
            setEnCarga(true);
        },
        () => {
            if(!consultaConcatenada) {
                setEnCarga(false);
            } else {
                consultaConcatenada();
            }
        }
    );
};

// Consultamos el reporte de los ultimos N operadores,
const consultarReporteOperadoresMaquina = (
    setListaRegistros: Function,
    setEnCarga: Function,
    querry: {
        limit?: number,
        offset?: number,
        id?: number,
        descripcionDispositivo?: string,
        semanaReporte?: string
    },
    consultaConcatenada?: Function
) => {
    // Consultamos los dispositivos.
    return ConsultaHistorialOperadoresMaquina(
        (respuesta: any) => {
            setListaRegistros(respuesta.registros);
        },
        querry,
        (error: any) => {
            console.log(error);
        },
        () => {
            setListaRegistros(null);
            setEnCarga(true);
        },
        () => {
            if(!consultaConcatenada) {
                setEnCarga(false);
            } else {
                consultaConcatenada();
            }
        }
    );
};

export {
    consultarRegistrosDispositivos,
    consultarReporteActividadMaquina,
    consultarReporteOperadoresMaquina
};
