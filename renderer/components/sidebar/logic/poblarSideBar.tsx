import {
    mdiViewDashboard,
    mdiFactory,
    mdiListStatus,
    mdiClipboardTextClock,
    mdiClipboardEdit,
    mdiArchiveClock,
    mdiArchiveCog,
    mdiAccountGroup,
    mdiCalendarAccount,
    mdiAccountDetails,
    mdiDatabase,
    mdiClipboardMultiple,
    mdiAlertOctagon,
    mdiAccountHardHat,
    mdiFormatListBulletedSquare,
    mdiClipboardList,
    mdiCompass,
    mdiAccount,
    mdiChip,
    mdiFormatListBulletedType,
    mdiViewWeek,
    mdiCalendarBlank,
    mdiFileMultiple,
    mdiClipboardPlay,
    mdiClipboardAlert,
    mdiClipboardClock,
    mdiClipboardFlow
} from '@mdi/js';

// Paginas a las que se pueden accesar desde el sidebar.
const paginas = [{
        id: "apartadoDashboard",
        descripcion: 'Dashboard',
        icono: mdiViewDashboard,
        subdivicion: [{
            id: "1.1",
            url: "/home/dashboard/actividadMaquinas",
            descripcion: "Actividad de maquinas",
            icono: mdiListStatus
        }, {
            id: "1.2",
            url: "/home/dashboard/accesosRecientes",
            descripcion: "Accesos Recientes",
            icono: mdiClipboardTextClock
        }, {
            id: "1.3",
            url: "/home/dashboard/statusDispositivos",
            descripcion: "Status de dispositivos",
            icono: mdiFactory
        }]

    }, {
        id: "apartadoRegistros", 
        descripcion: 'Registros',
        icono: mdiDatabase,
        subdivicion: [{
            id: "2.1",
            url: "/home/registros/listaReportes",
            descripcion: "Reportes",
            icono: mdiClipboardMultiple
        }, {
            id: "2.2",
            url: "/home/registros/listaPermisos",
            descripcion: "Permisos",
            icono: mdiAlertOctagon
        }, {
            id: "2.3",
            url: "/home/registros/listaEmpleados",
            descripcion: "Empelados",
            icono: mdiAccountHardHat
        }, {
            id: "2.4",
            url: "/home/registros/listaRoles",
            descripcion: "Roles",
            icono: mdiFormatListBulletedSquare
        }, {
            id: "2.5",
            url: "/home/registros/listaTiposReportes",
            descripcion: "Tipos de Reportes",
            icono: mdiClipboardList
        }, {
            id: "2.6",
            url: "/home/registros/listaZonas",
            descripcion: "Zonas",
            icono: mdiCompass
        }, {
            id: "2.7",
            url: "/home/registros/listaUsuarios",
            descripcion: "Usuarios",
            icono: mdiAccount
        }, {
            id: "2.8",
            url: "/home/registros/listaDispositivos",
            descripcion: "Dispositivos IoT",
            icono: mdiChip
        }, {
            id: "2.9",
            url: "/home/registros/listaTiposDispositivos",
            descripcion: "Tipos de Dispositivos IoT",
            icono: mdiFormatListBulletedType
        }, {
            id: "2.10",
            url: "/home/registros/listaDiasLaborales",
            descripcion: "Días Laborales",
            icono: mdiViewWeek
        }, {
            id: "2.11",
            url: "/home/registros/listaHorarios",
            descripcion: "Horarios",
            icono: mdiCalendarBlank
        }, {
            id: "2.12",
            url: "/home/registros/listaRecursos",
            descripcion: "Recursos",
            icono: mdiFileMultiple
        }, {
            id: "2.13",
            url: "/home/registros/listaReportesActividades",
            descripcion: "Reporte de actividades",
            icono: mdiClipboardPlay
        }, {
            id: "2.14",
            url: "/home/registros/listaReportesAccesos",
            descripcion: "Reporte de accesos",
            icono: mdiClipboardFlow
        }, {
            id: "2.15",
            url: "/home/registros/listaReportesChequeos",
            descripcion: "Reporte de chequeos",
            icono: mdiClipboardClock
        }, {
            id: "2.16",
            url: "/home/registros/listaReportesDispositivos",
            descripcion: "Reporte de dispositivos",
            icono: mdiClipboardAlert
        }]

    }, {
        id: "apartadoReportes",
        descripcion: 'Reportes',
        icono: mdiClipboardEdit,
        subdivicion: [{
            id: "3.1",
            url: "/home/reportes/horasTrabajadas",
            descripcion: "Horas trabajadas",
            icono: mdiArchiveClock
        }, {
            id: "3.2",
            url: "/home/reportes/historialActividadMaquinas",
            descripcion: "Historial de actividad de maquinas",
            icono: mdiArchiveCog
        }]
    }, {
        id: "apartadoEmpleados",
        descripcion: 'Empleados',
        icono: mdiAccountGroup,
        subdivicion: [{
            id: "4.1",
            url: "/home/empleados/registrosEmpleados",
            descripcion: "Registros de empleados",
            icono: mdiAccountDetails
        }, {
            id: "4.2",
            url: "/home/empleados/horariosEmpleados",
            descripcion: "Horarios de empleados",
            icono: mdiCalendarAccount
        }]
}];

// Retornamos las paginas como un modulo.
export default paginas;
