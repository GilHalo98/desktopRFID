// Componentes de React.
import React from 'react';

// Componente de reacstrap.
import {
    Button,
    Nav, NavLink, NavItem,
    UncontrolledCollapse, UncontrolledTooltip
} from 'reactstrap';

// Componente para renderizar los iconos.
import Icon from '@mdi/react';

// Funcion para renderizar la navegacion.
const renderizarNavegacion = (
    paginaActual: string,
    paginas: {
        id: string,
        descripcion: string,
        icono: string,
        url?: string,
        subdivicion?: any[]
    }[],
    modoCompacto?: boolean
) => {
    /*
    * Funcion para renderizar el contenido de la barra
    * de navegación.
    */
    return(paginas.map((pagina) => {
        // Por cada pagina, si esta no tiene sub-divición, entonces
        // se renderiza como un link.
        if(!pagina.subdivicion) {
            // Obtenemos el nombre de la pagina del url.
            const paginaUrl = pagina.url.split('/').pop();

            return(
                <NavItem key={pagina.id}>
                    <Button
                        id={paginaUrl}
                        className="botonBarraNavegacion"
                        active={paginaActual == pagina.url ? true : false}
                        key={pagina.id}
                        href={pagina.url}
                        aria-current="page"
                        color="primary"
                        block 
                        outline
                        size='sm'
                    >
                        <Icon
                            className='iconoBoton'
                            path={pagina.icono}
                            size={2}
                        />
                        {/*
                            * Si el sidebar se encuentra en modo
                            * compacto mostramo un tooltip
                        */}
                        {modoCompacto ?
                            <UncontrolledTooltip
                                placement="right"
                                target={paginaUrl}
                            >
                                {pagina.descripcion}
                            </UncontrolledTooltip> : pagina.descripcion
                        }
                    </Button>
                </NavItem>
            );
        }

        // Sub-divicion activa.
        let subDivicionActiva = false;

        // Generamos las sub-diviciones.
        const subDiviciones = pagina.subdivicion.map((subpagina) => {
            // Si la pagina activa se encuentra en la sub-divicion.
            if(paginaActual == subpagina.url) {
                // Activamos el collapside de la subdivicion.
                subDivicionActiva = true;
            }

            // Obtenemos el nombre de la pagina del url.
            const subPaginaUrl = subpagina.url.split('/').pop();

            return(
                <Button
                    id={subPaginaUrl}
                    className="botonBarraNavegacion"
                    active={paginaActual == subpagina.url ? true : false}
                    key={subpagina.id}
                    href={subpagina.url}
                    aria-current="page"
                    color="primary"
                    block
                    outline
                    size='sm'
                >
                    <Icon
                        className='iconoBoton'
                        path={subpagina.icono}
                        size={2}
                    />
                    {/*
                        * Si el sidebar se encuentra en modo
                        * compacto mostramo un tooltip
                    */}
                    {modoCompacto ?
                        <UncontrolledTooltip
                            placement="right"
                            target={subPaginaUrl}
                        >
                            {subpagina.descripcion}
                        </UncontrolledTooltip> : subpagina.descripcion
                    }
                </Button>
            );
        });

        // En caso de que tenga sub-divición.
        return(
            <NavItem key={pagina.id}>
                <Button
                    id={pagina.id}
                    className="botonBarraNavegacion"
                    color="primary"
                    active={subDivicionActiva}
                    block 
                    outline
                    size='sm'
                >
                    <Icon
                        className='iconoBoton'
                        path={pagina.icono}
                        size={2}
                    />
                    {/*
                        * Si el sidebar se encuentra en modo
                        * compacto mostramo un tooltip
                    */}
                    {modoCompacto ?
                        <UncontrolledTooltip
                            placement="right"
                            target={pagina.id}
                        >
                            {pagina.descripcion}
                        </UncontrolledTooltip> : pagina.descripcion
                    }
                </Button>

                <UncontrolledCollapse
                    className='subMenuBarraNavegacion'
                    toggler={"#" + pagina.id}
                    defaultOpen={subDivicionActiva}
                    navbar
                >
                    {/* Renderizamos las subdiviciones */}
                    {subDiviciones}
                </UncontrolledCollapse>
            </NavItem>
        );
    }));
};

// Retornamos las paginas como un modulo.
export default renderizarNavegacion;