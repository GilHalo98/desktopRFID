// Componentes propios.
import Display from "../../../displays/display";

// Modelo de datos.
import { Empleado } from "../../../../utils/API/modelos/empleado";
import { Permiso } from "../../../../utils/API/modelos/permiso";
import { Rol } from "../../../../utils/API/modelos/rol";

// Renderizamos el display de los datos del empleado.
const renderDatosEmpleado = (empleado: Empleado) => {
    if(typeof(empleado) != "undefined" ) {
        return <Display
            registro={empleado}
            nombresCampos={[
                'ID del empleado',
                'Nombre del empleado',
                'Apellido Paterno',
                'Apellido Materno'
            ]}
            campos={[
                ['id'],
                ['nombres'],
                ['apellidoPaterno'],
                ['apellidoMaterno']
            ]}
        />;
    }
};

// Renderizamos el display de los datos del rol.
const renderDatosRol = (rol: Rol) => {
    if(typeof(rol) != "undefined" ) {
        return <Display
            registro={rol}
            nombresCampos={[
                'ID del rol',
                'Nombre del rol',
                'Descripción del rol',
                'bit del rol'
            ]}
            campos={[
                ['id'],
                ['rolTrabajador'],
                ['descripcionRol'],
                ['bitRol']
            ]}
        />;
    }
};

// Renderizamos el display de los datos del permiso.
const renderDatosPermiso = (permiso: Permiso) => {
    if(typeof(permiso) != "undefined" ) {
        return <Display
            registro={permiso}
            nombresCampos={[
                'ID del permiso',
                'Descripción del permiso',
                'Autorización'
            ]}
            campos={[
                ['id'],
                ['descripcionPermiso'],
                ['autorizacion']
            ]}
        />;
    }
};

export {
    renderDatosEmpleado,
    renderDatosRol,
    renderDatosPermiso  
};