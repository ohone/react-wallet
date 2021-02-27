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
    Symbol: string, 
    Amount: number,
    Key: string,
}

const TokensToRow = (tokens: [Erc20Token, number][]): TableRow[] => 
    tokens.map<TableRow>(o => (
        {
            Symbol: o[0].Ticker, 
            Amount: o[1] / (10 ** o[0].Decimals),
            Key: o[0].ContractAddress
        }))

        // we should be passing the real number to the table, for sorting to be accurate.
        // pass some indicator to the table of precision to be display instead of calculating this here.
const BalanceToDisplayBalance = (balance: number, exponent: number, decimalPlaces: number) : string => {
    const modifier = 10 ** exponent;
    const postDecimal = balance % (modifier);
    const preDecimal = ~~(balance / modifier)
    return preDecimal.toString() + "." + postDecimal.toString().substr(0,decimalPlaces);
}

export const WalletView = ({address, tokens, handleAddToken, handleRemoveToken} : WalletProps) => {
    const data = TokensToRow(tokens);
    return (
    <div className='Wallet'> 
        <Card title={address} className='WalletCard'>
            <AddableTable 
                tokens={TokensToRow(tokens)}
                onAdd={handleAddToken} 
                onRemove={handleRemoveToken}
                renderKey={false}/>
        </Card>
    </div>)
};