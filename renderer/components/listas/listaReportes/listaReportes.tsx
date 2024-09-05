'use client'

// Funcionalidad de React.
import React from "react"

// Componentes de reactstrap-
import {
    List,
    Card, CardBody, CardHeader, CardText, CardTitle
} from 'reactstrap';
import Paginacion from "../../paginacion/paginacion";

export default function ListaReportes(
    props: {
        titulo: string
        datos: any[]
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
                <List type="unstyled">
                    {props.datos.map((dato: any) => {
                        return <li>
                            <Card color="warning" style={{
                                textAlign: 'center',
                                padding: '10px',
                                margin: '10px'
                            }}>
                                {dato.descripcion}
                            </Card>
                        </li>
                    })}
                </List>

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