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

// Componente para cargar iconos.
import Icon from "@mdi/react";

// Componentes propios.
import TablaParaHerramienta from "../tablaParaHerramientas";

export default function TablaHerramienta(
    props: {
        pagina: Pagina
        maximoDatos: number
        funcionesOpciones: {
            onAgregarHerramienta: Function
            onRemoverHerramienta: Function
            onGuardarCambios: Function
        }
        datosOpciones: {
            listaTooling: string[]
            herramientas: ItemHerramienta[]
            medidaHerramienta: Object
            operacionHerramienta: string[]
        }
        children?: any
    }
) {
    if(!props.pagina.herramientas) {
        return <></>
    }

    const renderizarOpcionesMedidas = (herramienta: Herramienta) => {
        if(!herramienta) {
            return <></>;
        }

        const indexItem = props.datosOpciones.herramientas.findIndex(
            (item: ItemHerramienta) => {
                return herramienta.tipo == item.nombre;
            }
        );

        const listaMedidas: string[] = props.datosOpciones.medidaHerramienta[
            props.datosOpciones.herramientas[indexItem].unidad
        ];

        return listaMedidas.map((medida: string) => {
            return(
                <option value={medida}>
                    {medida}
                </option>
            );
        });
    };

    return (
        <React.Fragment>
            <TablaParaHerramienta
                maximoDatos={props.maximoDatos}
                totalDatos={props.pagina.herramientas.length}
                agregarHerramienta={
                    props.funcionesOpciones.onAgregarHerramienta
                }
            >

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
                                    {props.datosOpciones.herramientas.map((registro: ItemHerramienta) => {
                                        return <option value={registro.nombre}>{registro.nombre}</option>
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
                                    {renderizarOpcionesMedidas(herramienta)}
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