// Formatea los datos del registro.
import {
    exportarDatosTabla,
    formatearDatos
} from "../../../../utils/formatDataTabla";

// Modelo de datos
import {
    DiaLaboral
} from "../../../../utils/API/modelos/diaLaboral";

import {
    Horario
} from "../../../../utils/API/modelos/horario";

// Importamos la interfaz con la API.
import {
    ConsultaHorario
} from "../../../../utils/API/interface/horario";

import {
    ConsultaDiaLaboral,
    ModificarDiaLaboral,
    RegistrarDiaLaboral,
    RemoverDiaLaboral
} from "../../../../utils/API/interface/diaLaboral";

// Registros que se mostraran en la tabla.
const formatearRegistros = (
    listaRegistros: any[]
) => {
    return formatearDatos(
        listaRegistros,
        [
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
        ],
        ['id', 'indexRegistro']
    );
};

// Exportamos los datos a formato excel.
const exportarDatos = (
    exportarDatosEnVista: boolean,
    datosRegistro: DiaLaboral[],
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
        ConsultaDiaLaboral(
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
        'idHorarioVinculado',
        evento.target[0].value
    );
    datosRegistro.append(
        'dia',
        evento.target[1].value
    );
    datosRegistro.append(
        'esDescanso',
        evento.target[2].checked
    );
    datosRegistro.append(
        'horaEntrada',
        evento.target[3].value
    );
    datosRegistro.append(
        'horaSalida',
        evento.target[4].value
    );
    datosRegistro.append(
        'horaSalidaDescanso',
        evento.target[5].value
    );
    datosRegistro.append(
        'horaEntradaDescanso',
        evento.target[6].value
    );

    // Registramos el permiso en la base de datos.
    RegistrarDiaLaboral(
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
        'idHorarioVinculado',
        evento.target[0].value
    );
    datosModificaion.append(
        'dia',
        evento.target[1].value
    );
    datosModificaion.append(
        'esDescanso',
        evento.target[2].value
    );
    datosModificaion.append(
        'horaEntrada',
        evento.target[3].value
    );
    datosModificaion.append(
        'horaSalida',
        evento.target[4].value
    );
    datosModificaion.append(
        'horaSalidaDescanso',
        evento.target[5].value
    );
    datosModificaion.append(
        'horaEntradaDescanso',
        evento.target[6].value
    );

    // Registramos el permiso en la base de datos.
    ModificarDiaLaboral(
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
    RemoverDiaLaboral(
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
        dia?: number,
        idHorarioVinculado?: number
    }
) => {
    return ConsultaDiaLaboral(
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

// Consultamos los registros de las zonas.
const consultarRegistrosHorario = (
    setListaHorario: Function,
    setEnCarga: Function
) => {
    return ConsultaHorario(
        (respuesta: any) => {setListaHorario(
            respuesta.registros
        )},
        undefined,
        (error: any) => {
            console.log(error);
            setEnCarga(false);
        },
        () => {
            setListaHorario([]);
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
    consultarRegistrosHorario
};