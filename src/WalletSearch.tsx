import { Input, Button } from 'antd';
import './WalletSearch.css';
import React from 'react';

export interface WalletSearchProps {
    onAddressEntered: (walletAddress: string) => void;
}

export const WalletSearch = ({onAddressEntered} : WalletSearchProps) => {

    const [text, updateText] = React.useState<string | null>(null);

    return <div>
    <Input 
        className='WalletInput' 
        placeholder="enter wallet address" 
        size="large" 
        onChange={(e) => updateText(e.currentTarget.value)}
        onPressEnter={() => onAddressEntered(text!)}/>
    <Button 
        onClick={() => onAddressEntered(text!)}
        size='large'
        className='WalletInputButton'> 
        Load 
    </Button>
    </div>
};