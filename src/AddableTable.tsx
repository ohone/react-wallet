import React, { useState } from 'react';
import { Table, Button, Input } from "antd";
import { Modal } from 'react-modal';
import { Token } from './primitives/Token';

const columns =[
    {
        title:"Symbol",
        dataIndex:"symbol",
        key:"symbol"
    },
    {
        title:"Amount",
        dataIndex:"amount",
        key:"amount"
    }
]

const dataToDataSource = (data: Map<Token,number>) => {
    let items = Array.from(data);
    return items.map(item => {
        return  {
            symbol: item[0].name,
            amount: item[1]
        }
    })
}


export type AddableTableProps = {
    tokens: Map<Token,number>,
    addToken: (tokenAddress: string) => Promise<boolean>;
}

export const AddableTable = ({tokens, addToken: tryAddToken}: AddableTableProps) => {
    
    const [isModalVisible, setModalVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const handleModalCancel = () => {
        setModalVisible(false);
    }

    const handleModalSubmit = () => {

    }

    return <div className="AddableTable">
        <Table 
        dataSource={dataToDataSource(tokens)} 
        columns={columns}/>
        <Button onClick={() => setModalVisible(true)}>Add Token</Button>
        <Modal 
        title="add token" 
        visible={isModalVisible}
        confirmLoading={confirmLoading}    
        onOk={} 
        onCancel={handleModalCancel}>
            <Input 
            className='AddTokenInput' 
            placeholder='enter token address' 
            size='large' 
            onPressEnter={e => {
                tryAddToken(e.currentTarget.value)
                }}/>
        </Modal>
    </div>
}