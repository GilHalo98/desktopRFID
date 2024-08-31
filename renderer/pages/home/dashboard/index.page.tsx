'use client'

// React.
import React from "react";

// Componentes propios
import SideBarLayout from "../../../components/Layout/sideBarLayout";

export default function Dashboard() {
    return (
        <React.Fragment>
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