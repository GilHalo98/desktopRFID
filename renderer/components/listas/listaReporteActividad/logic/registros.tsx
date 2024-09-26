// Consulta de datos.
import {
    ConsultaDispositivo
} from "../../../../utils/API/interface/dispositivo";

import {
    ConsultaHorasTrabajadasDetalleActividadDispositivo
} from "../../../../utils/API/interface/reportes";

// Modelo de datos.
import { DispositivoIoT } from "../../../../utils/API/modelos/dispositivoIoT";

const ReporteHorasTrabajadasDetalleActividadDispositivo = (
    setReporte: Function,
    setTotalPaginas: Function,
    setEnCarga: Function,
    querry?: {
        limit?: number,
        offset?: number,
        idEmpleadoVinculado?: string,
        idDispositivoVinculado?: string,
        semanaReporte?: string,
        dia?: number
    },
    consultaConcatenada?: Function
) => {
    // Consultamos los dispositivos.
    return ConsultaHorasTrabajadasDetalleActividadDispositivo(
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
            setReporte(null);
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

const ConsultarNombreDispositivo = (
    setRegistro: Function,
    setEnCarga: Function,
    querry?: {
        limit?: number,
        offset?: number,
        id?: number,
        idZonaVinculada?: number,
        idTipoDispositivoVinculado?: number,
    },
    consultaConcatenada?: Function
) => {
    // Consultamos los dispositivos.
    return ConsultaDispositivo(
        (respuesta: any) => {
            setRegistro(respuesta.registros[0]);
        },
        querry,
        (error: any) => {
            console.log(error);
        },
        () => {
            setRegistro({} as DispositivoIoT);

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
    ReporteHorasTrabajadasDetalleActividadDispositivo,
    ConsultarNombreDispositivo
};