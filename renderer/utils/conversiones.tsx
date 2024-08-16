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

function numeroDiaANombreDia(dia: number) {
    let nombreDia: string = undefined;

    switch(dia) {
        case 0:
            nombreDia = 'Lunes';
            break;

        case 1:
            nombreDia = 'Martes';
            break;

        case 2:
            nombreDia = 'Miercoles';
            break;

        case 3:
            nombreDia = 'Jueves';
            break;

        case 4:
            nombreDia = 'Viernes';
            break;

        case 5:
            nombreDia = 'Sabado';
            break;

        case 6:
            nombreDia = 'Domingo';
            break;

        default:
            break;
    }

    return nombreDia;
}

export {
    bin2dec,
    dec2bin,
    msToTime,
    numeroDiaANombreDia
};