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
