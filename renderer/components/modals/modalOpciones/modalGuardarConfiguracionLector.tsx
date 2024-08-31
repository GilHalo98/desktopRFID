// React.
import React from 'react';

// Componentes de reacstrap
import {
    Modal,
    Card, CardBody, CardHeader, CardTitle
} from 'reactstrap';

export default function ModalGuardarConfiguracionLector(
    props: {
        registro: DispositivoIoTSocket,
        headerModal: string,
        tituloModal: string,
        modalActivo: boolean,
        toggleModal: Function,
        onOk: Function,
        onRechazar: Function,
        children: any
    },
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
                    {props.headerModal}
                </CardHeader>

                <CardBody>
                    <CardTitle className='tituloModalOpcionesTabla'>
                        {props.tituloModal}
                    </CardTitle>

                    {/*Form para establecer el dispositivo y configuracion extra*/}
                    {props.children}
                </CardBody>
            </Card>
        </Modal>
    );
};