'use client'

// Componentes propios.
import React from "react";
import SideBarLayout from "../../components/Layout/sideBarLayout";

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