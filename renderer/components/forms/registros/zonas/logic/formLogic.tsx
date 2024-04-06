import { ModificarZona, RegistrarZona } from "../../../../../utils/API/interface/zona";
import { formatearDatos } from "../../../../../utils/formatDataTabla";

function guardarRegistro(evento) {
    /**
     * Creamos un nuevo registro y lo guardamos en la base de datos.
     */
    
    const datosRegistro = new FormData();

    // Recuperamos los datos del registro.
    datosRegistro.append('nombreZona', evento.target[0].value);
    datosRegistro.append('descripcionZona', evento.target[1].value);
    datosRegistro.append('bitZona', evento.target[2].value);

    // Registramos el permiso en la base de datos.
    RegistrarZona(datosRegistro);
};

function modificarRegistro(evento, idRegistro: number) {
    /**
     * Modificamos el registro pasado por evento.
     */
    
    const datosModificaion = new FormData();

    // Recuperamos los datos del registro.
    datosModificaion.append('nombreZona', evento.target[0].value);
    datosModificaion.append('descripcionZona', evento.target[1].value);
    datosModificaion.append('bitZona', evento.target[2].value);


    // Registramos el permiso en la base de datos.
    ModificarZona(idRegistro, datosModificaion);
};

export {
    guardarRegistro,
    modificarRegistro
}