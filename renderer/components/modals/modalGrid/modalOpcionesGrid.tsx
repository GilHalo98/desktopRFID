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

export default function ModalOpcionesTabla(
    props: {
        nombreGrid: string,
        opcionesGrid: {
            registrosPorPagina?: number,
            tiempoRefrescamiento?: number,
            guardarConfiguracion: Function
        },
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
                    Opciones de grid
                </CardHeader>

                <CardBody>
                    <CardTitle className='tituloModalOpcionesTabla'>
                        Opciones de grid de {props.nombreGrid}
                    </CardTitle>

                    {/*aqui va el form de las opciones de la gird.*/}
                    <MenuOpcionesGrid
                        registrosPorPagina={
                            props.opcionesGrid.registrosPorPagina
                        }
                        tiempoRefrescamiento={
                            props.opcionesGrid.tiempoRefrescamiento
                        }
                        toggleModal={props.toggleModal}
                        guardarConfiguracion={
                            props.opcionesGrid.guardarConfiguracion
                        }
                    />
                </CardBody>
            </Card>
        </Modal>
    );
};