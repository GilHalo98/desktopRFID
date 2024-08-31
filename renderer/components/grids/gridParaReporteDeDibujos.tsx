'use client'

// React.
import React from "react";

// Reactstrap.
import {
    Container, Row, Col,
} from "reactstrap";

// Componentes propios.
import IndicadorCargaSpinner from "../cargas/indicadorCargaSpinner";
import ModalRemoverDibujo from "../../components/modals/modalAlerta/modalRemoverDibujo";
import CardHeaderReporteDibujo from "../../components/cards/cardHeader/cardHeaderReporteDibujo";
import ModalGenerarReporteDibujo from "../../components/modals/modalOpciones/modalGenerarReporteDibujo";
import ModalDatosIncompletosDibujo from "../../components/modals/modalAlerta/modalDatosIncompletosDibujo";
import ModalCopiarContenidoDibujo from "../../components/modals/modalOpciones/modalCopiarContenidoDibujo";

// Modelo de datos.

export default function GridParaReporteDeDibujos(
    props: {
        enCarga: boolean
        paginas: Pagina[]
        paginasNoOk: {
            pagina: Pagina
            numeroPagina: number
        }[]
        indexPaginaActual: number
        setIndexPaginaActual: Function
        funcionesOpciones: {
            onEliminarPagina: Function
            onImprimirArchivo: Function
            onAgregarNuevaPagina: Function
            onDuplicarContenido: Function
        }
        children?: any
    }
) {
    // Hooks de estados de modal.
    const [
        estadoModalFaltaDatosDibujo,
        setEstadoModalFaltaDatosDibujo
    ] = React.useState(false);

    const [
        estadoModalRemoverDibujo,
        setEstadoModalRemoverDibujo
    ] = React.useState(false);

    const [
        estadoModalCopiarContenidoPagina,
        setEstadoModalCopiarContenidoPagina
    ] = React.useState(false);

    const [
        estadoModalGenerarReporte,
        setEstadoModalGenerarReporte
    ] = React.useState(false);

    const renderContenido = () => {
        if(props.enCarga) {
            return(
                <React.Fragment>
                    <br/>
                    <IndicadorCargaSpinner/>
                </React.Fragment>
            );
        }

        return props.children;
    }

    return (
        <React.Fragment>
            <Container fluid>
                {/* Barra de navegacion */}
                <Row>
                    <Col>
                        <CardHeaderReporteDibujo
                            paginas={props.paginas}
                            deshabilitarAgregarPagina={props.enCarga}
                            indexPaginaActual={props.indexPaginaActual}
                            setIndexPaginaActual={props.setIndexPaginaActual}
                            funcionesOpciones={{
                                onEliminarPagina: () => {
                                    setEstadoModalRemoverDibujo(!estadoModalRemoverDibujo);
                                },
                                onImprimirArchivo: () => {
                                    setEstadoModalGenerarReporte(!estadoModalGenerarReporte);
                                },
                                onCopiarContenidoPagina: () => {
                                    setEstadoModalCopiarContenidoPagina(!estadoModalCopiarContenidoPagina);
                                },
                                onAgregarNuevaPagina: props.funcionesOpciones.onAgregarNuevaPagina
                            }}
                        />
                    </Col>
                </Row>

                {renderContenido()}
            </Container>

            <ModalDatosIncompletosDibujo
                paginas={props.paginasNoOk}
                modalActivo={estadoModalFaltaDatosDibujo}
                toggleModal={() => {
                    setEstadoModalFaltaDatosDibujo(
                        !estadoModalFaltaDatosDibujo
                    );
                }}
            />

            <ModalRemoverDibujo
                numeroPagina={props.indexPaginaActual + 1}
                modalActivo={estadoModalRemoverDibujo}
                toggleModal={() => {
                    setEstadoModalRemoverDibujo(!estadoModalRemoverDibujo);
                }}
                onOk={props.funcionesOpciones.onEliminarPagina}
                onCancelar={() => {}}
            />

            <ModalCopiarContenidoDibujo
                paginas={props.paginas}
                indexPaginaActual={props.indexPaginaActual}
                modalActivo={estadoModalCopiarContenidoPagina}
                toggleModal={() => {
                    setEstadoModalCopiarContenidoPagina(
                        !estadoModalCopiarContenidoPagina
                    );
                }}
                onOk={props.funcionesOpciones.onDuplicarContenido}
                onCancelar={() => {}}
            />

            <ModalGenerarReporteDibujo
                paginas={props.paginas}
                indexPaginaActual={props.indexPaginaActual}
                modalActivo={estadoModalGenerarReporte}
                toggleModal={() => {
                    setEstadoModalGenerarReporte(!estadoModalGenerarReporte);
                }}
                onOk={(
                    orientacionHoja: "p" | "portrait" | "l" | "landscape",
                    unidadesHoja: "pt" | "px" | "in" | "mm" | "cm" | "ex" | "em" | "pc",
                    formatoHoja: string,
                    setProgresoRenderizado: Function,
                    toggleModalGenerarReporte: Function
                ) => {
                    props.funcionesOpciones.onImprimirArchivo(
                        orientacionHoja,
                        unidadesHoja,
                        formatoHoja,
                        () => {setEstadoModalFaltaDatosDibujo(
                            !estadoModalFaltaDatosDibujo
                        )},
                        setProgresoRenderizado,
                        toggleModalGenerarReporte
                    );
                }}
                onCancelar={() => {}}
            />
        </React.Fragment>
    );
};
