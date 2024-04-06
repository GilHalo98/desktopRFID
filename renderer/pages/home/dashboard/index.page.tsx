'use client'

// Componentes de reactstrap.
import {
    Container, Row, Col,
    Card
} from "reactstrap";

// Componentes propios.
import ListaAccesosRecientes from "../../../components/listas/listaAccesosRecientes/listaAccesosRecientes";
import GraficoAccesos from "../../../components/graficos/graficoAccesos";
import GraficoReportePorTipo from "../../../components/graficos/graficoReportePorTipo";
import React from "react";
import SideBarLayout from "../../../components/Layout/sideBarLayout";

export default function Dashboard() {
    return (
        <React.Fragment>
            <Container fluid>
                <Row>
                    <Col>
                        <ListaAccesosRecientes/>
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col sm={12} md={6} style={{paddingBottom: 10}}>
                        {/*<AccesosPorEmpleado/>*/}
                        <GraficoAccesos/>
                    </Col>

                    <Col sm={12} md={6} style={{paddingBottom: 10}}>
                        {/*<ErroresPorDispositivo/>*/}
                        <GraficoReportePorTipo/>
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    );
};

Dashboard.getLayout = function(page) {
    return (
        <SideBarLayout>
            {page}
        </SideBarLayout>
    );
};