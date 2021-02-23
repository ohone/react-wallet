import { Card } from 'antd';
import 'antd/dist/antd.css';
import './Wallet.css';
import { AddableTable } from './AddableTable';
import React from 'react';
import { Erc20Token } from './models/Erc20Token';

export type WalletProps = {
    address: string;
    ethBalance?: number;
    tokens: [Erc20Token, number][],
    handleAddToken: (tokenAddress: string) => void,
    handleRemoveToken: (tokenAddress: string) => void
}

type TableRow = {
    Address: string
    Symbol: string, 
    Amount: number
}

const TokensToRow = (tokens: [Erc20Token, number][]): TableRow[] => 
    tokens.map<TableRow>(o => (
        {
            Symbol: o[0].Ticker, 
            Amount: o[0].Decimals * o[1],
            Address: o[0].ContractAddress
        }))


export const WalletView = ({address, tokens, handleAddToken, handleRemoveToken} : WalletProps) => {

    return (
    <div className='Wallet'> 
        <Card title={address} className='WalletCard'>
            <AddableTable 
                tokens={TokensToRow(tokens)}
                onAdd={handleAddToken} 
                onRemove={handleRemoveToken} 
                idPropAccessor={o => o.Address}/>
        </Card>
    </div>)
};