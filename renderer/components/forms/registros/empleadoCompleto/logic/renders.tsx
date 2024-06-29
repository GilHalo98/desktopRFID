// Componentes de reactstrap.
import {
    Table,
    FormGroup, Input,
    Container, Row, Col
} from "reactstrap";

// Render de la tabla de dias por semana con horarios distintos.
const renderTablaDias = (
    listaDias: {
        nombreDia: string,
        id: number
    }[],
    listaDiasDescanso: boolean[],
    refresh: boolean,
    setRefresh: Function
) =>  {
    return(
        <Table hover dark responsive>
            <thead>
                <th/>
                <th>Es descanso</th>
                <th>Hora de entrada</th>
                <th>Hora de inicio de descanso</th>
                <th>Hora de termino de descanso</th>
                <th>Hora de salida</th>
            </thead>

            <tbody>
                {listaDias.map((dia: {
                    nombreDia: string,
                    id: number
                }, index: number) => {return(
                    <tr>
                        <th>{dia.nombreDia}</th>
                        <td>
                            {/*Campo que indica si el dia es descansado*/}
                            <FormGroup
                                check
                                style={{color: 'white', paddingLeft: '50%'}}
                            >
                                <Input
                                    type="checkbox"
                                    id="esDescanso"
                                    defaultChecked={listaDiasDescanso[index]}
                                    onChange={(evento) => {
                                        listaDiasDescanso[index] = evento.target.checked;
                                        setRefresh(!refresh);
                                    }}
                                />
                            </FormGroup>
                        </td>
                        <td>
                            {/*Campo hora de entrada*/}
                            <FormGroup>
                                <Input
                                    id='horaEntrada'
                                    type='time'
                                    disabled={listaDiasDescanso[index]}
                                />
                            </FormGroup>
                        </td>
                        <td>
                            {/*Campo hora de incio de descanso*/}
                            <FormGroup>
                                <Input
                                    id='horaInicioDescanso'
                                    type='time'
                                    disabled={listaDiasDescanso[index]}
                                />
                            </FormGroup>
                        </td>
                        <td>
                            {/*Campo hora de fin de descanso*/}
                            <FormGroup>
                                <Input
                                    id='horaFinDescanso'
                                    type='time'
                                    disabled={listaDiasDescanso[index]}
                                />
                            </FormGroup>
                        </td>
                        <td>
                            {/*Campo hora de salida*/}
                            <FormGroup>
                                <Input
                                    id='HoraSalida'
                                    type='time'
                                    disabled={listaDiasDescanso[index]}
                                />
                            </FormGroup>
                        </td>
                    </tr>
                )})}
            </tbody>
        </Table>
    );
};

// Render de la lista de dias por semana con horarios similares.
const renderDiasSimilares = (
    listaDias: {
        nombreDia: string,
        id: number
    }[],
    listaDiasDescanso: boolean[],
    refresh: boolean,
    setRefresh: Function
) => {
    return(
        <Container>
            <Row>
                <Col>
                    <Table hover dark responsive>
                        <thead>
                            <tr style={{borderBottom: '100px'}}>
                                <th>Hora de entrada</th>
                                <th>Hora de inicio de descanso</th>
                                <th>Hora de termino de descanso</th>
                                <th>Hora de salida</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td>
                                    {/*Campo hora de entrada*/}
                                    <FormGroup>
                                        <Input
                                            id='horaEntrada'
                                            type='time'
                                        />
                                    </FormGroup>
                                </td>
                                <td>
                                    {/*Campo hora de incio de descanso*/}
                                    <FormGroup>
                                        <Input
                                            id='horaInicioDescanso'
                                            type='time'
                                        />
                                    </FormGroup>
                                </td>
                                <td>
                                    {/*Campo hora de fin de descanso*/}
                                    <FormGroup>
                                        <Input
                                            id='horaFinDescanso'
                                            type='time'
                                        />
                                    </FormGroup>
                                </td>
                                <td>
                                    {/*Campo hora de salida*/}
                                    <FormGroup>
                                        <Input
                                            id='HoraSalida'
                                            type='time'
                                        />
                                    </FormGroup>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Table hover dark responsive>
                        <thead>
                            <tr style={{borderBottom: '100px'}}>
                                <th/>
                                {listaDias.map((dia: {
                                    nombreDia: string,
                                    id: number
                                }, index: number) => {return(
                                    <th>{dia.nombreDia}</th>
                                )})}
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td>Descanso</td>
                                {listaDias.map((dia: {
                                    nombreDia: string,
                                    id: number
                                }, index: number) => {return(
                                    <td>
                                        <FormGroup
                                            check
                                            style={{
                                                color: 'white',
                                                paddingLeft: '50%'
                                            }}
                                        >
                                            <Input
                                                type="checkbox"
                                                id="esDescanso"
                                                defaultChecked={listaDiasDescanso[index]}
                                                onChange={(evento) => {
                                                    listaDiasDescanso[index] = evento.target.checked;
                                                    setRefresh(!refresh);
                                                }}
                                            />
                                        </FormGroup>
                                    </td>
                                )})}
                            </tr>
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
};

export {
    renderTablaDias,
    renderDiasSimilares
};