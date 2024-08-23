function rangoSemana() {
    // Instanciamos dos fechas.
    const fechaA = new Date();
    const fechaB = new Date();

    // Les quitamos el offset del timezone.
    const timeZone = fechaA.getTimezoneOffset();

    const offsetHoras = Math.floor(timeZone / 60);
    const offsetMinutos = Math.floor(timeZone / (60 * 60));

    // Calculamos el dia en el que inicia la semana.
    fechaA.setDate(fechaA.getDate() - fechaA.getDay() + 1);

    // La primera va a tener hora de 00:00:00
    fechaA.setHours(0, 0, 0);

    // Calculamos el dia en el que termina la semana.
    fechaB.setDate(fechaB.getDate() + (6 - fechaB.getDay()) + 1);

    // La segunda tendra hora de 23:59:59
    fechaB.setHours(23, 59, 59);

    return [
        fechaA, fechaB
    ];
};

export {
    rangoSemana
};