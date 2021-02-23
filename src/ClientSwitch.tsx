import { Switch } from 'antd';
import 'antd/dist/antd.css';
import './Wallet.css';
import React from 'react';

export type ClientSwitchProps = {
    onChange: () => void,
    toggleState: boolean
}

export const ClientSwitch = ({onChange, toggleState} : ClientSwitchProps) => {
    return (
    <div className='Wallet'> 
        <Switch defaultChecked={toggleState} checkedChildren={"Live"} unCheckedChildren={"Mock"} onChange={onChange}/>
    </div>)
};