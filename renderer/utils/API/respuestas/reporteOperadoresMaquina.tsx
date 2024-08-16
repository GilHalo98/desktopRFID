import { Empleado } from "../modelos/empleado"
import { Reporte } from "../modelos/reporte"

export interface ReporteOperadoresMaquina {
    id: number
    fechaRegistroReporteActividad: string
    fechaModificacionReporteActividad: any
    idReporteVinculado: number
    idEmpleadoVinculado: number
    idDispositivoVinculado: number
    reporte: Reporte
    empleado: Empleado
};