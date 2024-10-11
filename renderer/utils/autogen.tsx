function rutinaAutogenerarUsername(nombreCompleto: string) {
    /**
     * Autogenera el username del usuario.
     * 
     * El formato es el siguiente: AC-{Inicicales del nombre}-{ms de autogen}
     */

    const hoy = new Date();

    const iniciales: string [] = [];

    nombreCompleto.split(' ').forEach((separacion: string) => {
        iniciales.push(separacion[0].toUpperCase());
    });

    const username: string = `AC-${
        iniciales.join('')
    }-${
        hoy.getTime()
    }`;

    return username;
};

function rutinaAutogenerarPassword(nombreCompleto: string) {
    /**
     * Autogenera el password del usuario.
     */
    const hoy = new Date();

    const iniciales: string [] = [];

    nombreCompleto.split(' ').forEach((separacion: string) => {
        iniciales.push(separacion[0].toUpperCase());
    });

    const rawPassword: string = `AC${iniciales.join('')}${hoy.getTime()}`;

    const password: string = rawPassword.split('').sort(() => {
        return 0.5 - Math.random();
    }).join('');

    return password;
};

export {
    rutinaAutogenerarUsername,
    rutinaAutogenerarPassword
};