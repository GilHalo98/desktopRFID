/**
 * Reporte de resumen de horas trabajadas del empelado.
 */
export interface ReporteResumenHorasTrabajadas {
    nombreCompletoEmpleado: string,
    reporteEmpelado: [
        string,
        string,
        string,
        number,
        number, 
        number
    ][],
    reporteAccesos: [
        string,
        string,
        string,
        string,
        number
    ][]
};