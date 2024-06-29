/**
 * Este pedo amerita una tabla especial para esto.
 */

'use client'

// React.
import React from 'react';

// Componentes de reactstrap.
import { Badge } from 'reactstrap';

// Funciones propias.
import {
    formatearDatos
} from '../../../utils/formatDataTabla';

import {
    funcionRefresh
} from '../../../utils/refresh';

// Constantes
import {
    ESTATUS_DISPOSITIVOS
} from '../../../utils/statusDispositivos';

// Interfaz de API.
import {
    ConsultaZona
} from '../../../utils/API/interface/zona';

import {
    ConsultaTipoDispositivo
} from '../../../utils/API/interface/tipoDispositivo';

// Componentes propios.
import BarraAccionesDispositivoControladorPuerta from '../../barraBotones/barraAcciones/barraAccionesDispositivos/barraAccionesDispositivoControladorPuerta';
import BarraAccionesDispositivoControlador from '../../barraBotones/barraAcciones/barraAccionesDispositivos/barraAccionesDispositivoControlador';
import BarraAccionesDispositivoChecador from '../../barraBotones/barraAcciones/barraAccionesDispositivos/barraAccionesDispositivoChecador';
import BarraAccionesDispositivoLector from '../../barraBotones/barraAcciones/barraAccionesDispositivos/barraAccionesDispositivoLector';
import ModalGuardarConfiguracionControlador from '../../modals/modalOpciones/modalGuardarConfiguracionControlador';
import ModalGuardarConfiguracionChecador from '../../modals/modalOpciones/modalGuardarConfiguracionChecador';
import MenuGuardarConfiguracionControlador from '../../forms/menus/menuGuardarConfiguracionControlador';
import MenuGuardarConfiguracionChecador from '../../forms/menus/menuGuardarConfiguracionChecador';
import ModalConexionSerial from '../../modals/modalGrid/modalConexionSerial';
import TablaParaStatusDispositivos from '../tablaParaStatusDispositivos';

// Modelo de datos.
import { TipoDispositivo } from '../../../utils/API/modelos/tipoDispositivo';
import { Zona } from '../../../utils/API/modelos/zona';
import { ConsultaRol } from '../../../utils/API/interface/rol';
import { Rol } from '../../../utils/API/modelos/rol';
import ModalGuardarConfiguracionLector from '../../modals/modalOpciones/modalGuardarConfiguracionLector';
import MenuGuardarConfiguracionLector from '../../forms/menus/menuGuardarConfiguracionLector';
import MenuGuardarConfiguracionControladorPuerta from '../../forms/menus/menuGuardarConfiguracionControladorPuerta';
import ModalGuardarConfiguracionControladorPuerta from '../../modals/modalOpciones/modalGuardarConfiguracionControladorPuerta';

export default function TablaReportes(
    props: {}
) {
    // Hook para el estado del indicador de carga.
    const [
        enCarga,
        setEnCarga
    ] = React.useState(false);

    // Declaramos los hookers que vamos a usar.
    const [
        offset,
        setOffset
    ] = React.useState(0);

    const [
        totalPaginas,
        setTotalPaginas
    ] = React.useState(1);

    const [
        paginaActual,
        setPaginaActual
    ] = React.useState(1);

    // Hook de la lista de los registros a mostrar en la tabla.
    const [
        listaRegistros,
        setListaRegistros
    ] = React.useState([]);

    // Hooks de la barra de busqueda.
    const [
        idDispositivo,
        setIdDispositivo
    ] = React.useState();

    const [
        idTipoDispositivo,
        setIdTipoDispositivo
    ] = React.useState();

    const [
        idZona,
        setIdZona
    ] = React.useState();

    // Hooks de las opciones de la tabla.
    const [
        registrosPorPagina,
        setRegistrosPorPagina
    ] = React.useState(12);

    const [
        opcionesRegistros,
        setOpcionesRegistros
    ] = React.useState(true);

    const [
        refresh,
        setRefresh
    ] = React.useState(true);

    const [
        cargaForzada,
        setCargaForzada
    ] = React.useState(false);

    const [
        tiempoRefresh,
        setTiempoRefresh
    ] = React.useState(60);

    // Hook para los forms de registro
    // modificacion y la barra de busqueda.
    const [
        listaZonas,
        setListaZonas
    ] = React.useState([]);

    const [
        listaTiposDispositivos,
        setListaTiposDispositivos
    ] = React.useState([]);

    const [
        listaRoles,
        setListaRoles
    ] = React.useState([]);

    // Hooks de los estados de los modals.
    const [
        estadoModalConexionSerial,
        setEstadoModalConexionSerial
    ] = React.useState(false);

    const [
        estadoModalGuardarConfiguracionDispositivoChecador,
        setEstadoModalGuardarConfiguracionDispositivoChecador
    ] = React.useState(false);

    const [
        estadoModalGuardarConfiguracionDispositivoControlador,
        setEstadoModalGuardarConfiguracionDispositivoControlador
    ] = React.useState(false);

    const [
        estadoModalGuardarConfiguracionDispositivoLector,
        setEstadoModalGuardarConfiguracionDispositivoLector
    ] = React.useState(false);

    const [
        estadoModalGuardarConfiguracionDispositivoControladorPuerta,
        setEstadoModalGuardarConfiguracionDispositivoControladorPuerta
    ] = React.useState(false);

    // Registro de operaciones.
    const [
        indexOperaciones,
        setIndexOperaciones
    ] = React.useState(undefined);

    const [
        registroDeOperaciones,
        setRegistroDeOperaciones
    ] = React.useState(undefined);

    React.useEffect(() => {
        window.ipc.send('emitir_evento_socket', {
            evento: 'listar_clientes'
        });

        ConsultaZona(
            (respuesta: any) => {
                const registros: Zona[] = respuesta.registros;
                setListaZonas(registros);
            },
            undefined,
            () => {
                setEnCarga(false);
            },
            () => {
                setListaZonas([]);
                setEnCarga(true);
            },
            () => {}
        );

        ConsultaTipoDispositivo(
            (respuesta: any) => {
                const registros: TipoDispositivo[] = respuesta.registros;
                setListaTiposDispositivos(registros);
            },
            undefined,
            () => {
                setEnCarga(false);
            },
            () => {
                setListaRoles([])
            },
            () => {
            }
        );

        ConsultaRol(
            (respuesta: any) => {
                const registros: Rol[] = respuesta.registros;
                setListaRoles(registros);
            },
            undefined,
            () => {
                setEnCarga(false);
            },
            () => {
                setListaRoles([]);
            },
            () => {
                setEnCarga(false);
            }
        )

    }, [cargaForzada]);

    // Declaramos el useEffect de react para actualizar
    // el contenido de la vista.
    React.useEffect(() => {
        console.log('refresh');

        setListaRegistros([]);

        setListaRegistros(
            window.ipc.sendSync(
                'listar_clientes', null
            )
        );

    }, [
        cargaForzada,
        refresh,
        idDispositivo,
        idTipoDispositivo,
        idZona
    ]);

    // El componente se refresca cada tiempo dado.
    setTimeout(() => {
        funcionRefresh(refresh, setRefresh);
    }, tiempoRefresh*1000);

    // Titulo de la tabla.
    const tituloTabla = 'Lista de estatus de dispositivos';

    // Cabeceras de la tabla.
    const cabeceras = [
        'ID',
        'Descripción de dispositivo',
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
                ['descripcionDispositivo'],
                ['tipoDispositivo'],
                ['zona'],
                ['status'],
                ['id']
            ],
            [
                'id',
                'indexRegistro'
            ]
        );
    };

    // Opciones de la tabla.
    const opcionesTabla = {
        registrosPorPagina: registrosPorPagina,
        opcionesRegistros: opcionesRegistros,
        tiempoRefrescamiento: tiempoRefresh,
        guardarConfiguracion: (evento: any) => {
            console.log(evento);

            setRegistrosPorPagina(evento.target[0].value ?
                parseInt(evento.target[0].value) : 0
            );

            setTiempoRefresh(evento.target[1].value ?
                parseInt(evento.target[1].value) : 0
            );

            setOpcionesRegistros(evento.target[2].checked);

            setPaginaActual(1);
            setOffset(0);
        }
    };

    // Funciones de las opciones de la tabla.
    const funcionesOpciones = {
        onRefrescarTabla: () => {setCargaForzada(
            !cargaForzada
        )},
        onProbarSerial: () => {setEstadoModalConexionSerial(
            !estadoModalConexionSerial
        )},
        onCambiarConfiguracion: () => {console.log(
            "configuracion cambiada"
        )}
    };

    // Propiedades de la paginacion.
    const paginacion = {
        paginaActual: paginaActual,
        offset: offset,
        registrosPorPagina: registrosPorPagina,
        totalPaginas: totalPaginas,
        setPaginaActual: setPaginaActual,
        setOffset: setOffset,
    };

    // Parametros para la busqueda del dispositivo.
    const parametrosBusqueda = {
        setIdDispositivo: setIdDispositivo,
        setIdZona: setIdZona,
        setIdTipoDispositivo: setIdTipoDispositivo
    };

    // Elementos de opciones para los filtros de busqueda.
    const elementosOpciones = {
        listaZonas: listaZonas,
        listaTiposDispositivos: listaTiposDispositivos
    };

    // Funciones de las opciones de los registros.
    const funcionesRegistros = {
        onGuardarConfiguracionDispositivo: (
            idRegistro: number,
            indexRegistro: number
        ) => {
            setIndexOperaciones(indexRegistro);

            switch(listaRegistros[indexRegistro].idTipoDispositivo) {
                case 1:
                    setEstadoModalGuardarConfiguracionDispositivoChecador(
                        !estadoModalGuardarConfiguracionDispositivoChecador
                    );
                    break;

                case 2:
                    setEstadoModalGuardarConfiguracionDispositivoLector(
                        !estadoModalGuardarConfiguracionDispositivoLector
                    );
                    break;

                case 3:
                    setEstadoModalGuardarConfiguracionDispositivoControlador(
                        !estadoModalGuardarConfiguracionDispositivoControlador
                    );
                    break;

                case 4:
                    setEstadoModalGuardarConfiguracionDispositivoControladorPuerta(
                        !estadoModalGuardarConfiguracionDispositivoControladorPuerta
                    )
                    break;
            
                default:
                    break;
            }
        }
    };

    const formatoEspecial = {
        "Status": (estatus: number) => {
            let color = '';
            let leyenda = '';

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

        "Acciones": (idDispositivo: number) => {
            var dispositivo = undefined;

            listaRegistros.map((registro: any) => {
                if(registro.id == idDispositivo) {
                    dispositivo = registro;
                }
            });

            if(typeof(dispositivo) !== 'undefined') {
                if(dispositivo.status !== ESTATUS_DISPOSITIVOS.DESCONECTADO) {
                    switch(dispositivo.idTipoDispositivo) {
                        case 1:
                            return(<BarraAccionesDispositivoChecador
                                idDispositivo={dispositivo.id}
                            />);
            
                        case 2:
                            return(<BarraAccionesDispositivoLector
                                idDispositivo={dispositivo.id}
                            />);
            
                        case 3:
                            return(<BarraAccionesDispositivoControlador
                                idDispositivo={dispositivo.id}
                            />);
                        
                        case 4:
                            return(<BarraAccionesDispositivoControladorPuerta
                                idDispositivo={dispositivo.id}
                            />);
            
                        default:
                            return(<></>);
                    }                    
                }
            }

            return <></>;
        }
    };

    return(
        <TablaParaStatusDispositivos
            tituloTabla={tituloTabla}
            funcionesRegistros={funcionesRegistros}
            opcionesTabla={opcionesTabla}
            funcionesOpciones={funcionesOpciones}
            paginacion={paginacion}
            cabeceras={cabeceras}
            registros={formatearRegistros(listaRegistros)}
            formatoEspecial={formatoEspecial}
            enCarga={enCarga}
            setEnCarga={setEnCarga}
        >
            {/*Modal de conexion con dispositivo por medio de serial*/}
            <ModalConexionSerial
                nombreGrid={tituloTabla}
                onConectarPorSerial={() => {}}
                modalActivo={estadoModalConexionSerial}
                toggleModal={() => {setEstadoModalConexionSerial(
                    !estadoModalConexionSerial
                )}}
            >
            </ModalConexionSerial>

            {/*
                Modal para guardar la configuracion en
                el dispositivo checador.
            */}
            <ModalGuardarConfiguracionChecador
                registro={undefined}
                headerModal={'Configurar Dispositivo'}
                tituloModal={'Guardar la configuración del dispositivo'}
                modalActivo={
                    estadoModalGuardarConfiguracionDispositivoChecador
                }
                toggleModal={() => {
                    setEstadoModalGuardarConfiguracionDispositivoChecador(
                        !estadoModalGuardarConfiguracionDispositivoChecador
                    )
                }}
                onOk={undefined}
                onRechazar={undefined}
            >
                <MenuGuardarConfiguracionChecador
                    registro={listaRegistros[indexOperaciones]}
                    toggleModal={undefined}
                />
            </ModalGuardarConfiguracionChecador>

            {/*
                Modal para guardar la configuracion en
                el dispositivo controlador.
            */}
            <ModalGuardarConfiguracionControlador
                registro={undefined}
                headerModal={'Configurar Dispositivo'}
                tituloModal={'Guardar la configuración del dispositivo'}
                modalActivo={
                    estadoModalGuardarConfiguracionDispositivoControlador
                }
                toggleModal={() => {
                    setEstadoModalGuardarConfiguracionDispositivoControlador(
                        !estadoModalGuardarConfiguracionDispositivoControlador
                    )
                }}
                onOk={undefined}
                onRechazar={undefined}
            >
                <MenuGuardarConfiguracionControlador
                    elementosOpciones={{listaRoles: listaRoles}}
                    registro={listaRegistros[indexOperaciones]}
                    toggleModal={undefined}
                />
            </ModalGuardarConfiguracionControlador>

            {/*
                Modal para guardar la configuracion en
                el dispositivo lector.
            */}
            <ModalGuardarConfiguracionLector
                registro={undefined}
                headerModal={'Configurar Dispositivo'}
                tituloModal={'Guardar la configuración del dispositivo'}
                modalActivo={
                    estadoModalGuardarConfiguracionDispositivoLector
                }
                toggleModal={() => {
                    setEstadoModalGuardarConfiguracionDispositivoLector(
                        !estadoModalGuardarConfiguracionDispositivoLector
                    )
                }}
                onOk={undefined}
                onRechazar={undefined}
            >
                <MenuGuardarConfiguracionLector
                    elementosOpciones={{listaZonas: listaZonas}}
                    registro={listaRegistros[indexOperaciones]}
                    toggleModal={undefined}
                />
            </ModalGuardarConfiguracionLector>

            {/*
                Modal para guardar la configuracion en
                el dispositivo controlador de puertas.
            */}
            <ModalGuardarConfiguracionControladorPuerta
                registro={undefined}
                headerModal={'Configurar Dispositivo'}
                tituloModal={'Guardar la configuración del dispositivo'}
                modalActivo={
                    estadoModalGuardarConfiguracionDispositivoControladorPuerta
                }
                toggleModal={() => {
                    setEstadoModalGuardarConfiguracionDispositivoControladorPuerta(
                        !estadoModalGuardarConfiguracionDispositivoControladorPuerta
                    )
                }}
                onOk={undefined}
                onRechazar={undefined}
            >
                <MenuGuardarConfiguracionControladorPuerta
                    registro={listaRegistros[indexOperaciones]}
                    toggleModal={undefined}
                />
            </ModalGuardarConfiguracionControladorPuerta>

        </TablaParaStatusDispositivos>
    );
};
