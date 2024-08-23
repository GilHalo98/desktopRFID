'use client'

// React.
import React from 'react';

// Iconos del header.
import { mdiFileDocumentPlus, mdiFileMinus, mdiPrinter } from '@mdi/js';

// Componente del icono.
import Icon from '@mdi/react';

// Componentes de reacstrap
import {
    Button,
    Container, Row, Col,
    Card, CardHeader, CardBody, ButtonGroup, Table
} from 'reactstrap';

export default function CardHeaderReporteDibujo(
    props: {
        paginas: Pagina[]
        indexPaginaActual: number
        setIndexPaginaActual: Function
        funcionesOpciones: {
            onEliminarPagina: Function
            onImprimirArchivo: Function
            onAgregarNuevaPagina: Function
        }
    }
) {

    return(
        <React.Fragment>
            <Card color='dark'>
                <CardHeader className="text-white">
                    <Container>
                        <Row>
                            <Col>
                                Reportes
                            </Col>

                            <Col sm={2}>
                                <ButtonGroup>
                                    <Button color="success" size='sm' outline
                                        style={{
                                            border: 'none'
                                        }}
                                        onClick={() => {
                                            props.funcionesOpciones.onAgregarNuevaPagina();
                                        }}
                                    >
                                        <Icon path={mdiFileDocumentPlus} size={1}/>
                                    </Button>

                                    <Button color="danger" size='sm' outline
                                        style={{
                                            border: 'none'
                                        }}
                                        onClick={() => {
                                            props.funcionesOpciones.onEliminarPagina(
                                                props.indexPaginaActual
                                            );
                                        }}
                                    >
                                        <Icon path={mdiFileMinus} size={1}/>
                                    </Button>

                                    <Button color="primary" size='sm' outline
                                        style={{
                                            border: 'none'
                                        }}
                                        onClick={() => {
                                            props.funcionesOpciones.onImprimirArchivo();
                                        }}
                                    >
                                        <Icon path={mdiPrinter} size={1} />
                                    </Button>
                                </ButtonGroup>
                            </Col>
                        </Row>
                    </Container>
                </CardHeader>

                {/* Barra de navegacion para las paginas */}
                <CardBody className="text-white">
                    <Table dark responsive borderless>
                        <tbody>
                            <tr>
                            {props.paginas.map((
                                pagina: Pagina,
                                index: number
                            ) => {                                
                                return(
                                    <td
                                        style={{padding: '0%'}}
                                    >
                                        <Button
                                            block
                                            outline
                                            color='warning'
                                            style={{
                                                border: '0px',
                                                borderRadius: '0px',
                                                whiteSpace: 'nowrap'
                                            }}
                                            active={
                                                index == props.indexPaginaActual?
                                                    true : false
                                            }
                                            onClick={() => {
                                                props.setIndexPaginaActual(
                                                    index
                                                );
                                            }}
                                        >
                                            Pagina {index + 1}
                                        </Button>
                                    </td>
                                );
                            })}
                            </tr>
                        </tbody>
                    </Table>
                </CardBody>
            </Card>
        </React.Fragment>
    );
};