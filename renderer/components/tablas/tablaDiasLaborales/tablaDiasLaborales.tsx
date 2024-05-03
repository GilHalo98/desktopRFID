'use client'

// React.
import React from 'react';

// Componentes propios.
import FormModificarDiasLaborales from '../../forms/registros/diasLaborales/formModificarDiasLaborales';
import FormRegistroDiasLaborales from '../../forms/registros/diasLaborales/formRegistroDiasLaborales';
import ModalModificarRegistro from '../../modals/modalOpciones/modalModificarRegistro';
import ModalAgregarRegistro from '../../modals/modalOpciones/modalAgregarRegistro';
import FormBusquedaDiaLaboral from '../../forms/busqueda/formBusquedaDiaLaboral';
import ModalRemoverRegistro from '../../modals/modalAlerta/modalRemoverRegistro';
import Display from '../../displays/display';
import Tabla from '../tabla';

// Importamos la funcionalidad de la tabla.
import {
    formatearRegistros,
    exportarDatos,
    guardarRegistro,
    modificarRegistro,
    eliminarRegistro,
    consultarRegistros,
    consultarRegistrosHorario
} from './logic/registros';

// Modelo de datos.
import {
    DiaLaboral
} from "../../../utils/API/modelos/diaLaboral";

import {
    Horario
} from "../../../utils/API/modelos/horario";

export default function TablaDiasLaborales(
    props: {}
) {
    // Hook para el estado del indicador de carga.
    const [
        enCarga,
        setEnCarga
    ] = React.useState(false);

    // Declaramos los hookers que vamos a usar.
    const [
        listaRegistros,
        setListaRegistros
    ] = React.useState([]);

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

    // Hooks de la barra de busqueda.
    const [
        idDiaLaboral,
        setIdDiaLaboral
    ] = React.useState(undefined);

    const [
        dia,
        setDia
    ] = React.useState(undefined);

    const [
        idHorarioVinculado,
        setIdHorarioVinculado
    ] = React.useState(undefined);

    // Hooks de las opciones de la tabla.
    const [
        registrosPorPagina,
        setRegistrosPorPagina
    ] = React.useState(12);

    const [
        opcionesRegistros,
        setOpcionesRegistros
    ] = React.useState(false);

    const [
        refresh,
        setRefresh
    ] = React.useState(true);

    // Hooks del modal.
    const [
        estadoModalModificarRegistro,
        setEstadoModalModificarRegistro
    ] = React.useState(false);

    const [
        estadoModalRemoverRegistro,
        setEstadoModalRemoverRegistro
    ] = React.useState(false);

    const [
        estadoModalAgregarRegistro,
        setEstadoModalAgregarRegistro
    ] = React.useState(false);

    // Hook del id del registro para operaciones
    const [
        idRegistroOperacion,
        setIdRegistroOperacion
    ] = React.useState(undefined);

    const [
        registroOperacion,
        setRegistroOperacion
    ] = React.useState(undefined);

    // Hook para los forms de registro, modificacion y la barra de busqueda.
    const [
        listaHorarios,
        setListaHorarios
    ] = React.useState([]);

    // Declaramos el useEffect de react para actualizar el contenido de la vista.
    React.useEffect(() => {
        console.log('refresh');

        consultarRegistros(
            setListaRegistros,
            setTotalPaginas,
            setEnCarga,
            {
                limit: registrosPorPagina,
                offset: offset,
                id: idDiaLaboral,
                dia: dia,
                idHorarioVinculado: idHorarioVinculado
            }
        );

        consultarRegistrosHorario(
            setListaHorarios,
            setEnCarga
        );

    }, [
        registrosPorPagina, 
        paginaActual,
        idDiaLaboral,
        dia,
        idHorarioVinculado,
        refresh
    ]);

    // Titulo de la tabla.
    const tituloTabla = 'Tabla de Dias laborales';

    // Cabeceras de la tabla.
    const cabeceras = [
        'ID',
        'Dia laboral',
        'Es descanso',
        'Horario de entrada',
        'Horario de inicio de descanso',
        'Horario de fin de descanso',
        'Horario de salida',
        'Fecha de registro',
        'Ultima modificacion',
        'ID de horario vinculado'
    ];

    // Funciones de las opciones de los registros.
    const funcionesRegistros = {
        onEliminar: (
            idRegistro: number,
            indexRegistro: number
        ) => {
            setIdRegistroOperacion(
                idRegistro
            );

            setRegistroOperacion(
                listaRegistros[indexRegistro]
            );

            setEstadoModalRemoverRegistro(
                !estadoModalRemoverRegistro
            );
        },
        onModificar: (
            idRegistro: number,
            indexRegistro: number
        ) => {
            setIdRegistroOperacion(
                idRegistro
            );

            setRegistroOperacion(
                listaRegistros[indexRegistro]
            );

            setEstadoModalModificarRegistro(
                !estadoModalModificarRegistro
            );
        }
    };

    // Opciones de la tabla.
    const opcionesTabla = {
        registrosPorPagina: registrosPorPagina,
        opcionesRegistros: opcionesRegistros,
        guardarConfiguracion: (evento: any) => {
            setRegistrosPorPagina(evento.target[0].value ?
                parseInt(evento.target[0].value) : 0
            );

            setOpcionesRegistros(evento.target[1].checked);

            setPaginaActual(1);
            setOffset(0);
        }
    };

    // Funciones de las opciones de la tabla.
    const funcionesOpciones = {
        onAgregarRegistro: () => {setEstadoModalAgregarRegistro(
            !estadoModalAgregarRegistro
        )},
        onRefrescarTabla: () => {setRefresh(
            !refresh
        )},
        onExportarDatos: () => {console.log(
            "datos exportados"
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

    const parametrosBusqueda = {
        setIdDiaLaboral: setIdDiaLaboral,
        setDia: setDia,
        setIdHorarioVinculado: setIdHorarioVinculado
    };

    // Formato especial de datos.
    const formatoEspecial = {
        "Dia laboral": (diaLaboral: number) => {
            if(diaLaboral == 0) {
                return "Lunes";
            }

            if(diaLaboral == 1) {
                return "Martes";
            }

            if(diaLaboral == 2) {
                return "Miercoles";
            }

            if(diaLaboral == 3) {
                return "Jueves";
            }

            if(diaLaboral == 4) {
                return "Viernes";
            }

            if(diaLaboral == 5) {
                return "Sabados";
            }

            if(diaLaboral == 6) {
                return "Domingo";
            }
        },
        "Es descanso": (esDescanso: boolean) => {
            return esDescanso? "si" : "no";
        },
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

    return(
        <Tabla
            tituloTabla={tituloTabla}
            cabeceras={cabeceras}
            registros={formatearRegistros(listaRegistros)}
            enCarga={enCarga}
            setEnCarga={setEnCarga}
            exportarDatos={(
                exportarDatosEnVista: boolean,
                datosRegistro: DiaLaboral[]
            ) => {exportarDatos(
                exportarDatosEnVista,
                datosRegistro,
                cabeceras,
                setEnCarga
            )}}
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
                toggleModal={() => {setEstadoModalAgregarRegistro(
                    !estadoModalAgregarRegistro
                )}}
            >
                <FormRegistroDiasLaborales
                    elementosOpciones={listaHorarios}
                    toggleModal={() => {setEstadoModalAgregarRegistro(
                        !estadoModalAgregarRegistro
                    )}}
                    onGuardarRegistro={(
                        evento: any
                    ) => {guardarRegistro(
                        evento,
                        refresh,
                        setRefresh
                    )}}
                />
            </ModalAgregarRegistro>

            {/*Modal de modificar registro*/}
            <ModalModificarRegistro
                idRegistro={idRegistroOperacion}
                modalActivo={estadoModalModificarRegistro}
                toggleModal={() => {setEstadoModalModificarRegistro(
                    !estadoModalModificarRegistro
                )}}
            >
                <FormModificarDiasLaborales
                    elementosOpciones={listaHorarios}
                    registro={registroOperacion}
                    onModificarRegistro={(
                        evento: any,
                        idRegistro: number
                    ) => {modificarRegistro(
                        evento,
                        idRegistro,
                        refresh,
                        setRefresh
                    )}}
                    toggleModal={() => {setEstadoModalModificarRegistro(
                        !estadoModalModificarRegistro
                    )}}
                />
            </ModalModificarRegistro>

            {/*Modal de alerta de remover registro*/}
            <ModalRemoverRegistro
                idRegistro={idRegistroOperacion}
                modalActivo={estadoModalRemoverRegistro}
                toggleModal={() => {setEstadoModalRemoverRegistro(
                    !estadoModalRemoverRegistro
                )}}
                onOk={(
                    idRegistro: number
                ) => {eliminarRegistro(
                    idRegistro,
                    refresh,
                    setRefresh
                )}}
            >
                <Display
                    registro={registroOperacion}
                    propiedades={[
                        ['id'],
                        ['dia'],
                        ['esDescanso'],
                        ['horaEntrada'],
                        ['horaSalidaDescanso'],
                        ['horaEntradaDescanso'],
                        ['horaSalida'],
                        ['fechaRegistroDia'],
                        ['fechaModificacionDia'],
                        ['idHorarioVinculado']
                    ]}
                    campos={[
                        'ID',
                        'Dia laboral',
                        'Es descanso',
                        'Horario de entrada',
                        'Horario de inicio de descanso',
                        'Horario de fin de descanso',
                        'Horario de salida',
                        'Fecha de registro',
                        'Ultima modificacion',
                        'ID de horario vinculado'
                    ]}
                />
            </ModalRemoverRegistro>

            { /*Barra de busqueda del TipoReporte*/ }
            <FormBusquedaDiaLaboral
                parametrosBusqueda={parametrosBusqueda}
                elementosOpciones={listaHorarios}
            />
        </Tabla>
    );
};