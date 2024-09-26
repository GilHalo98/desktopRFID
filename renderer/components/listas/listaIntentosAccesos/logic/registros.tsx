// Consulta de datos.
import {
    ConsultaHorasTrabajadasDetalleIntentosAccesos
} from "../../../../utils/API/interface/reportes"

// Modelo de datos.
import {
    ReporteIntentoAcceso
} from "../../../../utils/API/respuestas/reporteIntentoAcceso";

// Consulta los intentos de acceso del empleado a diferentes zonas.
const ReporteHorasTrabajadasDetalleIntentosAccesos = (
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
    return ConsultaHorasTrabajadasDetalleIntentosAccesos(
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
            setRegistros([] as ReporteIntentoAcceso []);
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
    ReporteHorasTrabajadasDetalleIntentosAccesos
};