import React, { useMemo, useState } from "react"
import "../styles/facturacion.css"

const FacturacionPanel = ({ diagnosisData }) => {
    const [tipoCosto, setTipoCosto] = useState("")

    const tratamientos = useMemo(() =>
        Object.entries(diagnosisData).flatMap(([toothId, data]) =>
            (data.treatments || []).map(t => ({
                pieza: toothId,
                diagnostico: data.diagnosis || '',
                tratamiento: t.nombre,
                costo: t.costo,
            }))
        )
        , [diagnosisData])

    const total = useMemo(() => {
        const subtotal = tratamientos.reduce((sum, t) => sum + t.costo, 0)
        const igv = subtotal * 0.18
        const total = subtotal + igv
        return { subtotal, igv, total }
    }, [tratamientos])

    if (tratamientos.length === 0) {
        return null // no se muestra nada si no hay tratamientos
    }

    return (
        <div className="facturacion-panel">
            <h2 className="facturacion-titulo">Facturación</h2>

            <table className="facturacion-tabla">
                <thead>
                    <tr>
                        <th>Pieza</th>
                        <th>Diagnóstico</th>
                        <th>Tratamiento</th>
                        <th>Costo</th>
                    </tr>
                </thead>
                <tbody>
                    {tratamientos.map((t, i) => (
                        <tr key={i}>
                            <td>{t.pieza}</td>
                            <td>{t.diagnostico}</td>
                            <td>{t.tratamiento}</td>
                            <td>S/. {t.costo.toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="facturacion-total tarjeta-total">
                <p>Subtotal: <span>S/. {total.subtotal.toFixed(2)}</span></p>
                <p>IGV (18%): <span>S/. {total.igv.toFixed(2)}</span></p>
                <p className="total-final">Total: <strong>S/. {total.total.toFixed(2)}</strong></p>
            </div>

            <div className="facturacion-costotipo">
                <label htmlFor="tipoCosto">Tipo de Costo:</label>
                <select
                    id="tipoCosto"
                    value={tipoCosto}
                    onChange={(e) => setTipoCosto(e.target.value)}
                >
                    <option value="">Seleccionar</option>
                    <option value="particular">Particular</option>
                    <option value="seguro">Seguro</option>
                    <option value="otro">Otro</option>
                </select>
            </div>
        </div>
    )
}

export default FacturacionPanel
