'use client'

// Funcionalidad de React.
import React from "react"

// Componentes de reactstrap-
import {
    List,
    Card, CardBody, CardHeader, CardText, CardTitle, Table, Badge
} from 'reactstrap';
import Paginacion from "../../paginacion/paginacion";

export default function ListaHorasTotalReportes(
    props: {
        titulo: string
        datos: any[]
        headers: string[]
    }
) {
    return (
        <Card className="text-white" color="dark" style={{
            marginBottom: '10px'
        }}>
            <CardHeader>
                {props.titulo}
            </CardHeader>

            <CardBody>
                <Table dark>
                    <thead style={{
                        textAlign: 'center'
                    }}>
                        <tr>
                            {props.headers.map((header: string) => {
                                return <th>{header}</th>
                            })}
                        </tr>
                    </thead>

                    <tbody style={{
                        textAlign: 'center'
                    }}>
                        {props.datos.map((registro: any) => {
                            return(
                                <tr>
                                    {props.headers.map((header: string) => {
                                        return(
                                            <td>
                                                <Card color="info" style={{
                                                    textAlign: 'center',
                                                    padding: '10px',
                                                    margin: '10px'
                                                }}>
                                                    {registro[header]}
                                                </Card>
                                            </td>
                                        );
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>

                <Paginacion
                    totalPaginas={10}
                    paginaActual={1}
                    offset={0}
                    registrosPorPagina={5}
                    setPaginaActual={() => {}}
                    setOffset={() => {}}
                />
            </CardBody>
        </Card>
    );
};