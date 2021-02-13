import { Input, Button } from 'antd';
import './WalletSearch.css';
import React from 'react';

export interface WalletSearchProps {
    onAddressEntered: (walletAddress: string) => Promise<void>;
}

export const WalletSearch = ({onAddressEntered} : WalletSearchProps) => {
    const [text, updateText] = React.useState<string | null>(null);

    const handleAddressEnter = async (text: string | null) : Promise<void> => {
        if (AddressPopulated(text)){
            await onAddressEntered(text!);
        }
    }

    return <div className='WalletInput'>
    <Input 
        placeholder="enter wallet address" 
        size="large" 
        onChange={(e) => updateText(e.currentTarget.value)}
        onPressEnter={async () => await handleAddressEnter(text!)}/>
    <Button 
        onClick={async () => await handleAddressEnter(text!)}
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