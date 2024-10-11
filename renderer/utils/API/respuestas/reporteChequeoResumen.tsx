import {
    Reporte
} from "../modelos/reporte"

import {
    ReporteChequeo
} from "../modelos/reporteChequeo"

export interface ReporteChequeoResumen {
    entrada: ReporteChequeoVinculada
    salida: ReporteChequeoVinculada
    tiempoLaboralTotal: number
};

export interface ReporteChequeoVinculada extends ReporteChequeo {
    reporte: Reporte
}