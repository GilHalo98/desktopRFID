'use client'

import React from "react";

// Componentes de reactstrap.
import {
    Container, Row, Col,
    Card
} from "reactstrap";

import * as THREE from 'three';

// Componentes propios.
import ListaAccesosRecientes from "../../../../components/listas/listaAccesosRecientes/listaAccesosRecientes";
import SideBarLayout from "../../../../components/Layout/sideBarLayout";
import IndicadorCargaSpinner from "../../../../components/cargas/indicadorCargaSpinner";

export default function AccesosRecientes() {


    return (
        <React.Fragment>
        </React.Fragment>
    );
};

AccesosRecientes.getLayout = function(page) {
    return (
        <SideBarLayout>
            {page}
        </SideBarLayout>
    );
};