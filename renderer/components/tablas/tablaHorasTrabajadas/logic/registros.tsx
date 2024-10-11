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
    Rol
} from "../../../../utils/API/modelos/rol";

// Importamos la interfaz con la API.
import {
    ConsultaRol
} from "../../../../utils/API/interface/rol";

import {
    ConsultaHorasTrabajadas
} from "../../../../utils/API/interface/reportes";

// Registros que se mostraran en la tabla.
const formatearRegistros = (
    listaRegistros: any[]
) => {
    return formatearDatos(
        listaRegistros,
        [
            ['nombres'],
            ['horasTrabajadas'],
            ['tiempoTrabajoTotal']
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
        ConsultaHorasTrabajadas(
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

// Consulta los registros de los permisos filtrados.
const consultarRegistros = (
    setListaRegistros: Function,
    setTotalPaginas: Function,
    setEnCarga: Function,
    querry: {
        limit?: number,
        offset?: number,
        idEmpleadoVinculado?: string,
        nombres?: string,
        idRolVinculado?: number,
        semanaReporte?: string
    }
) => {
    return ConsultaHorasTrabajadas(
        (respuesta: any) => {
            setListaRegistros(respuesta.datosPorEmpleado);
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

// Consultamos los registros Vinculados de los roles.
const consultarRegistrosRoles = (
    setListaRoles: Function,
    setEnCarga: Function
) => {
    return ConsultaRol(
        (respuesta: any) => {setListaRoles(
            respuesta.registros
        )},
        undefined,
        (error: any) => {
            console.log(error);
            setEnCarga(false);
        },
        () => {
            setListaRoles([]);
            setEnCarga(true);
        },
        () => {
            setEnCarga(false);
        }
    )
};

export {
    formatearRegistros,
    exportarDatos,
    consultarRegistros,
    consultarRegistrosRoles
};