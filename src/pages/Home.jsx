import { Link } from 'react-router-dom'

export default function Home() {
    return (
        <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
            <h1>🦷 Sistema Odontológico</h1>
            <p>Bienvenido. Selecciona una opción:</p>

            <div style={{ marginTop: '1.5rem' }}>
                <Link
                    to="/odontograma"
                    style={{
                        padding: '0.8rem 1.5rem',
                        backgroundColor: '#0984e3',
                        color: '#fff',
                        borderRadius: '8px',
                        textDecoration: 'none',
                        fontSize: '1.1rem'
                    }}
                >
                    Ir al Odontograma
                </Link>
            </div>
        </div>
    )
}
