import { Switch } from 'antd';
import React from 'react';

export type ClientSwitchProps = {
    onChange: () => void,
    toggleState: boolean
}

export const ClientSwitch = ({onChange, toggleState} : ClientSwitchProps) => {
    return (
    <div className='switch'> 
        <Switch defaultChecked={toggleState} checkedChildren={"Live"} unCheckedChildren={"Mock"} onChange={onChange}/>
    </div>)
};