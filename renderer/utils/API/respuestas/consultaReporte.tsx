import { DispositivoIoT } from "../modelos/dispositivoIoT"
import { Empleado } from "../modelos/empleado"
import { TipoReporte } from "../modelos/tipoReporte"
import { Zona } from "../modelos/zona"

export interface RespuestaConsultaReporte {
    id: number
    descripcionReporte: string
    fechaRegistroReporte: string
    fechaModificacionReporte: string
    idEmpleadoVinculado: number
    idRegistroDispositivoIoTVinculado: number
    idTipoReporteVinculado: number
    idRegistroZonaVinculada: number
    empleado: Empleado
    tipoReporte: TipoReporte
    dispositivoIoT: DispositivoIoT
    zona: Zona
};