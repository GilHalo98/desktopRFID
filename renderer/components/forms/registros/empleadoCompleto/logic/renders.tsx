// Importamos React.
import React from "react";

// Evento que maneja el form.
import { SyntheticEvent } from "react";

// Componentes de reactstrap.
import {
    Table,
    FormGroup, Input,
    Container, Row, Col, Button, Label, Spinner
} from "reactstrap";

// Modelos de datos.
import { Rol } from "../../../../../utils/API/modelos/rol";
import { Empleado } from "../../../../../utils/API/modelos/empleado";
import { Usuario } from "../../../../../utils/API/modelos/usuario";
import { Horario } from "../../../../../utils/API/modelos/horario";
import { DiaLaboral } from "../../../../../utils/API/modelos/diaLaboral";
import { HorarioCompleto } from "../../../../../utils/API/respuestas/horarioCompleto";

// Render de la tabla de dias por semana con horarios distintos.
const renderTablaDias = (
    listaDias: {
        nombreDia: string,
        id: number
    }[],
    listaDiasDescanso: boolean[],
    setListaDiasDescanso: Function,
    refresh: boolean,
    setRefresh: Function,
    registros?: DiaLaboral[]
) =>  {
    const diasDescanso = listaDiasDescanso;

    if(!registros) {
        registros = [];
    }

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
                }, index: number) => {
                    // Registro de dia laboral correspondiente.
                    let registroDiaLaboral: DiaLaboral = Object();

                    // Si se pasaron los registros por default.
                    if(registros) {
                        // Buscamos el registro del dia correspondiente.
                        registros.map((registro: DiaLaboral) => {
                            if(registro.dia == dia.id) {
                                registroDiaLaboral = registro;
                            }
                        });

                        // Guardamos si el dia es descanso o laboral.
                        diasDescanso[
                            registroDiaLaboral.dia
                        ] = registroDiaLaboral.esDescanso
                    }

                    return(
                        <tr>
                            <th>{dia.nombreDia}</th>
                            <td>
                                {/*Campo que indica si el dia es descansado*/}
                                <FormGroup
                                    check
                                    style={{
                                        color: 'white',
                                        paddingLeft: '50%'
                                    }}
                                >
                                    <Input
                                        type="checkbox"
                                        id={"esDescanso" + dia.nombreDia}
                                        defaultChecked={
                                            diasDescanso[index]
                                        }
                                        onChange={(evento) => {
                                            diasDescanso[
                                                index
                                            ] = evento.target.checked;

                                            setListaDiasDescanso(diasDescanso);

                                            setRefresh(!refresh);
                                        }}
                                    />
                                </FormGroup>
                            </td>
                            <td>
                                {/*Campo hora de entrada*/}
                                <FormGroup>
                                    <Input
                                        id={'horaEntrada' + dia.nombreDia}
                                        type='time'
                                        disabled={diasDescanso[index]}
                                        defaultValue={
                                            registroDiaLaboral.horaEntrada
                                        }
                                    />
                                </FormGroup>
                            </td>
                            <td>
                                {/*Campo hora de incio de descanso*/}
                                <FormGroup>
                                    <Input
                                        id={
                                            'horaSalidaDescanso'
                                            + dia.nombreDia
                                        }
                                        type='time'
                                        disabled={diasDescanso[index]}
                                        defaultValue={
                                            registroDiaLaboral.horaSalidaDescanso
                                        }
                                    />
                                </FormGroup>
                            </td>
                            <td>
                                {/*Campo hora de fin de descanso*/}
                                <FormGroup>
                                    <Input
                                        id={
                                            'horaEntradaDescanso'
                                            + dia.nombreDia
                                        }
                                        type='time'
                                        disabled={diasDescanso[index]}
                                        defaultValue={
                                            registroDiaLaboral.horaEntradaDescanso
                                        }
                                    />
                                </FormGroup>
                            </td>
                            <td>
                                {/*Campo hora de salida*/}
                                <FormGroup>
                                    <Input
                                        id={'horaSalida' + dia.nombreDia}
                                        type='time'
                                        disabled={
                                            diasDescanso[index]
                                        }
                                        defaultValue={
                                            registroDiaLaboral.horaSalida
                                        }
                                    />
                                </FormGroup>
                            </td>
                        </tr>
                    )
                })}
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
    setListaDiasDescanso: Function,
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
                                                id={
                                                    "esDescanso"
                                                    + dia.nombreDia
                                                }
                                                defaultChecked={
                                                    listaDiasDescanso[index]
                                                }
                                                onChange={(evento) => {
                                                    listaDiasDescanso[
                                                        index
                                                    ] = evento.target.checked
                                                    setListaDiasDescanso(listaDiasDescanso);
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

// Funcion para renderizar el registor del empleado.
function renderRegistroEmpleado(
    elementosOpciones: Rol[],
    controlFormEmpleado: {
        display: string
    },
    registro?: Empleado
) {
    if(!registro) {
        registro = {} as Empleado;
    }

    // Desempaquetamos todos los datos del registro.
    const nombres = !registro.nombres?
        null : registro.nombres;
    const apellidoPaterno = !registro.apellidoPaterno?
        null : registro.apellidoPaterno;
    const apellidoMaterno = !registro.apellidoMaterno?
        null : registro.apellidoMaterno;
    const numeroTelefonico = !registro.numeroTelefonico?
        null : registro.numeroTelefonico;
    const fechaNacimiento = !registro.fechaNacimiento?
        null : registro.fechaNacimiento;
    const idRolVinculado = !registro.idRolVinculado?
        null : registro.idRolVinculado;

    return(
        <Row style={controlFormEmpleado}>
            {/*Campo de imagen del empleado*/}
            <FormGroup>
                <Label for='imagenEmpleado'>
                    Foto del empleado
                </Label>

                <Input
                    id='imagenEmpleado'
                    name='campoImagenEmpleado'
                    type='file'
                />
            </FormGroup>

            {/*Campo de nombres del empleado*/}
            <FormGroup>
                <Label for="nombreEmpleado">
                    Nombres del empleado
                </Label>

                <Input
                    id="nombreEmpleado"
                    name="campoNombreEmpleado"
                    type="text"
                    defaultValue={nombres}
                />
            </FormGroup>

            {/*Campo de apellido paterno del empleado*/}
            <FormGroup>
                <Label for="apellidoPaternoEmpelado">
                    Apellido paterno del empleado
                </Label>

                <Input
                    id="apellidoPaternoEmpelado"
                    name="campoApellidoPaternoEmpelado"
                    type="text"
                    defaultValue={apellidoPaterno}
                />
            </FormGroup>

            {/*Campo de apellido materno del empleado*/}
            <FormGroup>
                <Label for="apellidoMaternoEmpelado">
                    Apellido materno del empleado
                </Label>

                <Input
                    id="apellidoMaternoEmpelado"
                    name="campoApellidoMaternoEmpelado"
                    type="text"
                    defaultValue={apellidoMaterno}
                />
            </FormGroup>

            {/*Campo de numero telefónico del empleado*/}
            <FormGroup>
                <Label for="numeroEmpleado">
                    Numero telefónico del empleado
                </Label>

                <Input
                    id="numeroEmpleado"
                    name="campoNumeroEmpleado"
                    type="tel"
                    defaultValue={numeroTelefonico}
                />
            </FormGroup>

            {/*Campo de fecha de nacimiento del empleado*/}
            <FormGroup>
                <Label for="nacimientoEmpleado">
                    Fecha de nacimiento del empleado
                </Label>

                <Input
                    id="nacimientoEmpleado"
                    name="campoNacimientoEmpleado"
                    type="date"
                    defaultValue={fechaNacimiento}
                />
            </FormGroup>

            {/*Campo de rol del empleado*/}
            <FormGroup>
                <Label for="rolEmpleado">
                    Rol del empleado
                </Label>

                <Input
                    id="rolEmpleado"
                    type="select"
                    defaultValue={idRolVinculado}
                >
                    {elementosOpciones.map((registroVinculado: Rol) => {
                        return(
                            <option value={registroVinculado.id}>
                                {registroVinculado.rolTrabajador}
                            </option>
                        );
                    })}
                </Input>
            </FormGroup>
        </Row>
    );
};

// Funcion para renderizar el registro del usuario.
function renderRegistroUsuario(
    controlFormUsuario: {
        display: string
    },
    autoGenerarUsername: boolean,
    username: string,
    setUsername: Function,
    setAutoGenerarUsername: Function,
    mostrarPassword: Function,
    mostrarContra: boolean,
    autoGenerarPassword: boolean,
    password: string,
    setAutoGenerarPassword: Function,
    setMostrarContra: Function,
    setPassword: Function,
    registro?: Usuario
) {
    if(!registro) {
        registro = {} as Usuario;
    }

    // Desempaquetamos los datos.
    const nombreUsuario = !registro.nombreUsuario?
        null : registro.nombreUsuario;

    return(
        <Row style={controlFormUsuario}>
            {/*Input de nombre de usuario.*/}
            <FormGroup>
                <Label for="nombreUsuario">
                    Nombre de usuario
                </Label>

                <Input
                    id="nombreUsuario"
                    name="campoDeNombreUsuario"
                    type="text"
                    disabled={autoGenerarUsername}
                    value={username}
                    defaultValue={nombreUsuario}
                    onChange={(evento) => {setUsername(
                        evento.target.value
                    )}}
                />
            </FormGroup>

            {/*Input de autogenerar nombre de usuario.*/}
            <FormGroup switch>
                <Input
                    id="autogenerarNombreUsuario"
                    name="checkAutoGenerarUsername"
                    type="switch"
                    onClick={(evento: SyntheticEvent) => {
                        const input = evento.target as HTMLInputElement;

                        setAutoGenerarUsername(
                            input.checked
                        )
                    }}
                />

                <Label switch>
                    Auto-Generar nombre de usuario
                </Label>
            </FormGroup>

            {/*Input de contraseña de usuario.*/}
            <FormGroup>
                <Label for="password">
                    Password de usuario
                </Label>

                <Input
                    id="password"
                    name="campoDePassword"
                    type={mostrarPassword(mostrarContra)}
                    disabled={autoGenerarPassword}
                    value={password}
                    onChange={(evento) => {setPassword(
                        evento.target.value
                    )}}
                />
            </FormGroup>

            {/*
                Switch de autogenerar contraseña y
                checkbox de mostrar contraseña.
            */}
            <Container>
                <Row>
                    <Col>
                        <FormGroup switch>
                            <Input
                                id="autogenerarPassword"
                                name="checkAutoGenerarPassword"
                                type="switch"
                                onClick={(evento: SyntheticEvent) => {
                                    const input = evento.target as HTMLInputElement;
            
                                    setAutoGenerarPassword(
                                        input.checked
                                    )
                                }}
                            />

                            <Label switch>
                                Auto-Generar password
                            </Label>
                        </FormGroup>
                    </Col>

                    <Col>
                        <FormGroup check>
                            <Input
                                id="mostrarPassword"
                                type="checkbox"
                                onClick={(evento: SyntheticEvent) => {
                                    const input = evento.target as HTMLInputElement;
            
                                    setMostrarContra(
                                        input.checked
                                    )
                                }}
                            />

                            <Label check>
                                Mostrar Password
                            </Label>
                        </FormGroup>
                    </Col>
                </Row>
            </Container>
        </Row>
    );
};

// Funcion para renderizar el registro del horario.
function renderRegistroHorario(
    controlFormHorario: {
        display: string
    },
    diasSimilares: boolean,
    setDiasSimilares: Function,
    listaDiasDescanso: boolean[],
    setListaDiasDescanso: Function,
    refresh: boolean,
    setRefresh: Function,
    registro?: HorarioCompleto
) {
    if(!registro) {
        registro = {} as HorarioCompleto;
    }

    // Desempaquetamos los datos.
    const tolerancia = !registro.tolerancia? null : registro.tolerancia;

    // Lista de dias.
    const listaDias = [
        { nombreDia: 'Lunes', id: 0 },
        { nombreDia: 'Martes', id: 1 },
        { nombreDia: 'Miercoles', id: 2 },
        { nombreDia: 'Jueves', id: 3 },
        { nombreDia: 'Viernes', id: 4 },
        { nombreDia: 'Sabado', id: 5 },
        { nombreDia: 'Domingo', id: 6 }
    ]

    return(
        <Row style={controlFormHorario}>
            {/*Tiempo de tolerancia para checar en tiempo*/}
            <FormGroup>
                <Label for='tiempoTolerancia'>
                    Tiempo de tolerancia para checar sin retrazo
                </Label>

                <Input
                    id='tiempoTolerancia'
                    type='time'
                    defaultValue={tolerancia}
                />
            </FormGroup>

            {/*
                Campo que indica si todos los dias tienen
                la misma hora de entrada y salida.
            */}
            <FormGroup
                check
                style={{color: 'white'}}
            >
                <Input
                    type="checkbox"
                    id="horarioSimilar"
                    onChange={(evento) => {
                        setDiasSimilares(evento.target.checked)
                    }}
                />

                <Label
                    for="horarioSimilar"
                    check
                >
                    Horario similar para toda la semana
                </Label>
            </FormGroup>

            <br/>

            {/*Renderizamos la tabla de los dias laborales o la lista*/}
            {diasSimilares?
                renderDiasSimilares(
                    listaDias,
                    listaDiasDescanso,
                    setListaDiasDescanso,
                    refresh,
                    setRefresh
                ) : renderTablaDias(
                    listaDias,
                    listaDiasDescanso,
                    setListaDiasDescanso,
                    refresh,
                    setRefresh,
                    registro.diaLaborals
                )
            }
        </Row>
    );
};

// Funcion para renderizar el spinner de carga.
function renderSpinnerCarga(
    controlSpinner: {
        display: string
    }
) {
    return(
        <Row style={controlSpinner}>
            <Col/>
                <Col xs='auto'>
                    <Spinner
                        color="warning"
                        style={{
                            height: '100px',
                            width: '100px'
                        }}
                    />
                </Col>
            <Col/>
        </Row>
    );
};

// Renderizamos la barra de botones.
function renderBarraBotones(
    numeroForm: number,
    setNumeroForm: Function,
    toggleModal: Function,
    controlBotonSiguiente: {
        display: string
    },
    controlBotonRegistro: {
        display: string
    },
    onOk: Function
) {
    return(
        <Container>
            <Row>
                <Col>
                    <Button
                        active
                        outline
                        block
                        color='danger'
                        onClick={() => {
                            // Cerramos el modal.
                            toggleModal();

                            // Establecemos el form actual
                            // al primero.
                            setNumeroForm(0);
                        }}
                    >
                        Cancelar
                        </Button>
                </Col>

                <Col sm={3}></Col>

                <Col>
                    <Button
                        active
                        outline
                        block
                        disabled={
                            // Si se encuentra en el primer
                            // form deshabilitamos el boton
                            // de anterior.
                            numeroForm == 0? true : false
                        }
                        onClick={() => {
                            // Nos movemos al
                            // siguiente form.
                            setNumeroForm(numeroForm - 1);
                        }}
                    >
                        Anterior
                    </Button>
                </Col>

                <Col style={controlBotonSiguiente}>
                    <Button
                        active
                        outline
                        block
                        color='success'
                        onClick={() => {
                            // Si existen forms de los
                            // cuales podemos ciclar entonces
                            // cambiamos de form.
                            if(numeroForm < 2) {
                                setNumeroForm(numeroForm + 1);

                            // Si es el ultimo form al que
                            // ciclar Se envia el registro
                            // y se cierra el modal.
                            } else {
                                toggleModal();

                                // tambien receteamos el
                                // form actual.
                                setNumeroForm(0);
                            }
                        }}
                    >
                        Siguiente
                    </Button>
                </Col>

                <Col style={controlBotonRegistro}>
                    <Button
                        active
                        outline
                        block
                        color='success'

                        onClickCapture={(evento: SyntheticEvent) => {
                            onOk(evento);
                        }}
                    >
                        Registrar
                    </Button>
                </Col>
            </Row>
        </Container>
    );
};

export {
    renderTablaDias,
    renderDiasSimilares,
    renderRegistroEmpleado,
    renderRegistroUsuario,
    renderRegistroHorario,
    renderSpinnerCarga,
    renderBarraBotones
};
