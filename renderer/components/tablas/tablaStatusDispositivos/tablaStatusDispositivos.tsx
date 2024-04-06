'use client'

// React.
import React from 'react';

// Reactstrap
import { Badge } from 'reactstrap';

// Funciones propias.
import { formatearDatos } from '../../../utils/formatDataTabla';
import { funcionRefresh } from '../../../utils/refresh';

// Constantes
import { ESTATUS_DISPOSITIVOS } from '../../../utils/statusDispositivos';

// Interfaz de API.
import { ConsultaZona } from '../../../utils/API/interface/zona';
import { ConsultaTipoDispositivo } from '../../../utils/API/interface/tipoDispositivo';

// Componentes propios.
import BarraAccionesDispositivoControladorPuerta from '../../barraBotones/barraAccionesDispositivos/barraAccionesDispositivoControladorPuerta';
import BarraAccionesDispositivoControlador from '../../barraBotones/barraAccionesDispositivos/barraAccionesDispositivoControlador';
import BarraAccionesDispositivoChecador from '../../barraBotones/barraAccionesDispositivos/barraAccionesDispositivoChecador';
import BarraAccionesDispositivoLector from '../../barraBotones/barraAccionesDispositivos/barraAccionesDispositivoLector';
import FormBusquedaDispositivo from '../../forms/busqueda/formBusquedaDispositivo';
import Tabla from '../tabla';

export default function TablaReportes(
    props: {}
) {
    // Hook para el estado del indicador de carga.
    const [enCarga, setEnCarga] = React.useState(false);

    // Declaramos los hookers que vamos a usar.
    const [offset, setOffset] = React.useState(0);
    const [totalPaginas, setTotalPaginas] = React.useState(1);
    const [paginaActual, setPaginaActual] = React.useState(1);

    // Hook de la lista de los registros a mostrar en la tabla.
    const [listaRegistros, setListaRegistros] = React.useState([]);

    // Hooks de la barra de busqueda.
    const [idDispositivo, setIdDispositivo] = React.useState();
    const [idTipoDispositivo, setIdTipoDispositivo] = React.useState();
    const [idZona, setIdZona] = React.useState();

    // Hooks de las opciones de la tabla.
    const [elementos, setElementos] = React.useState(12);
    const [opcionesRegistros, setOpcionesRegistros] = React.useState(false);
    const [refresh, setRefresh] = React.useState(true);
    const [tiempoRefresh, setTiempoRefresh] = React.useState(60);

    // Hook para los forms de registro, modificacion y la barra de busqueda.
    const [listaZonas, setLisaZonas] = React.useState([]);
    const [listaTiposDispositivos, setListaTiposDispositivos] = React.useState([]);

    React.useEffect(() => {
        window.ipc.send('emitir_evento_socket', {
            evento: 'listar_clientes'
        });

        ConsultaZona(
            null,
            null,
            null,
            null,
            null,
            null,
            setLisaZonas,
            () => {},
            undefined
        );

        ConsultaTipoDispositivo(
            null,
            null,
            null,
            null,
            setListaTiposDispositivos,
            () => {},
            undefined
        );

    }, []);

    // Declaramos el useEffect de react para actualizar el contenido de la vista.
    React.useEffect(() => {
        console.log('refresh');

        setListaRegistros([]);

        setListaRegistros(
            window.ipc.sendSync(
                'listar_clientes', null
            )
        );

    }, [refresh, idDispositivo, idTipoDispositivo, idZona]);

    // El componente se refresca cada tiempo dado.
    setTimeout(() => {
        funcionRefresh(refresh, setRefresh);
    }, tiempoRefresh*10);

    // Titulo de la tabla.
    const tituloTabla = 'Lista de estatus de dispositivos';

    // Cabeceras de la tabla.
    const cabeceras = [
        'ID',
        'Tipo de dispostivio',
        'Zona',
        'Status',
        'Acciones'
    ];

    // Registros que se mostraran en la tabla.
    const formatearRegistros = (listaRegistros: any[]) => {
        return formatearDatos(
            listaRegistros,
            [
                ['id'],
                ['tipoDispositivo'],
                ['zona'],
                ['status'],
                ['idTipoDispositivo']
            ],
            [
                'id',
                'indexRegistro'
            ]
        );
    };

    // Funciones de las opciones de los registros.
    const funcionesRegistros = {
        onEliminar: undefined,
        onModificar: undefined,
        onVisualizar: undefined,
        onGuardarConfiguracion: undefined
    };

    // Opciones de la tabla.
    const opcionesTabla = {
        elementos: elementos,
        opcionesRegistros: undefined,
        tiempoRefresh: tiempoRefresh,
        setElementos: setElementos,
        setOpcionesRegistros: undefined,
        setTiempoRefresh: setTiempoRefresh
    };

    // Funciones de las opciones de la tabla.
    const funcionesOpciones = {
        onExportarArchivo: undefined,
        onGenerarReporte: undefined,
        onAddRegistro: undefined
    };

    // Propiedades de la paginacion.
    const paginacion = {
        paginaActual: paginaActual,
        offset: offset,
        elementos: elementos,
        totalPaginas: totalPaginas,
        setPaginaActual: setPaginaActual,
        setOffset: setOffset,
    };

    const parametrosBusqueda = {
        setIdDispositivo: setIdDispositivo,
        setIdZona: setIdZona,
        setIdTipoDispositivo: setIdTipoDispositivo
    };

    const elementosOpciones = {
        listaZonas: listaZonas,
        listaTiposDispositivos: listaTiposDispositivos
    };

    const formatoEspecial = {
        Status: (registro: any) => {
            const id = registro.data[0];
            const estatus = registro.data[3];
            let color = '';
            let leyenda = '';

            console.log(estatus);

            switch(estatus) {
                case ESTATUS_DISPOSITIVOS.DESCONECTADO:
                    color = 'secondary';
                    leyenda = 'DESCONECTADO';
                    break;
    
                case ESTATUS_DISPOSITIVOS.CONECTADO:
                    color = 'success';
                    leyenda = 'CONECTADO';
                    break;
                    
                case ESTATUS_DISPOSITIVOS.LIBRE:
                    color = 'info';
                    leyenda = 'EN ESPERA';
                    break;
    
                case ESTATUS_DISPOSITIVOS.PERIFERICOS_NO_INICIALIZADOS:
                    color = 'danger';
                    leyenda = 'ERROR';
                    break;
    
                case ESTATUS_DISPOSITIVOS.OCUPADO:
                    color = 'warning';
                    leyenda = 'OCUPADO';
                    break;

                case ESTATUS_DISPOSITIVOS.BLOQUEADO:
                    color = 'danger';
                    leyenda = 'BLOQUEADO';
                    break;
            }
    
            return(
                <Badge color={color} pill>
                    {leyenda}
                </Badge>
            );
        },

        Acciones: (registro: any) => {
            const idTipoDispositivo = registro.data[4];
            const estatus = registro.data[3];
            const idDispositivo = registro.data[0];

            if(estatus == ESTATUS_DISPOSITIVOS.DESCONECTADO) {
                return(<></>);
            }

            switch(idTipoDispositivo) {
                case 1:
                    return(<BarraAccionesDispositivoChecador
                        idDispositivo={idDispositivo}
                    />);
    
                case 2:
                    return(<BarraAccionesDispositivoLector
                        idDispositivo={idDispositivo}
                    />);
    
                case 3:
                    return(<BarraAccionesDispositivoControlador
                        idDispositivo={idDispositivo}
                    />);
                
                case 4:
                    return(<BarraAccionesDispositivoControladorPuerta
                        idDispositivo={idDispositivo}
                    />);
    
                default:
                    return(<></>);
            }
        }
    };

    return(
        <Tabla
            tituloTabla={tituloTabla}
            funcionesRegistros={funcionesRegistros}
            opcionesTabla={opcionesTabla}
            funcionesOpciones={funcionesOpciones}
            paginacion={paginacion}
            cabeceras={cabeceras}
            registros={formatearRegistros(listaRegistros)}
            formatoEspecial={formatoEspecial}
            enCarga={enCarga}
        >
            { /*Barra de busqueda del Rol*/ }
            <FormBusquedaDispositivo
                parametrosBusqueda={parametrosBusqueda}
                elementosOpciones={elementosOpciones}
            />
        </Tabla>
    );
};