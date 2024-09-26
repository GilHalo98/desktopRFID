// Consultas de datos.
import {
    ConsultaHorasTrabajadasDetalleAccesosZona
} from "../../../../utils/API/interface/reportes"

import {
    ConsultaZona
} from "../../../../utils/API/interface/zona";

// Modelo de datos.
import {
    ReporteAccesosDetalle
} from "../../../../utils/API/respuestas/reporteAccesosDetalle";

import {
    Zona
} from "../../../../utils/API/modelos/zona";

const ReporteHorasTrabajadasDetalleAccesosZona = (
    setReporte: Function,
    setTotalPaginas: Function,
    setEnCarga: Function,
    querry?: {
        limit?: number,
        offset?: number,
        idEmpleadoVinculado?: string,
        idZonaVinculada?: string,
        semanaReporte?: string,
        dia?: number
    },
    consultaConcatenada?: Function
) => {
    // Consultamos los dispositivos.
    return ConsultaHorasTrabajadasDetalleAccesosZona(
        (respuesta: any) => {
            setReporte(respuesta.reporte);

            // Calculamos el total de paginas.
            setTotalPaginas(Math.ceil(
                respuesta.totalRegistros / querry.limit
            ));
        },
        querry,
        (error: any) => {
            console.log(error);
        },
        () => {
            setReporte([] as ReporteAccesosDetalle []);
            setTotalPaginas(0);
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

const ConsultarNombreZona = (
    setRegistro: Function,
    setEnCarga: Function,
    querry?: {
        limit?: number,
        offset?: number,
        id?: number,
        nombreZona?: string,
        descripcionZona?: string,
        bitZona?: number
    },
    consultaConcatenada?: Function
) => {
    // Consultamos los dispositivos.
    return ConsultaZona(
        (respuesta: any) => {
            setRegistro(respuesta.registros[0]);
        },
        querry,
        (error: any) => {
            console.log(error);
        },
        () => {
            setRegistro({} as Zona);

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
}

export {
    ReporteHorasTrabajadasDetalleAccesosZona,
    ConsultarNombreZona
};