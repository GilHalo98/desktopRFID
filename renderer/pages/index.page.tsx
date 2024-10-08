'use client'

// React.
import React from "react";

// Componentes propios.

// Componentes propios
import RootLayout from '../components/Layout/rootLayout';
import CardVistaLogin from '../components/cards/cardLogin/cardLogin';

export default function Login() {
    return (
        <React.Fragment>
            <CardVistaLogin/>
        </React.Fragment>
    );
};

Login.getLayout = function(page) {
    return (
        <RootLayout>
            {page}
        </RootLayout>
    );
};