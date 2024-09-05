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
        registrosPorPagina: number,
        setPaginaActual: Function,
        setOffset: Function,
        sendToTop?: boolean
    }
) {
    // Generamos los botones de la paginacion.
    const paginas = poblarPaginacion(
        props.totalPaginas,
        props.paginaActual,
        3
    );

    // Indicamos que si al cambiar de pagina mandamos el enfoque al top.
    const toTop: string = props.sendToTop? '#' : '';

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
                                href={toTop}
                                first
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
                                href={toTop}
                                previous
                                onClick={() => {
                                    anteriorPagina(
                                        props.paginaActual,
                                        props.offset,
                                        props.registrosPorPagina,
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
                                        href={toTop}
                                        key={index}
                                        onClick={() => {
                                            haciaPagina(
                                                pagina,
                                                props.registrosPorPagina,
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
                                href={toTop}
                                next
                                onClick={() => {
                                    siguientePagina(
                                        props.paginaActual,
                                        props.offset,
                                        props.registrosPorPagina,
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
                                href={toTop}
                                last
                                onClick={() => {
                                    ultimaPagina(
                                        props.totalPaginas,
                                        props.registrosPorPagina,
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