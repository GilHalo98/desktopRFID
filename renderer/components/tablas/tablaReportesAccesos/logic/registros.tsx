// Formatea los datos del registro.
import {
    exportarDatosTabla,
    formatearDatos
} from "../../../../utils/formatDataTabla";

// Modelo de datos.
import {
    ReporteAcceso
} from "../../../../utils/API/modelos/reporteAcceso";

// Importamos la interfaz con la API.
import {
    ConsultaReporte
} from '../../../../utils/API/interface/reporte';

import {
    ConsultaEmpleado
} from '../../../../utils/API/interface/empleado';

import {
    ConsultaZona
} from '../../../../utils/API/interface/zona';

import {
    ConsultaReporteAcceso,
    ModificarReporteAcceso,
    RegistrarReporteAcceso,
    RemoverReporteAcceso
} from "../../../../utils/API/interface/reporteAcceso";

// Registros que se mostraran en la tabla.
const formatearRegistros = (
    listaRegistros: any[]
) => {
    return formatearDatos(
        listaRegistros,
        [
            ['id'],
            ['idReporteVinculado'],
            ['idEmpleadoVinculado'],
            ['idZonaVinculada'],
            ['fechaRegistroReporteAcceso'],
            ['fechaModificacionReporteAceso']
        ],
        [
            'id',
            'indexRegistro'
        ]
    );
};

// Exportamos los datos a formato excel.
const exportarDatos = (
    exportarDatosEnVista: boolean,
    datosRegistro: ReporteAcceso[],
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
        ConsultaReporteAcceso(
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
        'idReporteVinculado',
        evento.target[0].value
    );

    datosRegistro.append(
        'idEmpleadoVinculado',
        evento.target[1].value
    );

    datosRegistro.append(
        'idZonaVinculada',
        evento.target[2].value
    );

    // Registramos el permiso en la base de datos.
    RegistrarReporteAcceso(
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
        'idReporteVinculado',
        evento.target[0].value
    );

    datosModificaion.append(
        'idEmpleadoVinculado',
        evento.target[1].value
    );

    datosModificaion.append(
        'idZonaVinculada',
        evento.target[2].value
    );

    // Registramos el permiso en la base de datos.
    ModificarReporteAcceso(
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
    RemoverReporteAcceso(
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
        idReporteVinculado?: number,
        idEmpleadoVinculado?: number,
        idZonaVinculado?: number
    }
) => {
    return ConsultaReporteAcceso(
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

// Consultamos los registros de los reportes.
const consultarRegistrosReporte = (
    setListaReporte: Function,
    setEnCarga: Function
) => {
    return ConsultaReporte(
        (respuesta: any) => {setListaReporte(
            respuesta.registros
        )},
        undefined,
        (error: any) => {
            console.log(error);
            setEnCarga(false);
        },
        () => {
            setListaReporte([]);
            setEnCarga(true);
        },
    );
};

// Consultamos los registros de los empleados.
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
    );
};

// Consultamos los registros de los dispositivos.
const consultarRegistrosZonas = (
    setListaZonas: Function,
    setEnCarga: Function
) => {
    return ConsultaZona(
        (respuesta: any) => {setListaZonas(
            respuesta.registros
        )},
        undefined,
        (error: any) => {
            console.log(error);
            setEnCarga(false);
        },
        () => {
            setListaZonas([]);
            setEnCarga(true);
        },
        () => {setEnCarga(
            false
        )}
    );
};

export {
    formatearRegistros,
    exportarDatos,
    guardarRegistro,
    modificarRegistro,
    eliminarRegistro,
    consultarRegistros,
    consultarRegistrosReporte,
    consultarRegistrosEmpleados,
    consultarRegistrosZonas
};