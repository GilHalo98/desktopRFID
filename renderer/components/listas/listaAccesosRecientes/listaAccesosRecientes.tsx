'use client'

// React.
import React from 'react';

// Reacstrap.
import { Alert } from 'reactstrap';

// Componentes propios.
import Lista from '../lista';

// Funciones propias.
import { formatearDatos, selectorColorReporteAccesos } from '../../../utils/formatDataTabla';
import { funcionRefresh } from '../../../utils/refresh';

// Interfaz de API.
import {
    ConsultaAccesosRecientes
} from '../../../utils/API/interface/dashboard'

export default function ListaAccesosRecientes(
    props: {}
) {
    // Declaramos los hookers que vamos a usar.
    const [listaRegistros, setListaRegistros] = React.useState([]);
    const [offset, setOffset] = React.useState(0);
    const [totalPaginas, setTotalPaginas] = React.useState(1);
    const [paginaActual, setPaginaActual] = React.useState(1);

    // Hooks de las opciones de la tabla.
    const [elementos, setElementos] = React.useState(10);
    const [refresh, setRefresh] = React.useState(true);
    const [tiempoRefresh, setTiempoRefresh] = React.useState(1);

    // Hooks del modal.

    // Hook del id del registro para operaciones

    // Declaramos el useEffect de react para actualizar el contenido de la vista.
    React.useEffect(() => {
        console.log('refresh');

    }, [
        elementos,
        refresh
    ]);

    // El componente se refresca cada tiempo dado.
    setTimeout(() => {
        funcionRefresh(refresh, setRefresh);
    }, tiempoRefresh*1000);

    // Titulo de la lista.
    const tituloLista = 'Lista de Accesos Recientes'

    console.log(listaRegistros);

    function elegirColor(clasificacion: string) {
        let color = '';
        switch(clasificacion) {
            case 'accesoGarantizado':
                color = 'success';
                break;

            case 'accesoNegado':
                color = 'danger';
                break;
        
            default:
                color = 'light';
                break;
        }

        return(color);
    }

    return(
        <Lista
            tituloLista={tituloLista}
        >
            {listaRegistros.map((item: any) => {
                return(
                    <li>
                        <Alert color={elegirColor(item.tipoReporte.clasificacionReporte)}>
                            {item.descripcionReporte} por {item.empleado.nombres} resolucion: {item.tipoReporte.clasificacionReporte}
                        </Alert>
                    </li>
                );
            })}
        </Lista>
    );
};