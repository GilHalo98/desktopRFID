// React.
import React from 'react';

// Componentes de Reactstrap.
import {
    Container, Row, Col,
    Table, Card, CardHeader, CardBody, Button
} from 'reactstrap';

// Funcionalidad propia.

// Modelo de datos.
import {
    Empleado
} from '../../utils/API/modelos/empleado';

export default function DisplayOperadoresMaquina(
    props: {
        registros: Empleado[],
        limiteOperadores: number
    }
) {
    return(
        <Card color="dark">
            <CardBody>
                <Table dark responsive borderless>
                    <thead>
                        <tr>
                            <th colSpan={2} style={{textAlign: 'center'}}>
                                Lista de los ultimos {props.limiteOperadores} operadores.
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {props.registros.map((registro: Empleado) => {
                                return(
                                    <tr>
                                        <td>
                                            <Button
                                                color='info'
                                                outline
                                                block
                                                style={{
                                                    textAlign: 'center',
                                                    border: '0px'
                                                }}
                                            >
                                                {registro.nombres} {registro.apellidoPaterno} {registro.apellidoMaterno}
                                            </Button>
                                        </td>
                                    </tr>
                                );
                        })}
                    </tbody>
                </Table>
            </CardBody>
        </Card>
    );
};
