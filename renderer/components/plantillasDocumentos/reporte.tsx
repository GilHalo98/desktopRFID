import React from "react";

import jsPDF from "jspdf";

import { renderToStaticMarkup } from "react-dom/server"

import { Col, Container, Row, Table } from "reactstrap";

export default function Plantilla(
    pagina: Pagina,
    numeroPagina,
    totalPaginas,
    documento: jsPDF
) {
    const margen = 2;

    const alto = documento.internal.pageSize.getHeight() - (margen * 2);
    const ancho = documento.internal.pageSize.getWidth() - (margen * 2);

    return renderToStaticMarkup(
        <div className="mainDiv" style={{
            height: alto.toString() + 'px',
            width: ancho.toString() + 'px',
            margin: margen.toString() + 'px'
        }}>
            <table style={{
                width: ancho.toString() + 'px',
            }}>
                <tbody>
                    <tr className="apartadoProgramador">
                        <td colSpan={12}>
                            <h6>
                                Programador: {pagina.programa.programador}
                            </h6>
                        </td>
                    </tr>

                    <tr className="apartadoRutaPrograma">
                        <td colSpan={12}>
                            <h6>
                                Ruta del programa: {pagina.programa.rutaPrograma}
                            </h6>
                        </td>
                    </tr>
                    
                    <tr className="apartadoGeneral">
                        <td colSpan={4}>
                            Tiempo Estimado: {pagina.programa.tiempoPrograma}
                        </td>

                        <td colSpan={4}>
                            Nombre: {pagina.programa.nombrePrograma}
                        </td>

                        <td colSpan={4}>
                            Dibujo {numeroPagina} de {totalPaginas}
                        </td>
                    </tr>

                    <tr>
                        <td colSpan={12}/>
                    </tr>

                    <tr>
                        <td colSpan={2}>
                            <table className="tablaTools">
                                <thead>
                                    <tr>
                                        <th>Numero de herramienta</th>
                                        <th>Tipo de herramienta</th>
                                        <th>Medida de herramienta</th>
                                        <th>Operacion de herramienta</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {pagina.herramientas.map((herramienta: Herramienta) => {
                                        return(
                                            <tr>
                                                <td>{herramienta.numero}</td>
                                                <td>{herramienta.tipo}</td>
                                                <td>{herramienta.medida}</td>
                                                <td>{herramienta.operacion}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </td>

                        <td colSpan={8}>
                            <Container>
                                <Row>
                                    <img className="dibujo" src={
                                        `data:${pagina.dibujo.tipo}
                                        ;base64,${window.ipc.sendSync(
                                            'cargar_imagen',
                                            {
                                                path: pagina.dibujo.directorio
                                            }
                                        )}`
                                    }/>
                                </Row>

                                <Row>
                                    <table className="tablaReferencias">
                                        <thead>
                                            <tr>
                                                <th>Profundidad del programa</th>
                                                <th>Refrencia X</th>
                                                <th>Refrencia Y</th>
                                                <th>Refrencia Z</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            <tr>
                                                <td>{pagina.referencias.profundidadHerramienta}</td>
                                                <td>{pagina.referencias.referenciaX}</td>
                                                <td>{pagina.referencias.referenciaY}</td>
                                                <td>{pagina.referencias.referenciaZ}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </Row>
                            </Container>
                        </td>
                    </tr>

                    <tr>
                        <td colSpan={12}/>
                    </tr>

                    <tr>
                        <td colSpan={12}>
                            <table className="TablaNotas">
                                <thead>
                                    <tr>
                                        <th>
                                            Notas
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    <tr>
                                        <td>
                                            <i>{pagina.notas}</i>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};
