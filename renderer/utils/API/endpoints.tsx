import axios from "axios";

// Variables del entorno.
const API_PORT = process.env.API_PORT;
const API_HOST = process.env.API_HOST;
const API_URL = process.env.API_URL;

const BASE_URL = 'http://'
    + API_HOST
    + ':'
    + API_PORT;

const URL_GENERALES = {
    /*
    * Endpoints generales de la api. 
    */

    IOT: 'IoT/',
    PERMISO: 'permiso/',
    REPORTE: 'reporte/',
    ROL: 'rol/',
    TIPO_REPORTE: 'tipoReporte/',
    ZONA: 'zona/',
    EMPLEADO: 'empleado/',
    DASHBOARD: 'dashboard/',
    USUARIO: 'usuario/',
    RECURSO: 'recurso/',
    TIPO_DISPOSITIVO: 'tipoDispositivo/',
    DISPOSITIVO: 'dispositivo/',
    DIAS_LABORALES: 'diaLaboral/',
    HORARIO: 'horario/',
    REPORTE_ACTIVIDAD: 'reporteActividad/',
    REPORTE_DISPOSITIVO: 'reporteDispositivo/',
    REPORTE_ACCESO: 'reporteAcceso/',
    REPORTE_CHEQUEO: 'reporteChequeo/'
};

var REQUEST_HANDLER = axios.create({
    baseURL: BASE_URL + API_URL
});

const ENDPOINTS = {
    USUARIO: {
        LOGIN: (datos: any) => {
            return REQUEST_HANDLER({
                method: 'post',
                url: URL_GENERALES.USUARIO + 'login',
                data: datos
            });
        },

        CONSULTA: (parametros: any) => {
            return REQUEST_HANDLER({
                method: 'get',
                url: URL_GENERALES.USUARIO + 'consultar',
                params: parametros,
                headers: { 'authorization': sessionStorage.getItem('token') }
            });
        },

        REGISTRAR: (datos: FormData) => {
            return REQUEST_HANDLER({
                method: 'post',
                url: URL_GENERALES.USUARIO + 'registrar',
                data: datos,
                headers: { 'authorization': sessionStorage.getItem('token') }
            });
        },

        MODIFICAR: (parametros: any, datos: FormData) => {
            return REQUEST_HANDLER({
                method: 'put',
                url: URL_GENERALES.USUARIO + 'modificar',
                params: parametros,
                data: datos,
                headers: { 'authorization': sessionStorage.getItem('token') }
            });
        },

        ELIMINAR: (parametros: any) => {
            return REQUEST_HANDLER({
                method: 'delete',
                url: URL_GENERALES.USUARIO + 'eliminar',
                params: parametros,
                headers: { 'authorization': sessionStorage.getItem('token') }
            });
        }
    },

    DISPOSITIVO: {
        CONSULTA: (parametros: any) => {
            return REQUEST_HANDLER({
                method: 'get',
                url: URL_GENERALES.DISPOSITIVO + 'consultar',
                params: parametros,
                headers: { 'authorization': sessionStorage.getItem('token') }
            });
        },

        REGISTRAR: (datos: FormData) => {
            return REQUEST_HANDLER({
                method: 'post',
                url: URL_GENERALES.DISPOSITIVO + 'registrar/dispositivo',
                data: datos,
                headers: { 'authorization': sessionStorage.getItem('token') }
            });
        },

        MODIFICAR: (parametros: any, datos: FormData) => {
            return REQUEST_HANDLER({
                method: 'put',
                url: URL_GENERALES.DISPOSITIVO + 'modificar',
                params: parametros,
                data: datos,
                headers: { 'authorization': sessionStorage.getItem('token') }
            });
        },

        ELIMINAR: (parametros: any) => {
            return REQUEST_HANDLER({
                method: 'delete',
                url: URL_GENERALES.DISPOSITIVO + 'eliminar',
                params: parametros,
                headers: { 'authorization': sessionStorage.getItem('token') }
            });
        },

        GENERAR_TOKEN: (parametros: any) => {
            return REQUEST_HANDLER({
                method: 'get',
                url: URL_GENERALES.DISPOSITIVO + 'generar/token',
                params: parametros,
                headers: { 'authorization': sessionStorage.getItem('token') }
            });
        }
    },

    PERMISO: {
        CONSULTA: (parametros: any) => {
            return REQUEST_HANDLER({
                method: 'get',
                url: URL_GENERALES.PERMISO + 'consultar',
                params: parametros,
                headers: { 'authorization': sessionStorage.getItem('token') }
            });
        },

        REGISTRAR: (datos: FormData) => {
            return REQUEST_HANDLER({
                method: 'post',
                url: URL_GENERALES.PERMISO + 'registrar',
                data: datos,
                headers: { 'authorization': sessionStorage.getItem('token') }
            });
        },

        MODIFICAR: (parametros: any, datos: FormData) => {
            return REQUEST_HANDLER({
                method: 'put',
                url: URL_GENERALES.PERMISO + 'modificar',
                params: parametros,
                data: datos,
                headers: { 'authorization': sessionStorage.getItem('token') }
            });
        },

        ELIMINAR: (parametros: any) => {
            return REQUEST_HANDLER({
                method: 'delete',
                url: URL_GENERALES.PERMISO + 'eliminar',
                params: parametros,
                headers: { 'authorization': sessionStorage.getItem('token') }
            });
        }
    },

    REPORTE: {
        CONSULTA: (parametros: any) => {
            return REQUEST_HANDLER({
                method: 'get',
                url: URL_GENERALES.REPORTE + 'consultar',
                params: parametros,
                headers: { 'authorization': sessionStorage.getItem('token') }
            });
        },

        REGISTRAR: (datos: FormData) => {
            return REQUEST_HANDLER({
                method: 'post',
                url: URL_GENERALES.REPORTE + 'registrar',
                data: datos,
                headers: { 'authorization': sessionStorage.getItem('token') }
            });
        },

        MODIFICAR: (parametros: any, datos: FormData) => {
            return REQUEST_HANDLER({
                method: 'put',
                url: URL_GENERALES.REPORTE + 'modificar',
                params: parametros,
                data: datos,
                headers: { 'authorization': sessionStorage.getItem('token') }
            });
        },

        ELIMINAR: (parametros: any) => {
            return REQUEST_HANDLER({
                method: 'delete',
                url: URL_GENERALES.REPORTE + 'eliminar',
                params: parametros,
                headers: { 'authorization': sessionStorage.getItem('token') }
            });
        }
    },

    ROL: {
        CONSULTA: (parametros: any) => {
            return REQUEST_HANDLER({
                method: 'get',
                url: URL_GENERALES.ROL + 'consultar',
                params: parametros,
                headers: { 'authorization': sessionStorage.getItem('token') }
            });
        },

        REGISTRAR: (datos: FormData) => {
            return REQUEST_HANDLER({
                method: 'post',
                url: URL_GENERALES.ROL + 'registrar',
                data: datos,
                headers: { 'authorization': sessionStorage.getItem('token') }
            });
        },

        MODIFICAR: (parametros: any, datos: FormData) => {
            return REQUEST_HANDLER({
                method: 'put',
                url: URL_GENERALES.ROL + 'modificar',
                params: parametros,
                data: datos,
                headers: { 'authorization': sessionStorage.getItem('token') }
            });
        },

        ELIMINAR: (parametros: any) => {
            return REQUEST_HANDLER({
                method: 'delete',
                url: URL_GENERALES.ROL + 'eliminar',
                params: parametros,
                headers: { 'authorization': sessionStorage.getItem('token') }
            });
        }
    },

    TIPO_REPORTE: {
        CONSULTA: (parametros: any) => {
            return REQUEST_HANDLER({
                method: 'get',
                url: URL_GENERALES.TIPO_REPORTE + 'consultar',
                params: parametros,
                headers: { 'authorization': sessionStorage.getItem('token') }
            });
        },

        REGISTRAR: (datos: FormData) => {
            return REQUEST_HANDLER({
                method: 'post',
                url: URL_GENERALES.TIPO_REPORTE + 'registrar',
                data: datos,
                headers: { 'authorization': sessionStorage.getItem('token') }
            });
        },

        MODIFICAR: (parametros: any, datos: FormData) => {
            return REQUEST_HANDLER({
                method: 'put',
                url: URL_GENERALES.TIPO_REPORTE + 'modificar',
                params: parametros,
                data: datos,
                headers: { 'authorization': sessionStorage.getItem('token') }
            });
        },

        ELIMINAR: (parametros: any) => {
            return REQUEST_HANDLER({
                method: 'delete',
                url: URL_GENERALES.TIPO_REPORTE + 'eliminar',
                params: parametros,
                headers: { 'authorization': sessionStorage.getItem('token') }
            });
        }
    },

    ZONA: {
        CONSULTA: (parametros: any) => {
            return REQUEST_HANDLER({
                method: 'get',
                url: URL_GENERALES.ZONA + 'consultar',
                params: parametros,
                headers: { 'authorization': sessionStorage.getItem('token') }
            });
        },

        REGISTRAR: (datos: FormData) => {
            return REQUEST_HANDLER({
                method: 'post',
                url: URL_GENERALES.ZONA + 'registrar',
                data: datos,
                headers: { 'authorization': sessionStorage.getItem('token') }
            });
        },

        MODIFICAR: (parametros: any, datos: FormData) => {
            return REQUEST_HANDLER({
                method: 'put',
                url: URL_GENERALES.ZONA + 'modificar',
                params: parametros,
                data: datos,
                headers: { 'authorization': sessionStorage.getItem('token') }
            });
        },

        ELIMINAR: (parametros: any) => {
            return REQUEST_HANDLER({
                method: 'delete',
                url: URL_GENERALES.ZONA + 'eliminar',
                params: parametros,
                headers: { 'authorization': sessionStorage.getItem('token') }
            });
        }
    },

    EMPLEADO: {
        CONSULTA: (parametros: any) => {
            return REQUEST_HANDLER({
                method: 'get',
                url: URL_GENERALES.EMPLEADO + 'consultar',
                params: parametros,
                headers: { 'authorization': sessionStorage.getItem('token') }
            });
        },

        REGISTRAR: (datos: FormData) => {
            return REQUEST_HANDLER({
                method: 'post',
                url: URL_GENERALES.EMPLEADO + 'registrar',
                data: datos,
                headers: { 'authorization': sessionStorage.getItem('token') }
            });
        },

        MODIFICAR: (parametros: any, datos: FormData) => {
            return REQUEST_HANDLER({
                method: 'put',
                url: URL_GENERALES.EMPLEADO + 'modificar',
                params: parametros,
                data: datos,
                headers: { 'authorization': sessionStorage.getItem('token') }
            });
        },

        ELIMINAR: (parametros: any) => {
            return REQUEST_HANDLER({
                method: 'delete',
                url: URL_GENERALES.EMPLEADO + 'eliminar',
                params: parametros,
                headers: { 'authorization': sessionStorage.getItem('token') }
            });
        }
    },

    DASHBOARD: {
        ACCESOS_RECIENTES: (parametros: any) => {
            return REQUEST_HANDLER({
                method: 'get',
                url: URL_GENERALES.DASHBOARD + 'accesos',
                params: parametros,
                headers: { 'authorization': sessionStorage.getItem('token') }
            });
        },

        ACCESOS_POR_DIA: (parametros: any) => {
            return REQUEST_HANDLER({
                method: 'get',
                url: URL_GENERALES.DASHBOARD + 'accesos/porDia',
                params: parametros,
                headers: { 'authorization': sessionStorage.getItem('token') }
            });
        },

        REPORTE_POR_TIPO: (parametros: any) => {
            return REQUEST_HANDLER({
                method: 'get',
                url: URL_GENERALES.DASHBOARD + 'accesos/porTipo',
                params: parametros,
                headers: { 'authorization': sessionStorage.getItem('token') }
            });
        },
    },

    RECURSO: {
        CONSULTA: (parametros: any) => {
            return REQUEST_HANDLER({
                method: 'get',
                url: URL_GENERALES.RECURSO + 'consultar',
                params: parametros,
                headers: { 'authorization': sessionStorage.getItem('token') }
            });
        },

        REGISTRAR: (datos: FormData) => {
            return REQUEST_HANDLER({
                method: 'post',
                url: URL_GENERALES.RECURSO + 'registrar',
                data: datos,
                headers: { 'authorization': sessionStorage.getItem('token') }
            });
        },

        MODIFICAR: (parametros: any, datos: FormData) => {
            return REQUEST_HANDLER({
                method: 'put',
                url: URL_GENERALES.RECURSO + 'modificar',
                params: parametros,
                data: datos,
                headers: { 'authorization': sessionStorage.getItem('token') }
            });
        },

        ELIMINAR: (parametros: any) => {
            return REQUEST_HANDLER({
                method: 'delete',
                url: URL_GENERALES.RECURSO + 'eliminar',
                params: parametros,
                headers: { 'authorization': sessionStorage.getItem('token') }
            });
        }
    },

    TIPO_DISPOSITIVO: {
        CONSULTA: (parametros: any) => {
            return REQUEST_HANDLER({
                method: 'get',
                url: URL_GENERALES.TIPO_DISPOSITIVO + 'consultar',
                params: parametros,
                headers: { 'authorization': sessionStorage.getItem('token') }
            });
        },

        REGISTRAR: (datos: FormData) => {
            return REQUEST_HANDLER({
                method: 'post',
                url: URL_GENERALES.TIPO_DISPOSITIVO + 'registrar',
                data: datos,
                headers: { 'authorization': sessionStorage.getItem('token') }
            });
        },

        MODIFICAR: (parametros: any, datos: FormData) => {
            return REQUEST_HANDLER({
                method: 'put',
                url: URL_GENERALES.TIPO_DISPOSITIVO + 'modificar',
                params: parametros,
                data: datos,
                headers: { 'authorization': sessionStorage.getItem('token') }
            });
        },

        ELIMINAR: (parametros: any) => {
            return REQUEST_HANDLER({
                method: 'delete',
                url: URL_GENERALES.TIPO_DISPOSITIVO + 'eliminar',
                params: parametros,
                headers: { 'authorization': sessionStorage.getItem('token') }
            });
        }
    },

    DIA_LABORAL: {
        CONSULTA: (parametros: any) => {
            return REQUEST_HANDLER({
                method: 'get',
                url: URL_GENERALES.DIAS_LABORALES + 'consultar',
                params: parametros,
                headers: { 'authorization': sessionStorage.getItem('token') }
            });
        },

        REGISTRAR: (datos: FormData) => {
            return REQUEST_HANDLER({
                method: 'post',
                url: URL_GENERALES.DIAS_LABORALES + 'registrar',
                data: datos,
                headers: { 'authorization': sessionStorage.getItem('token') }
            });
        },

        MODIFICAR: (parametros: any, datos: FormData) => {
            return REQUEST_HANDLER({
                method: 'put',
                url: URL_GENERALES.DIAS_LABORALES + 'modificar',
                params: parametros,
                data: datos,
                headers: { 'authorization': sessionStorage.getItem('token') }
            });
        },

        ELIMINAR: (parametros: any) => {
            return REQUEST_HANDLER({
                method: 'delete',
                url: URL_GENERALES.DIAS_LABORALES + 'eliminar',
                params: parametros,
                headers: { 'authorization': sessionStorage.getItem('token') }
            });
        }
    },

    HORARIO: {
        CONSULTA: (parametros: any) => {
            return REQUEST_HANDLER({
                method: 'get',
                url: URL_GENERALES.HORARIO + 'consultar',
                params: parametros,
                headers: { 'authorization': sessionStorage.getItem('token') }
            });
        },

        REGISTRAR: (datos: FormData) => {
            return REQUEST_HANDLER({
                method: 'post',
                url: URL_GENERALES.HORARIO + 'registrar',
                data: datos,
                headers: { 'authorization': sessionStorage.getItem('token') }
            });
        },

        MODIFICAR: (parametros: any, datos: FormData) => {
            return REQUEST_HANDLER({
                method: 'put',
                url: URL_GENERALES.HORARIO + 'modificar',
                params: parametros,
                data: datos,
                headers: { 'authorization': sessionStorage.getItem('token') }
            });
        },

        ELIMINAR: (parametros: any) => {
            return REQUEST_HANDLER({
                method: 'delete',
                url: URL_GENERALES.HORARIO + 'eliminar',
                params: parametros,
                headers: { 'authorization': sessionStorage.getItem('token') }
            });
        }
    },

    REPORTE_ACTIVIDAD: {
        CONSULTA: (parametros: any) => {
            return REQUEST_HANDLER({
                method: 'get',
                url: URL_GENERALES.REPORTE_ACTIVIDAD + 'consultar',
                params: parametros,
                headers: { 'authorization': sessionStorage.getItem('token') }
            });
        },

        REGISTRAR: (datos: FormData) => {
            return REQUEST_HANDLER({
                method: 'post',
                url: URL_GENERALES.REPORTE_ACTIVIDAD + 'registrar',
                data: datos,
                headers: { 'authorization': sessionStorage.getItem('token') }
            });
        },

        MODIFICAR: (parametros: any, datos: FormData) => {
            return REQUEST_HANDLER({
                method: 'put',
                url: URL_GENERALES.REPORTE_ACTIVIDAD + 'modificar',
                params: parametros,
                data: datos,
                headers: { 'authorization': sessionStorage.getItem('token') }
            });
        },

        ELIMINAR: (parametros: any) => {
            return REQUEST_HANDLER({
                method: 'delete',
                url: URL_GENERALES.REPORTE_ACTIVIDAD + 'eliminar',
                params: parametros,
                headers: { 'authorization': sessionStorage.getItem('token') }
            });
        }
    },

    REPORTE_DISPOSITIVO: {
        CONSULTA: (parametros: any) => {
            return REQUEST_HANDLER({
                method: 'get',
                url: URL_GENERALES.REPORTE_DISPOSITIVO + 'consultar',
                params: parametros,
                headers: { 'authorization': sessionStorage.getItem('token') }
            });
        },

        REGISTRAR: (datos: FormData) => {
            return REQUEST_HANDLER({
                method: 'post',
                url: URL_GENERALES.REPORTE_DISPOSITIVO + 'registrar',
                data: datos,
                headers: { 'authorization': sessionStorage.getItem('token') }
            });
        },

        MODIFICAR: (parametros: any, datos: FormData) => {
            return REQUEST_HANDLER({
                method: 'put',
                url: URL_GENERALES.REPORTE_DISPOSITIVO + 'modificar',
                params: parametros,
                data: datos,
                headers: { 'authorization': sessionStorage.getItem('token') }
            });
        },

        ELIMINAR: (parametros: any) => {
            return REQUEST_HANDLER({
                method: 'delete',
                url: URL_GENERALES.REPORTE_DISPOSITIVO + 'eliminar',
                params: parametros,
                headers: { 'authorization': sessionStorage.getItem('token') }
            });
        }
    },

    REPORTE_ACCESO: {
        CONSULTA: (parametros: any) => {
            return REQUEST_HANDLER({
                method: 'get',
                url: URL_GENERALES.REPORTE_ACCESO + 'consultar',
                params: parametros,
                headers: { 'authorization': sessionStorage.getItem('token') }
            });
        },

        REGISTRAR: (datos: FormData) => {
            return REQUEST_HANDLER({
                method: 'post',
                url: URL_GENERALES.REPORTE_ACCESO + 'registrar',
                data: datos,
                headers: { 'authorization': sessionStorage.getItem('token') }
            });
        },

        MODIFICAR: (parametros: any, datos: FormData) => {
            return REQUEST_HANDLER({
                method: 'put',
                url: URL_GENERALES.REPORTE_ACCESO + 'modificar',
                params: parametros,
                data: datos,
                headers: { 'authorization': sessionStorage.getItem('token') }
            });
        },

        ELIMINAR: (parametros: any) => {
            return REQUEST_HANDLER({
                method: 'delete',
                url: URL_GENERALES.REPORTE_ACCESO + 'eliminar',
                params: parametros,
                headers: { 'authorization': sessionStorage.getItem('token') }
            });
        }
    },

    REPORTE_CHEQUEO: {
        CONSULTA: (parametros: any) => {
            return REQUEST_HANDLER({
                method: 'get',
                url: URL_GENERALES.REPORTE_CHEQUEO + 'consultar',
                params: parametros,
                headers: { 'authorization': sessionStorage.getItem('token') }
            });
        },

        REGISTRAR: (datos: FormData) => {
            return REQUEST_HANDLER({
                method: 'post',
                url: URL_GENERALES.REPORTE_CHEQUEO + 'registrar',
                data: datos,
                headers: { 'authorization': sessionStorage.getItem('token') }
            });
        },

        MODIFICAR: (parametros: any, datos: FormData) => {
            return REQUEST_HANDLER({
                method: 'put',
                url: URL_GENERALES.REPORTE_CHEQUEO + 'modificar',
                params: parametros,
                data: datos,
                headers: { 'authorization': sessionStorage.getItem('token') }
            });
        },

        ELIMINAR: (parametros: any) => {
            return REQUEST_HANDLER({
                method: 'delete',
                url: URL_GENERALES.REPORTE_CHEQUEO + 'eliminar',
                params: parametros,
                headers: { 'authorization': sessionStorage.getItem('token') }
            });
        }
    },

    IOT: {

    }
};

export {
    BASE_URL,
    ENDPOINTS
};