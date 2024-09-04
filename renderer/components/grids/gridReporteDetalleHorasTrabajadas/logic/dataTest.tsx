// Modelo de datos.
import { Empleado } from "../../../../utils/API/modelos/empleado"
import { numeroDiaANombreDia } from "../../../../utils/conversiones";

// Fecha de prueba.
const fechaPrueba = new Date();

// Registro de empleado de prueba.
const registroEmpleado = {
    nombres: 'Diego Rafael',
    apellidoPaterno: 'Gil',
    apellidoMaterno: 'Meza',
    fechaRegistroEmpleado: fechaPrueba.toString(),
    idImagenVinculada: 1,
    idRolVinculado: 1
} as Empleado;

const datosGenerales = {
    tiempoLaboralTotal: 50.53 * (3.6e+6),
    tiempoExtraTotal: 2.53 * (3.6e+6),
    retrasos: 1,
    faltas: 0
};

const reporteChequeos = {
    a: {
        nombre: "Entrada",
        hora: "09:00",
        estatus: 1
    },
    b: {
        nombre: "Salida",
        hora: "19:00",
        estatus: 2
    }
};

const reporteDescansos = {
    a: {
        nombre: "Inicio de descanso",
        hora: "13:00",
        estatus: 1
    },
    b: {
        nombre: "Fin de descanso",
        hora: "13:30",
        estatus: 2
    }
};

const reporteResumen = {
    accesosBanio: 5,
    accesosComedor: 2,
    accesosOficina: 1,
    inicioActividades: 8,
    finActividades: 8,
    totalActividades: 6.5 * (3.6e+6),
};

const datosIntentosAccesos: {
    descripcion: string
    zona: string
    hora: string
}[] = [];

for (let i = 0; i < 5; i++) {
    datosIntentosAccesos.push({
        descripcion: 'Intento de acceso',
        zona: 'Oficinas',
        hora: '14:00'
    });
}

const datosIntentosUsos: {
    descripcion: string
    maquina: string
    hora: string
}[] = [];

for (let i = 0; i < 5; i++) {
    datosIntentosUsos.push({
        descripcion: 'Intento de uso',
        maquina: 'CNC 1',
        hora: '15:00'
    });
}

const datosTracker: {
    descripcion: string
    tipoReporte: number
    hora: string
}[] = [];

for (let i = 0; i < 80; i++) {
    datosTracker.push({
        descripcion: 'Entrada de empleado',
        tipoReporte: 1,
        hora: '09:00'
    });
}

const contenidoSubNavegacion: {nombre: string, index: number}[] = [];

for (let i = 1; i <= 7; i++) {
    contenidoSubNavegacion.push({
        nombre: numeroDiaANombreDia(i),
        index: i
    });
}

export {
    contenidoSubNavegacion,
    registroEmpleado,
    reporteDescansos,
    reporteChequeos,
    reporteResumen,
    datosGenerales,
    fechaPrueba,
    datosTracker,
    datosIntentosAccesos,
    datosIntentosUsos
}