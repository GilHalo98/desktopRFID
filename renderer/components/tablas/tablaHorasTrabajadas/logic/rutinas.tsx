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
    consultarResumenDatosReporte
} from "./registros";

import {
    HorasTrabajadas
} from "../../../../utils/API/respuestas/horasTrabajadas";

import {
    ReporteResumenHorasTrabajadas
} from "../../../../utils/interfaces/reporteResumenHorasTrabajadas";

// Formatemos los datos para mostrarlos en el tracker.
const formatearDatosTracker = (datos: []) => {
    const datosFormateados: ItemTracker[] = [];

    datos.forEach((dato: HorasTrabajadas) => {
        let color: "slate" | "gray" | "zinc" | "neutral" | "stone" | "red" | "orange" | "amber" | "yellow" | "lime" | "green" | "emerald" | "teal" | "cyan" | "sky" | "blue" | "indigo" | "violet" | "purple" | "fuchsia" | "pink" | "rose" = 'gray';
        let tooltip: string = 'Sin Registro';

        if(!dato.diaFueraDeRango) {
            const tiempoEnTrabajo: string = separarTiempo(msToTime(
                dato.tiempoTrabajo
            ));
    
            const nombreDia: string = numeroDiaANombreDia(dato.dia);
    
            if(dato.esDescanso) {
                color = dato.tiempoTrabajo > 0? 'lime' : 'gray';
                tooltip = `${nombreDia} descanso${
                    dato.tiempoTrabajo > 0?
                        ` laborado: ${tiempoEnTrabajo}` : ''
                }`;
    
            } else if(dato.falto) {
                color = 'red'
                tooltip = `${nombreDia} falto`;
    
            } else if(dato.llegoTarde) {
                color = 'yellow'
                tooltip = `${nombreDia} llego tarde: ${tiempoEnTrabajo}`;
    
            } else if(dato.salioTarde) {
                color = 'blue'
                tooltip = `${nombreDia} salio tarde: ${tiempoEnTrabajo}`;
    
            } else if(dato.tiempoTrabajo > 0) {
                color = 'green';
                tooltip = `${nombreDia}: ${tiempoEnTrabajo}`;

            } else if(!dato.detalle.entrada || !dato.detalle.salida) {
                color = 'orange';
                tooltip = `No realizo registro de chequeo de ${
                    !dato.detalle.entrada?
                        'entrada' : 'salida'
                }`;
            }
        }

        datosFormateados.push({
            color: color,
            tooltip: tooltip
        })
    });

    return datosFormateados;
};

// Formatea los datos de la tabla de registros de chequeo.
const formatearReporteResumenHorasLaborales = (rawData: [
    string,
    string,
    string,
    number,
    number, 
    number
]) => {
    const fechaDia: Date = new Date(rawData[0]);
    const horaEntrada: string = fechaStrATiempo(rawData[1]);
    const horaSalida: string = fechaStrATiempo(rawData[2]);
    const tiempoExtra: number = rawData[3];
    const tiempoRetardo: number = rawData[4];
    const tiempoTotalLaborado: number = rawData[5];

    const dia: string = `${
        numeroDiaANombreDia(fechaDia.getDay() == 0?
            7 : fechaDia.getDay())
    } ${
        fechaDia.getDate()
    }`;

    const entrada: string = a12HorasTiempo(horaEntrada);

    const salida: string = a12HorasTiempo(horaSalida);

    const extras: string = separarTiempo(
        msToTime(tiempoExtra), false
    );

    const retardos: string = separarTiempo(
        msToTime(tiempoRetardo), false
    );

    const totalLaborado: string = separarTiempo(
        msToTime(tiempoTotalLaborado), false
    );

    return [
        dia,
        entrada,
        salida,
        extras,
        retardos,
        totalLaborado
    ];
};

// Formatea los datos de la tabla de registros de accesos.
const formatearReporteResumenAccesos = (rawData: [
    string,
    string,
    string,
    string,
    number
]) => {
    const fechaDia: Date = new Date(rawData[0]);
    const nombreZona: string = rawData[1]
    const horaEntrada: string = fechaStrATiempo(rawData[2]);
    const horaSalida: string = fechaStrATiempo(rawData[3]);
    const tiempoTotal: number = rawData[4];

    const dia: string = `${
        numeroDiaANombreDia(fechaDia.getDay() == 0?
            7 : fechaDia.getDay())
    } ${
        fechaDia.getDate()
    }`;

    const entrada: string = a12HorasTiempo(horaEntrada);

    const salida: string = a12HorasTiempo(horaSalida);

    const total: string = `${tiempoTotal}`;

    return [
        dia,
        nombreZona,
        entrada,
        salida,
        total
    ];
};

// Separamos los reportes de acceso por zona.
const separarReportesPorZona = (
    listaReportes: string[][]
) => {
    /** 
     * Reformate el reporte de acceso para separar los reportes por zona
     * los agrega a un objeto.
     * 
     * PARAMS:
     *  -listaReportes: Lista de reprotes de acceso.
     * 
     * RETURN:
     *  - reformateo: Objeto en donde el
     *      par key->value es nombreZona -> reportes.
    */

    // Instancia del objeto de reformateo de datos.
    const reformateo: Object = {};

    // Por cada reporte en la lista de reportes.
    for(let i = 0; i < listaReportes.length; i++) {
        // Recuperamos la instancia del registro.
        const registro: string[] = listaReportes[i];

        // Instanciamos el nombre de la zona y convertimos los espacios
        // en guiones bajos.
        const nombreZona: string = registro[1].replaceAll(" ", "_");

        // Eliminamos el nombre de la zona, en este punto ya
        // no es necesario.
        registro.splice(1, 1);

        // Tiempo total en la zona en ms.
        const tiempoTotal: number = parseInt(registro[3]);

        // Convertimos el tiempo en zona a numero, cambiamos el tiempo
        // en ms a tiempo en HH:MM:SS y lo separamos a HH:MM am/pm.
        registro[3] = separarTiempo(msToTime(tiempoTotal));

        // Si la zona no esta agregada al objeto de reformateo.
        if(!Object.hasOwn(reformateo, nombreZona)) {
            // Se agrega el registro en un arreglo.
            reformateo[nombreZona] = [
                registro,
                [
                    { content: 'Total', colSpan: 3 },
                    tiempoTotal
                ]
            ];

        // Si esta en el objeto de reformateo.
        } else {
            const indexTotal: number = reformateo[nombreZona].length - 1;

            reformateo[nombreZona][indexTotal][1] += tiempoTotal;

            // Se agrega el registro al arreglo.
            reformateo[nombreZona].splice(
                indexTotal,
                0,
                registro
            );
        }
    }

    // Retornamos el reformateo.
    return reformateo;
};

// Calcula las horas totales del reporte laboral.
const calcularHorasTotalesReporteLaboral = (registros: [
    string,
    string,
    string,
    number,
    number, 
    number
][]) => {
    // Arreglo con el total de las horas.
    const totalHoras: number[] = [0, 0, 0];

    // Acumulamos las horas extra, con retardo y totales.
    for(let i = 0; i < registros.length; i++) {
        totalHoras[0] += registros[i][3];
        totalHoras[1] += registros[i][4];
        totalHoras[2] += registros[i][5];
    }

    // Retornamos el total de las horas.
    return totalHoras.map((dato: number) => {
        return separarTiempo(
            msToTime(dato), false
        );
    });
};

// Renderiza el contenido del documento en este.
const renderizarDocumento = (
    semanaReporte: string,
    reporte: ReporteResumenHorasTrabajadas[],
    documento: jsPDF
) => {
    // Deserealizamos la semana del reporte.
    const rangoSemanaReporte: Date [] = !semanaReporte?
        rangoSemana() : deserealizarSemana(semanaReporte);

    // Consutlamos el tamaño de la pagina.
    const pageSize = documento.internal.pageSize;

    // Por cada empleado y su reporte.
    for(let i = 0; i < reporte.length; i++) {
        // Instanciamos el resumen del reporte.
        const resumenReporte: ReporteResumenHorasTrabajadas = reporte[i];

        // Asignamos las dimenciones de la fuente a 11 pt.
        documento.setFontSize(11);

        // Cortamos el titulo del documento para que concuerde con las
        // dimenciones del documento.
        const titulo = documento.splitTextToSize(
            `Resumen de reporte laboral del día ${
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
            } del empleado ${
                resumenReporte.nombreCompletoEmpleado
            }.`,
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

        // Datos formateados de los chequeos del empleado.
        const reporteChequeosFormateados: any[] = resumenReporte.reporteEmpelado.map(
            formatearReporteResumenHorasLaborales
        );

        // Agregamos la fila de totales.
        reporteChequeosFormateados.push([
            { content: 'Total', colSpan: 3 },
            ...calcularHorasTotalesReporteLaboral(resumenReporte.reporteEmpelado)
        ]);

        // Renderizamos una tabla para mostrar los datos.
        autoTable(documento, {
            head: [[
                'Día',
                'Hora de entrada',
                'Hora de salida',
                'Extra',
                'Retardo',
                'Tiempo laborado'
            ]],
            body: reporteChequeosFormateados,
            startY: 45,
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
    
                        case 5:
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

        // Separamos los reportes de accesos por zonas.
        const reportesAccesoReformateados: Object = separarReportesPorZona(
            resumenReporte.reporteAccesos.map(formatearReporteResumenAccesos)
        );

        // Instanciamos las zonas del reporte.
        const zonas: string[] = Object.keys(reportesAccesoReformateados);

        // Por cada zona en el reporte.
        for (let i = 0; i < zonas.length; i++) {
            // Instanciamos la zona.
            const zona: string = zonas[i];

            const indexTotal: number = reportesAccesoReformateados[
                zona
            ].length - 1;

            reportesAccesoReformateados[zona][
                indexTotal
            ][1] = separarTiempo(msToTime(
                reportesAccesoReformateados[zona][
                    indexTotal
                ][1]
            ));

            // Renderizamos el subtitulo
            autoTable(documento, {
                head: [[zona.replaceAll("_", " ")]],
                body: [['']],
                startY: documento['lastAutoTable'].finalY + 5,
                showHead: 'firstPage',
                theme: 'plain',
                styles: { halign: 'center' }
            });

            // Renderizamos una tabla para mostrar los datos.
            autoTable(documento, {
                head: [[
                    'Fecha',
                    'Hora de acceso',
                    'Hora de salida',
                    'Tiempo'
                ]],
                body: reportesAccesoReformateados[zona],
                startY: documento['lastAutoTable'].finalY - 10,
                showHead: 'firstPage',
                theme: 'plain',
                styles: { halign: 'center', fontSize: 8 },
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
        
                            case 3:
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
                }
            });
        }

        // Agregamos una nueva pagina.
        documento.addPage();
    }
};

// Funcion que genera el documento con su contenido.
const onGenerarDocumento = (
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

    consultarResumenDatosReporte(
        (reporte: ReporteResumenHorasTrabajadas[]) => {
            // Renderizamos el documento.
            renderizarDocumento(
                semanaReporte,
                reporte,
                documento
            );

            // Instanciamos la fecha de hoy.
            const fecha: Date = new Date();

            // Preparamos el nombre del archivo de salida.
            const nombreArchivo: string = `AC-RRHT-${
                fecha.getTime()
            }.pdf`;

            // Guardamos el archivo.
            documento.save(nombreArchivo);
        },
        {
            semanaReporte: semanaReporte
        }
    );
};

export {
    formatearDatosTracker,
    onGenerarDocumento
};