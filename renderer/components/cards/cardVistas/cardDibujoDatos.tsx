// Importamos react.
import React, { SyntheticEvent } from 'react';

// Iconos del componente.
import { mdiPlusThick } from '@mdi/js';

// Componente para cargar el icono.
import Icon from '@mdi/react';

// Componentes de reactstrap.
import {
    Col, Row,
    Input, Label,
    Card, CardBody,
    Button, InputGroup, UncontrolledTooltip
} from 'reactstrap';

// Componentes propios.
import IndicadorCargaSpinner from '../../cargas/indicadorCargaSpinner';

export default function CardDibujoDatos(
    props: {
        pagina: Pagina
        paginas: Pagina[]
        registrosOpciones: {
            listaMontajes: string[]
            NoDibujos: string[]
        }
        funcionesOpciones: {
            onGuardarCambios: Function
        }
    }
) {
    // Hooks para indicar la carga de datos.
    const [
        enCarga,
        setEnCarga
    ] = React.useState(false);

    // Hooks para refrescar el componente.
    const [
        refresh,
        setRefresh
    ] = React.useState(false);

    // Hooks para indicar si el nombre del dibujo esta registrado.
    const [
        dibujoRegistrado,
        setDibujoRegistrado
    ] = React.useState(false);

    // Hooks de la imagen binaria.
    const [
        imagenB64,
        setImagenB64
    ] = React.useState(undefined);

    const [
        directorioAnterior,
        setDirectorioAnterio
    ] = React.useState(undefined);

    // Hooks que indica si el registro del montaje esta registrado.
    const [
        montajeRegistrado,
        setMontajeRegistrado
    ] = React.useState(false)

    React.useEffect(() => {
        if(typeof imagenB64 != 'undefined') {
            setEnCarga(false);
        }
    }, [imagenB64]);

    // React useEffect.
    React.useEffect(() => {
        console.log('refresh componente');

        // Buscamos si el registro del numero del dibujo existe.
        const registroEncontrado: boolean = props.registrosOpciones.NoDibujos.includes(
            props.pagina.dibujo.nombre
        );

        if(props.pagina.dibujo.directorio != '') {
            if(directorioAnterior != props.pagina.dibujo.directorio) {
                // Establecemos la imagen a indefinido.
                setImagenB64(undefined);

                // Cargamos la imagen.
                cargarImagen();

                // Establecemos el directorio anterior al directorio actual.
                setDirectorioAnterio(props.pagina.dibujo.directorio);
            }
        }

        if(registroEncontrado) {
            // En caso de existir, bucamos cuantas paginas
            // pertenecen a dicho dibujo.
            let paginasEncontradas = 0;

            props.paginas.map((registro: Pagina) => {
                if(registro.dibujo.nombre == props.pagina.dibujo.nombre) {
                    paginasEncontradas += 1;
                }
            });

            // Si no existe valor actual.
            if(props.pagina.operacion.actual == '') {
                // Establecemos el numero de pagina encontrada
                // como el numero de operacion.
                props.funcionesOpciones.onGuardarCambios(
                    paginasEncontradas,
                    'operacion',
                    'actual'
                );
            }
        }

        // Si el nombre del dibujo esta vacio.
        if(props.pagina.dibujo.nombre == '') {
            // Asignamos al hooks si existe o no el registro.
            setDibujoRegistrado(true);

        } else {
            // Asignamos al hooks si existe o no el registro.
            setDibujoRegistrado(registroEncontrado);
        }

        // Buscamos si el registro del numero del dibujo existe.
        const registroMontajeEncontrado: boolean = props.registrosOpciones.listaMontajes.includes(
            props.pagina.referencias.montaje
        );

        // Si el nombre del dibujo esta vacio.
        if(props.pagina.referencias.montaje == '') {
            // Asignamos al hooks si existe o no el registro.
            setMontajeRegistrado(true);

        } else {
            // Asignamos al hooks si existe o no el registro.
            setMontajeRegistrado(registroMontajeEncontrado);
        }
    }, [
        refresh,
        props.paginas,
        props.pagina
    ]);

    /**
     * Rutinas.
     */

    // Cargamos el dibujo en memoria.
    const cargarImagen = async () => {
        // Mostramos el indicador de carga
        setEnCarga(true);

        // Cargamos el archivo como binarios.
        const dataImagen = window.ipc.sendSync(
            'cargar_imagen',
            {
                path: props.pagina.dibujo.directorio
            }
        );

        // Establecemos los binarios del archivo.
        setImagenB64(dataImagen);
    };

    // Renderizamos el dibujo.
    const renderizarDibujo = () => {
        if(!props.pagina.dibujo) {
            return <></>;
        }

        if(!props.pagina.dibujo.directorio || !props.pagina.dibujo.tipo) {
            return <></>;
        }

        if(enCarga) {
            return <IndicadorCargaSpinner/>
        }

        if(typeof imagenB64 != 'undefined') {
            // Retornamos el elemento renderizado.
            return (
                <img
                    key={'dibjo'}
                    src={
                        `data:${props.pagina.dibujo.tipo}
                        ;base64,${imagenB64}`
                    }
                />
            );
        }
    };

    if(!props.pagina.referencias) {
        return <></>;
    }

    return(
        <React.Fragment>
            <Card color="dark" style={{
                padding: '10px'
            }}>
                {renderizarDibujo()}

                <CardBody className='text-white'>
                    <b>Imagen del dibujo</b>
                    <Input
                        id="bitRol"
                        type="file"
                        accept="image/png, image/jpeg"
                        onChange={(evento: SyntheticEvent) => {
                            const input = evento.target as HTMLInputElement;

                            props.funcionesOpciones.onGuardarCambios(
                                input.files[0].path,
                                'dibujo',
                                'directorio'
                            );

                            props.funcionesOpciones.onGuardarCambios(
                                input.files[0].type,
                                'dibujo',
                                'tipo'
                            );
                        }}
                    />

                    <br/>

                    <Row>
                        <Col>
                            <Label>
                                Numero del dibujo
                            </Label>

                            <InputGroup>
                                <Input
                                    id="nombreDibujo"
                                    type="text"
                                    list="nombresDibujos"
                                    value={props.pagina.dibujo.nombre}
                                    onChange={(evento: SyntheticEvent) => {
                                        const input = evento.target as HTMLTextAreaElement;

                                        props.funcionesOpciones.onGuardarCambios(
                                            input.value,
                                            'dibujo',
                                            'nombre'
                                        );
                                    }}
                                />

                                <datalist id="nombresDibujos">
                                    {props.registrosOpciones.NoDibujos.map((
                                        registro: string
                                    ) => {
                                        return <option value={registro}/>
                                    })}
                                </datalist>

                                <Button
                                    outline
                                    id="botonAgregarNoDibujo"
                                    color='success'
                                    disabled={dibujoRegistrado}
                                    style={{
                                        border: 'none'
                                    }}
                                    onClick={(evento: SyntheticEvent) => {
                                        props.registrosOpciones.NoDibujos.push(
                                            props.pagina.dibujo.nombre
                                        );

                                        setRefresh(!refresh);
                                    }}
                                >
                                    <Icon path={mdiPlusThick} size={1} />
                                </Button>

                                <UncontrolledTooltip
                                        placement="bottom"
                                        target="botonAgregarNoDibujo"
                                    >
                                        Agregar No. Dibujo
                                </UncontrolledTooltip>
                            </InputGroup>
                        </Col>

                        <Col>
                            <Label>
                                Operacion
                            </Label>

                            <Input
                                id="operacionActual"
                                type="number"
                                min={1}
                                value={props.pagina.operacion.actual}
                                onChange={(evento: SyntheticEvent) => {
                                    const input = evento.target as HTMLTextAreaElement;

                                    props.funcionesOpciones.onGuardarCambios(
                                        input.value,
                                        'operacion',
                                        'actual'
                                    );
                                }}
                            />
                        </Col>
                    </Row>

                    <br/>

                    <Row>
                        <Col>
                            <Label>
                                Pofundidad de la herramienta
                            </Label>

                            <Input
                                id="profundidadHerramienta"
                                type="number"
                                max={0}
                                step={0.01}
                                value={props.pagina.referencias.profundidadHerramienta}
                                onChange={(evento: SyntheticEvent) => {
                                    const input = evento.target as HTMLTextAreaElement;

                                    props.funcionesOpciones.onGuardarCambios(
                                        input.value,
                                        'referencias',
                                        'profundidadHerramienta'
                                    );
                                }}
                            />
                        </Col>

                        <Col>
                            <Label>
                                Montaje
                            </Label>

                            <InputGroup>
                                <Input
                                    id="montajeHerramienta"
                                    type="text"
                                    list="montajesHerramientas"
                                    value={props.pagina.referencias.montaje}
                                    onChange={(evento: SyntheticEvent) => {
                                        const input = evento.target as HTMLTextAreaElement;

                                        props.funcionesOpciones.onGuardarCambios(
                                            input.value,
                                            'referencias',
                                            'montaje'
                                        );
                                    }}
                                />

                                <datalist id="montajesHerramientas">
                                    {props.registrosOpciones.listaMontajes.map((
                                        registro: string
                                    ) => {
                                        return <option value={registro}/>
                                    })}
                                </datalist>

                                <Button
                                    outline
                                    id="botonAgregarMontajeHerramienta"
                                    color='success'
                                    disabled={montajeRegistrado}
                                    style={{
                                        border: 'none'
                                    }}
                                    onClick={(evento: SyntheticEvent) => {
                                        props.registrosOpciones.listaMontajes.push(
                                            props.pagina.referencias.montaje
                                        );

                                        setRefresh(!refresh);
                                    }}
                                >
                                    <Icon path={mdiPlusThick} size={1} />
                                </Button>

                                <UncontrolledTooltip
                                    placement="bottom"
                                    target="botonAgregarMontajeHerramienta"
                                >
                                    Agregar Montaje de Herramienta
                                </UncontrolledTooltip>
                            </InputGroup>
                        </Col>
                    </Row>

                    <br/>

                    <Row>
                        <Col>
                            <Label>
                                Referencia X
                            </Label>

                            <Input
                                id="referenciaX"
                                type="text"
                                value={props.pagina.referencias.referenciaX}
                                onChange={(evento: SyntheticEvent) => {
                                    const input = evento.target as HTMLTextAreaElement;

                                    props.funcionesOpciones.onGuardarCambios(
                                        input.value,
                                        'referencias',
                                        'referenciaX'
                                    );
                                }}
                            />
                        </Col>

                        <Col>
                            <Label>
                                Referencia Y
                            </Label>

                            <Input
                                id="referenciaY"
                                type="text"
                                value={props.pagina.referencias.referenciaY}
                                onChange={(evento: SyntheticEvent) => {
                                    const input = evento.target as HTMLTextAreaElement;

                                    props.funcionesOpciones.onGuardarCambios(
                                        input.value,
                                        'referencias',
                                        'referenciaY'
                                    );
                                }}
                            />
                        </Col>

                        <Col>
                            <Label>
                                Referencia Z
                            </Label>

                            <Input
                                id="referenciaZ"
                                type="text"
                                value={props.pagina.referencias.referenciaZ}
                                onChange={(evento: SyntheticEvent) => {
                                    const input = evento.target as HTMLTextAreaElement;

                                    props.funcionesOpciones.onGuardarCambios(
                                        input.value,
                                        'referencias',
                                        'referenciaZ'
                                    );
                                }}
                            />
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </React.Fragment>
    );
};
