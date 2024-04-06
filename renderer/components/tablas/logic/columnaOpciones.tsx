import {
    Container, Row, Col
} from 'reactstrap';

import BarraOpcionesRegistros from '../../barraBotones/barraOpcionesRegistros';

function thOpciones(activarOpciones: boolean) {
    if(activarOpciones) {
        return(
            <th key={'opciones'}>
                Opciones
            </th>
        );
    }
};

function tdOpciones(
    activarOpciones: boolean,
    idRegistro: number,
    indexRegistro: number,
    funcionesRegistros: {
        onEliminar: Function,
        onModificar: Function,
        onVisualizar: Function,
        onGuardarConfiguracion: Function | undefined
    },
) {
    if(activarOpciones) {
        const keyTD = idRegistro + '-' + 'opciones';
        return(
            <td key={keyTD}>
                <Container>
                    <Row>
                        <Col/>
                        <Col>
                            <BarraOpcionesRegistros
                                idRegistro={idRegistro}
                                indexRegistro={indexRegistro}
                                onEliminar={funcionesRegistros.onEliminar}
                                onModificar={funcionesRegistros.onModificar}
                                onVisualizar={funcionesRegistros.onVisualizar}
                                onGuardarConfiguracion={funcionesRegistros.onGuardarConfiguracion}
                            />
                        </Col>
                        <Col/>
                    </Row>
                </Container>
            </td>
        );
    }
};

export {
    thOpciones,
    tdOpciones,
};