import React, { useState } from 'react';
import { Table, Button, Tooltip } from "antd";
import './AddableTable.css'
import { AddItemModal as AddItemModal } from './AddTokenModal';

const columns =[
    {
        title:"Symbol",
        dataIndex:"key",
        key:"key"
    },
    {
        title:"Amount",
        dataIndex:"amount",
        key:"amount"
    }
]

const dataToDataSource = (data: [key: string, count: number][]) => {
    return data.map(item => {
        return  {
            key: item[0],
            amount: item[1]
        }
    })
}

export type AddableTableProps = {
    tokens: [string,number][],
    onAdd: (tokenAddress: string) => void;
}

export const AddableTable = ({tokens, onAdd}: AddableTableProps) => {
    
    const [isModalVisible, setModalVisible] = useState(false);

    const hideModal = () => {
        setModalVisible(false);
    }

    const showModal = () => {
        setModalVisible(true);
    }

    let data = dataToDataSource(tokens);

    return (
    <div>
        <div className="AddableTable">
            {data.length > 0 &&
                <Table 
                pagination={false}
                showHeader={false}
                dataSource={data} 
                columns={columns}/>
            }
            <Tooltip title={"Add Token"} >
                <Button className='AddTokenButton' onMouseDown={showModal} block>+</Button>
            </Tooltip>
        </div>

        {isModalVisible &&
            <AddItemModal 
            onAdd={(token) => {onAdd(token); hideModal();}}
            onRequestClose={hideModal}/>
        }
    </div>)
}