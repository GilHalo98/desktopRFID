'use client'

import logo from '../public/images/logo.png'

// Componentes de reactstrap.
import {
    Card,
    Button,
    Container, Row, Col
} from "reactstrap";

// Componentes propios.
import React from "react";
import Image from 'next/image';
import Router from 'next/router';

import FormLogin from '../components/forms/login/formLogin';

import RootLayout from '../components/Layout/rootLayout';
import { LoginUsuario } from '../utils/API/interface/usuarios';
import { BASE_URL } from '../utils/API/endpoints';

export default function Login() {
    // Hooks para los datos del login.
    const [userName, setUserName] = React.useState(undefined);
    const [password, setPassword] = React.useState(undefined);
    const [
        recordarSesion,
        setRecordarSesion
    ] = React.useState(undefined);

    // Hook para el estado del indicador de carga.
    const [enCarga, setEnCarga] = React.useState(false);

    // Hook para la alerta temporal.
    const [mostrarAlerta, setMostrarAlerta] = React.useState(false);

    // Funcion de inicio de sesion.
    const iniciarSesion = () => {
        LoginUsuario(
            {
                nombreUsuario: userName,
                password: password,
                alwaysOn: recordarSesion
            },
            (respuesta: any) => {
                if(respuesta.authorization) {
                    // Guardamos el token de acceso.
                    sessionStorage.setItem(
                        'token',
                        respuesta.authorization
                    );
                }

            },
            (error: any) => {
                console.log(error);
                // Terminamos la pantalla de carga.
                setEnCarga(false);
            },
            () => {
                // Iniciamos la pantalla de carga.
                setEnCarga(true);
            },
            () => {
                // Si existe un token guardado.
                if(window.sessionStorage.getItem('token')) {
                    // Iniciamos la sesion con el servidor socket.
                    window.ipc.send('sesion_iniciada', {
                        ipServer: BASE_URL,
                        token: window.sessionStorage.getItem('token')
                    });

                    // Se hace el cambio de pagina a
                    // la pagina principal.
                    Router.push('/home');
                }

                // Terminamos la pantalla de carga.
                setEnCarga(false);
            },
        );
    };

    return (
        <React.Fragment>
            <Card className='cardLogin' color='dark'>
                <Container fluid>
                    <Row>
                        <Col/>
                        <Col xs="auto">
                            <h1 className='tituloLogin'>
                                <Image
                                    src={logo}
                                    height={120}
                                    width={162}
                                />
                                <br/>
                                AC Automatización
                                <div className='separadorTituloLogin'/>
                            </h1>
                        </Col>
                        <Col/>
                    </Row>
                    <br/>
                    <Row>
                        <FormLogin
                            setUserName={setUserName}
                            setPassword={setPassword}
                            setRecordarSesion={setRecordarSesion}
                            enCarga={enCarga}
                        />
                    </Row>
                    <Row>
                        <Col sm='0' md='2'/>

                        <Col sm='12' md='8' >
                            <Button
                                block
                                outline
                                color='success'
                                onClick={iniciarSesion}
                            >
                                Iniciar sesión
                            </Button>
                        </Col>

                        <Col sm='0' md='2'/>
                    </Row>
                </Container>
            </Card>
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