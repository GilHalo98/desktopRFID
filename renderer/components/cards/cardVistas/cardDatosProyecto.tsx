// Importamos react.
import { mdiPlusThick } from '@mdi/js';
import Icon from '@mdi/react';
import React, { SyntheticEvent } from 'react';

// Componentes de reactstrap.
import {
    Input, Label,
    Card, CardBody,
    Container, Row, Col, InputGroup, Button, UncontrolledTooltip,
} from 'reactstrap';

export default function CardDatosProyecto(
    props: {
        pagina: Pagina
        paginas: Pagina[]
        registrosOpciones: {
            listaClientes: string[]
            proyectos: string[]
        }
        funcionesOpciones: {
            onGuardarCambios: Function
        }
    }
) {
    // Hooks para refrescar el componente.
    const [
        refresh,
        setRefresh
    ] = React.useState(false);

    // Hooks para indicar si el nombre del dibujo esta registrado.
    const [
        proyectoRegistrado,
        setProyectoRegistrado
    ] = React.useState(false);

    // Hooks para indicar si el cliente esta registrado.
    const [
        clienteRegistrado,
        setClienteRegistrado,
    ] = React.useState(false);

    // Ract useEffect.
    React.useEffect(() => {
        console.log('refresh componente');

        // Buscamos si el registro del numero del dibujo existe.
        const registroProyectoEncontrado: boolean = props.registrosOpciones.proyectos.includes(
            props.pagina.proyecto
        );

        // Si el nombre del dibujo esta vacio.
        if(props.pagina.proyecto == '') {
            // Asignamos al hooks si existe o no el registro.
            setProyectoRegistrado(true);

        } else {
            // Asignamos al hooks si existe o no el registro.
            setProyectoRegistrado(registroProyectoEncontrado);
        }

        // Buscamos si el registro del numero del dibujo existe.
        const registroClienteEncontrado: boolean = props.registrosOpciones.listaClientes.includes(
            props.pagina.cliente
        );

        // Si el nombre del dibujo esta vacio.
        if(props.pagina.cliente == '') {
            // Asignamos al hooks si existe o no el registro.
            setClienteRegistrado(true);

        } else {
            // Asignamos al hooks si existe o no el registro.
            setClienteRegistrado(registroClienteEncontrado);
        }
    }, [
        refresh,
        props.paginas,
        props.pagina
    ]);

    if(!props.pagina) {
        return <></>
    }

    return(
        <React.Fragment>
            <Card color='dark'>
                <CardBody className="text-white">
                    <Container>
                        <Row>
                            <Col style={{
                                textAlign: 'center'
                            }}>
                                <Label>
                                    Cliente
                                </Label>

                                <InputGroup>
                                    <Input
                                        id="cliente"
                                        type="text"
                                        list="clientes"
                                        value={props.pagina.cliente}
                                        onChange={(evento: SyntheticEvent) => {
                                            const input = evento.target as HTMLTextAreaElement;

                                            props.funcionesOpciones.onGuardarCambios(
                                                input.value,
                                                'cliente'
                                            );
                                        }}
                                    />

                                    <datalist id="clientes">
                                        {props.registrosOpciones.listaClientes.map((
                                            registro: string
                                        ) => {
                                            return <option value={registro}/>
                                        })}
                                    </datalist>

                                    <Button
                                        outline
                                        id="botonAgregarCliente"
                                        color='success'
                                        disabled={clienteRegistrado}
                                        style={{
                                            border: 'none'
                                        }}
                                        onClick={(evento: SyntheticEvent) => {
                                            props.registrosOpciones.listaClientes.push(
                                                props.pagina.cliente
                                            );

                                            setRefresh(!refresh);
                                        }}
                                    >
                                        <Icon path={mdiPlusThick} size={1} />
                                    </Button>

                                    <UncontrolledTooltip
                                        placement="bottom"
                                        target="botonAgregarCliente"
                                    >
                                        Agregar Cliente
                                    </UncontrolledTooltip>
                                </InputGroup>
                            </Col>

                            <Col style={{
                                textAlign: 'center'
                            }}>
                                <Label>
                                    Proyecto
                                </Label>

                                <InputGroup>
                                    <Input
                                        id="proyecto"
                                        type="text"
                                        list="proyectos"
                                        value={props.pagina.proyecto}
                                        onChange={(evento: SyntheticEvent) => {
                                            const input = evento.target as HTMLTextAreaElement;

                                            props.funcionesOpciones.onGuardarCambios(
                                                input.value,
                                                'proyecto'
                                            );
                                        }}
                                    />

                                    <datalist id="proyectos">
                                        {props.registrosOpciones.proyectos.map((
                                            registro: string
                                        ) => {
                                            return <option value={registro}/>
                                        })}
                                    </datalist>

                                    <Button
                                        outline
                                        id="botonAgregarProyecto"
                                        color='success'
                                        disabled={proyectoRegistrado}
                                        style={{
                                            border: 'none'
                                        }}
                                        onClick={(evento: SyntheticEvent) => {
                                            props.registrosOpciones.proyectos.push(
                                                props.pagina.proyecto
                                            );

                                            setRefresh(!refresh);
                                        }}
                                    >
                                        <Icon path={mdiPlusThick} size={1} />
                                    </Button>

                                    <UncontrolledTooltip
                                            placement="bottom"
                                            target="botonAgregarProyecto"
                                        >
                                            Agregar Proyecto
                                    </UncontrolledTooltip>
                                </InputGroup>
                            </Col>
                        </Row>
                    </Container>
                </CardBody>
            </Card>
        </React.Fragment>
    );
};
