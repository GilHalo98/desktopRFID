'use client'
import logo from '../../public/images/logo.png'

import {
    mdiLogout,
    mdiMenuClose,
    mdiMenuOpen
} from '@mdi/js';

import Image from 'next/image';
// Datos a usar en el componente.
import paginas from './logic/poblarSideBar';
import { useRouter, push } from 'next/router';

// Componentes de React.
import {
    Button,
    Nav, NavLink, NavItem,
    UncontrolledCollapse, UncontrolledTooltip,
    Container, Col, Row, ButtonGroup
} from 'reactstrap';
import React from 'react';
import Icon from '@mdi/react';
import renderizarNavegacion from './logic/renderizarNavegacion';

export default function SideBar(
    props: any
) {
    // Hook del menu.
    const [menuCompacto, setMenuCompacto] = React.useState(false);

    // Instanciamos un ruter.
    const ruter = useRouter();

    // Consultamos la pagina actual.
    const paginaActual = ruter.pathname;

    const estadoBarra = menuCompacto ? "barraNavegacion-compacto nav nav-pills bg-dark border-bottom border-body v-pills-tabContent" : "barraNavegacion nav nav-pills bg-dark border-bottom border-body v-pills-tabContent";

    return(
        <Nav
            className={estadoBarra}
        >
            { /* Mostramos el logo de la empresa en el sidebar */ }
            <NavItem>
                <div>
                    <Image
                        src={logo}
                        height={60}
                        width={81}
                    />
                </div>

                { /* Separador del sidebar */ }
                <div className='separacionNavegacion'/>
            </NavItem>

            { /* Salto del grupo de botones del sidebar */ }
            <NavItem>
                <ButtonGroup>
                    <Button
                        className='botonLogout'
                        color='warning'
                        outline
                        block
                        onClick={() => {
                            // Terminamos la sesion con el socket server.
                            window.ipc.send(
                                'sesion_terminada',
                                undefined
                            );
                            
                            // Eliminamos el token de acceso.
                            sessionStorage.removeItem('token');

                            // Movemos la pagina a la vista login.
                            push('/');
                        }}
                        size='sm'
                    >
                        <Icon path={mdiLogout} size={1}/>
                    </Button>

                    <Button
                        className='botonLogout'
                        color='warning'
                        size='sm'
                        outline
                        block
                        onClick={() => {
                            setMenuCompacto(!menuCompacto);
                        }}
                    >
                        {menuCompacto ?
                            <Icon
                                path={mdiMenuClose}
                                size={1}
                            /> : <Icon
                                path={mdiMenuOpen}
                                size={1}
                            />
                        }
                    </Button>
                </ButtonGroup>
            </NavItem>

            { /* Salto del sidebar */ }
            <br/>

            {/* Renderizamos la navegación */}
            {renderizarNavegacion(
                paginaActual,
                paginas,
                menuCompacto
            )}
        </Nav>
    );
};