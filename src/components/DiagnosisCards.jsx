import React from "react"
import { odontogramaConstants } from "../constants/odontograma"
const { DIAGNOSIS_OPTIONS = [], zonesLabels = {}, } = odontogramaConstants

const DiagnosisCards = ({ diagnosisData, onDelete, isMirrored, onCardClick }) => {
    const sortedDiagnosisEntries = Object.entries(diagnosisData).sort((a, b) => a[0].localeCompare(b[0]))

    return (
        <div>
            <h3 className="odontograma-subtitle">🧾 Diagnósticos guardados</h3>
            <div className="diagnosis-grid">
                {sortedDiagnosisEntries.map(([toothId, zones]) => (
                    <div key={toothId} className="diagnosis-card" onClick={() => onCardClick?.(toothId)}
                        style={{ cursor: "pointer" }}>
                        <button
                            className="delete-btn"
                            onClick={(e) => {
                                e.stopPropagation() // evita que también abra el modal
                                onDelete(toothId)
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
    )
}

export default DiagnosisCards
