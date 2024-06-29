// Formatea los datos del registro.
import {
    exportarDatosTabla,
    formatearDatos
} from "../../../../utils/formatDataTabla";

// Modelo de datos
import {
    Horario
} from "../../../../utils/API/modelos/horario";

import {
    Empleado
} from "../../../../utils/API/modelos/horario";

// Importamos la interfaz con la API.
import {
    ConsultaHorario,
    ModificarHorario,
    RegistrarHorario,
    RemoverHorario
} from "../../../../utils/API/interface/horario";

import {
    ConsultaEmpleado
} from "../../../../utils/API/interface/empleado";

// Registros que se mostraran en la tabla.
const formatearRegistros = (
    listaRegistros: any[]
) => {
    console.log(listaRegistros);
    return formatearDatos(
        listaRegistros,
        [
            ['id'],
            ['fechaRegistroHorario'],
            ['fechaModificacionHorario'],
            ['fechaRegistroHorario'],
            ['fechaModificacionHorario'],
        ],
        ['id', 'indexRegistro']
    );
};

// Exportamos los datos a formato excel.
const exportarDatos = (
    exportarDatosEnVista: boolean,
    datosRegistro: Horario[],
    cabeceras: string[],
    setEnCarga: Function
) => {
    if(exportarDatosEnVista) {
        exportarDatosTabla(
            datosRegistro,
            cabeceras,
            formatearRegistros
        );

    } else {
        ConsultaHorario(
            (respuesta) => {exportarDatosTabla(
                respuesta.registros,
                cabeceras,
                formatearRegistros
            )},
            {},
            (error) => {
                console.log(error);
                setEnCarga(false);
            }
        );
    }
};

// Guarda un registro en la base de datos.
const guardarRegistro = (
    evento: any,
    refresh: boolean,
    setRefresh: Function
) => {
    /**
     * Creamos un nuevo registro y lo guardamos en la base de datos.
     */

    const datosRegistro = new FormData();

    datosRegistro.append(
        'idEmpleadoVinculado',
        evento.target[0].value
    );
    datosRegistro.append(
        'descripcionHorario',
        evento.target[1].value
    );
    datosRegistro.append(
        'tolerancia',
        evento.target[2].value
    );

    // Registramos el permiso en la base de datos.
    RegistrarHorario(
        datosRegistro,
        undefined,
        (error: any) => {console.log(
            error
        )},
        undefined,
        () => {setRefresh(
            !refresh
        )},
    );
};

// Modificamos un registro de la base de datos
// y guardamos los cambios realizados.
const modificarRegistro = (
    evento: any,
    idRegistro: number,
    refresh: boolean,
    setRefresh: Function
) => {
    /**
     * Modificamos el registro pasado por evento.
     */

    const datosModificaion = new FormData();

    datosModificaion.append(
        'idEmpleadoVinculado',
        evento.target[0].value
    );
    datosModificaion.append(
        'descripcionHorario',
        evento.target[1].value
    );
    datosModificaion.append(
        'tolerancia',
        evento.target[2].value
    );

    // Registramos el permiso en la base de datos.
    ModificarHorario(
        idRegistro,
        datosModificaion,
        undefined,
        (error: any) => {console.log(
            error
        )},
        undefined,
        () => {setRefresh(
            !refresh
        )},
    );
};

// Eliminamos un registro de la base de datos.
const eliminarRegistro = (
    idRegistro: number,
    refresh: boolean,
    setRefresh: Function
) => {
    RemoverHorario(
        idRegistro,
        undefined,
        (error: any) => {console.log(
            error
        )},
        undefined,
        () => {setRefresh(
            !refresh
        )},
    );
};

// Consulta los registros de los permisos filtrados.
const consultarRegistros = (
    setListaRegistros: Function,
    setTotalPaginas: Function,
    setEnCarga: Function,
    querry: {
        limit?: number,
        offset?: number,
        id?: number,
        descripcionHorario?: string,
        idEmpleadoVinculado?: number
    }
) => {
    return ConsultaHorario(
        (respuesta: any) => {
            setListaRegistros(respuesta.registros);
            setTotalPaginas(Math.ceil(
                respuesta.totalRegistros / querry.limit
            ));
        },
        querry,
        (error: any) => {
            console.log(error);
            setEnCarga(false);
        },
        () => {
            setListaRegistros([]);
            setEnCarga(true);
        },
        undefined
    );
};

// Consultamos los registros de las empleados.
const consultarRegistrosEmpleados = (
    setListaEmpleados: Function,
    setEnCarga: Function
) => {
    return ConsultaEmpleado(
        (respuesta: any) => {setListaEmpleados(
            respuesta.registros
        )},
        undefined,
        (error: any) => {
            console.log(error);
            setEnCarga(false);
        },
        () => {
            setListaEmpleados([]);
            setEnCarga(true);
        },
        () => {
            setEnCarga(false);
        }
    );
};

export {
    formatearRegistros,
    exportarDatos,
    guardarRegistro,
    modificarRegistro,
    eliminarRegistro,
    consultarRegistros,
    consultarRegistrosEmpleados
};