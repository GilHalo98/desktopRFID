// React.
import React from "react";

// Componentes de reactstrap.
import {
    Row, Col
} from "reactstrap";

// Componentes propios.
import CardNotas from "../../../cards/cardVistas/cardNotas";
import CardDibujoDatos from "../../../cards/cardVistas/cardDibujoDatos";
import CardDatosProyecto from "../../../cards/cardVistas/cardDatosProyecto";
import CardDatosProgramador from "../../../cards/cardVistas/cardDatosProgramador";
import TablaHerramienta from "../../../tablas/tablaHerramientas/tablaHerramientas";
import CardAgregarRegistroDibujo from "../../../cards/cardVistas/cardAgregarRegistroDibujo";

// Rutinas.
import {
    onGuardarCambios,
    onAgregarHerramienta,
    onRemoverHerramienta
} from "./rutinas";

// DataTest.
import {
    montajes,
    proyectos,
    NoDibujos,
    herramientas,
    listaTooling,
    listaClientes,
    medidaHerramienta,
    operacionHerramienta
} from "./testData";

// Modelos de datos.
import {
    Empleado
} from "../../../../utils/API/modelos/empleado";

const renderizarContenido = (
    pagina: Pagina,
    setPaginas: Function,
    paginas: Pagina[],
    listaRegistros: Empleado[]
) => {
    if(pagina) {
        return(
            <React.Fragment>
                <br/>

                {/* Datos del cliente y el proyecto */}
                <Row>
                    <Col>
                        <CardDatosProyecto
                            pagina={pagina}
                            paginas={paginas}
                            registrosOpciones={{
                                listaClientes: listaClientes,
                                proyectos: proyectos
                            }}
                            funcionesOpciones={{
                                onGuardarCambios: (
                                    datoNuevo: any,
                                    dirA?: string | number,
                                    dirB?: string | number,
                                    dirC?: string | number
                                ) => {
                                    onGuardarCambios(
                                        pagina,
                                        setPaginas,
                                        paginas,
                                        datoNuevo,
                                        dirA,
                                        dirB,
                                        dirC
                                    );
                                }
                            }}
                        />
                    </Col>
                </Row>

                <br/>

                {/* Datos del programa y el programador */}
                <Row>
                    <Col>
                        <CardDatosProgramador
                            pagina={pagina}
                            funcionesOpciones={{
                                onGuardarCambios: (
                                    datoNuevo: any,
                                    dirA?: string | number,
                                    dirB?: string | number,
                                    dirC?: string | number
                                ) => {
                                    onGuardarCambios(
                                        pagina,
                                        setPaginas,
                                        paginas,
                                        datoNuevo,
                                        dirA,
                                        dirB,
                                        dirC
                                    );
                                }
                            }}
                            datosOpciones={{
                                listaProgramadores: listaRegistros
                            }}
                        />
                    </Col>
                </Row>

                <br/>

                {/* Imagen  y datos del dibujo y tabla de herramientas */}
                <Row>
                    {/* Tabla de herramientas */}
                    <Col sm={5}>
                        <TablaHerramienta
                            pagina={pagina}
                            maximoDatos={8}
                            funcionesOpciones={{
                                onAgregarHerramienta: () => {
                                    onAgregarHerramienta(
                                        pagina,
                                        setPaginas,
                                        paginas,
                                    );
                                },
                                onRemoverHerramienta: (index:number) => {
                                    onRemoverHerramienta(
                                        pagina,
                                        setPaginas,
                                        paginas,
                                        index
                                    );
                                },
                                onGuardarCambios: (
                                    datoNuevo: any,
                                    dirA?: string | number,
                                    dirB?: string | number,
                                    dirC?: string | number
                                ) => {
                                    onGuardarCambios(
                                        pagina,
                                        setPaginas,
                                        paginas,
                                        datoNuevo,
                                        dirA,
                                        dirB,
                                        dirC
                                    );
                                }
                            }}
                            datosOpciones={{
                                listaTooling: listaTooling,
                                herramientas: herramientas,
                                medidaHerramienta: medidaHerramienta,
                                operacionHerramienta: operacionHerramienta
                            }}
                        />
                    </Col>

                    {/* Imagen y datos del dibujo */}
                    <Col>
                        <CardDibujoDatos
                            pagina={pagina}
                            paginas={paginas}
                            registrosOpciones={{
                                NoDibujos: NoDibujos,
                                listaMontajes: montajes
                            }}
                            funcionesOpciones={{
                                onGuardarCambios: (
                                    datoNuevo: any,
                                    dirA?: string | number,
                                    dirB?: string | number,
                                    dirC?: string | number
                                ) => {
                                    onGuardarCambios(
                                        pagina,
                                        setPaginas,
                                        paginas,
                                        datoNuevo,
                                        dirA,
                                        dirB,
                                        dirC
                                    );
                                }
                            }}
                        />
                    </Col>
                </Row>

                <br/>

                {/* Notas */}
                <Row>
                    <Col/>
                    <Col sm={6}>
                        <CardNotas
                            pagina={pagina}
                            funcionesOpciones={{
                                onGuardarCambios: (
                                    datoNuevo: any,
                                    dirA?: string | number,
                                    dirB?: string | number,
                                    dirC?: string | number
                                ) => {
                                    onGuardarCambios(
                                        pagina,
                                        setPaginas,
                                        paginas,
                                        datoNuevo,
                                        dirA,
                                        dirB,
                                        dirC
                                    );
                                }
                            }}
                        />
                    </Col>
                    <Col/>
                </Row>
            </React.Fragment>
        );
    }

    return(
        <>
            <br/>
            <Row>
                <Col sm={3}/>

                <Col>
                    <CardAgregarRegistroDibujo/>
                </Col>

                <Col sm={3}/>
            </Row>
        </>
    );
}

export {
    renderizarContenido
}
