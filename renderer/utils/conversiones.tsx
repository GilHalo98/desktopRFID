// Cambiamos el valor de refresh para activar el refrescamiento.
function dec2bin(
    decimal: number
) {
    const bitArray = [];

    return bitArray;
};

function bin2dec(
    bitArray: number[]
) {
    const decimal = 0;
    return decimal;
};

function msToTime(s: number, enTexto:boolean = false) {
    if(typeof s == 'undefined') {
        return "";
    }

    if(s <= 0) {
        return "";
    }

    var ms = s % 1000;

    s = (s - ms) / 1000;

    var secs = s % 60;

    s = (s - secs) / 60;

    var mins = s % 60;

    var hrs = (s - mins) / 60;

    return `${hrs}:${mins}:${secs}`;
};

function numeroMesANombreMes(mes: number) {
    let nombreMes: string = undefined;

    switch(mes) {
        case 0:
            nombreMes = 'Enero';
            break;

        case 1:
            nombreMes = 'Febrero';
            break;

        case 2:
            nombreMes = 'Marzo';
            break;

        case 3:
            nombreMes = 'Abril';
            break;

        case 4:
            nombreMes = 'Mayo';
            break;

        case 5:
            nombreMes = 'Junio';
            break;

        case 6:
            nombreMes = 'Julio';
            break;

        case 7:
            nombreMes = 'Agosto';
            break;

        case 8:
            nombreMes = 'Septiembre';
            break;

        case 9:
            nombreMes = 'Octubre';
            break;

        case 10:
            nombreMes = 'Noviembre';
            break;

        case 11:
            nombreMes = 'Diciembre';
            break;

        default:
            break;
    }

    return nombreMes;
}

function numeroDiaANombreDia(dia: number) {
    let nombreDia: string = undefined;

    switch(dia) {
        case 1:
            nombreDia = 'Lunes';
            break;

        case 2:
            nombreDia = 'Martes';
            break;

        case 3:
            nombreDia = 'Miercoles';
            break;

        case 4:
            nombreDia = 'Jueves';
            break;

        case 5:
            nombreDia = 'Viernes';
            break;

        case 6:
            nombreDia = 'Sabado';
            break;

        case 7:
            nombreDia = 'Domingo';
            break;

        default:
            break;
    }

    return nombreDia;
};

function rangoSemana() {
    // Instanciamos dos fechas.
    const fechaA = new Date();
    const fechaB = new Date();

    // Les quitamos el offset del timezone.
    const timeZone = fechaA.getTimezoneOffset();

    const offsetHoras = Math.floor(timeZone / 60);
    const offsetMinutos = Math.floor(timeZone / (60 * 60));

    // Calculamos el dia en el que inicia la semana.
    fechaA.setDate(fechaA.getDate() - fechaA.getDay());

    // La primera va a tener hora de 00:00:00
    fechaA.setHours(0, 0, 0);

    // Calculamos el dia en el que termina la semana.
    fechaB.setDate(fechaB.getDate() + (6 - fechaB.getDay()));

    // La segunda tendra hora de 23:59:59
    fechaB.setHours(23, 59, 59);

    return [fechaA, fechaB];
};

function deserealizarSemana(semana: string) {
    // Si la variable seman no esta definida o es nula.
    if(!semana) {
        return [undefined, undefined]
    }

    // Si el dato de la variable esta vacio.
    if(semana == '') {
        // Retornamos el ragno de la semana actual.
        return [undefined, undefined]
    }

    // Primero convertimos todos los literales a minusculas.
    const datoSerializado = semana.toLowerCase();

    // Si existe una semana, deserealizamos el
    // dato, primero partimos el string, de
    // año-semana a [año, semana].
    const semanaReporte = datoSerializado.split('-w');

    // Creamos las instancias de las fechas.
    const fechaA = new Date();
    const fechaB = new Date();

    // Establecemos la fecha de inicio de semana.
    fechaA.setFullYear(
        parseInt(semanaReporte[0]),
        0,
        (parseInt(semanaReporte[1]) * 7) - 7
    );

    fechaA.setHours(
        0,
        0,
        0,
        0
    );

    // Establecemos la fecha de fin de semana.
    fechaB.setFullYear(
        parseInt(semanaReporte[0]),
        0,
        (parseInt(semanaReporte[1]) * 7) - 1
    );


    fechaB.setHours(
        23,
        59,
        59,
        0  
    );

    return [
        fechaA, fechaB
    ];
};

const separarTiempo = (tiempo: string) => {
    /**
     * Separa el tiempo en formato HH:MM:SS a
     * HH horas MM minutos SS segundos
     */

    if(typeof tiempo == 'undefined') {
        return '0';
    }

    if(tiempo == '') {
        return '0';
    }

    const partes = tiempo.split(':');

    let tiempoSeparado: string = '';

    if((partes[0] != '00') && (partes[0] != '0')) {
        tiempoSeparado = tiempoSeparado.concat(`${partes[0]} horas `);
    }

    if(partes[1]) {
        if((partes[1] != '00') && (partes[1] != '0')) {
            tiempoSeparado = tiempoSeparado.concat(`${partes[1]} minutos `);
        }
    }

    if(partes[2]) {
        if((partes[2] != '00') && (partes[2] != '0')) {
            tiempoSeparado = tiempoSeparado.concat(`${partes[2]} segundos`);
        }
    }

    return tiempoSeparado;
};

const fechaStrATiempo = (fechaStr: string) => {
    if(typeof fechaStr == 'undefined') {
        return "";
    }

    if(fechaStr == '') {
        return "";
    }

    const fechaTiempo: string[] = fechaStr.split('T');

    const tiempo = fechaTiempo[1].split('.')[0];

    return tiempo;
};

const a12HorasTiempo = (tiempo: string) => {
    /**
     * Separa el tiempo en formato HH:MM:SS a
     * HH horas MM minutos SS segundos
     */

    if(typeof tiempo == 'undefined') {
        return '0';
    }

    if(tiempo == '') {
        return '0';
    }

    const partes: string [] = tiempo.split(':');

    const horas: number = parseInt(partes[0]);
    const minutos: string = partes[1];

    if((horas / 12) > 1) {
        return `${horas % 12}:${minutos} PM`;
    }

    return `${horas}:${minutos} AM`;
};

export {
    bin2dec,
    dec2bin,
    msToTime,
    a12HorasTiempo,
    rangoSemana,
    separarTiempo,
    fechaStrATiempo,
    deserealizarSemana,
    numeroDiaANombreDia,
    numeroMesANombreMes,
};
