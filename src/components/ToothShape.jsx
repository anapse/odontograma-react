// src/components/ToothShape.jsx
import React from 'react'
import { odontogramaConstants } from '../constants/odontograma'

const {
    lowerAdult = [], lowerAdultRight = [], lowerChild = [], lowerChildRight = [],
} = odontogramaConstants

export function ToothShape({
    toothId,
    size = 100,
    diagnosed = false,
    onClick
}) {
    const num = parseInt(toothId, 10)

    // Determinar cuántos triángulos
    let triangles = 1
    if ([14, 15, 24, 25, 34, 35, 44, 45].includes(num)) triangles = 2      // premolares
    else if (
        [16, 17, 18, 26, 27, 28, 36, 37, 38, 46, 47, 48].includes(num)
    ) triangles = 3                                                 // molares

    // Determinar orientación: arriba/inferior

    const islower = (lowerAdult || []).includes(toothId) || 
                   (lowerChild || []).includes(toothId) || 
                   (lowerAdultRight || []).includes(toothId) || 
                   (lowerChildRight || []).includes(toothId)

    // Círculo pequeño arriba o abajo
    const center = size / 2
    // Círculo base (centrado y de tamaño adecuado)
    const circleRadius = size * 0.38;

    // Triángulos alineados fuera del círculo
    const baseWidth = circleRadius * 1.6;
    const yBase = islower
        ? circleRadius + 2
        : size - circleRadius - 2;

    // Ahora posiciona el círculo **en relación a** yBase:
    const offset = -8; // ajusta hasta que quede justo dentro de la raiz 
    const circleCenterY = islower
        ? yBase - circleRadius - offset  // justo **arriba** de yBase
        : yBase + circleRadius + offset; // justo **abajo** de yBase
    const yTip = islower
        ? yBase + baseWidth
        : yBase - baseWidth

    let polys = []

    if (triangles === 1) {
        polys.push(
            <polygon
                key="center"
                points={`
                    ${center - baseWidth / 2},${yBase}
                    ${center + baseWidth / 2},${yBase}
                    ${center},${yTip}
                `}
                fill="#fff"
                stroke="#000"
                strokeWidth="2"
            />
        )
    } else if (triangles === 2) {
        // Izquierdo: triángulo rectángulo (ángulo recto en la esquina izquierda)
        polys.push(
            <polygon
                key="left"
                points={`
                    ${center - baseWidth / 2},${yBase}
                    ${center},${yBase}
                    ${center - baseWidth / 2},${yTip}
                `}
                fill="#fff"
                stroke="#000"
                strokeWidth="2"
            />
        )
        // Derecho: triángulo rectángulo (ángulo recto en la esquina derecha)
        polys.push(
            <polygon
                key="right"
                points={`
                    ${center + baseWidth / 2},${yBase}
                    ${center},${yBase}
                    ${center + baseWidth / 2},${yTip}
                `}
                fill="#fff"
                stroke="#000"
                strokeWidth="2"
            />
        )
    } else if (triangles === 3) {
        // Centro (dibuja primero para que quede atrás)
        polys.push(
            <polygon
                key="center"
                points={`
                    ${center - baseWidth / 2},${yBase}
                    ${center + baseWidth / 2},${yBase}
                    ${center},${yTip}
                `}
                fill="#fff"
                stroke="#000"
                strokeWidth="2"
            />
        )
        // Izquierdo: triángulo rectángulo (ángulo recto en la esquina izquierda), relleno blanco
        polys.push(
            <polygon
                key="left"
                points={`
                    ${center - baseWidth / 2},${yBase}
                    ${center},${yBase}
                    ${center - baseWidth / 2},${yTip}
                `}
                fill="#fff"
                stroke="#000"
                strokeWidth="2"
            />
        )
        // Derecho: triángulo rectángulo (ángulo recto en la esquina derecha), relleno blanco
        polys.push(
            <polygon
                key="right"
                points={`
                    ${center + baseWidth / 2},${yBase}
                    ${center},${yBase}
                    ${center + baseWidth / 2},${yTip}
                `}
                fill="#fff"
                stroke="#000"
                strokeWidth="2"
            />
        )
    }

    // Radio del arco (ajusta para que sobresalga lo necesario)


    return (
        <div className="tooth-shape" onClick={onClick}>
            <svg
                width={size * 0.8}
                height={size * 1.2}
                viewBox={`0 0 ${size} ${size}`}
                style={{ display: 'block', margin: 0, padding: 0, cursor: onClick ? 'pointer' : 'default' }}
                onClick={onClick}
            >
                {/* Círculo base */}
                <ellipse
                    cx={center}
                    cy={circleCenterY}
                    rx={circleRadius * 1}  // Ancho horizontal
                    ry={circleRadius * 0.75}  // Alto vertical
                    fill={diagnosed ? "#d0f0fd" : "#fff"}
                    stroke="#000"
                    strokeWidth="2"
                />
                {/* Triángulos sobrepuestos */}
                {polys}
            </svg>
        </div>
    )
}

export default ToothShape
