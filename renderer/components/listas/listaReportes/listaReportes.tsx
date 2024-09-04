'use client'

// Funcionalidad de React.
import React from "react"

// Componentes de reactstrap-
import {
    List,
    Card, CardBody, CardHeader, CardText, CardTitle
} from 'reactstrap';

export default function ListaReportes(
    props: {
        datos: any[]
    }
) {
    return (
        <Card className="text-white" color="dark" style={{
            marginBottom: '10px'
        }}>
            <CardHeader>
            </CardHeader>

            <CardBody>
                <List type="unstyled">
                    {props.datos.map((dato: any) => {
                        return <li>
                            <Card color="warning">
                                {dato.descripcion}
                            </Card>
                        </li>
                    })}
                </List>
            </CardBody>
        </Card>
    );
};