'use client'

// React.
import React from 'react';

// Iconos del header.
import {
    mdiFileDocumentPlus,
    mdiFileMinus,
    mdiPrinter
} from '@mdi/js';

// Componente del icono.
import Icon from '@mdi/react';

// Componentes de reacstrap
import {
    Table,
    Button
} from 'reactstrap';

export default function SubNavegacion(
    props: {
        paginas: {
            nombre: string,
            index: number
        }[]
        indexPaginaActual: number
        setIndexPaginaActual: Function
    }
) {

    return(
        <React.Fragment>
            <Table dark responsive borderless className='subNavegacion'>
                <tbody>
                    <tr>
                        {props.paginas.map((
                            pagina: {
                                nombre: string,
                                index: number
                            }
                        ) => {
                            return(
                                <td
                                    style={{padding: '0%'}}
                                >
                                    <Button
                                        block
                                        size='sm'
                                        className='botonSubNavegacion'
                                        active={
                                            pagina.index == props.indexPaginaActual?
                                                true : false
                                        }
                                        onClick={() => {
                                            props.setIndexPaginaActual(
                                                pagina.index
                                            );
                                        }}
                                    >
                                        {pagina.nombre}
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