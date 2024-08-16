// Importamos los endpoints
import { ENDPOINTS } from "../endpoints";

const GetAccesosPorDia = async (
    parametros: {}
) => {
    return ENDPOINTS.DASHBOARD.ACCESOS_POR_DIA(parametros);
};

const GetActividadMaquina = async (
    parametros: {
    }
) => {
    return ENDPOINTS.DASHBOARD.ACTIVIDAD_MAQUINA(parametros);
};

export {
    GetAccesosPorDia,
    GetActividadMaquina
};