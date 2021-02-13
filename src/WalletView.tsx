import { Token } from './primitives/Token';
import { Card } from 'antd';
import 'antd/dist/antd.css';
import './Wallet.css';
import { AddableTable } from './AddableTable';
import React from 'react';

export type WalletProps = {
    address: string;
    ethBalance: string;
    tokens: [token: Token, count: number][],
    handleAddToken: (tokenAddress: string) => Promise<void>
}


export const Wallet = ({address, ethBalance, tokens, handleAddToken} : WalletProps) => {
    return <div className='Wallet'> 
    <Card title={address} className='WalletCard'>
        <AddableTable tokens={tokens} onAdd={handleAddToken}/>
    </Card>
    </div>
};