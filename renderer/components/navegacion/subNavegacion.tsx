'use client'

// React.
import React from 'react';

// Componentes de reacstrap
import {
    Table,
    Button,
    Badge
} from 'reactstrap';

export default function SubNavegacion(
    props: {
        paginas: any []
        indexPaginaActual: number
        setIndexPaginaActual: Function,
        evaluarDeshabilitado?: Function,
        formatearTexto?: Function
    }
) {

    return(
        <React.Fragment>
            <Table dark responsive borderless className='subNavegacion'>
                <tbody>
                    <tr>
                        {props.paginas.map((
                            pagina: any,
                            index: number
                        ) => {
                            return(
                                <td
                                    style={{padding: '0%'}}
                                >
                                    <Button
                                        block
                                        outline
                                        disabled={
                                            props.evaluarDeshabilitado(pagina)
                                        }
                                        size='sm'
                                        className='botonSubNavegacion'
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
                                        {
                                            !props.formatearTexto?
                                                index : props.formatearTexto(pagina)
                                        }
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