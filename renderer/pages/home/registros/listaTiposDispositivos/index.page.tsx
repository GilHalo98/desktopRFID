'use client'

// Componentes de reactstrap.
import { Container, Row, Col } from "reactstrap";

// Componentes propios.
import TablaTiposDispositivos from "../../../../components/tablas/tablaTiposDispositivos/tablaTiposDispositivos";
import React from "react";
import SideBarLayout from "../../../../components/Layout/sideBarLayout";

export default function ListaTiposDispostivos() {
    return (
        <React.Fragment>
            <Container fluid>
                <Row>
                    <Col>
                        <TablaTiposDispositivos/>
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    );
};

ListaTiposDispostivos.getLayout = function(page) {
    return <SideBarLayout>{page}</SideBarLayout>;
};