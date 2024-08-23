// Importamos react.
import React, { SyntheticEvent } from 'react';

// Componentes de reactstrap.
import {
    Input,
    Card, CardBody, CardHeader,
} from 'reactstrap';

export default function CardNotas(
    props: {
        pagina: Pagina
        funcionesOpciones: {
            onGuardarCambios: Function
        }
    }
) {
    return(
        <React.Fragment>
            <Card color='dark' className='text-white'>
                <CardHeader>
                    Notas.
                </CardHeader>

                <CardBody>
                    <Input
                        id="bitRol"
                        type="textarea"
                        value={props.pagina.notas}
                        onChange={(evento: SyntheticEvent) => {
                            const input = evento.target as HTMLTextAreaElement;
                            props.funcionesOpciones.onGuardarCambios(input.value, 'notas');
                        }}
                    />
                </CardBody>
            </Card>
        </React.Fragment>
    );
};