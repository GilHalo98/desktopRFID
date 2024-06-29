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
import MenuProbarSerial from '../../forms/menus/menuProbrarSerial';

export default function ModalConexionSerial(
    props: {
        nombreGrid: string,
        onConectarPorSerial: Function,
        modalActivo: boolean,
        toggleModal: Function
    }
) {
    return(
        <Modal isOpen={props.modalActivo} toggle={() => {
            props.toggleModal();
        }}>
            <Card
                className='cardModalAlerta'
                color="dark"
            >
                <CardHeader>
                    Probar conexión de dispositivo
                </CardHeader>

                <CardBody>
                    <CardTitle className='tituloModalOpcionesTabla'>
                        Consola de prueba de dispositivo por medio de
                        communicación serial.
                    </CardTitle>

                    {/*
                        aqui va el form para hacer la prueba
                        con el serial.
                    */}
                    <MenuProbarSerial
                        toggleModal={props.toggleModal}
                    />
                </CardBody>
            </Card>
        </Modal>
    );
};