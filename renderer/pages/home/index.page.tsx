'use client'

// React.
import React from "react";

// Componentes propios.
import SideBarLayout from "../../components/Layout/sideBarLayout";
import GridReporteDetalleHorasTrabajadas from "../../components/grids/gridReporteDetalleHorasTrabajadas/gridReporteDetalleHorasTrabajadas";

// Modelo de datos.

export default function Home() {
    return (
        <React.Fragment>
            <GridReporteDetalleHorasTrabajadas/>
        </React.Fragment>
    );
};

Home.getLayout = function(page) {
    return (
        <SideBarLayout>
            {page}
        </SideBarLayout>
    );
};
