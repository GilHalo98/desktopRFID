import { RegistrarReporte, ModificarReporte } from "../../../../../utils/API/interface/reporte";

function guardarRegistro(evento) {
    /**
     * Creamos un nuevo registro y lo guardamos en la base de datos.
     */

    const datosRegistro = new FormData();

    datosRegistro.append('descripcionReporte', evento.target[0].value);
    datosRegistro.append('idEmpleadoVinculado', evento.target[1].value);
    datosRegistro.append('idTipoReporteVinculado', evento.target[2].value);
    datosRegistro.append('idRegistroDispositivoIoTVinculado', evento.target[3].value);
    datosRegistro.append('idRegistroZonaVinculada', evento.target[4].value);

    RegistrarReporte(datosRegistro);
};

function modificarRegistro(evento, idRegistro: number) {
    /**
     * Modificamos el registro pasado por evento.
     */

    const datosModificaion = new FormData();

    datosModificaion.append('descripcionReporte', evento.target[0].value);
    datosModificaion.append('idEmpleadoVinculado', evento.target[1].value);
    datosModificaion.append('idTipoReporteVinculado', evento.target[2].value);
    datosModificaion.append('idRegistroDispositivoIoTVinculado', evento.target[3].value);
    datosModificaion.append('idRegistroZonaVinculada', evento.target[4].value);

    ModificarReporte(idRegistro, datosModificaion);
};

export {
    guardarRegistro,
    modificarRegistro
}