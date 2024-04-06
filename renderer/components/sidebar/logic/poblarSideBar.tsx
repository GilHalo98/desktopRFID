// Paginas a las que se pueden accesar desde el sidebar.
const paginas = [
    {
        id: "apartadoDashboard",
        descripcion: 'Dashboard',
        subdivicion: [
            {id: "1.1", url: "/home/dashboard", descripcion: "Dashboard"},
            {id: "1.2", url: "/home/dashboard/accesosRecientes", descripcion: "Accesos Recientes"},
            {id: "1.3", url: "/home/dashboard/statusDispositivos", descripcion: "Status de dispositivos"}
        ]
    },
    {
        id: "apartadoRegistros", 
        descripcion: 'Registros',
        subdivicion: [
            {id: "2.1", url: "/home/registros/listaReportes", descripcion: "Reportes"},
            {id: "2.2", url: "/home/registros/listaPermisos", descripcion: "Permisos"},
            {id: "2.3", url: "/home/registros/listaEmpleados", descripcion: "Empelados"},
            {id: "2.4", url: "/home/registros/listaRoles", descripcion: "Roles"},
            {id: "2.5", url: "/home/registros/listaTiposReportes", descripcion: "Tipos de Reportes"},
            {id: "2.6", url: "/home/registros/listaZonas", descripcion: "Zonas"},
            {id: "2.7", url: "/home/registros/listaUsuarios", descripcion: "Usuarios"},
            {id: "2.8", url: "/home/registros/listaDispositivos", descripcion: "Dispositivos IoT"},
            {id: "2.9", url: "/home/registros/listaTiposDispositivos", descripcion: "Tipos de Dispositivos IoT"},
        ]
    },
    {
        id: "apartadoReportes",
        descripcion: 'Reportes',
        subdivicion: [
            {id: "3.1", url: "/home/reportes/horasTrabajadas", descripcion: "Horas trabajadas"},
        ]
    },
];

// Retornamos las paginas como un modulo.
export default paginas;
