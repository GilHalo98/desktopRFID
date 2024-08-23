// Importamos los endpoints
import { ENDPOINTS } from "../endpoints";

const GetHorasTrabajadas = async (
    parametros?: {
        limit?: number,
        offset?: number,
        id?: string,
        nombres?: string,
        idRolVinculado?: number,
        semanaReporte?: string
    }
) => {
    return ENDPOINTS.REPORTES.HORAS_TRABAJADAS(parametros);
};

const GetHistorialActividadMaquina = async (
    parametros?: {
        id?: number,
        descripcionDispositivo?: string,
        semanaReporte?: string
    }
) => {
    return ENDPOINTS.REPORTES.HISTORIAL_ACTIVIDAD_MAQUINA(parametros);
};

const GetHistorialUsosMaquina = async (
    parametros?: {
        limit?: number,
        offset?: number,
        id?: number,
        descripcionDispositivo?: string,
        semanaReporte?: string
    }
) => {
    return ENDPOINTS.REPORTES.HISTORIAL_USOS_MAQUINA(parametros);
};

const GetHistorialOperadoresMaquina = async (
    parametros?: {
        limit?: number,
        offset?: number,
        id?: number,
        descripcionDispositivo?: string,
        semanaReporte?: string
    }
) => {
    return ENDPOINTS.REPORTES.HISTORIAL_OPERADORES_MAQUINA(parametros);
};

export {
    GetHistorialOperadoresMaquina,
    GetHistorialActividadMaquina,
    GetHistorialUsosMaquina,
    GetHorasTrabajadas
};