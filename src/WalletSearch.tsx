import { Input, Button } from 'antd';
import './WalletSearch.css';
import React from 'react';

export interface WalletSearchProps {
    onAddressEntered: (walletAddress: string) => void;
}

export const WalletSearch = ({onAddressEntered} : WalletSearchProps) => {
    const [text, updateText] = React.useState<string | null>(null);

    const handleAddressEnter = (text: string | null) : void => {
        if (AddressPopulated(text)){
            onAddressEntered(text!);
        }
    }

    return <div className='WalletInput'>
    <Input 
        placeholder="enter wallet address" 
        size="large" 
        onChange={(e) => updateText(e.currentTarget.value)}
        onPressEnter={() => handleAddressEnter(text!)}/>
    <Button 
        onClick={() => handleAddressEnter(text!)}
        size='large'> 
        Load 
    </Button>
    </div>
};

const AddressPopulated = (text: string | null) : boolean => {
    if (text === null){
        return false;
    };
    return text.length > 0;
}