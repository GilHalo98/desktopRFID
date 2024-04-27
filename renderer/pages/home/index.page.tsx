'use client'

// Componentes de reactstrap.
import {
    Container, Row, Col,
    Card
} from "reactstrap";

// Componentes propios.
import React from "react";
import SideBarLayout from "../../components/Layout/sideBarLayout";
import Tabla from "../../components/tablas/tabla";
import { exportarDatosTabla, formatearDatos, formatearDatosAJson } from "../../utils/formatDataTabla";
import BarraAccionesTabla from "../../components/barraBotones/barraAccionesTabla";
import BarraOpcionesRegistros from "../../components/barraBotones/barraOpcionesRegistros";

export default function Home() {
    const registros = [
        {
            "id": 1,
            "descripcionPermiso": "Permisos de acceso para Roles invalidos",
            "autorizacion": 0,
            "fechaRegistroPermiso": "2024-04-12T03:46:02.000Z",
            "fechaModificacionPermiso": null
        },
        {
            "id": 2,
            "descripcionPermiso": "Permisos de acceso para Admon",
            "autorizacion": 255,
            "fechaRegistroPermiso": "2024-04-12T03:46:02.000Z",
            "fechaModificacionPermiso": null
        },
        {
            "id": 3,
            "descripcionPermiso": "Permisos de acceso para Ingeniero",
            "autorizacion": 31,
            "fechaRegistroPermiso": "2024-04-12T03:46:02.000Z",
            "fechaModificacionPermiso": null
        },
        {
            "id": 4,
            "descripcionPermiso": "Permisos de acceso para Controlero",
            "autorizacion": 31,
            "fechaRegistroPermiso": "2024-04-12T03:46:02.000Z",
            "fechaModificacionPermiso": null
        },
        {
            "id": 5,
            "descripcionPermiso": "Permisos de acceso para Ensamblador",
            "autorizacion": 15,
            "fechaRegistroPermiso": "2024-04-12T03:46:02.000Z",
            "fechaModificacionPermiso": null
        }
    ];

    // Estado de carga de la tabla.
    const [
        enCarga,
        setEnCarga
    ] = React.useState(false);

    // Configuracion de la tabla.
    const [registrosPorPagina, setRegistrosPorPagina] = React.useState(12);
    const [opcionesRegistros, setOpcionesRegistros] = React.useState(true);
    const [tiempoRefrescamiento, setTiempoRefrescamiento] = React.useState(10);

    // Cabecera.
    const cabeceras = [
        "Id",
        "Descripcion",
        "Autorizacion",
        "Fecha de registro",
        "Fecha de modificacion",
    ];

    // Registros que se mostraran en la tabla.
    const formatearRegistros = (listaRegistros: any[]) => {
        return formatearDatos(
            listaRegistros,
            [
                ['id'],
                ['descripcionPermiso'],
                ['autorizacion'],
                ['fechaRegistroPermiso'],
                ['fechaModificacionPermiso']
            ],
            ['id', 'indexRegistro']
        );
    };

    // Formato especial de datos.
    const formatoEspecial = {
        "Fecha de registro": (fechaRegistro: string) => {
            return fechaRegistro.replace("T", " ").slice(0, 19);
        },
        "Fecha de modificaion": (fechaRegistro: string) => {
            return fechaRegistro.replace("T", " ").slice(0, 19);
        }
    };

    // Exportamos los datos a formato excel.
    const exportarDatos = (exportarDatosEnVista: boolean) => {
        if(exportarDatosEnVista) {
            exportarDatosTabla(registros, cabeceras, formatearRegistros);
        } else {
            // consultamos todos los registros
            exportarDatosTabla(registros, cabeceras, formatearRegistros);
        }
    };

    return (
        <React.Fragment>
            <Container fluid>
                <Row>
                    <Col>
                        <Tabla
                            tituloTabla="Tabla de prueba"
                            cabeceras={cabeceras}
                            registros={formatearRegistros(registros)}
                            enCarga={enCarga}
                            setEnCarga={setEnCarga}
                            exportarDatos={(exportarDatosEnVista: boolean) => {
                                exportarDatos(exportarDatosEnVista);
                            }}
                            formatoEspecial={formatoEspecial}
                            funcionesOpciones={{
                                onAgregarRegistro: () => {
                                    console.log("agregar registro");
                                },
                                onRefrescarTabla: () => {
                                    console.log("tabla refrescada");
                                },
                                onExportarDatos: () => {
                                    console.log("datos exportados");
                                },
                                onCambiarConfiguracion: () => {
                                    console.log("configuracion cambiada");
                                }
                            }}
                            opcionesTabla={{
                                registrosPorPagina: registrosPorPagina,
                                opcionesRegistros: opcionesRegistros,
                                tiempoRefrescamiento: tiempoRefrescamiento,
                                guardarConfiguracion: (config: any) => {
                                    console.log(config);
                                }
                            }}
                            funcionesRegistros={{
                                onEliminar: (
                                    idRegistro: number, indexRegistro: number
                                ) => {
                                    console.log("registro eliminado");
                                },
                                onModificar: (
                                    idRegistro: number, indexRegistro: number
                                ) => {
                                    console.log("registro modificado");
                                }
                            }}
                            paginacion={{
                                paginaActual: 1,
                                offset: 10,
                                registrosPorPagina: registrosPorPagina,
                                totalPaginas: 10,
                                setPaginaActual: () => {},
                                setOffset: () => {}
                            }}
                        />
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    );
};

Home.getLayout = function(page) {
    return (
        <SideBarLayout>
            {page}
        </SideBarLayout>
    );
};