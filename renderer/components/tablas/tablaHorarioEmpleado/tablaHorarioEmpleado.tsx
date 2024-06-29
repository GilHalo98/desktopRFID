'use client'

// React.
import React from 'react';

// Componentes propios.
import FormModificarHorarios from '../../forms/registros/horarios/formModificarHorarios';
import FormRegistroHorarios from '../../forms/registros/horarios/formRegistroHorarios';
import ModalModificarRegistro from '../../modals/modalOpciones/modalModificarRegistro';
import ModalAgregarRegistro from '../../modals/modalOpciones/modalAgregarRegistro';
import ModalRemoverRegistro from '../../modals/modalAlerta/modalRemoverRegistro';
import FormBusquedaHorario from '../../forms/busqueda/formBusquedaHorario';
import TablaParaHorarioDeEmpleado from '../tablaParaHorarioDeEmpleado';
import Display from '../../displays/display';

// Importamos la funcionalidad de la tabla.
import {
    formatearRegistros,
    exportarDatos,
    guardarRegistro,
    modificarRegistro,
    eliminarRegistro,
    consultarRegistros,
    consultarRegistrosEmpleados
} from './logic/registros';

// Modelo de datos.
import {
    Horario
} from "../../../utils/API/modelos/horario";

export default function TablaHorarioEmpelado(
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
        idHorario,
        setIdHorario
    ] = React.useState(undefined);

    const [
        descripcionHorario,
        setDescripcionHorario
    ] = React.useState(undefined);

    const [
        idEmpleadoVinculado,
        setIdEmpleadoVinculado
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
        listaEmpleados,
        setListaEmpleados
    ] = React.useState([]);

    // Declaramos el useEffect de react para actualizar
    // el contenido de la vista.
    React.useEffect(() => {
        console.log('refresh');

        consultarRegistros(
            setListaRegistros,
            setTotalPaginas,
            setEnCarga,
            {
                limit: registrosPorPagina,
                offset: offset,
                id: idHorario,
                descripcionHorario: descripcionHorario,
                idEmpleadoVinculado: idEmpleadoVinculado
            }
        );

        consultarRegistrosEmpleados(
            setListaEmpleados,
            setEnCarga
        );

    }, [
        registrosPorPagina, 
        paginaActual,
        idHorario,
        descripcionHorario,
        idEmpleadoVinculado,
        refresh
    ]);

    // Titulo de la tabla.
    const tituloTabla = 'Tabla de Horario de empleados';

    // Cabeceras de la tabla.
    const cabeceras = [
        'Dia',
        'Entrada',
        'Inicio de descanso',
        'Fin de descanso',
        'Salida',
    ];

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
        onRefrescarTabla: () => {setRefresh(
            !refresh
        )},
        onModificarRegistro: () => {console.log(
            "registro modificado"
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
        setIdHorario: setIdHorario,
        setDescripcionHorario: setDescripcionHorario,
        setIdEmpleadoVinculado: setIdEmpleadoVinculado
    };

    // Formato especial de datos.
    const formatoEspecial = {
        'Entrada': (registro: any) => {
            console.log(registro);
            if(!registro) {
                return "";
            }

            return dato.replace("T", " ").slice(0, 19);
        },
        'Inicio de descanso': (index: number) => {
            const dato = listaRegistros[index];
            if(!dato) {
                return "";
            }
            return dato.replace("T", " ").slice(0, 19);
        },
        'Fin de descanso': (index: number) => {
            const dato = listaRegistros[index];
            if(!dato) {
                return "";
            }

            return dato.replace("T", " ").slice(0, 19);
        },
        'Salida': (index: number) => {
            const dato = listaRegistros[index];
            if(!dato) {
                return "";
            }
            return dato.replace("T", " ").slice(0, 19);
        }
    };

    return(
        <TablaParaHorarioDeEmpleado
            tituloTabla={tituloTabla}
            cabeceras={cabeceras}
            registros={formatearRegistros(listaRegistros)}
            enCarga={enCarga}
            setEnCarga={setEnCarga}
            exportarDatos={(
                exportarDatosEnVista: boolean,
                datosRegistro: Horario[]
            ) => {exportarDatos(
                exportarDatosEnVista,
                datosRegistro,
                cabeceras,
                setEnCarga
            )}}
            formatoEspecial={formatoEspecial}
            funcionesOpciones={funcionesOpciones}
            opcionesTabla={opcionesTabla}
            paginacion={paginacion}
        >
        </TablaParaHorarioDeEmpleado>
    );
};