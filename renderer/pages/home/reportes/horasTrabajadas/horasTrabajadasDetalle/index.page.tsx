'use client'

// React.
import React from "react";

// Hook del router de next.
import {
    NextRouter,
    useRouter
} from "next/router";

// Interfaz de datos pasados como querry.
import {
    ParsedUrlQuery
} from "querystring";

// Componentes propios.
import SideBarLayout from "../../../../../components/Layout/sideBarLayout";
import GridReporteDetalleHorasTrabajadas from "../../../../../components/grids/gridReporteDetalleHorasTrabajadas/gridReporteDetalleHorasTrabajadas";

export default function Home() {
    // Hook del router.
    const router: NextRouter = useRouter();

    // Desempaquetamos la informacion.
    const datosReporte: ParsedUrlQuery = router.query;

    return (
        <React.Fragment>
            <GridReporteDetalleHorasTrabajadas
                datosReporte={datosReporte}
            />
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
