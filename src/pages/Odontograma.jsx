import React, { useState } from "react"
import ToothModal from "../components/ToothModal"
import '../styles/Odontograma.css'
import DiagnosisCards from "../components/DiagnosisCards"
import FacturacionPanel from "../components/FacturacionPanel"
import Teeth from "../components/Teeth"



const Odontograma = () => {
    const [isAdult, setIsAdult] = useState(true)
    const [mirrorView, setMirrorView] = useState(false)
    const [selectedTooth, setSelectedTooth] = useState(null)
    const [diagnosisData, setDiagnosisData] = useState({})

    const handleToothClick = (toothId) => {
        setSelectedTooth(toothId)
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
            <Teeth isAdult={isAdult} handleToothClick={handleToothClick} diagnosisData={diagnosisData} />




            {selectedTooth && (
                <ToothModal
                    toothId={selectedTooth}
                    diagnosis={diagnosisData[selectedTooth] || {}}

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
            <DiagnosisCards
                diagnosisData={diagnosisData}

                onDelete={(toothId) => {
                    setDiagnosisData(prev => {
                        const newData = { ...prev }
                        delete newData[toothId]
                        return newData
                    })
                }}
                onCardClick={(toothId) => setSelectedTooth(toothId)}
            />
            <FacturacionPanel diagnosisData={diagnosisData} />
        </div>
    )
}

export default Odontograma
