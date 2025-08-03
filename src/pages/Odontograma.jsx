import React, { useState } from "react"
import ToothModal from "../components/ToothModal"
import { odontogramaConstants } from "../constants/odontograma"
import ToothShape from "../components/ToothShape"
import '../styles/odontograma.css'

const {
    DIAGNOSIS_OPTIONS,
    zonesLabels,
    upperAdult, upperChild, upperChildRight, upperAdultRight,
    lowerAdult, lowerChild, lowerChildRight, lowerAdultRight
} = odontogramaConstants

const Odontograma = () => {
    const [isAdult, setIsAdult] = useState(true)
    const [mirrorView, setMirrorView] = useState(false)
    const [selectedTooth, setSelectedTooth] = useState(null)
    const [diagnosisData, setDiagnosisData] = useState({})

    const handleToothClick = (toothId) => {
        setSelectedTooth(toothId)
    }

    const sortedDiagnosisEntries = Object.entries(diagnosisData).sort((a, b) => a[0].localeCompare(b[0]))
    const isMirrored = (toothId) => {
        if (!mirrorView) return false
        const mirroredTeeth = [
            ...upperAdultRight, ...upperChildRight,
            ...lowerAdultRight, ...lowerChildRight
        ]
        return mirroredTeeth.includes(toothId)
    }

    const renderTooth = (toothId) => {
        const diagnosed = Boolean(diagnosisData[toothId])
        return (
            <div key={toothId} className="tooth-wrapper">
                <ToothShape
                    toothId={toothId}
                    size={48}
                    fill={diagnosed ? "#d0f0fd" : "#fff"}
                    triangleColor="#1976d2"
                    stroke="#888"
                    onClick={() => handleToothClick(toothId)}
                />
                <span className="tooth-label">{toothId}</span>
            </div>
        )
    }

    return (
        <div className="odontograma-container">
            <h2 className="odontograma-title">🦷 Odontograma ({isAdult ? "Adulto" : "Infantil"})</h2>

            <label className="toggle-label">
                <input
                    type="checkbox"
                    checked={isAdult}
                    onChange={() => setIsAdult(!isAdult)}
                />
                Mostrar dentición adulta
            </label>

            <label className="toggle-label">
                <input
                    type="checkbox"
                    checked={mirrorView}
                    onChange={() => setMirrorView(!mirrorView)}
                />
                Vista en perspectiva del paciente (espejada)
            </label>

            <div className="teeth-group">
                <div className="teeth-scroll-wrapper">
                    <div className="teeth-row">
                        {isAdult ? upperAdult.map(renderTooth) : upperChild.map(renderTooth)}
                        <div className="teeth-separator" />
                        {isAdult ? upperAdultRight.map(renderTooth) : upperChildRight.map(renderTooth)}
                    </div>
                    <hr className="divider" />
                    <div className="teeth-row">
                        {isAdult ? lowerAdult.map(renderTooth) : lowerChild.map(renderTooth)}
                        <div className="teeth-separator" />
                        {isAdult ? lowerAdultRight.map(renderTooth) : lowerChildRight.map(renderTooth)}
                    </div>
                </div>
            </div>

            {selectedTooth && (
                <ToothModal
                    toothId={selectedTooth}
                    diagnosis={diagnosisData[selectedTooth] || {}}
                    isMirrored={isMirrored(selectedTooth)}
                    onUpdate={(newData) => {
                        setDiagnosisData(prev => {
                            const updated = { ...prev }
                            if (Object.keys(newData).length === 0) {
                                delete updated[selectedTooth]
                            } else {
                                updated[selectedTooth] = newData
                            }
                            return updated
                        })
                    }}
                    onClose={() => setSelectedTooth(null)}
                />
            )}

            <hr className="divider" />

            <div>
                <h3 className="odontograma-subtitle">🧾 Diagnósticos guardados</h3>
                <div className="diagnosis-grid">
                    {sortedDiagnosisEntries.map(([toothId, zones]) => (
                        <div key={toothId} className="diagnosis-card">
                            <button
                                className="delete-btn"
                                onClick={() => {
                                    setDiagnosisData(prev => {
                                        const newData = { ...prev }
                                        delete newData[toothId]
                                        return newData
                                    })
                                }}
                                title="Eliminar diagnóstico"
                            >
                                ✖
                            </button>
                            <div className="diagnosis-svg">
                                <svg width="70" height="70" viewBox="0 0 100 100">
                                    <circle cx="50" cy="50" r="40" fill="#fff" stroke="#888" strokeWidth="2" />
                                    {Object.entries(zones).map(([zoneKey, data]) => {
                                        const coords = zonesLabels[zoneKey]
                                        const mirrored = isMirrored(toothId)
                                        const cx = mirrored ? 100 - coords.cx : coords.cx
                                        const cy = coords.cy
                                        return coords && (
                                            <g key={zoneKey}>
                                                <circle
                                                    cx={cx}
                                                    cy={cy}
                                                    r="10"
                                                    fill={data.color || "gray"}
                                                    fillOpacity="0.7"
                                                />
                                                <text
                                                    x={cx}
                                                    y={cy + 3}
                                                    textAnchor="middle"
                                                    fontSize="8"
                                                    fill="#fff"
                                                    fontWeight="bold"
                                                >
                                                    {zoneKey}
                                                </text>
                                            </g>
                                        )
                                    })}
                                </svg>
                            </div>
                            <h4 className="diagnosis-title">Diente {toothId}</h4>
                            <ul className="diagnosis-list">
                                {Object.entries(zones).map(([zoneKey, data]) => (
                                    <li key={zoneKey}>
                                        <strong>{zoneKey}</strong>: {DIAGNOSIS_OPTIONS.find(opt => opt.code === data.code)?.label || data.code}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                    {sortedDiagnosisEntries.length === 0 && (
                        <p style={{ fontStyle: "italic" }}>Ningún diagnóstico aún</p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Odontograma
