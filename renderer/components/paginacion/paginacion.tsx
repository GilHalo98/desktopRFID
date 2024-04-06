import React from 'react';

import { poblarPaginacion } from './logic/poblarPaginacion';
import {
    primeraPagina,
    siguientePagina,
    ultimaPagina,
    anteriorPagina,
    haciaPagina
} from './logic/logicPaginacion';

import {
    Container, Row, Col,
    Pagination, PaginationItem, PaginationLink
} from 'reactstrap';

export default function Paginacion(
    props: {
        totalPaginas: number,
        paginaActual: number,
        offset: number,
        elementos: number,
        setPaginaActual: Function,
        setOffset: Function
    }
) {
    // Generamos los botones de la paginacion.
    const paginas = poblarPaginacion(
        props.totalPaginas,
        props.paginaActual,
        3
    );

    return(
        <Container>
            <Row>
                <Col/>
                <Col sm="auto">
                    <Pagination>
                        <PaginationItem disabled={
                            props.paginaActual == 1
                        }>
                            <PaginationLink
                                first
                                href="#"
                                onClick={() => {
                                    primeraPagina(
                                        props.setPaginaActual,
                                        props.setOffset
                                    );
                                }}
                            />
                        </PaginationItem>

                        <PaginationItem disabled={
                            props.paginaActual == 1
                        }>
                            <PaginationLink
                                href="#"
                                previous
                                onClick={() => {
                                    anteriorPagina(
                                        props.paginaActual,
                                        props.offset,
                                        props.elementos,
                                        props.setPaginaActual,
                                        props.setOffset
                                    );
                                }}
                            />
                        </PaginationItem>

                        {paginas.map((pagina: number, index: number) => {
                            return(
                                <PaginationItem
                                    active={pagina == props.paginaActual}
                                >
                                    <PaginationLink
                                        href="#"
                                        key={index}
                                        onClick={() => {
                                            haciaPagina(
                                                pagina,
                                                props.elementos,
                                                props.setPaginaActual,
                                                props.setOffset
                                            );
                                        }}
                                    >
                                        {pagina}
                                    </PaginationLink>
                                </PaginationItem>
                            );
                        })}

                        <PaginationItem disabled={
                            props.paginaActual == props.totalPaginas
                        }>
                            <PaginationLink
                                href="#"
                                next
                                onClick={() => {
                                    siguientePagina(
                                        props.paginaActual,
                                        props.offset,
                                        props.elementos,
                                        props.setPaginaActual,
                                        props.setOffset
                                    );
                                }}
                            />
                        </PaginationItem>

                        <PaginationItem disabled={
                            props.paginaActual == props.totalPaginas
                        }>
                            <PaginationLink
                                href="#"
                                last
                                onClick={() => {
                                    ultimaPagina(
                                        props.totalPaginas,
                                        props.elementos,
                                        props.setPaginaActual,
                                        props.setOffset
                                    );
                                }}
                            />
                        </PaginationItem>
                    </Pagination>
                </Col>
                <Col/>
            </Row>
        </Container>
    );
};