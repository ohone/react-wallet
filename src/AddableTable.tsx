import React, { useState } from 'react';
import { Table, Button, Tooltip } from "antd";
import './AddableTable.css'
import { AddItemModal as AddItemModal } from './AddTokenModal';

const columns =[
    {
        title:"Address",
        dataIndex:"Address",
    },
    {
        title:"Amount",
        dataIndex:"Amount",
    },
    {
        title:"Action",
        dataIndex: 'Action',
        render: (_: string, record: DataType ) => {
            const component =  (<a onClick={() => record.onRemove()}>Remove</a>) as React.ReactNode
            return component;
        }
    }
]

interface DataType {
    Key: number,
    Address: string,
    Amount: number,
    onRemove: () => void
}

const dataToDataSource = (data: Map<string,number>, removeHandler: (address: string) => void) : DataType[] => {
    return Array.from(data.keys()).map((item,i) => {
        return {
            Key: i,
            Address: item,
            Amount: data.get(item)!,
            onRemove: () => removeHandler(item)
        }
    })
}

export type AddableTableProps = {
    tokens: Map<string,number>,
    onAdd: (tokenAddress: string) => void;
    onRemove: (tokenAddress: string) => void;
}

export const AddableTable = ({tokens, onAdd, onRemove}: AddableTableProps) => {
    
    const [isModalVisible, setModalVisible] = useState(false);

    const hideModal = () => {
        setModalVisible(false);
    }

    const showModal = () => {
        setModalVisible(true);
    }

    let data = dataToDataSource(tokens, onRemove);

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