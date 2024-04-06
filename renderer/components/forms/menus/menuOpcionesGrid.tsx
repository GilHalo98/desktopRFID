import {
    Container, Row, Col,
    Input, Label,
    Form, FormGroup
} from 'reactstrap';

export default function MenuOpcionesGrid(
    props: {
        registrosPorPagina: number,
        setRegistrosPorPagina: Function,
        tiempoRefresh: number,
        setTiempoRefresh: Function,
        ocultarOpcionesRegistros: boolean
    }
) {
    return(
        <Form>
            <FormGroup>
                <Label for="registrosPagina">
                    Cantidad de registros por pagina
                </Label>

                <Input
                    id="registrosPagina"
                    name="registrosPorPagina"
                    value={props.registrosPorPagina}
                    type="number"
                    onChange={(input) => {
                        props.setRegistrosPorPagina(input.target.value);
                    }}
                />
            </FormGroup>

            <FormGroup>
                <Label for="tiempoRefrescamiento">
                    Tiempo de refrescamiento de la pagina: {props.tiempoRefresh} segundos
                </Label>

                <Input
                    id="tiempoRefrescamiento"
                    name="tiempoDeRefrescamiento"
                    type="range"
                    value={props.tiempoRefresh}
                    onChange={(input) => {
                        props.setTiempoRefresh(input.target.value);
                    }}
                />
            </FormGroup>
        </Form>
    );
};