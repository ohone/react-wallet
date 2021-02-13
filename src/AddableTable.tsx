import React, { useState } from 'react';
import { Table, Button, Tooltip } from "antd";
import { Token } from './primitives/Token';
import './AddableTable.css'
import { AddTokenModal } from './AddTokenModal';

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

const dataToDataSource = (data: [Token,number][]) => {
    return data.map(item => {
        return  {
            symbol: item[0].symbol,
            amount: item[1]
        }
    })
}

export type AddableTableProps = {
    tokens: [Token,number][],
    onAdd: (tokenAddress: string) => Promise<void>;
}

export const AddableTable = ({tokens, onAdd: onAddToken}: AddableTableProps) => {
    
    const [isModalVisible, setModalVisible] = useState(false);

    const hideModal = () => {
        setModalVisible(false);
    }

    const showModal = () => {
        setModalVisible(true);
    }

    let data = dataToDataSource(tokens);

    return <div className="AddableTable">
        {data.length > 0 &&
            <Table 
            pagination={false}
            showHeader={false}
            dataSource={data} 
            columns={columns}/>
        }
        <Tooltip title={"Add Token"} >
            <Button className='AddTokenButton' onClick={showModal} block>+</Button>
        </Tooltip>
        <AddTokenModal 
        isModalVisible={isModalVisible} 
        onAdd={onAddToken}
        onRequestClose={hideModal}/>
    </div>
}