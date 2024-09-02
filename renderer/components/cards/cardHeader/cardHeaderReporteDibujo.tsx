'use client'

// React.
import React from 'react';

// Iconos del header.
import {
    mdiFileDocumentPlus,
    mdiFileDocumentMinus,
    mdiContentCopy,
    mdiFileMove
} from '@mdi/js';

// Componente del icono.
import Icon from '@mdi/react';

// Componentes de reacstrap
import {
    Container, Row, Col,
    Card, CardHeader, CardBody,
    ButtonGroup, Button, UncontrolledTooltip
} from 'reactstrap';
import NavegacionReporteDibujos from '../../navegacion/navegacionReporteDibujos/navegacionReporteDibujos';

export default function CardHeaderReporteDibujo(
    props: {
        deshabilitarAgregarPagina: boolean
        paginas: Pagina[]
        indexPaginaActual: number
        setIndexPaginaActual: Function
        funcionesOpciones: {
            onEliminarPagina: Function
            onImprimirArchivo: Function
            onAgregarNuevaPagina: Function
            onCopiarContenidoPagina: Function
        }
    }
) {

    return(
        <React.Fragment>
            <Card color='dark'>
                <CardHeader className="text-white">
                    <Container>
                        <Row>
                            <Col style={{
                            }}>
                                Reportes
                            </Col>

                            <Col style={{
                                textAlign:'right'
                            }}>
                                <ButtonGroup>
                                    {/* Boton para agregar pagina */}
                                    <Button outline
                                        id="botonAgregarPagina"
                                        color="success"
                                        size="sm"
                                        disabled={
                                            props.deshabilitarAgregarPagina
                                        }
                                        target={'botonAgregarPagina'}
                                        style={{
                                            border: 'none'
                                        }}
                                        onClick={() => {
                                            props.funcionesOpciones.onAgregarNuevaPagina();
                                        }}
                                    >
                                        <Icon path={mdiFileDocumentPlus} size={1}/>

                                        <UncontrolledTooltip
                                            placement="bottom"
                                            target="botonAgregarPagina"
                                        >
                                            Agregar pagina
                                        </UncontrolledTooltip>
                                    </Button>

                                    {/* Boton para copiar contenido de otra pagina */}
                                    <Button outline
                                        id="botonCopiarContenidoPagina"
                                        color="primary"
                                        size="sm"
                                        disabled={
                                            props.paginas.length <= 1?
                                            true : false
                                        }
                                        target={'botonCopiarContenidoPagina'}
                                        style={{
                                            border: 'none'
                                        }}
                                        onClick={() => {
                                            props.funcionesOpciones.onCopiarContenidoPagina();
                                        }}
                                    >
                                        <Icon path={mdiContentCopy} size={1}/>

                                        <UncontrolledTooltip
                                            placement="bottom"
                                            target="botonCopiarContenidoPagina"
                                        >
                                            Copiar contenido de otra pagina
                                        </UncontrolledTooltip>
                                    </Button>

                                    {/* Boton para eliminar pagina */}
                                    <Button outline
                                        id="botonEliminarPagina"
                                        color="danger"
                                        size="sm"
                                        disabled={
                                            props.paginas.length <= 0?
                                            true : false
                                        }
                                        style={{
                                            border: 'none'
                                        }}
                                        onClick={() => {
                                            props.funcionesOpciones.onEliminarPagina();
                                        }}
                                    >
                                        <Icon path={mdiFileDocumentMinus} size={1}/>

                                        <UncontrolledTooltip
                                            placement="bottom"
                                            target="botonEliminarPagina"
                                        >
                                            Eliminar pagina
                                        </UncontrolledTooltip>
                                    </Button>

                                    {/* Boton para imprimir paginas */}
                                    <Button outline
                                        id="botonImprimirPagina"
                                        color="primary"
                                        size="sm"
                                        disabled={
                                            props.paginas.length <= 0?
                                            true : false
                                        }
                                        style={{
                                            border: 'none'
                                        }}
                                        onClick={() => {
                                            props.funcionesOpciones.onImprimirArchivo();
                                        }}
                                    >
                                        <Icon path={mdiFileMove} size={1} />

                                        <UncontrolledTooltip
                                            placement="bottom"
                                            target="botonImprimirPagina"
                                        >
                                            Generar Documento PDF
                                        </UncontrolledTooltip>
                                    </Button>
                                </ButtonGroup>
                            </Col>
                        </Row>
                    </Container>
                </CardHeader>

                {/* Barra de navegacion para las paginas */}
                <CardBody>
                    <NavegacionReporteDibujos
                        indexPaginaActual={props.indexPaginaActual}
                        setIndexPaginaActual={props.setIndexPaginaActual}
                        paginas={props.paginas}
                    />
                </CardBody>
            </Card>
        </React.Fragment>
    );
};