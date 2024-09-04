const listaTooling: string[] = [
    'T1',
    'T2',
    'T3',
    'T4',
    'T5',
    'T6',
    'T7',
    'T8'
];

const herramientas: ItemHerramienta[] = [
    { nombre: '', unidad: '' },
    { nombre: 'Brocas', unidad: 'pulg' },
    { nombre: 'Dado AAV', unidad: 'est' },
    { nombre: 'Rimas MM', unidad: 'mil' },
    { nombre: 'Brocas EST', unidad: 'est' },
    { nombre: 'Edmil Corto Bola', unidad: 'mil' },
    { nombre: 'Edmil Largo Plano', unidad: 'mil' },
    { nombre: 'Edmil Corto Radial .5', unidad: 'mil' },
    { nombre: 'Machuelo EST Punta Gun', unidad: 'est' },
    { nombre: 'Machuelo MIL Punta Gun', unidad: 'mil' },
    { nombre: 'Edmil Corto Planos Carburo 4 Filos', unidad: 'mil' }
];

const medidaHerramienta: Object = {
    '': [],
    'est': [
        '',
        'M3',
        'M4',
        'M5',
        'M6',
        'M8',
        'M10',
        'M12'
    ],
    'mil': [
        '',
        '1/8',
        '1/4',
        '1/2',
        '5/8',
        '9/16'
    ],
    'pulg': [
        '',
        '2.5',
        '3.3',
        '4.2',
        '5',
        '6.7',
        '8.5',
        '10.2'
    ]
};

const operacionHerramienta: string[] = [
    '',
    'Desbaste',
    'Acabado',
    'Roscado',
    'Rimado'
];

const montajes: string[] = [
    '',
    'En prensa',
    'En mesa',
    'En mesa con calzas'
];

const listaClientes = [
    '',
    'Ramos Arizpe Manufacturing',
    'MAGNA International'
];


const proyectos: string[] = [
    'Gripper Doble GME T6'
];

const NoDibujos: string[] = [
    'M072-3MP3-002'
];

export {
    montajes,
    proyectos,
    NoDibujos,
    listaTooling,
    herramientas,
    listaClientes,
    medidaHerramienta,
    operacionHerramienta,
}
