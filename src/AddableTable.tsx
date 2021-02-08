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

const dataToDataSource = (data: Map<Token,number>) => {
    let items = Array.from(data);
    return items.map(item => {
        return  {
            symbol: item[0].symbol,
            amount: item[1]
        }
    })
}

export type AddableTableProps = {
    tokens: Map<Token,number>,
    addToken: (tokenAddress: string) => Promise<void>;
}

export const AddableTable = ({tokens, addToken: tryAddToken}: AddableTableProps) => {
    
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
            dataSource={dataToDataSource(tokens)} 
            columns={columns}/>
        }
        <Tooltip title={"Add Token"} >
            <Button className='AddTokenButton' onClick={showModal} block>+</Button>
        </Tooltip>
        <AddTokenModal 
        isModalVisible={isModalVisible} 
        tryAddToken={tryAddToken}
        onRequestClose={hideModal}/>
    </div>
}