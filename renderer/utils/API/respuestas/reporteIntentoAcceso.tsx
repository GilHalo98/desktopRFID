import { Reporte } from "../modelos/reporte";
import { ReporteAcceso } from "../modelos/reporteAcceso";

export interface ReporteIntentoAcceso extends ReporteAcceso {
    reporte: Reporte
};