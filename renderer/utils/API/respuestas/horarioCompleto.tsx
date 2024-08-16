import { DiaLaboral } from "../modelos/diaLaboral"

export interface HorarioCompleto {
    id: number
    descripcionHorario: string
    tolerancia: string
    fechaRegistroHorario: any
    fechaModificacionHorario: any
    idEmpleadoVinculado: number
    diaLaborals: DiaLaboral[]
};