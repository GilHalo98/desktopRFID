// React.
import React from 'react';

// Componentes de reacstrap.
import {
    Button,
    Modal,
    Container, Row, Col,
    Card, CardBody, CardHeader, CardFooter, CardTitle, CardText
} from 'reactstrap';

// Componentes propios.
import MenuOpcionesGrid from '../../forms/menus/menuOpcionesGrid';

export default function ModalVisualizarDatosDetalles(
    props: {
        nombreGrid: string,
        onConectarPorSerial: Function,
        modalActivo: boolean,
        toggleModal: Function
    }
) {    return(
        <Modal isOpen={props.modalActivo} toggle={() => {
            props.toggleModal();
        }}>
            <Card
                className='cardModalAlerta'
                color="dark"
            >
                <CardHeader>
                    Conexion serial a disposiivo
                </CardHeader>

                <CardBody>
                    <CardTitle className='tituloModalOpcionesTabla'>
                        Conexion Serial
                    </CardTitle>

                    {/*aqui va el form de las opciones de la gird.*/}
                </CardBody>
            </Card>
        </Modal>
    );
};