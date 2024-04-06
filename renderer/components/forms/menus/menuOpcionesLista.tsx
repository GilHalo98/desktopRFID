import {
    Container, Row, Col,
    Input, Label,
    Form, FormGroup
} from 'reactstrap';

export default function MenuOpcionesLista(
    props: {
        tiempoRefresh: number,
        setTiempoRefresh: Function,
        registrosEnLista: number,
        setRegistrosEnLista: Function
    }
) {

    return(
        <Form>
            <FormGroup>
                <Label for="registros">
                    Cantidad de registros en la lista
                </Label>

                <Input
                    id="registros"
                    name="registrosEnLista"
                    value={props.registrosEnLista}
                    type="number"
                    onChange={(input) => {
                        props.setRegistrosEnLista(input.target.value);
                    }}
                />
            </FormGroup>

            <FormGroup>
                <Label for="tiempoRefrescamiento">
                    Tiempo de refrescamiento de la lista: {props.tiempoRefresh} segundos
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