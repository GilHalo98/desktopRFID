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
    mdiDatabase
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
            icono: mdiDatabase
        }, {
            id: "2.2",
            url: "/home/registros/listaPermisos",
            descripcion: "Permisos",
            icono: mdiDatabase
        }, {
            id: "2.3",
            url: "/home/registros/listaEmpleados",
            descripcion: "Empelados",
            icono: mdiDatabase
        }, {
            id: "2.4",
            url: "/home/registros/listaRoles",
            descripcion: "Roles",
            icono: mdiDatabase
        }, {
            id: "2.5",
            url: "/home/registros/listaTiposReportes",
            descripcion: "Tipos de Reportes",
            icono: mdiDatabase
        }, {
            id: "2.6",
            url: "/home/registros/listaZonas",
            descripcion: "Zonas",
            icono: mdiDatabase
        }, {
            id: "2.7",
            url: "/home/registros/listaUsuarios",
            descripcion: "Usuarios",
            icono: mdiDatabase
        }, {
            id: "2.8",
            url: "/home/registros/listaDispositivos",
            descripcion: "Dispositivos IoT",
            icono: mdiDatabase
        }, {
            id: "2.9",
            url: "/home/registros/listaTiposDispositivos",
            descripcion: "Tipos de Dispositivos IoT",
            icono: mdiDatabase
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
            url: "/home/reportes/horasTrabajadas",
            descripcion: "Actividad de maquinas",
            icono: mdiArchiveCog
        }]
    }, {
        id: "apartadoEmpleados",
        descripcion: 'Empleados',
        icono: mdiAccountGroup,
        subdivicion: [{
            id: "4.1",
            url: "/home/empleados/registros",
            descripcion: "Registros de empleados",
            icono: mdiAccountDetails
        }, {
            id: "4.2",
            url: "/home/empleados/horarios",
            descripcion: "Horarios de empleados",
            icono: mdiCalendarAccount
        }]
}];

// Retornamos las paginas como un modulo.
export default paginas;
