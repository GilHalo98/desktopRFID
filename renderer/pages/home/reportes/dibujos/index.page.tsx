'use client'

// React.
import React, { SyntheticEvent } from "react";

// Para la manipulacion de documentos.
import jsPDF from "jspdf";

// Reactstrap.
import {
    Table, Button,
    Container, Row, Col,
    FormGroup, Input, Label,
    Card, CardBody, CardTitle, CardHeader, CardImg
} from "reactstrap";

// Iconos.
import { mdiPlus, mdiTrashCan } from "@mdi/js";
import Icon from "@mdi/react";

// Componentes propios.
import CardHeaderReporteDibujo from "../../../../components/cards/cardHeader/cardHeaderReporteDibujo";
import Plantilla from "../../../../components/plantillasDocumentos/reporte";
import SideBarLayout from "../../../../components/Layout/sideBarLayout";
import TablaHerramienta from "../../../../components/tablas/tablaHerramientas/tablaHerramientas";
import CardDatosProgramador from "../../../../components/cards/cardVistas/cardDatosProgramador";
import CardDibujoDatos from "../../../../components/cards/cardVistas/cardDibujoDatos";
import CardNotas from "../../../../components/cards/cardVistas/cardNotas";
import IndicadorCargaSpinner from "../../../../components/cargas/indicadorCargaSpinner";

// Modelo de datos.

export default function Home() {
    // Hooks generales.
    const [
        enCarga,
        setEnCarga
    ] = React.useState(false);

    // Hooks del funcionamiento de la vista.
    const [
        indexPaginaActual,
        setIndexPaginaActual
    ] = React.useState(0);

    // Hook de paginas de reportes.
    const [
        paginas,
        setPaginas
    ] = React.useState([] as Pagina[]);

    const [
        pagina,
        setPagina
    ] = React.useState({} as Pagina);

    // Actualizamos la vista cada vez que se modifica la
    // lista de paginas.
    React.useEffect(() => {
        console.log('refresh');

        setPagina(paginas[indexPaginaActual]);

    }, [paginas, indexPaginaActual]);

    /**
     * Rutinas
     */

    // Rutina para crear un nuevo registro de una pagina.
    const onAgregarNuevaPagina = () => {
        // Inicializamos el contenido de la pagina.
        const nuevaPagina = {} as Pagina;

        nuevaPagina.programa = {} as Programa;

        nuevaPagina.programa.nombrePrograma = '';
        nuevaPagina.programa.programador = '';
        nuevaPagina.programa.rutaPrograma = '';
        nuevaPagina.programa.tiempoPrograma = '';

        nuevaPagina.dibujo = {} as Dibujo;

        nuevaPagina.dibujo.directorio = '';
        nuevaPagina.dibujo.tipo = '';

        nuevaPagina.herramientas = [] as Herramienta[];

        nuevaPagina.referencias = {} as Referencia;

        nuevaPagina.referencias.profundidadHerramienta = '';
        nuevaPagina.referencias.referenciaX = '';
        nuevaPagina.referencias.referenciaY = '';
        nuevaPagina.referencias.referenciaZ = '';

        nuevaPagina.notas = '';

        paginas.push(nuevaPagina)

        setPaginas([...paginas]);
    };

    // Rutina para eliminar el registro de la pagina.
    const onEliminarPagina = (indexPagina: number) => {
        paginas.splice(indexPagina, 1);

        setPaginas([...paginas]);
    };

    // Co-rutina para insertar hojas en el documento de salida.
    const insertarPaginas = async (
        documento: jsPDF,
        index: number,
        paginasRenderizadas: any[]
    ) => {
        // Clausula de parada, una vez que ya no queden
        // hojas que agregar para renderizar, entonces terminamos la
        // recurcion.
        if(index <= (paginas.length - 1)) {
            // Agregamos una hoja nueva al archivo.
            documento.addPage('letter', 'landscape');

            // Agregamos la renderizacion de una nueva hoja a la lista
            // de paginas renderizadas.
            paginasRenderizadas.push(
                await documento.html(Plantilla(
                    paginas[index],
                    index + 1,
                    paginas.length,
                    documento
                ), {
                    x: 0,
                    y: documento.internal.pageSize.getHeight() * index
                }).then((e: jsPDF) => {
                    // Una vez renderizada, llamamos a la funcion
                    // de manera recursiva.
                    insertarPaginas(
                        documento,
                        index + 1,
                        paginasRenderizadas
                    );
                })
            );

        } else {
            // Renderizamos todas las hojas, eliminamos la ultima hoja
            // y guardamos el archivo final.
            Promise.all(paginasRenderizadas).then((respuesta) => {
                if(paginas.length - documento.getNumberOfPages() < 0) {
                    documento.deletePage(documento.getNumberOfPages());
                }

                documento.save('prueba.pdf');
    
            }).catch(error => {
                console.log('error ', error);
            });
        }
    };

    // Rutina para imprimir el arhcivo en un formato PDF.
    const onImprimirArchivo = () => {
        const documento = new jsPDF(
            'landscape',
            'mm',
            'letter'
        );

        const paginasRenderizadas: any[] = [];

        insertarPaginas(documento, 0, paginasRenderizadas);
    };

    /**
     * DataTest
     */

    const listaProgramadores: string[] = [
        'programador 1',
        'programador 2',
        'programador 3',
        'programador 4',
        'programador 5'
    ];

    // constantes de opciones.
    const listaTooling: string[] = [
        'T1',
        'T2',
        'T3',
        'T4',
        'T5',
        'T6',
        'T7',
        'T8'
    ]

    const tiposHerramientas: string[] = [
        'Endmill',
        'Broca de Centros',
        'Broca',
        'Rima',
    ];

    const medidaHerramienta: string[] = [
        '3/4',
        '1/2',
        '#3',
        '0.234\'\'',
        '1/4\'\''
    ];

    const operacionHerramienta: string[] = [
        'Desbaste',
        'Acabado'
    ];

    // Funciones de opciones de los registro.
    const onGuardarCambios = (
        datoNuevo: any,
        dirA?: string | number,
        dirB?: string | number,
        dirC?: string | number
    ) => {
        // Verificamos que la direccion A en el registro de la pagina
        // se haya pasado para su modificaicon.
        if(typeof dirA != 'undefined') {
            // Verificamos que la direccion B en el registro de la pagina
            // se haya pasado para su modificaicon.
            if(typeof dirB != 'undefined') {
                // Verificamos que la direccion C en el registro de la pagina
                // se haya pasado para su modificaicon.
                if(typeof dirC != 'undefined') {
                    // Si la primera, la segunda y tercera direccion
                    // fue pasada entonces guardamos los cambios.
                    pagina[dirA][dirB][dirC] = datoNuevo;

                    // Guardamos los cambios en la lista de paginas.
                    setPaginas([...paginas]);

                    return;

                }

                // Si la primera y la segunda direccion fue pasada
                // entonces guardamos los cambios.
                pagina[dirA][dirB] = datoNuevo;

                // Guardamos los cambios en la lista de paginas.
                setPaginas([...paginas]);

                return;
            }

            // Si unicamente la primera direccion fue pasada, entonces
            // guardamos los cambios.
            pagina[dirA] = datoNuevo;
        }

        // Guardamos los cambios en la lista de paginas.
        setPaginas([...paginas]);
    };

    // Rutina para agregar un registro de una herramienta.
    const onAgregarHerramienta = () => {
        // Inicializamos el contenido del registro de la herramienta.
        const herramienta = {} as Herramienta;

        console.log(pagina.herramientas.length);

        herramienta.medida = '';
        herramienta.numero = 'T' + (pagina.herramientas.length + 1);
        herramienta.operacion = '';
        herramienta.tipo = '';

        pagina.herramientas.push(herramienta);

        setPaginas([...paginas]);
    };

    // Rutina para eliminar un registro de una herramienta.
    const onRemoverHerramienta = (index: number) => {
        pagina.herramientas.splice(index, 1);

        setPaginas([...paginas]);
    };

    /**
     * Renders
     */
    const renderizarContenido = () => {
        if(pagina) {
            return(
                <React.Fragment>
                    <br/>
    
                    {/* Datos del programa y el programador */}
                    <Row>
                        <Col>
                            <CardDatosProgramador
                                pagina={pagina}
                                funcionesOpciones={{
                                    onGuardarCambios: onGuardarCambios
                                }}
                                datosOpciones={{
                                    listaProgramadores: listaProgramadores
                                }}
                            />
                        </Col>
                    </Row>
    
                    <br/>
    
                    {/* Imagen  y datos del dibujo y tabla de herramientas */}
                    <Row>
                        {/* Tabla de herramientas */}
                        <Col sm={5}>
                            <TablaHerramienta
                                pagina={pagina}
                                funcionesOpciones={{
                                    onAgregarHerramienta: onAgregarHerramienta,
                                    onRemoverHerramienta: onRemoverHerramienta,
                                    onGuardarCambios: onGuardarCambios
                                }}
                                datosOpciones={{
                                    listaTooling: listaTooling,
                                    tiposHerramientas: tiposHerramientas,
                                    medidaHerramienta: medidaHerramienta,
                                    operacionHerramienta: operacionHerramienta
                                }}
                            />
                        </Col>
    
                        {/* Imagen y datos del dibujo */}
                        <Col>
                            <CardDibujoDatos
                                pagina={pagina}
                                funcionesOpciones={{
                                    onGuardarCambios: onGuardarCambios
                                }}
                            />
                        </Col>
                    </Row>
    
                    <br/>
    
                    {/* Notas */}
                    <Row>
                        <Col/>
                        <Col sm={6}>
                            <CardNotas
                                pagina={pagina}
                                funcionesOpciones={{
                                    onGuardarCambios: onGuardarCambios
                                }}
                            />
                        </Col>
                        <Col/>
                    </Row>
                </React.Fragment>
            );
        }
    }

    return (
        <React.Fragment>
            <Container fluid>
                {/* Barra de navegacion */}
                <Row>
                    <Col>
                        <CardHeaderReporteDibujo
                            paginas={paginas}
                            indexPaginaActual={indexPaginaActual}
                            setIndexPaginaActual={setIndexPaginaActual}
                            funcionesOpciones={{
                                onEliminarPagina: onEliminarPagina,
                                onImprimirArchivo: onImprimirArchivo,
                                onAgregarNuevaPagina: onAgregarNuevaPagina
                            }}
                        />
                    </Col>
                </Row>

                {renderizarContenido()}
            </Container>
        </React.Fragment>
    );
};

Home.getLayout = function(page) {
    return (
        <SideBarLayout>
            {page}
        </SideBarLayout>
    );
};
;