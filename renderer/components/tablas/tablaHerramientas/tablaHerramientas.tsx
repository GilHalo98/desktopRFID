'use client'

// React.
import React, { SyntheticEvent } from "react";

// Componentes de reacstrap
import {
    Button, Table, Input,
    Container, Col, Row,
    Card, CardBody, CardHeader,
} from "reactstrap";

// Iconos.
import { mdiTrashCan } from "@mdi/js";
import Icon from "@mdi/react";
import TablaParaHerramienta from "../tablaParaHerramientas";

// Componentes propios.

// Modelo de datos.

export default function TablaHerramienta(
    props: {
        pagina: Pagina
        funcionesOpciones: {
            onAgregarHerramienta: Function
            onRemoverHerramienta: Function
            onGuardarCambios: Function
        }
        datosOpciones: {
            listaTooling: string[]
            tiposHerramientas: string[]
            medidaHerramienta: string[]
            operacionHerramienta: string[]
        }
        children?: any
    }
) {
    if(!props.pagina.herramientas) {
        return <></>
    }

    return (
        <React.Fragment>
            <TablaParaHerramienta agregarHerramienta={
                props.funcionesOpciones.onAgregarHerramienta
            }>

                {props.pagina.herramientas.map((
                    herramienta: Herramienta,
                    index: number
                ) => {
                    return(
                        <tr>
                            {/* Numero de herramienta T0, ..., TN */}
                            <td>
                                <Input
                                    id="numeroHerramienta"
                                    type="select"
                                    value={herramienta.numero}
                                    onChange={(evento: SyntheticEvent) => {
                                        const input = evento.target as HTMLSelectElement;

                                        props.funcionesOpciones.onGuardarCambios(
                                            input.value,
                                            'herramientas',
                                            index,
                                            'numero'
                                        );
                                    }}
                                >
                                    {props.datosOpciones.listaTooling.map((registro: string) => {
                                        return <option value={registro}>{registro}</option>
                                    })}
                                </Input>
                            </td>

                            {/* Tipo de herramienta */}
                            <td>
                                <Input
                                    id="tipoHerramienta"
                                    type="select"
                                    value={herramienta.tipo}
                                    onChange={(evento: SyntheticEvent) => {
                                        const input = evento.target as HTMLSelectElement;

                                        props.funcionesOpciones.onGuardarCambios(
                                            input.value,
                                            'herramientas',
                                            index,
                                            'tipo'
                                        );
                                    }}
                                >
                                    {props.datosOpciones.tiposHerramientas.map((registro: string) => {
                                        return <option value={registro}>{registro}</option>
                                    })}
                                </Input>
                            </td>

                            {/* Medida de herramienta */}
                            <td>
                                <Input
                                    id="medidaHerramienta"
                                    type="select"
                                    value={herramienta.medida}
                                    onChange={(evento: SyntheticEvent) => {
                                        const input = evento.target as HTMLSelectElement;

                                        props.funcionesOpciones.onGuardarCambios(
                                            input.value,
                                            'herramientas',
                                            index,
                                            'medida'
                                        );
                                    }}
                                >
                                    {props.datosOpciones.medidaHerramienta.map((registro: string) => {
                                        return <option value={registro}>{registro}</option>
                                    })}
                                </Input>
                            </td>

                            {/* Operacion de herramienta */}
                            <td>
                                <Input
                                    id="operacionHerramienta"
                                    type="select"
                                    value={herramienta.operacion}
                                    onChange={(evento: SyntheticEvent) => {
                                        const input = evento.target as HTMLSelectElement;

                                        props.funcionesOpciones.onGuardarCambios(
                                            input.value,
                                            'herramientas',
                                            index,
                                            'operacion'
                                        );
                                    }}
                                >
                                    {props.datosOpciones.operacionHerramienta.map((registro: string) => {
                                        return <option value={registro}>{registro}</option>
                                    })}
                                </Input>
                            </td>

                            {/* Boton para eliminar el registro del la herramienta */}
                            <td>
                                <Button
                                    outline
                                    color="danger"
                                    style={{
                                        border: 'none'
                                    }}
                                    onClick={(evento: SyntheticEvent) => {
                                        props.funcionesOpciones.onRemoverHerramienta(index);
                                    }}
                                >
                                    <Icon path={mdiTrashCan} size={1}/>
                                </Button>
                            </td>
                        </tr>
                    );
                })}

            </TablaParaHerramienta>
        </React.Fragment>
    );
};