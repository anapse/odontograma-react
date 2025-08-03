export default function ToothMap({ patientType = 'child', onToothClick = () => { } }) {
    const teeth = {
        child: {
            top: ['55', '54', '53', '52', '51', '61', '62', '63', '64', '65'],
            bottom: ['75', '74', '73', '72', '71', '81', '82', '83', '84', '85']
        },
        adult: {
            top: ['18', '17', '16', '15', '14', '13', '12', '11', '21', '22', '23', '24', '25', '26', '27', '28'],
            bottom: ['48', '47', '46', '45', '44', '43', '42', '41', '31', '32', '33', '34', '35', '36', '37', '38']
        }
    }

    const current = teeth[patientType]

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
                {current.top.map((tooth) => (
                    <button
                        key={tooth}
                        onClick={() => onToothClick(tooth)}
                        style={{
                            width: 40,
                            height: 40,
                            borderRadius: '50%',
                            backgroundColor: '#ffffff',
                            border: '1px solid #999',
                            fontSize: '0.8rem',
                            cursor: 'pointer'
                        }}
                    >
                        {tooth}
                    </button>
                ))}
            </div>

            <div style={{ width: '100%', height: '2px', background: '#ccc' }} />

            <div style={{ display: 'flex', gap: '0.5rem' }}>
                {current.bottom.map((tooth) => (
                    <button
                        key={tooth}
                        onClick={() => onToothClick(tooth)}
                        style={{
                            width: 40,
                            height: 40,
                            borderRadius: '50%',
                            backgroundColor: '#ffffff',
                            border: '1px solid #999',
                            fontSize: '0.8rem',
                            cursor: 'pointer'
                        }}
                    >
                        {tooth}
                    </button>
                ))}
            </div>
        </div>
    )
}
