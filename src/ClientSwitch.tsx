import { Switch } from 'antd';
import 'antd/dist/antd.css';
import './Wallet.css';
import React from 'react';

export type ClientSwitchProps = {
    onChange: () => void
}

export const ClientSwitch = ({onChange} : ClientSwitchProps) => {
    return (
    <div className='Wallet'> 
        <Switch defaultChecked checkedChildren={"Live"} unCheckedChildren={"Mock"} onChange={onChange}/>
    </div>)
};