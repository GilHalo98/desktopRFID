'use client'

// Componentes propios.
import React from "react";
import SideBarLayout from "../../components/Layout/sideBarLayout";
import Grid from "../../components/grids/grid";

export default function Home() {
    return (
        <React.Fragment>
            <Grid
                tituloGrid="prueba"
                paginacion={{
                    paginaActual: 1,
                    offset: 0,
                    registrosPorPagina: 12,
                    totalPaginas: 10,
                    setPaginaActual: () => {},
                    setOffset: () => {},
                }}
                funcionesOpciones={{
                    onAgregarRegistro: () => {},
                    onRefrescarGrid: () => {},
                    onProbarSerial: () => {},
                    onCambiarConfiguracion: () => {},
                }}
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