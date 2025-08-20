const DIAGNOSIS_OPTIONS = [
    { code: '', label: '-- Ninguna --' },
    { code: 'C1', label: 'C1 - Mancha blanca', color: 'red' },
    { code: 'C2', label: 'C2 - Caries en esmalte', color: 'red' },
    { code: 'C3', label: 'C3 - Caries en dentina', color: 'red' },
    { code: 'FP', label: 'FP - Fosas profundas', color: 'blue' },
    { code: 'PR', label: 'PR - Pulpitis reversible', color: 'red' },
    { code: 'RR', label: 'RR - Remanente radicular', color: 'red' },
    { code: 'M1', label: 'M1 - Movilidad grado 1', color: 'blue' },
    { code: 'DIS', label: 'DIS - Discromía', color: 'blue' },
    { code: 'X', label: 'X - Diente ausente', color: 'blue' }
]

const zones = ['O', 'M', 'D', 'L', 'V']

// Coordenadas comunes para SVG y modal
const zonesLabels = {
    O: { label: 'Oclusal', cx: 50, cy: 20 },
    M: { label: 'Mesial', cx: 30, cy: 50 },
    D: { label: 'Distal', cx: 70, cy: 50 },
    L: { label: 'Lingual', cx: 50, cy: 80 },
    V: { label: 'Vestibular', cx: 50, cy: 50 }
}

const adultTeeth = {
    1: ["18", "17", "16", "15", "14", "13", "12", "11"],
    2: ["21", "22", "23", "24", "25", "26", "27", "28"],
    4: ["31", "32", "33", "34", "35", "36", "37", "38"],
    3: ["48", "47", "46", "45", "44", "43", "42", "41"]
}

const childTeeth = {
    5: ["55", "54", "53", "52", "51"],
    6: ["61", "62", "63", "64", "65"],
    8: ["71", "72", "73", "74", "75"],
    7: ["85", "84", "83", "82", "81"]
}

const upperAdult = ["18", "17", "16", "15", "14", "13", "12", "11"]
const upperChild = ["55", "54", "53", "52", "51"]
const upperChildRight = ["61", "62", "63", "64", "65"]
const upperAdultRight = ["21", "22", "23", "24", "25", "26", "27", "28"]

const lowerAdultRight = ["31", "32", "33", "34", "35", "36", "37", "38"]
const lowerChildRight = ["71", "72", "73", "74", "75"]
const lowerChild = ["85", "84", "83", "82", "81"]
const lowerAdult = ["48", "47", "46", "45", "44", "43", "42", "41"]

export const TREATMENTS = {
    odontopediatria: [
        { code: "ODP1", label: "Consulta en odontopediatría", price: 100 },
    ],
    profilaxisPrevencion: [
        { code: "PP1", label: "Destartraje", price: 120 },
        { code: "PP2", label: "Profilaxis dental", price: 90 },
        { code: "PP3", label: "Aplicación de barniz flúor", price: 100 },
        { code: "PP4", label: "Sellante de fosas y fisuras", price: 70 },
        { code: "PP5", label: "Sellante de fosas y fisuras con resina", price: 80 },
    ],
    abrasiones: [
        { code: "AB1", label: "Microabrasión dental", price: 200 },
        { code: "AB2", label: "Macroabrasión", price: 250 },
    ],
    restauraciones: [
        { code: "RES1", label: "Restauración simple con resina", price: 100 },
        { code: "RES2", label: "Restauración compuesta con resina", price: 120 },
        { code: "RES3", label: "Restauración compleja con resina", price: 130 },
        { code: "RES4", label: "Restauración con ionómero de vidrio", price: 90 },
        { code: "RES5", label: "Restauración temporal", price: 20 },
        { code: "RES6", label: "Restauración Giomeros", price: 100 },
    ],
    inactivacionCaries: [
        { code: "IC1", label: "Inactivación de caries con BRIX + IV", price: 120 },
        { code: "IC2", label: "Inactivación de caries con FDP + IV", price: 100 },
        { code: "IC3", label: "Inactivación de caries con FDP", price: 70 },
    ],
    pulpares: [
        { code: "PUL1", label: "Recubrimiento Pulpar Indirecto", price: 150 },
        { code: "PUL2", label: "Pulpotomía", price: 350 },
        { code: "PUL3", label: "Pulpectomía", price: 400 },
        { code: "PUL4", label: "Pulpectomía no instrumentado", price: 400 },
    ],
    coronas: [
        { code: "COR1", label: "Corona de acero", price: 90 },
        { code: "COR2", label: "Corona de acetato", price: 100 },
        { code: "COR3", label: "Corona de Porcelana", price: 400 },
    ],
    extracciones: [
        { code: "EXT1", label: "Extracción dental simple", price: 120 },
        { code: "EXT2", label: "Extracción dental compleja", price: 150 },
        { code: "EXT3", label: "Extracción caso clínico", price: 500 },
    ],
    endodoncia: [
        { code: "ENDO1", label: "Endodoncia de Premolar", price: 220 },
        { code: "ENDO2", label: "Endodoncia de Molar", price: 400 },
        { code: "ENDO3", label: "Endodoncia de Incisivos", price: 250 },
        { code: "ENDO4", label: "Obturación técnica de Hall", price: 150 },
        { code: "ENDO5", label: "Apicoformación", price: 300 },
    ],
    ortodoncia: [
        { code: "ORTO1", label: "Instalación de bracket superior e inferior", price: 800 },
        { code: "ORTO2", label: "Control mensual de ortodoncia", price: 250 },
        { code: "ORTO3", label: "Control mensual de ortopedia", price: 150 },
        { code: "ORTO4", label: "Mantenedor de Espacio", price: 450 },
        { code: "ORTO5", label: "Anclaje doble ATP fijo", price: 450 },
    ],
    cirugia: [
        { code: "CIR1", label: "Cirugía de Frenectomía lingual", price: 350 },
        { code: "CIR2", label: "Cirugía menor", price: 300 },
    ],
    radiografias: [
        { code: "RAD1", label: "Radiografía Periapical digital", price: 15 },
    ],
    sedacion: [
        { code: "SED1", label: "Sedación endovenosa por sesión", price: 600 },
        { code: "SED2", label: "Sedación con óxido nitroso", price: 500 },
    ],
    otros: [
        { code: "OT1", label: "Perno de fibra de vidrio", price: 70 },
        { code: "OT2", label: "Férula dental", price: 300 },
        { code: "OT3", label: "Toma de modelos estudio", price: 80 },
    ],
}

export const odontogramaConstants = {
    DIAGNOSIS_OPTIONS,
    zonesLabels,
    zones,
    adultTeeth,
    childTeeth,
    upperAdult,
    upperChild,
    upperChildRight,
    upperAdultRight,
    lowerAdult,
    lowerChild,
    lowerChildRight,
    lowerAdultRight
} 
