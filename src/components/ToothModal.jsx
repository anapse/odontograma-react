import '../styles/toothModal.css'
import { useState } from 'react'
import { odontogramaConstants, TREATMENTS } from '../constants/odontograma'

export default function ToothModal({ toothId, diagnosis = {}, isMirrored = false, onUpdate, onClose }) {
    const [activeZone, setActiveZone] = useState(null)
    const [treatmentModalZone, setTreatmentModalZone] = useState(null)
    const { DIAGNOSIS_OPTIONS, zonesLabels, zones } = odontogramaConstants

    const handleSelectDiagnosis = (zone, code) => {
        const updated = { ...diagnosis }

        if (!code) {
            delete updated[zone]
        } else {
            const selected = DIAGNOSIS_OPTIONS.find(d => d.code === code)
            if (!selected) return

            // Mantener el tratamiento existente si existe
            const existingTreatment = diagnosis[zone]?.treatment
            const existingCategory = diagnosis[zone]?.category

            updated[zone] = {
                code: selected.code,
                color: selected.color,
                ...(existingTreatment && existingCategory && {
                    treatment: existingTreatment,
                    category: existingCategory
                })
            }
        }

        onUpdate(updated)
        setActiveZone(null)
    }

    const handleSelectTreatment = (zone, treatmentCode) => {
        const updated = { ...diagnosis }

        if (!treatmentCode) {
            // Remover tratamiento pero mantener diagnóstico
            if (updated[zone]) {
                delete updated[zone].treatment
                delete updated[zone].category
            }
        } else {
            // Buscar el tratamiento en todas las categorías
            const allTreatments = getAllTreatmentsOptions()
            const selectedTreatment = allTreatments.find(t => t.code === treatmentCode)

            if (selectedTreatment && updated[zone]) {
                updated[zone] = {
                    ...updated[zone],
                    treatment: {
                        code: selectedTreatment.code,
                        label: selectedTreatment.label
                    },
                    category: selectedTreatment.category
                }
            }
        }

        onUpdate(updated)
        setTreatmentModalZone(null) // Cerrar modal de tratamiento
    }

    const getAllTreatmentsOptions = () => {
        const options = []
        Object.entries(TREATMENTS).forEach(([category, treatments]) => {
            treatments.forEach(treatment => {
                options.push({
                    ...treatment,
                    category,
                    fullLabel: `${category} - ${treatment.label}`
                })
            })
        })
        return options
    }

    const getZoneLabel = (zone) => {
        if (isMirrored && (zone === 'M' || zone === 'D')) {
            const flippedZone = zone === 'M' ? 'D' : 'M'
            return zonesLabels[flippedZone]?.label || flippedZone
        }
        return zonesLabels[zone]?.label || zone
    }

    return (
        <div className="tooth-modal-overlay">
            <div className="tooth-modal">
                <div className="tooth-modal-header">
                    <h3 className="tooth-modal-title">Diente {toothId}</h3>
                    <button className="tooth-modal-close" onClick={onClose}>✖</button>
                </div>

                <div className="tooth-modal-container">
                    {/* Vista circular del diente */}
                    <div className="tooth-circle">
                        {zones.map((zone) => {
                            const hasIssue = diagnosis[zone]?.code && !diagnosis[zone]?.treatment

                            return (
                                <div
                                    key={zone}
                                    onClick={() => setActiveZone(zone)}
                                    className={`tooth-zone-circle zone-${zone} ${isMirrored ? 'mirrored' : ''} ${activeZone === zone ? 'active' : ''
                                        } ${hasIssue ? 'incomplete' : ''}`}
                                    style={{
                                        position: 'absolute',
                                        ...getZonePosition(zone),
                                        backgroundColor: diagnosis[zone]?.color === 'red'
                                            ? '#ff7979'
                                            : diagnosis[zone]?.color === 'blue'
                                                ? '#74b9ff'
                                                : hasIssue
                                                    ? '#fff3cd'
                                                    : '#f0f0f0',
                                        border: activeZone === zone ? '2px solid #0984e3' : '1px solid #ddd',
                                    }}
                                    title={`${getZoneLabel(zone)}${hasIssue ? ' - Falta tratamiento' : ''}`}
                                >
                                    <span className="zone-label">{zone}</span>
                                    {diagnosis[zone]?.code && (
                                        <span className="zone-code">{diagnosis[zone].code}</span>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                </div>

                {activeZone && (
                    <div className="diagnosis-section">
                        <h4>Zona {getZoneLabel(activeZone)}</h4>

                        <div className="form-group">
                            <label>Diagnóstico:</label>
                            <select
                                onChange={(e) => handleSelectDiagnosis(activeZone, e.target.value)}
                                value={diagnosis[activeZone]?.code || ''}
                                className="form-select"
                            >
                                <option value="">Sin diagnóstico</option>
                                {DIAGNOSIS_OPTIONS.map(opt => (
                                    <option key={opt.code} value={opt.code}>
                                        {opt.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                )}

                {Object.keys(diagnosis).length > 0 && (
                    <div className="summary-section">
                        <div className="summary-table-container">
                            <table className="summary-table">
                                <thead>
                                    <tr>
                                        <th>Zona</th>
                                        <th>Diagnóstico</th>
                                        <th>Tratamiento</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.entries(diagnosis).map(([zone, data]) => {
                                        const zoneLabel = getZoneLabel(zone)
                                        const diagnosisLabel = DIAGNOSIS_OPTIONS.find(opt => opt.code === data.code)?.label || data.code

                                        return (
                                            <tr key={zone} className={!data.treatment ? 'incomplete-row' : ''}>
                                                <td>{zoneLabel}</td>
                                                <td>
                                                    <div className="diagnosis-info">
                                                        <span className="diagnosis-code">{data.code}</span>
                                                        <span className="diagnosis-label">{diagnosisLabel}</span>
                                                    </div>
                                                </td>
                                                <td className="treatment-cell">
                                                    {data.treatment ? (
                                                        <div className="treatment-with-edit">
                                                            <div className="treatment-info">
                                                                <span className="treatment-name">{data.treatment.label}</span>
                                                            </div>
                                                            <button
                                                                className="treatment-action-btn edit-btn"
                                                                onClick={() => setTreatmentModalZone(zone)}
                                                                title="Editar"
                                                            >
                                                                ✏️
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <button
                                                            className="treatment-action-btn add-btn"
                                                            onClick={() => setTreatmentModalZone(zone)}
                                                            title="Agregar"
                                                        >
                                                            +
                                                        </button>
                                                    )}
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Modal de selección de tratamiento */}
                {treatmentModalZone && (
                    <div className="treatment-modal-overlay">
                        <div className="treatment-modal">
                            <div className="treatment-modal-header">
                                <h4>Tratamiento - {getZoneLabel(treatmentModalZone)}</h4>
                                <button
                                    className="treatment-modal-close"
                                    onClick={() => setTreatmentModalZone(null)}
                                >
                                    ✖
                                </button>
                            </div>
                            <div className="treatment-modal-body">
                                <select
                                    onChange={(e) => handleSelectTreatment(treatmentModalZone, e.target.value)}
                                    value={diagnosis[treatmentModalZone]?.treatment?.code || ''}
                                    className="treatment-select"
                                    autoFocus
                                >
                                    <option value="">Sin tratamiento</option>
                                    {Object.entries(TREATMENTS).map(([category, treatments]) => (
                                        <optgroup key={category} label={category}>
                                            {treatments.map(treatment => (
                                                <option key={treatment.code} value={treatment.code}>
                                                    {treatment.label}
                                                </option>
                                            ))}
                                        </optgroup>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                )}

                <div className="modal-actions">
                    <button className="btn-secondary" onClick={onClose}>
                        Cancelar
                    </button>
                    <button className="btn-primary" onClick={onClose}>
                        Guardar
                    </button>
                </div>
            </div>
        </div>
    )
}

// Función auxiliar para posicionar las zonas
function getZonePosition(zone) {
    const positions = {
        'V': { // Vestibular (arriba)
            top: '5px',
            left: '50%',
            transform: 'translateX(-50%)'
        },
        'L': { // Lingual (abajo)
            bottom: '5px',
            left: '50%',
            transform: 'translateX(-50%)'
        },
        'M': { // Mesial (izquierda)
            top: '50%',
            left: '5px',
            transform: 'translateY(-50%)'
        },
        'D': { // Distal (derecha)
            top: '50%',
            right: '5px',
            transform: 'translateY(-50%)'
        },
        'O': { // Oclusal/Incisal (centro)
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
        },
        'I': { // Incisal (centro)
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
        }
    }

    return {
        ...positions[zone],
        width: '30px',
        height: '30px'
    }
}