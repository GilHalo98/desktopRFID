// React.
import React from 'react';

// Componente link de next.
import Link from 'next/link';

import {
    Button,
    Modal,
    Table,
    Container, Row, Col,
    Card, CardBody, CardHeader, CardFooter, CardTitle, CardText
} from 'reactstrap';

// Logica de la vista.
import {
    renderDetalleHorasTrabajadas
} from './logic/renders';

// Modelo de datos.
import {
    ReporteHorasTrabajadas
} from '../../../utils/API/respuestas/horasTrabajadas';

export default function ModalHorasTrabajadasDetalle(
    props: {
        nombreTabla: string,
        modalActivo: boolean,
        toggleModal: Function,
        registro: ReporteHorasTrabajadas,
        semanaReporte: string
    }
) {
    if(!props.registro) {
        return <></>;
    }

    return(
        <Modal size={'lg'} isOpen={props.modalActivo} toggle={() => {
            props.toggleModal();
        }}>
            <Card
                className='cardModalAlerta'
                color="dark"
            >
                <CardHeader>
                    Agregar Registro
                </CardHeader>

                <CardBody>
                    <CardTitle className='tituloModalOpcionesTabla'>
                        Reporte de horas trabajadas de {props.registro.nombres}
                    </CardTitle>

                    <Table hover dark responsive>
                        <thead className='cabeceraTablaRegistros'>
                            <tr key="header">
                                <th>
                                    Día
                                </th>

                                <th>
                                    Entrada
                                </th>

                                <th>
                                    Salida
                                </th>                          
                            </tr>
                        </thead>

                        <tbody>
                            {renderDetalleHorasTrabajadas(
                                props.registro.horasTrabajadas
                            )}
                        </tbody>
                    </Table>
                </CardBody>
            </Card>
        </Modal>
    );
};