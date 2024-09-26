// Consulta de datos.
import {
    ConsultaHorasTrabajadasDetalleIntentoActividad
} from "../../../../utils/API/interface/reportes"

// Modelo de datos.
import {
    ReporteIntentoActividad
} from "../../../../utils/API/respuestas/reporteIntentoActividad";

const ReporteHorasTrabajadasDetalleIntentoActividad = (
    setRegistros: Function,
    setTotalPaginas: Function,
    setEnCarga: Function,
    querry?: {
        limit?: number,
        offset?: number,
        idEmpleadoVinculado?: string,
        semanaReporte?: string,
        dia?: number
    },
    consultaConcatenada?: Function
) => {
    // Consultamos los dispositivos.
    return ConsultaHorasTrabajadasDetalleIntentoActividad(
        (respuesta: any) => {
            setRegistros(respuesta.registros);

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
            setRegistros([] as ReporteIntentoActividad []);
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

export {
    ReporteHorasTrabajadasDetalleIntentoActividad
};