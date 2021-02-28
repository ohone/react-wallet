import { Card } from 'antd';
import 'antd/dist/antd.css';
import { AddableTable } from './AddableTable';
import React from 'react';
import { Erc20Token } from './models/Erc20Token';

export type WalletProps = {
    address: string;
    ethBalance: number;
    tokens: [Erc20Token, number][],
    handleAddToken: (tokenAddress: string) => void,
    handleRemoveToken: (tokenAddress: string) => void
}

type TableRow = {
    Symbol: string, 
    Amount: number,
    Key: string,
    Removable: boolean
}

const TokensToRow = (tokens: [Erc20Token, number][]): TableRow[] => 
    tokens.map<TableRow>(o => (
        {
            Symbol: o[0].Ticker, 
            Amount: o[1] / (10 ** o[0].Decimals),
            Key: o[0].ContractAddress,
            Removable: true
        }))

const PrependEthToTable = (rows : TableRow[], ethBalance: number) : TableRow[] => {
    rows.unshift({
        Symbol:"ETH",
        Amount: ethBalance,
        Key: "ETH",
        Removable: false
    })
    return rows;
}

export const WalletView = ({address, ethBalance, tokens, handleAddToken, handleRemoveToken} : WalletProps) => {
    const data = TokensToRow(tokens);
    return (
    <div className='Wallet'> 
        <Card title={address} className='WalletCard'>
            <AddableTable 
                tokens={PrependEthToTable(TokensToRow(tokens), ethBalance)}
                onAdd={handleAddToken} 
                onRemove={handleRemoveToken}
                renderKey={false}/>
        </Card>
    </div>)
};