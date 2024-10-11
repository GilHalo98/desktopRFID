// Para la manipulacion de archivos pdf.
import jsPDF from "jspdf";
import autoTable, { CellHookData } from "jspdf-autotable";

// Funciones de tiempo.
import {
    msToTime,
    dateDiaSemana,
    separarTiempo,
    a12HorasTiempo,
    fechaStrATiempo,
    deserealizarSemana,
    numeroMesANombreMes,
    numeroDiaANombreDia,
    rangoSemana,
} from "../../../../utils/conversiones";

// Modelo de datos.
import {
    Reporte
} from "../../../../utils/API/modelos/reporte";

import {
    ConsultarDatosReporte
} from "./registros";

import {
    ReporteHorasTrabajadasDetalle,
    ReporteHorasTrabajadasDetalleAccesos,
    ReporteHorasTrabajadasDetalleActividades
} from "../../../../utils/interfaces/reporteHorasTrabajadasDetalle";

import {
    ReporteAccesosDetalle
} from "../../../../utils/API/respuestas/reporteAccesosDetalle";

import {
    ReporteActividadDetalle
} from "../../../../utils/API/respuestas/reporteActividadDetalle";
import { ReporteChequeoResumen } from "../../../../utils/API/respuestas/reporteChequeoResumen";

// Formatemos los datos para mostrarlos en el tracker.
const formatearDatosTracker = (datos: Reporte[]) => {
    const datosFormateados: ItemTracker[] = [];

    datos.forEach((dato: Reporte) => {
        let color: "slate" | "gray" | "zinc" | "neutral" | "stone" | "red" | "orange" | "amber" | "yellow" | "lime" | "green" | "emerald" | "teal" | "cyan" | "sky" | "blue" | "indigo" | "violet" | "purple" | "fuchsia" | "pink" | "rose";

        const tiempo = a12HorasTiempo(fechaStrATiempo(
            dato.fechaRegistroReporte
        ));

        let tooltip: string = `${
            dato.descripcionReporte
        } a las ${tiempo}`;

        color = 'gray';

        switch (dato.idTipoReporteVinculado) {
            case 1:
                // Acceso garantizado
                color= 'gray';
                break;

            case 2:
                // Acceso negado
                color= 'red';
                break;

            case 3:
                // Salida de zona
                color= 'gray';
                break;

            case 4:
                // Tarjeta invalida
                color= 'yellow';
                break;

            case 5:
                // Datos de tarjeta inexistente
                color= 'red';
                break;

            case 6:
                // Credenciales invalidas
                color = 'red';
                break;

            case 7:
                // Dispositivo activado
                color = 'gray';
                break;

            case 8:
                // Dispositivo pausado
                color = 'gray';
                break;
        
            case 9:
                // Actividad iniciada
                color = 'gray';
                break;

            case 10:
                // Actividad finalizada
                color = 'gray';
                break;
        
            case 11:
                // Credenciales invialidas para inciar actividad
                color = 'red';
                break;

            case 12:
                // Chequeo de entrada
                color = 'green';
                break;

            case 13:
                // Chequeo de entrada con retraso
                color = 'yellow';
                break;
        
            case 14:
                // Chequeo de salida
                color = 'green';
                break;

            case 15:
                // Chequeo de salida con extras
                color = 'blue';
                break;

            case 16:
                // Chequeo de inicio de descanso
                color = 'green';
                break;

            case 17:
                // Chequeo de fin de descanso
                color = 'green';
                break;

            default:
                break;
        }

        datosFormateados.push({
            color: color,
            tooltip: tooltip
        })
    });

    return datosFormateados;
};

// Renderiza el contenido del documento en este.
const renderizarDocumento = (
    semanaReporte: string,
    reporte: ReporteHorasTrabajadasDetalle,
    documento: jsPDF
) => {
    // Deserealizamos la semana del reporte.
    const rangoSemanaReporte: Date [] = !semanaReporte?
        rangoSemana() : deserealizarSemana(semanaReporte);

    // Consutlamos el tamaño de la pagina.
    const pageSize = documento.internal.pageSize;

    // Nombre completo del empleado.
    const nombreCompletoEmpleado = `${        
        reporte.datosEmpleado.nombres
    } ${
        reporte.datosEmpleado.apellidoPaterno
    } ${
        reporte.datosEmpleado.apellidoMaterno
    }`;

    // Cortamos el titulo del documento para que concuerde con las
    // dimenciones del documento.
    const titulo = documento.splitTextToSize(
        `Reporte de semana laboral de ${nombreCompletoEmpleado}.`,
        pageSize.getWidth() - 35,
        {}
    );

    // Ponemos el titulo en el documento.
    documento.text(
        titulo,
        pageSize.getWidth() / 2,
        20,
        { align: 'center' }
    );

    // Cortamos la descripcion del reporte para que concuerde con las
    // dimenciones del documento.
    const descripcionReporte = documento.splitTextToSize(
        `Reporte del día ${
            numeroDiaANombreDia(rangoSemanaReporte[0].getDay() == 0?
                7 : rangoSemanaReporte[0].getDay())
        } ${
            rangoSemanaReporte[0].getDate()
        } de ${
            numeroMesANombreMes(rangoSemanaReporte[0].getMonth())
        } del ${
            rangoSemanaReporte[0].getFullYear()
        } al día ${
            numeroDiaANombreDia(rangoSemanaReporte[1].getDay())
        } ${
            rangoSemanaReporte[1].getDate()
        } de ${
            numeroMesANombreMes(rangoSemanaReporte[1].getMonth())
        } del ${
            rangoSemanaReporte[1].getFullYear()
        }.`,
        pageSize.getWidth() - 35,
        {}
    );

    // Asignamos las dimenciones de la fuente a 11 pt.
    documento.setFontSize(11);

    // Ponemos la descripcion del reporte en el documento.
    documento.text(
        descripcionReporte,
        pageSize.getWidth() / 2,
        50,
        { align: 'center' }
    );

    // Renderizamos la primera tabla que contiene  el
    // resumen del reporte en el documento.
    autoTable(documento, {
        head: [[
            'Tiempo laboral total',
            'Descansos laborados',
            'Extras',
            'Retrasos',
            'Faltas'
        ]],
        body: [[
            separarTiempo(msToTime(reporte.general.tiempoTrabajoTotal)),
            reporte.general.descansosLaborados,
            reporte.general.extras,
            reporte.general.retraso,
            reporte.general.faltas
        ]],
        startY: 80,
        showHead: 'firstPage',
        theme: 'plain',
        styles: { halign: 'center' },
        didParseCell: function (data: CellHookData) {
            if(data.row.section === 'head') {
                data.cell.styles.lineColor = 'black';

                switch(data.column.index) {
                    case 0:
                        data.cell.styles.lineWidth = {
                            top: 1,
                            bottom: 1,
                            left: 1
                        };
                        break;

                    case 4:
                        data.cell.styles.lineWidth = {
                            top: 1,
                            bottom: 1,
                            right: 1
                        };

                        break;

                    default:
                        data.cell.styles.lineWidth = {
                            top: 1,
                            bottom: 1
                        };

                        break;
                }

            } else {
                data.cell.styles.lineColor = 'black'

                data.cell.styles.lineWidth = { bottom: 0.2 }
            }

        },
    });

    // Por cada dia de la semana, que son 7.
    for (let i = 0; i < 7; i++) {
        // Generamos la fecha de la semana.
        const fechaDiaSemana: Date = dateDiaSemana(
            i + 1,
            rangoSemanaReporte,
            true
        );

        // Texto de cabecera del dia de la semana.
        const cabeceraDiaSemana: string = `${
            numeroDiaANombreDia(i + 1)
        } ${
            fechaDiaSemana.getDate()
        } de ${
            numeroMesANombreMes(fechaDiaSemana.getMonth())
        }`;

        // Renderizamos el subtitulo
        autoTable(documento, {
            head: [[cabeceraDiaSemana]],
            body: [['']],
            startY: documento['lastAutoTable'].finalY + 20,
            showHead: 'firstPage',
            theme: 'plain',
            styles: { halign: 'center' }
        });

        // Desempaquetamos los reportes de chequeos
        const reporteChequeos: ReporteChequeoResumen = reporte.porDia[
            i
        ].chequeos;

        // Desempaquetamos los reportes de accesos.
        const reportesAccesos: ReporteHorasTrabajadasDetalleAccesos [] = reporte.porDia[
            i
        ].accesos;

        // Desempaquetamos los reportes de actividad.
        const reportesActividades: ReporteHorasTrabajadasDetalleActividades [] = reporte.porDia[
            i
        ].actividades;

        // Verificamos que existan reportes de chequeos.
        if(typeof reporteChequeos != 'undefined') {
            // Desempaquetamos y serializamos el tiempo de entrada.
            const entrada: string = !reporteChequeos.entrada?
                '' : a12HorasTiempo(fechaStrATiempo(
                    reporteChequeos.entrada.fechaRegistroReporteChequeo
                ));

            // Desempaquetamos y serializamos el tiempo de salida.
            const salida: string = !reporteChequeos.salida?
                '' : a12HorasTiempo(fechaStrATiempo(
                    reporteChequeos.salida.fechaRegistroReporteChequeo
                ));

            // Desempaquetamos el tiempo laboral total.
            const tiempoLaboralTotal: string = !reporteChequeos.tiempoLaboralTotal?
                '' : separarTiempo(msToTime(
                    reporteChequeos.tiempoLaboralTotal
                ));

            // Renderizamos los chequeos del empleado.
            autoTable(documento, {
                head: [[
                    'Entrada',
                    'Salida',
                    'Tiempo laboral total'
                ]],
                body: [[
                    entrada,
                    salida,
                    tiempoLaboralTotal
                ]],
                startY: documento['lastAutoTable'].finalY + 20,
                showHead: 'firstPage',
                theme: 'plain',
                styles: { halign: 'center' },
                didParseCell: function (data: CellHookData) {
                    if(data.row.section === 'head') {
                        data.cell.styles.lineColor = 'black';
        
                        switch(data.column.index) {
                            case 0:
                                data.cell.styles.lineWidth = {
                                    top: 1,
                                    bottom: 1,
                                    left: 1
                                };
                                break;
        
                            case 2:
                                data.cell.styles.lineWidth = {
                                    top: 1,
                                    bottom: 1,
                                    right: 1
                                };
        
                                break;
        
                            default:
                                data.cell.styles.lineWidth = {
                                    top: 1,
                                    bottom: 1
                                };
        
                                break;
                        }
        
                    } else {
                        data.cell.styles.lineColor = 'black'
        
                        data.cell.styles.lineWidth = { bottom: 0.2 }
                    }
        
                },
            });
        }

        // Verificamos que existan reportes de accesos a zonas.
        if(typeof reportesAccesos != 'undefined') {
            // Por cada tabla de reportes de acceso y actividades, los
            // renderizamos en el documento.
            for (let j = 0; j < reportesAccesos.length; j ++) {
                // Desempaquetamos el id de la zona.
                const nombreZona: string = reportesAccesos[j].nombreZona;

                // Consultamos los datos de la zona, despues continuamos (?)

                // Desempaquetamos los reportes.
                const reporteAccesos: ReporteAccesosDetalle [] = reportesAccesos[j].reporte;

                // Formateamos los datos desempaquetados.
                const reporteAccesosFormateado: string[][] = reporteAccesos.map(
                    (registro: ReporteAccesosDetalle) => {
                        return [
                            // Desempaquetamos y serializamos el tiempo de entrada.
                            !registro.entrada?
                                '' : a12HorasTiempo(fechaStrATiempo(
                                    registro.entrada
                                )),

                            // Desempaquetamos y serializamos el tiempo de inicio de descanso.
                            !registro.salida?
                                '' : a12HorasTiempo(fechaStrATiempo(
                                    registro.salida
                                )),

                            // Desempaquetamos y serializamos el tiempo de fin de descanso.
                            !registro.tiempoEnZona?
                                '' : separarTiempo(msToTime(
                                    registro.tiempoEnZona
                                ))
                        ];
                    }
                );

                // Renderizamos la zona perteneciente
                autoTable(documento, {
                    head: [[`Accesos a ${nombreZona}`]],
                    startY: documento['lastAutoTable'].finalY + 20,
                    showHead: 'firstPage',
                    styles: { halign: 'center' }
                });

                // Renderizamos la tabla con los datos.
                autoTable(documento, {
                    head: [['Entrada', 'Salida', 'Tiempo total en zona']],
                    body: reporteAccesosFormateado ,
                    startY: documento['lastAutoTable'].finalY + 20,
                    showHead: 'firstPage',
                    styles: { halign: 'center' },
                    theme: 'plain',
                    didParseCell: function (data: CellHookData) {
                        if(data.row.section === 'head') {
                            data.cell.styles.lineColor = 'black';

                            switch(data.column.index) {
                                case 0:
                                    data.cell.styles.lineWidth = {
                                        top: 1,
                                        bottom: 1,
                                        left: 1
                                    };
                                    break;

                                case 2:
                                    data.cell.styles.lineWidth = {
                                        top: 1,
                                        bottom: 1,
                                        right: 1
                                    };

                                    break;

                                default:
                                    data.cell.styles.lineWidth = {
                                        top: 1,
                                        bottom: 1
                                    };

                                    break;
                            }

                        } else {
                            data.cell.styles.lineColor = 'black'

                            data.cell.styles.lineWidth = { bottom: 0.2 }
                        }

                    },
                });
            }
        }

        // Verificamos que existan reportes de actividades.
        if(typeof reportesActividades != 'undefined') {
            // Por cada tabla de reportes de acceso y actividades, los
            // renderizamos en el documento.
            for (let j = 0; j < reportesActividades.length; j ++) {
                // Desempaquetamos el id de la zona.
                const nombreDispositivo: string = reportesActividades[j].nombreDispositivo;

                // Desempaquetamos los reportes.
                const reportesActividad: ReporteActividadDetalle [] = reportesActividades[j].reporte;

                // Formateamos los datos desempaquetados.
                const reporteActividadFormateado: string[][] = reportesActividad.map(
                    (registro: ReporteActividadDetalle) => {
                        return [
                            // Desempaquetamos y serializamos el tiempo de entrada.
                            !registro.inicio?
                                '' : a12HorasTiempo(fechaStrATiempo(
                                    registro.inicio
                                )),

                            // Desempaquetamos y serializamos el tiempo de inicio de descanso.
                            !registro.fin?
                                '' : a12HorasTiempo(fechaStrATiempo(
                                    registro.fin
                                )),

                            // Desempaquetamos y serializamos el tiempo de fin de descanso.
                            !registro.tiempoEnActividad?
                                '' : separarTiempo(msToTime(
                                    registro.tiempoEnActividad
                                ))
                        ];
                    }
                );

                // Renderizamos el dispositivo perteneciente
                autoTable(documento, {
                    head: [[`Actividades en ${nombreDispositivo}`]],
                    startY: documento['lastAutoTable'].finalY + 20,
                    showHead: 'firstPage',
                    styles: { halign: 'center' }
                });

                // Renderizamos la tabla con los datos.
                autoTable(documento, {
                    head: [['Inicio', 'Fin', 'Tiempo total en actividad']],
                    body: reporteActividadFormateado ,
                    startY: documento['lastAutoTable'].finalY + 20,
                    showHead: 'firstPage',
                    styles: { halign: 'center' },
                    theme: 'plain',
                    didParseCell: function (data: CellHookData) {
                        if(data.row.section === 'head') {
                            data.cell.styles.lineColor = 'black';

                            switch(data.column.index) {
                                case 0:
                                    data.cell.styles.lineWidth = {
                                        top: 1,
                                        bottom: 1,
                                        left: 1
                                    };
                                    break;

                                case 2:
                                    data.cell.styles.lineWidth = {
                                        top: 1,
                                        bottom: 1,
                                        right: 1
                                    };

                                    break;

                                default:
                                    data.cell.styles.lineWidth = {
                                        top: 1,
                                        bottom: 1
                                    };

                                    break;
                            }

                        } else {
                            data.cell.styles.lineColor = 'black'

                            data.cell.styles.lineWidth = { bottom: 0.2 }
                        }

                    },
                });
            }
        }
    }
};

// Funcion que genera el documento con su contenido.
const onGenerarDocumento = (
    idEmpleado: string,
    semanaReporte: string,
    orientacionHoja: "p" | "portrait" | "l" | "landscape",
    unidadesHoja: "pt" | "px" | "in" | "mm" | "cm" | "ex" | "em" | "pc",
    formatoHoja: string,
) => {
    // Instanciamso el objeto archivo.
    const documento = new jsPDF(
        orientacionHoja,
        unidadesHoja,
        formatoHoja
    );

    ConsultarDatosReporte(
        (reporte: ReporteHorasTrabajadasDetalle) => {
            // Renderizamos el documento.
            renderizarDocumento(semanaReporte, reporte, documento);

            const UID: string = `${
                reporte.datosEmpleado.nombres
            } ${
                reporte.datosEmpleado.apellidoPaterno
            } ${
                reporte.datosEmpleado.apellidoMaterno
            }`;

            // Instanciamos la fecha de hoy.
            const fecha: Date = new Date();

            // Preparamos el nombre del archivo de salida.
            const nombreArchivo: string = `AC-RSL-${
                UID
            }-${
                fecha.getTime()
            }.pdf`;

            // Guardamos el archivo.
            documento.save(nombreArchivo);
        },
        {
            idEmpleadoVinculado: idEmpleado,
            semanaReporte: semanaReporte
        }
    );
};

export {
    formatearDatosTracker,
    onGenerarDocumento
};