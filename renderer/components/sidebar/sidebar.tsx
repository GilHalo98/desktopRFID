'use client'

// React
import React from 'react';

// Logotipo o membrete de la empresa.
import logo from '../../public/images/logo.png';

// Iconos.
import {
    mdiLogout,
    mdiMenuClose,
    mdiMenuOpen
} from '@mdi/js';

// Componente de next para renderizar imagenes.
import Image from 'next/image';

// Datos a usar en el componente.
import paginas from './logic/poblarSideBar';

// Enrutador de next.
import {
    useRouter
} from 'next/router';

// Componentes de React.
import {
    ButtonGroup, Button,
    Nav, NavItem
} from 'reactstrap';

// Componente para renderizar los iconos.
import Icon from '@mdi/react';

// Logica de la vista.
import renderizarNavegacion from './logic/renderizarNavegacion';

export default function SideBar(
    props: any
) {
    // Hook del menu.
    const [
        menuCompacto,
        setMenuCompacto
    ] = React.useState(false);

    // Hooks del rol del usuario.
    const [
        rol,
        setRol
    ] = React.useState(undefined);

    // React useEffect que carga el rol del usuario.
    React.useEffect(() => {
        if(window.sessionStorage.getItem('rol')) {
            setRol(
                parseInt(window.sessionStorage.getItem('rol'))
            );
        }
    }, []);

    // Refrescamos el componente.
    React.useEffect(() => {
        console.log('refrescamiento del componente');
    }, [rol]);

    // Instanciamos un ruter.
    const ruter = useRouter();

    // Consultamos la pagina actual.
    const paginaActual = ruter.pathname;

    const estadoBarra = menuCompacto ?
        "barraNavegacion-compacto"
        : "barraNavegacion";

    return(
        <Nav
            className={
                estadoBarra
                + " nav nav-pills bg-dark v-pills-tabContent"
            }
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
                            ruter.push('/');
                        }}
                        size='sm'
                    >
                        <Icon path={mdiLogout} size={1}/>
                    </Button>

                    <Button
                        className='botonCompactarSideBar'
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
                rol,
                menuCompacto
            )}
        </Nav>
    );
};