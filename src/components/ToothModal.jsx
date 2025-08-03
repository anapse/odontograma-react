import './ToothModal.css'
import { useState } from 'react'
import { odontogramaConstants } from '../constants/odontograma'

export default function ToothModal({ toothId, diagnosis = {}, isMirrored = false, onUpdate, onClose }) {
    const [activeZone, setActiveZone] = useState(null)
    const { DIAGNOSIS_OPTIONS, zonesLabels, zones } = odontogramaConstants

    const handleSelectDiagnosis = (zone, code) => {
        const updated = { ...diagnosis }

        if (!code) {
            delete updated[zone]
        } else {
            const selected = DIAGNOSIS_OPTIONS.find(d => d.code === code)
            if (!selected) return
            updated[zone] = { code: selected.code, color: selected.color }
        }

        onUpdate(updated)
        setActiveZone(null)
    }

    const getZoneLabel = (zone) => zonesLabels[zone]?.label || zone

    return (
        <div className="tooth-modal-overlay">
            <div className="tooth-modal">
                <button className="tooth-modal-close" onClick={onClose}>✖</button>
                <h3 className="tooth-modal-title">Diente {toothId}</h3>

                <div className="tooth-modal-container">
                    <div className="tooth-modal-tooth">
                        {zones.map((zone) => {

                            return (
                                <div
                                    key={zone}
                                    onClick={() => setActiveZone(zone)}
                                    className={`tooth-zone zone-${zone} ${isMirrored ? 'mirrored' : ''}`}
                                    style={{
                                        backgroundColor: diagnosis[zone]?.color === 'red'
                                            ? '#ff7979'
                                            : diagnosis[zone]?.color === 'blue'
                                                ? '#74b9ff'
                                                : '#f0f0f0'
                                    }}
                                    title={zonesLabels[zone]?.label || zone}
                                >
                                    {diagnosis[zone]?.code || zone}
                                </div>
                            )
                        })}
                    </div>
                </div>

                {activeZone && (
                    <div style={{ marginTop: '1rem' }}>
                        <label><strong>Diagnóstico para zona {getZoneLabel(activeZone)}:</strong></label>
                        <select
                            onChange={(e) => handleSelectDiagnosis(activeZone, e.target.value)}
                            value={diagnosis[activeZone]?.code || ''}
                            style={{
                                display: 'block',
                                marginTop: '0.5rem',
                                padding: '0.5rem',
                                width: '100%',
                                borderRadius: '6px',
                                border: '1px solid #ccc'
                            }}
                        >
                            {DIAGNOSIS_OPTIONS.map(opt => (
                                <option key={opt.code} value={opt.code}>
                                    {opt.label}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                {Object.keys(diagnosis).length > 0 && (
                    <div style={{ marginTop: '2rem' }}>
                        <h4 style={{ marginBottom: '0.5rem' }}>📝 Diagnóstico por zona:</h4>
                        <ul style={{ paddingLeft: '1.2rem', fontSize: '0.95rem', color: '#2d3436' }}>
                            {Object.entries(diagnosis).map(([zone, data]) => {
                                const label = getZoneLabel(
                                    isMirrored && (zone === 'M' || zone === 'D')
                                        ? zone === 'M' ? 'D' : 'M'
                                        : zone
                                )
                                return (
                                    <li key={zone}>
                                        <strong>{label}</strong>: {data.code}
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    )
}
