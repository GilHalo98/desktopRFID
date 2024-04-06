import { AccionDispositivo } from "../modelos/accionDispositivo"
import { TipoDispositivo } from "../modelos/tipoDispositivo"
import { Zona } from "../modelos/zona"

export interface RespuestaConsultaDispositivos {
    id: number
    descripcionDispositivo: string
    fechaRegistroIoT: string
    fechaModificacionIoT: any
    idZonaVinculada: number
    idTipoDispositivoVinculado: number
    zona: Zona
    tipoDispositivo: TipoDispositivo
    accionDispositivos: AccionDispositivo
};  