'use client'

// React.
import React from 'react';

// Componentes propios.
import ModalVisualizarRegistro from '../../modals/modalOpciones/modalVisualizarRegistro';
import ModalModificarRegistro from '../../modals/modalOpciones/modalModificarRegistro';
import FormModificarPermiso from '../../forms/registros/permisos/formModificarPermiso';
import FormRegistroPermiso from '../../forms/registros/permisos/formRegistroPermiso';
import ModalAgregarRegistro from '../../modals/modalOpciones/modalAgregarRegistro';
import ModalRemoverRegistro from '../../modals/modalAlerta/modalRemoverRegistro';
import FormBusquedaPermisos from '../../forms/busqueda/formBusquedaPermisos';
import Display from '../../displays/display';
import Tabla from '../tabla';

// Funciones propias.
import { exportarDatosTabla, formatearDatos } from '../../../utils/formatDataTabla';
import { funcionRefresh } from '../../../utils/refresh';

// Interfaz de API.
import {
    ConsultaPermiso,
    RemoverPermiso
} from '../../../utils/API/interface/permiso';
import { ConsultaZona } from '../../../utils/API/interface/zona';
import { Permiso } from '../../../utils/API/modelos/permiso';

export default function TablaReportes(
    props: {}
) {
    // Hook para el estado del indicador de carga.
    const [enCarga, setEnCarga] = React.useState(false);

    // Declaramos los hookers que vamos a usar.
    const [listaRegistros, setListaRegistros] = React.useState([]);
    const [offset, setOffset] = React.useState(0);
    const [totalPaginas, setTotalPaginas] = React.useState(1);
    const [paginaActual, setPaginaActual] = React.useState(1);

    // Hooks de la barra de busqueda.
    const [descripcionPermiso, setDescripcionPermiso] = React.useState(undefined);
    const [idPermiso, setIdPermiso] = React.useState(undefined);

    // Hooks de las opciones de la tabla.
    const [registrosPorPagina, setRegistrosPorPagina] = React.useState(12);
    const [opcionesRegistros, setOpcionesRegistros] = React.useState(false);
    const [refresh, setRefresh] = React.useState(true);

    // Hooks del modal.
    const [estadoModalRemoverRegistro, setEstadoModalRemoverRegistro] = React.useState(false);
    const [estadoModalModificarRegistro, setEstadoModalModificarRegistro] = React.useState(false);

    const [estadoModalAgregarRegistro, setEstadoModalAgregarRegistro] = React.useState(false);

    // Hook del id del registro para operaciones
    const [idRegistroOperacion, setIdRegistroOperacion] = React.useState(undefined);
    const [registroOperacion, setRegistroOperacion] = React.useState(undefined);

    // Hooks para los forms de registros y modificacion de registros.
    const [listaZonas, setListaZonas] = React.useState([]);

    // Declaramos el useEffect de react para actualizar el contenido de la vista.
    React.useEffect(() => {
        console.log('refresh');

        ConsultaPermiso(
            (respuesta) => {
                setListaRegistros(respuesta.registros);
                setTotalPaginas(Math.ceil(
                    respuesta.totalRegistros / registrosPorPagina
                ));
            },
            {
                limit: registrosPorPagina,
                offset: offset,
                id: idPermiso,
                descripcionPermiso: descripcionPermiso
            },
            (error) => {
                console.log(error);
                setEnCarga(false);
            },
            () => {
                setListaRegistros([]);
                setEnCarga(true);
            },
            () => {
                setEnCarga(false);
            }
        );

        ConsultaZona(
            null,
            null,
            null,
            null,
            null,
            null,
            setListaZonas,
            () => {},
            undefined
        );
    }, [
        registrosPorPagina, 
        paginaActual,
        idPermiso,
        descripcionPermiso,
        refresh
    ]);

    // Titulo de la tabla.
    const tituloTabla = 'Tabla de Permisos';

    // Cabeceras de la tabla.
    const cabeceras = [
        'ID',
        'Descripción del permiso',
        'Accesos del permiso',
        'Fecha de registro',
        'Ultima modificacion'
    ];

    // Registros que se mostraran en la tabla.
    const formatearRegistros = (listaRegistros: any[]) => {
        return formatearDatos(
            listaRegistros,
            [
                ['id'],
                ['descripcionPermiso'],
                ['autorizacion'],
                ['fechaRegistroPermiso'],
                ['fechaModificacionPermiso']
            ],
            ['id', 'indexRegistro']
        );
    };

    // Funciones de las opciones de los registros.
    const funcionesRegistros = {
        onEliminar: (idRegistro: number, indexRegistro: number) => {
            setIdRegistroOperacion(idRegistro);
            setRegistroOperacion(listaRegistros[indexRegistro]);
            setEstadoModalRemoverRegistro(!estadoModalRemoverRegistro);
        },
        onModificar: (idRegistro: number, indexRegistro: number) => {
            setIdRegistroOperacion(idRegistro);
            setRegistroOperacion(listaRegistros[indexRegistro]);
            setEstadoModalModificarRegistro(!estadoModalModificarRegistro);
        }
    };

    // Opciones de la tabla.
    const opcionesTabla = {
        registrosPorPagina: registrosPorPagina,
        opcionesRegistros: opcionesRegistros,
        guardarConfiguracion: (evento: any) => {
            setRegistrosPorPagina(evento.target[0].value);
            setOpcionesRegistros(evento.target[1].checked);
        }
    };

    // Funciones de las opciones de la tabla.
    const funcionesOpciones = {
        onAgregarRegistro: () => {
            setEstadoModalAgregarRegistro(!estadoModalAgregarRegistro);
        },
        onRefrescarTabla: () => {
            setRefresh(!refresh);
        },
        onExportarDatos: () => {
            console.log("datos exportados");
        },
        onCambiarConfiguracion: () => {
            console.log("configuracion cambiada");
        }
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

    const parametrosBusqueda = {
        setIdPermiso: setIdPermiso,
        setDescripcionPermiso: setDescripcionPermiso
    }

    // Formato especial de datos.
    const formatoEspecial = {
        "Fecha de registro": (fechaRegistro?: string) => {
            if(!fechaRegistro) {
                return "";
            }

            return fechaRegistro.replace("T", " ").slice(0, 19);
        },
        "Ultima modificacion": (fechaModificacion?: string) => {
            if(!fechaModificacion) {
                return "";
            }
            return fechaModificacion.replace("T", " ").slice(0, 19);
        }
    };

    // Exportamos los datos a formato excel.
    const exportarDatos = (exportarDatosEnVista: boolean) => {
        if(exportarDatosEnVista) {
            exportarDatosTabla(
                listaRegistros,
                cabeceras,
                formatearRegistros
            );

        } else {
            ConsultaPermiso(
                (respuesta) => {
                    exportarDatosTabla(
                        respuesta.registros,
                        cabeceras,
                        formatearRegistros
                    );
                },
                {},
                (error) => {
                    console.log(error);
                    setEnCarga(false);
                }
            );
        }
    };

    return(
        <Tabla
            tituloTabla={tituloTabla}
            cabeceras={cabeceras}
            registros={formatearRegistros(listaRegistros)}
            enCarga={enCarga}
            setEnCarga={setEnCarga}
            exportarDatos={exportarDatos}
            formatoEspecial={formatoEspecial}
            funcionesOpciones={funcionesOpciones}
            opcionesTabla={opcionesTabla}
            funcionesRegistros={funcionesRegistros}
            paginacion={paginacion}
        >
            {/*Modal de agregar registro*/}
            <ModalAgregarRegistro
                nombreTabla={tituloTabla}
                modalActivo={estadoModalAgregarRegistro}
                toggleModal={() => {
                    setEstadoModalAgregarRegistro(!estadoModalAgregarRegistro);
                }}
            >
                <FormRegistroPermiso
                    elementosOpciones={listaZonas}
                    toggleModal={() => {
                        setEstadoModalAgregarRegistro(!estadoModalAgregarRegistro);
                    }}
                    toggleRefresh={() => {
                        funcionRefresh(refresh, setRefresh);
                    }}
                />
            </ModalAgregarRegistro>

            {/*Modal de modificar registro*/}
            <ModalModificarRegistro
                idRegistro={idRegistroOperacion}
                modalActivo={estadoModalModificarRegistro}
                toggleModal={() => {
                    setEstadoModalModificarRegistro(!estadoModalModificarRegistro);
                }}
            >
                <FormModificarPermiso
                    registro={registroOperacion}
                    elementosOpciones={listaZonas}
                    toggleModal={() => {
                        setEstadoModalModificarRegistro(!estadoModalModificarRegistro);
                    }}
                    toggleRefresh={() => {
                        funcionRefresh(refresh, setRefresh);
                    }}
                />
            </ModalModificarRegistro>

            {/*Modal de alerta de remover registro*/}
            <ModalRemoverRegistro
                idRegistro={idRegistroOperacion}
                modalActivo={estadoModalRemoverRegistro}
                toggleModal={() => {
                    setEstadoModalRemoverRegistro(!estadoModalRemoverRegistro);
                }}
                onOk={(idRegistro: number) => {
                    RemoverPermiso(idRegistro);
                    funcionRefresh(refresh, setRefresh);
                }}
                onRechazar={() => {}}
            >
                <Display
                    registro={registroOperacion}
                    propiedades={[
                        ['id'],
                        ['descripcionPermiso'],
                        ['autorizacion'],
                        ['fechaRegistroPermiso'],
                    ]}
                    campos={[
                        'id',
                        'descripcion del permiso',
                        'autorizacion del permiso',
                        'fecha de registro'
                    ]}
                />
            </ModalRemoverRegistro>

            { /*Barra de busqueda del permiso*/ }
            <FormBusquedaPermisos
                parametrosBusqueda={parametrosBusqueda}
            />
        </Tabla>
    );
};