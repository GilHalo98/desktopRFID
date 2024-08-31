// Componentes de react.
import React, { SyntheticEvent } from 'react';

// Iconos
import { mdiFileAlert } from '@mdi/js';

// Componente para renderizar los iconos.
import Icon from '@mdi/react';

// Componentes de reacstrap
import {
    FormGroup, Label,
    Container, Col, Row,
    Input, Button, Modal, Progress,
    Card, CardHeader, CardBody, CardText, CardTitle
} from 'reactstrap';

export default function ModalGenerarReporteDibujo(
    props: {
        paginas: Pagina[]
        indexPaginaActual: number
        modalActivo: boolean
        onOk: Function
        onCancelar: Function
        toggleModal: Function
    }
) {
    // Hooks de datos de la hoja.
    const [
        orientacionHoja,
        setOrientacionHoja
    ] = React.useState("landscape");

    const [
        formatoHoja,
        setFormatoHoja
    ] = React.useState("letter");

    const [
        unidadesHoja,
        setUnidadesHoja
    ] = React.useState("pt");

    // Hooks que indica el progreso del renderizado del documento.
    const [
        progresoRenderizado,
        setProgresoRenderizado
    ] = React.useState(0);

    // Datos de los select de los input.
    const unidades: string[] = [
        "pt",
        "mm",
        "cm",
        "m",
        "in",
        "px"
    ];

    const formatos = () => {
        const listaFormatos: string[] = [
            'dl',
            'letter',
            'government-letter',
            'legal',
            'junior-legal',
            'ledger',
            'tabloid',
            'credit-card'
        ];

        ['a', 'b', 'c'].forEach((subformato: string )=> {
            for (let i = 0; i <= 10; i++) {
                listaFormatos.push(subformato + i.toString());
            }
        });

        return listaFormatos;
    };

    return(
        <Modal isOpen={props.modalActivo} toggle={() => {
            props.toggleModal();
        }}>
            <Card
                className='cardModalAlerta'
                color="dark"
            >
                <CardHeader style={{
                    textAlign: 'center',
                    fontSize: '28px',
                    fontWeight: 'bolder'
                }}>
                    Generar documento
                </CardHeader>

                {/*Body, muestra la informacioón importante de la alerta.*/}
                <CardBody>
                    <Container fluid>
                        <Row>
                            <Col>
                                <CardTitle style={{
                                    textAlign: 'center',
                                    fontSize: '20px'
                                }}>
                                    Se generara un documento pdf con los 
                                    datos guardados.
                                </CardTitle>
                            </Col>
                        </Row>

                        <br/>

                        <Row>
                            <Col>
                                <CardText style={{
                                    textAlign: 'justify'
                                }}>
                                    Selecciona la configuracion del 
                                    documento de salida.
                                </CardText>
                            </Col>
                        </Row>

                        <br/>

                        <Row>
                            <Col>
                                <FormGroup>
                                    <Label>
                                        Orientación de la hoja
                                    </Label>

                                    <Input
                                        type="select"
                                        defaultValue={orientacionHoja}
                                        onChange={(evento: SyntheticEvent) => {
                                            const input = evento.target as HTMLSelectElement
                                            setOrientacionHoja(input.value);
                                        }}
                                    >
                                        <option value='landscape'>
                                            Horizontal
                                        </option>

                                        <option value='portrait'>
                                            Vertical
                                        </option>
                                    </Input>
                                </FormGroup>

                                <FormGroup>
                                    <Label>
                                        Formato de hoja
                                    </Label>

                                    <Input
                                        type="select"
                                        defaultValue={formatoHoja}
                                        onChange={(evento: SyntheticEvent) => {
                                            const input = evento.target as HTMLSelectElement
                                            setFormatoHoja(input.value);
                                        }}
                                    >
                                        {formatos().map((formato: string) => {
                                            return (
                                                <option value={formato}>
                                                    {formato}
                                                </option>
                                            );
                                        })}
                                    </Input>
                                </FormGroup>

                                <FormGroup>
                                    <Label>
                                        Unidades
                                    </Label>

                                    <Input
                                        type="select"
                                        defaultValue={unidadesHoja}
                                        onChange={(evento: SyntheticEvent) => {
                                            const input = evento.target as HTMLSelectElement
                                            setUnidadesHoja(input.value);
                                        }}
                                    >
                                        {unidades.map((unidad: string) => {
                                            return (
                                                <option value={unidad}>
                                                    {unidad}
                                                </option>
                                            );
                                        })}
                                    </Input>
                                </FormGroup>
                            </Col>
                        </Row>

                        <br/>

                        <Row>
                            <Col>
                                <Progress
                                    animated
                                    className="my-3"
                                    striped
                                    value={progresoRenderizado}
                                />
                            </Col>
                        </Row>

                        <br/>

                        <Row>
                            <Col>
                                <Button
                                    block
                                    color='danger'
                                    style={{
                                        border: 'none'
                                    }}
                                    onClick={() => {
                                        props.onCancelar();
                                        props.toggleModal();
                                }}>
                                    Cancelar
                                </Button>
                            </Col>

                            <Col>
                                <Button
                                    block
                                    color='success'
                                    style={{
                                        border: 'none'
                                    }}
                                    onClick={() => {
                                        props.onOk(
                                            orientacionHoja,
                                            unidadesHoja,
                                            formatoHoja,
                                            setProgresoRenderizado,
                                            props.toggleModal
                                        );
                                }}>
                                    Generar documento
                                </Button>
                            </Col>
                        </Row>
                    </Container>
                </CardBody>
            </Card>
        </Modal>
    );
};