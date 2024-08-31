'use client'

// React.
import React from 'react';

// Iconos del header.
import { mdiFileDocumentPlus, mdiFileMinus, mdiPrinter } from '@mdi/js';

// Componente del icono.
import Icon from '@mdi/react';

// Componentes de reacstrap
import {
    Nav, NavLink, NavItem, Button, Table
} from 'reactstrap';

export default function NavegacionReporteDibujos(
    props: {
        paginas: Pagina[]
        indexPaginaActual: number
        setIndexPaginaActual: Function
    }
) {

    return(
        <React.Fragment>
            <Table dark responsive borderless className='navReportesDibujos'>
                <tbody>
                    <tr>
                        {props.paginas.map((
                            pagina: Pagina,
                            index: number
                        ) => {
                            return(
                                <td
                                    style={{padding: '0%'}}
                                >
                                    <Button
                                        block
                                        size='sm'
                                        className='botonNavReportesDibujo'
                                        active={
                                            index == props.indexPaginaActual?
                                                true : false
                                        }
                                        onClick={() => {
                                            props.setIndexPaginaActual(
                                                index
                                            );
                                        }}
                                    >
                                        Pagina {index + 1}
                                    </Button>
                                </td>
                            );
                        })}
                    </tr>
                </tbody>
            </Table>
        </React.Fragment>
    );
};