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

function msToTime(s: number) {
    var ms = s % 1000;
    s = (s - ms) / 1000;
    var secs = s % 60;
    s = (s - secs) / 60;
    var mins = s % 60;
    var hrs = (s - mins) / 60;

    return hrs + ':' + mins + ':' + secs;
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

function deserealizarSemana(semana: string) {
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
        (parseInt(semanaReporte[1]) * 7) - 6
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
        (parseInt(semanaReporte[1]) * 7)
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

export {
    bin2dec,
    dec2bin,
    msToTime,
    numeroDiaANombreDia,
    numeroMesANombreMes,
    deserealizarSemana,
    separarTiempo
};
