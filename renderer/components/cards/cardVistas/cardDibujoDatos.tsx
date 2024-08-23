// Importamos react.
import React, { SyntheticEvent } from 'react';

// Componentes de reactstrap.
import {
    Card, CardBody, Input, Table
} from 'reactstrap';

export default function CardDibujoDatos(
    props: {
        pagina: Pagina
        funcionesOpciones: {
            onGuardarCambios: Function
        }
    }
) {

    const renderizarDibujo = () => {
        if(!props.pagina.dibujo) {
            return <></>;
        }

        if(!props.pagina.dibujo.directorio || !props.pagina.dibujo.tipo) {
            return <></>;
        }

        const imagenB64 = window.ipc.sendSync(
            'cargar_imagen',
            {
                path: props.pagina.dibujo.directorio
            }
        );

        return (
            <img
                key={'dibjo'}
                src={
                    `data:${props.pagina.dibujo.tipo}
                    ;base64,${imagenB64}`
                }
            />
        );
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
                        onChange={(evento: SyntheticEvent) => {
                            const input = evento.target as HTMLTextAreaElement;

                            props.funcionesOpciones.onGuardarCambios(
                                input.files[0].path, 'dibujo', 'directorio'
                            );

                            props.funcionesOpciones.onGuardarCambios(
                                input.files[0].type, 'dibujo', 'tipo'
                            );
                        }}
                    />

                    <br/>

                    <Table dark responsive borderless>
                        <thead>
                            <tr style={{
                                textAlign: 'center'
                            }}>
                                <th>Profundidad del programa</th>
                                <th>Refrencia X</th>
                                <th>Refrencia Y</th>
                                <th>Refrencia Z</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr style={{
                                textAlign: 'center'
                            }}>
                                <td>
                                    <Input
                                        id="profundidadHerramienta"
                                        type="number"
                                        value={props.pagina.referencias.profundidadHerramienta}
                                        onChange={(evento: SyntheticEvent) => {
                                            const input = evento.target as HTMLTextAreaElement;

                                            props.funcionesOpciones.onGuardarCambios(
                                                input.value, 'referencias', 'profundidadHerramienta'
                                            );
                                        }}
                                    />
                                </td>

                                <td>
                                    <Input
                                        id="referenciaX"
                                        type="text"
                                        value={props.pagina.referencias.referenciaX}
                                        onChange={(evento: SyntheticEvent) => {
                                            const input = evento.target as HTMLTextAreaElement;

                                            props.funcionesOpciones.onGuardarCambios(
                                                input.value, 'referencias', 'referenciaX'
                                            );
                                        }}
                                    />
                                </td>

                                <td>
                                    <Input
                                        id="referenciaY"
                                        type="text"
                                        value={props.pagina.referencias.referenciaY}
                                        onChange={(evento: SyntheticEvent) => {
                                            const input = evento.target as HTMLTextAreaElement;

                                            props.funcionesOpciones.onGuardarCambios(
                                                input.value, 'referencias', 'referenciaY'
                                            );
                                        }}
                                    />
                                </td>

                                <td>
                                    <Input
                                        id="referenciaZ"
                                        type="text"
                                        value={props.pagina.referencias.referenciaZ}
                                        onChange={(evento: SyntheticEvent) => {
                                            const input = evento.target as HTMLTextAreaElement;

                                            props.funcionesOpciones.onGuardarCambios(
                                                input.value, 'referencias', 'referenciaZ'
                                            );
                                        }}
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </CardBody>
            </Card>
        </React.Fragment>
    );
};