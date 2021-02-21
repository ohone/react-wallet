import { Card } from 'antd';
import 'antd/dist/antd.css';
import './Wallet.css';
import { AddableTable } from './AddableTable';
import React from 'react';

export type WalletProps = {
    address: string;
    ethBalance?: number;
    tokens: Map<string,number>,
    handleAddToken: (tokenAddress: string) => void
}

export const Wallet = ({address, ethBalance, tokens, handleAddToken} : WalletProps) => {
    return (
    <div className='Wallet'> 
        <Card title={address} className='WalletCard'>
            <AddableTable tokens={tokens} onAdd={handleAddToken}/>
        </Card>
    </div>)
};