import { Card } from 'antd';
import 'antd/dist/antd.css';
import './Wallet.css';
import { AddableTable } from './AddableTable';
import React from 'react';

export type WalletProps = {
    address: string;
    ethBalance?: number;
    tokens: Map<string,number>,
    handleAddToken: (tokenAddress: string) => void,
    handleRemoveToken: (tokenAddress: string) => void,
}

export const WalletView = ({address, tokens, handleAddToken, handleRemoveToken} : WalletProps) => {
    return (
    <div className='Wallet'> 
        <Card title={address} className='WalletCard'>
            <AddableTable tokens={tokens} onAdd={handleAddToken} onRemove={handleRemoveToken}/>
        </Card>
    </div>)
};