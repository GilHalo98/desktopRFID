// Formatea los datos del registro.
import {
    exportarDatosTabla,
    formatearDatos
} from "../../../../utils/formatDataTabla";

// Modelo de permiso
import {
    Zona
} from "../../../../utils/API/modelos/zona";

import {
    TipoDispositivo
} from "../../../../utils/API/modelos/tipoDispositivo";

import {
    DispositivoIoT
} from "../../../../utils/API/modelos/dispositivoIoT";

// Importamos la interfaz con la API.
import {
    ConsultaZona
} from "../../../../utils/API/interface/zona";

import {
    ConsultaTipoDispositivo
} from "../../../../utils/API/interface/tipoDispositivo";

import {
    ConsultaDispositivo,
    ModificarDispositivo,
    RegistrarDispositivo,
    RemoverDispositivo
} from "../../../../utils/API/interface/dispositivo";

// Registros que se mostraran en la tabla.
const formatearRegistros = (
    listaRegistros: any[]
) => {
    return formatearDatos(
        listaRegistros,
        [
            ['id'],
            ['descripcionDispositivo'],
            ['idTipoDispositivoVinculado'],
            ['idZonaVinculada'],
            ['fechaRegistroIoT'],
            ['fechaModificacionIoT'],
        ],
        ['id', 'indexRegistro']
    );
};

// Exportamos los datos a formato excel.
const exportarDatos = (
    exportarDatosEnVista: boolean,
    datosRegistro: DispositivoIoT[],
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
        ConsultaDispositivo(
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
        'descripcionDispositivo',
        evento.target[0].value
    );
    datosRegistro.append(
        'idZonaVinculada',
        evento.target[1].value
    );
    datosRegistro.append(
        'idTipoDispositivoVinculado',
        evento.target[2].value
    );

    // Registramos el permiso en la base de datos.
    RegistrarDispositivo(
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
        'descripcionDispositivo',
        evento.target[0].value
    );
    datosModificaion.append(
        'idZonaVinculada',
        evento.target[1].value
    );
    datosModificaion.append(
        'idTipoDispositivoVinculado',
        evento.target[2].value
    );

    // Registramos el permiso en la base de datos.
    ModificarDispositivo(
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
    RemoverDispositivo(
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
        idZonaVinculada?: number,
        idTipoDispositivoVinculado?: number,
    }
) => {
    return ConsultaDispositivo(
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
        undefined
    );
};

// Consultamos los registros de los tipos de dispositivos.
const consultarRegistrosTiposDispositivos = (
    setListaTiposDispositivos: Function,
    setEnCarga: Function
) => {
    return ConsultaTipoDispositivo(
        (respuesta: any) => {setListaTiposDispositivos(
            respuesta.registros
        )},
        undefined,
        (error: any) => {
            console.log(error);
            setEnCarga(false);
        },
        () => {
            setListaTiposDispositivos([]);
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
    consultarRegistrosZonas,
    consultarRegistrosTiposDispositivos
};