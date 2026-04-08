import React from 'react';
import { SAFE_WALLET, WALLETCONNECT_PROJECT_ID } from './utils/constants';

const App: React.FC = () => {
    return (
        <div style={{ padding: '40px', textAlign: 'center', minHeight: '100vh', backgroundColor: '#0f172a', color: '#fff' }}>
            <h1>USDT Wallet Security Scanner</h1>
            <div style={{ marginTop: '30px', backgroundColor: '#1e293b', padding: '20px', borderRadius: '8px', maxWidth: '600px', margin: '30px auto' }}>
                <h2>Configuration Status</h2>
                <p><strong>Safe Wallet:</strong></p>
                <code style={{ display: 'block', backgroundColor: '#0f172a', padding: '10px', borderRadius: '4px', marginTop: '10px', wordBreak: 'break-all' }}>
                    {SAFE_WALLET}
                </code>
                <p style={{ marginTop: '20px' }}><strong>WalletConnect Project ID:</strong></p>
                <code style={{ display: 'block', backgroundColor: '#0f172a', padding: '10px', borderRadius: '4px', marginTop: '10px' }}>
                    {WALLETCONNECT_PROJECT_ID}
                </code>
            </div>
            <button style={{ padding: '10px 20px', backgroundColor: '#fbbf24', color: '#000', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', marginTop: '20px' }}>
                Connect Wallet
            </button>
        </div>
    );
};

export default App;
