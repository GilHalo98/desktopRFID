'use client'
import logo from '../../public/images/logo.png'
import Image from 'next/image';
// Datos a usar en el componente.
import paginas from './logic/poblarSideBar';
import { useRouter, push } from 'next/router';

// Componentes de React.
import {
    Nav, NavLink, NavItem,
    Button,
    UncontrolledCollapse
} from 'reactstrap';
import React from 'react';
import Icon from '@mdi/react';

export default function SideBar(
    props: any
) {
    // Instanciamos un ruter.
    const ruter = useRouter();

    // Consultamos la pagina actual.
    const paginaActual = ruter.pathname;

    return(
        <div
            className='
                sidebar
                nav
                nav-pills
                flex-column
                bg-dark
                border-bottom
                border-body
                v-pills-tabContent
            '
        >
            { /* Mostramos el logo de la empresa en el sidebar */ }
            <div>
                <Image
                    src={logo}
                    height={60}
                    width={81}
                />
            </div>

            { /* Separador del sidebar */ }
            <div className='separacionNavegacion'/>

            { /* Mostramos la lista de navegacion */ }
            <Nav pills fill>
                {paginas.map((pagina) => {
                    if(!pagina.subdivicion) {
                        return(
                            <>
                            <NavItem key={pagina.id}>
                                <NavLink
                                    active={paginaActual == pagina.url ? true : false}
                                    key={pagina.id}
                                    href={pagina.url}
                                    aria-current="page"
                                >
                                    <Icon path={pagina.icono} size={1} />
                                    {pagina.descripcion}
                                </NavLink>
                            </NavItem>
                            </>
                        );
                    }

                    return(
                        <div key={pagina.id} style={{width: '100%'}}>
                            <Button
                                className="botonDivicionSubPaginas"
                                color="primary"
                                block 
                                outline
                                id={pagina.id}
                            >
                                <Icon path={pagina.icono} size={1} />
                                {pagina.descripcion}
                            </Button>

                            <UncontrolledCollapse toggler={"#" + pagina.id} navbar>
                                {pagina.subdivicion.map((subpagina) => {
                                    return(
                                        <NavItem key={subpagina.id}>
                                            <NavLink
                                                active={paginaActual == subpagina.url ? true : false}
                                                key={subpagina.id}
                                                href={subpagina.url}
                                                aria-current="page"
                                            >
                                                <Icon path={subpagina.icono} size={1} /> {subpagina.descripcion}
                                            </NavLink>
                                       </NavItem>
                                    );
                                })}
                            </UncontrolledCollapse>
                        </div>
                    );
                })}
            </Nav>

            { /* Salto de linea */ }
            <br/>

            { /* Mostramos el boton de logout */ }
            <Button
                className='botonLogout'
                color='warning'
                outline
                onClick={() => {
                    // Terminamos la sesion con el socket server.
                    window.ipc.send('sesion_terminada', undefined);
                    
                    // Eliminamos el token de acceso.
                    sessionStorage.removeItem('token');

                    // Movemos la pagina a la vista login.
                    push('/');
                }}
                size='sm'
            >
                Log-Out
            </Button>
        </div>
    );
};