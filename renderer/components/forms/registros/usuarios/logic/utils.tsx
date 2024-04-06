function generarNombreUsuario(nombreCompleto) {
    let nombreUsuario = 'AC-';

    const atomos = nombreCompleto.split(' ');

    nombreUsuario += atomos[0] + '-'

    for (let index = 1; index < atomos.length; index++) {
        nombreUsuario += atomos[index][0];
    }

    return nombreUsuario.toUpperCase();
};

function generarPassword(fechaRegistro) {
    let password = 'AC-';

    const fecha = fechaRegistro.split('T')[0];
    const atomos = fecha.split('-');
    for (let index = 0; index < atomos.length; index++) {
        password += atomos[index];
    }

    return password.toUpperCase();
};

export {
    generarNombreUsuario,
    generarPassword
};