'use client'

// React.
import React from "react";

// Componentes de reactstrap.
import { Container, Row, Col } from "reactstrap";

// Componentes propios.
import SideBarLayout from "../../../../components/Layout/sideBarLayout";
import TablaUsuarios from "../../../../components/tablas/tablaUsuarios/tablaUsuarios";

export default function ListaUsuarios() {
    return (
        <React.Fragment>
            <Container fluid>
                <Row>
                    <Col>
                        <TablaUsuarios/>
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    );
};

ListaUsuarios.getLayout = function(page) {
    return <SideBarLayout>{page}</SideBarLayout>;
};