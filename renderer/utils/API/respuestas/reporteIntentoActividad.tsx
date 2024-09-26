import { Reporte } from "../modelos/reporte";
import { ReporteActividad } from "../modelos/reporteActividad";

export interface ReporteIntentoActividad extends ReporteActividad {
    reporte: Reporte
};