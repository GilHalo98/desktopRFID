'use client'

// React.
import React from "react";

// Componentes propios.
import SideBarLayout from "../../components/Layout/sideBarLayout";

// Modelo de datos.

export default function Home() {
    return (
        <React.Fragment>
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
