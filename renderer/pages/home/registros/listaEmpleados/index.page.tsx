'use client'

import React from "react";

// Componentes de reactstrap.
import { Container, Row, Col } from "reactstrap";

// Componentes propios.
import SideBarLayout from "../../../../components/Layout/sideBarLayout";
import GridRegistrosEmpleados from "../../../../components/grids/gridRegistrosEmpleados/gridRegistrosEmpleados";

export default function ListaEmpleados() {
    return (
        <React.Fragment>
            <Container fluid>
                <Row>
                    <Col>
                        <GridRegistrosEmpleados/>
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    );
};

ListaEmpleados.getLayout = function(page) {
    return <SideBarLayout>{page}</SideBarLayout>;
};