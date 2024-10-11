// Buscamos los elementos del tipo dado en un componente HTML.
function buscarElementosHTML(
    nodo: Element,
    tags: string []
): any [] {
    /**
     * Utiliza DFS para buscar elementos del tipo dado
     * en un elemento raiz HTML, utilizado principalmente para mapear
     * inputs en un formulario.
    */

    // Lista de elementos encontrados.
    let elementosEncontrados: Element [] = [] as Element [];

    // Si el nodo no es una hoja.
    if(nodo.hasChildNodes()) {
        // Expandimos la frontera del nodo.
        const frontera: HTMLCollection = nodo.children;

        // Mientras la frontera tenga nodos por explorar.
        for(let i = 0; i < frontera.length; i ++) {
            const nodoHijo: Element = frontera[i];

            // Concatenamos la lisa de los nodos.
            elementosEncontrados = [
                ...elementosEncontrados,
                ...buscarElementosHTML(nodoHijo, tags)
            ];
        }
    }
    
    // Verificamos que el dato input sea del tipo dado.
    const esDeTipo: boolean = tags.includes(nodo.tagName);

    // Si es del tipo dado.
    if(esDeTipo) {
        // Retornamos el nodo en una lista.
        return [nodo];
    }

    // Retornamos la lista de los nodos.
    return elementosEncontrados;

};

// Desempaqueta el valor del input dependiendo del tipo de este.
function desempaquetarValorInput(
    input: HTMLInputElement
) {
    /**
     * Desempaqueta el valor del input dependiendo del tipo de este.
     */

    switch(input.type) {
        case 'file':
            return input.files[0];

        case 'checkbox':
            return input.checked;

        default:
            return input.value;
    }
};

// Guardamos el dato del input en el formato.
function guardarDatoInput(
    input: HTMLInputElement,
    formato: Object,
    nombreNodo?: string
) {
    /**
     * Funcion recursiva que guarda el dato del input en 
     * el formato pasado.
     * Utiliza DFS para poder encontrar la seccion perteneciente del
     * dato del input.
     */

    // Expandimos la frontera
    const frontera: string [] = Object.keys(formato);

    // Indica si el dato ya fue formateado.
    let datoFormateado: boolean = false;

    // Si existen nodos en la frontera.
    if(frontera.length > 0) {
        // Por cada nodo hijo en la frontera.
        for(let i = 0; i < frontera.length; i ++) {
            // Desempaquetamos el nodo hijo de la frontera.
            const nodoHijo: string = frontera[i];

            // Si id del input es similar al nombre del nodo.
            if(input.id.includes(nodoHijo)) {
                // Recursamos la funcion.
                datoFormateado = guardarDatoInput(
                    input,
                    formato[nodoHijo],
                    nodoHijo
                );

                // Terminamos el ciclo.
                break;
            }
        }

    // Si es un nodo hoja.
    } else {
        // Si el dato no ha sido formateado y el nodo no es raiz.
        if(!datoFormateado && typeof nombreNodo != 'undefined') {
            // Guardamos el dato en el formato.
            formato[input.id] = desempaquetarValorInput(input);

            // Indicamos que el dato ya fue formateado.
            datoFormateado = true;
        }
    }

    // Si el dato no ha sido formateado y el nodo no es raiz.
    if(!datoFormateado && typeof nombreNodo != 'undefined') {
        // Si el dato no ha sido formateado y el nodo no es raiz.
        formato[input.id] = desempaquetarValorInput(input);

        // Indicamos que el dato ya fue formateado.
        datoFormateado = true;
    }

    // Retornamos el estado de formateo del dato.
    return datoFormateado
};

// Serializamos los elementos datos de un formulario aun
// diccionario de datos.
function formatearFormulario(
    elementos: HTMLFormElement | HTMLInputElement [],
    formato: Object,
    tags: string [] = ['INPUT', 'SELECT']
): Object {
    /**
     * Formatea un formulario de elemento HTML o una lista de inputs
     * HTML que represente el formulario a un formato dado.
     * 
     * REQUISITO DEL FORMATO: En el apartado raiz, no se pueden guardar
     * ningun dato, todos los ids de los inputs tienen que llevar el
     * nombre del apartado perteneciente, el valor del input se guarda
     * en el ultimo apartado con coincidencia.
     */

    // Primero verificamos que tipo de dato es el formulario.
    const formulario: HTMLInputElement [] = (
        typeof elementos.length == 'undefined'
    )? buscarElementosHTML(
        elementos as HTMLFormElement, tags
    ): elementos as HTMLInputElement [];

    for(let i = 0; i < formulario.length; i ++) {
        // Desempaquetamos el elemento del input del formulario.
        const input: HTMLInputElement = formulario[i];

        // Guardamos los datos del input en el formato dado.
        guardarDatoInput(input, formato);
    }

    return formato;
};

export {
    buscarElementosHTML,
    formatearFormulario
};