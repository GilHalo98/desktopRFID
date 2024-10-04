export interface ReporteHorasTrabajadas {
    id: number
    nombres: string
    apellidoPaterno: string
    apellidoMaterno: string
    idImagenVinculada: number
    idRolVinculado: number
    tiempoTrabajoTotal: number
    horasTrabajadas?: HorasTrabajadas[]
};

export interface HorasTrabajadas {
    dia: number
    detalle: Detalle
    tiempoTrabajo: number
    tiempoDescanso: number
    llegoTarde: boolean
    salioTarde: boolean
    esDescanso: boolean
    falto: boolean
};

export interface Detalle {
    entrada?: string
    inicioDescanso?: string
    finDescanso?: string
    salida?: string
};  