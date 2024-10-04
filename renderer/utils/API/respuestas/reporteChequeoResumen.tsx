import {
    Reporte
} from "../modelos/reporte"

import {
    ReporteChequeo
} from "../modelos/reporteChequeo"

export interface ReporteChequeoResumenCompleto {
    entrada: ReporteChequeoVinculada
    salida: ReporteChequeoVinculada
}

export interface ReporteChequeoResumen {
    a: ReporteChequeoVinculada
    b: ReporteChequeoVinculada
};

export interface ReporteChequeoVinculada extends ReporteChequeo {
    reporte: Reporte
}