// React.
import React from "react";

// Logotipo o membrete de la empresa.
import logo from '../../public/images/logo.png';

// Componente de next para renderizar imagenes.
import Image from 'next/image';

// Para la manipulacion del archivo pdf.
import jsPDF from "jspdf";

// Para renderizar el contenido como un html estatico.
import {
    renderToStaticMarkup
} from "react-dom/server";

// Funciones propias.
import {
    numeroDiaANombreDia,
    numeroMesANombreMes
} from '../../utils/conversiones';

export default function Plantilla(
    pagina: Pagina,
    totalOperaciones: number,
    documento: jsPDF
) {
    const margen = 20;

    const alto = documento.internal.pageSize.getHeight() - (margen * 2);
    const ancho = documento.internal.pageSize.getWidth() - (margen * 2);

    const fechaHoy: Date = new Date();

    const separarTiempo = (tiempo: string) => {
        const partes = tiempo.split(':');

        let tiempoSeparado: string = '';

        if(partes[0] != '00') {
            tiempoSeparado = tiempoSeparado.concat(`${partes[0]} horas `);
        }

        if(partes[1] != '00') {
            tiempoSeparado = tiempoSeparado.concat(`${partes[1]} minutos`);
        }

        return tiempoSeparado;
    };

    const formatearFecha = (fecha: Date) => {
        const dia: string = numeroDiaANombreDia(fecha.getDay());
        const mes: string = numeroMesANombreMes(fecha.getMonth());

        return(
            `${dia} ${fecha.getDate()} de ${mes} del ${fecha.getFullYear()}`
        );
    };

    return renderToStaticMarkup(
        <div className="cuerpoReporte" style={{
            minHeight: alto.toString() + 'px',
            minWidth: ancho.toString() + 'px',

            height: alto.toString() + 'px',
            width: ancho.toString() + 'px',

            maxHeight: alto.toString() + 'px',
            maxWidth: ancho.toString() + 'px',

            margin: margen.toString() + 'px'
        }}>
            <div className="datosCliente">
                <div className="apartadoMembreteProyecto">
                    <Image
                        src={logo}
                        height={60}
                        width={81}
                    />

                    <div className="proyecto">
                        <ul>
                            <li>
                                <b>Cliente: </b>{pagina.cliente}
                            </li>

                            <li>
                                <b>Proyecto: </b>{pagina.proyecto}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="datosOperacion">
                <ul>
                    <li>
                        <b>Programador: </b>{
                            pagina.programa.programador
                        }
                    </li>

                    <li>
                        <b>Tiempo Estimado Fabricacion: </b>{
                            separarTiempo(pagina.programa.tiempo)
                        }
                    </li>

                    <li>
                        <b>No. Operaciones: </b>{
                            totalOperaciones
                        }
                    </li>

                    <li>
                        <b>Operacion Actual: </b>{
                            pagina.operacion.actual
                        } de {
                            totalOperaciones
                        }
                    </li>
                </ul>
            </div>

            <div className="apartadoHerramientas">
                <table className="tablaHerramientas">
                    <thead>
                        <tr>
                            <th colSpan={4} className="tituloTabla">
                                <b>Asignación de herramientas</b>
                            </th>
                        </tr>

                        <tr className="cabeceraTabla">
                            <th>
                                Pos
                            </th>

                            <th>
                                Tipo
                            </th>

                            <th>
                                Medida
                            </th>

                            <th>
                                Operacion
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {pagina.herramientas.map(
                            (herramienta: Herramienta) => {
                                return(
                                    <tr>
                                        <td>
                                            {herramienta.numero}
                                        </td>

                                        <td>
                                            {herramienta.tipo}
                                        </td>

                                        <td>
                                            {herramienta.medida}
                                        </td>

                                        <td>
                                            {herramienta.operacion}
                                        </td>
                                    </tr>
                                );
                            }
                        )}
                    </tbody>
                </table>
            </div>

            <div className="datosGenerales">
                <ul>
                    <li>
                        <b>Fecha: </b>{formatearFecha(fechaHoy)}
                    </li>

                    <li>
                        <b>No. Dibujo: </b>{pagina.dibujo.nombre}
                    </li>

                    <li>
                        <b>Nombre del Programa: </b>{pagina.programa.nombre}
                    </li>

                    <li>
                        <b>Ruta Programa: </b>{pagina.programa.ruta}
                    </li>
                </ul>
            </div>

            <div className="apartadoDibujo">
                <img className="dibujo" src={
                    `data:${pagina.dibujo.tipo}
                    ;base64,${window.ipc.sendSync(
                        'cargar_imagen',
                        {
                            path: pagina.dibujo.directorio
                        }
                    )}`
                }/>

                <div className="apartadoReferenciasNotas">
                    <div className="datosReferencias">
                        <ul>
                            <li>
                                <b>Referencia X:</b>{
                                    pagina.referencias.referenciaX
                                }
                            </li>

                            <li>
                                <b>Referencia Y:</b>{
                                    pagina.referencias.referenciaY
                                }
                            </li>

                            <li>
                                <b>Referencia Z:</b>{
                                    pagina.referencias.referenciaZ
                                }
                            </li>

                            <li>
                                <b>Profundidad Htta: </b>Z {
                                    pagina.referencias.profundidadHerramienta
                                }
                            </li>

                            <li>
                                <b>Montaje: </b>{
                                    pagina.referencias.montaje
                                }
                            </li>
                        </ul>
                    </div>

                    <div className="notas">
                        <b>Notas: </b>{pagina.notas}
                    </div>
                </div>
            </div>
        </div>
    );
};
