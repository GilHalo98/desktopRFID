'use client'

// React.
import React from "react";

// Componentes propios
import SideBarLayout from "../../../components/Layout/sideBarLayout";

export default function Empleados() {
    return (
        <React.Fragment>
        </React.Fragment>
    );
};

Empleados.getLayout = function(page) {
    return (
        <SideBarLayout>
            {page}
        </SideBarLayout>
    );
};