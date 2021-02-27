import React, { useState } from 'react';
import { Table, Button, Tooltip } from "antd";
import './AddableTable.css'
import { AddItemModal as AddItemModal } from './AddTokenModal';

type rowDefinition = ({
    title: string;
    dataIndex: string;
    render?: ((_: string, record: Removable) => React.ReactNode);
});

const GetColumnDefinition = <T,>(items: T[], renderKey?: boolean) : rowDefinition[] => {
    const allObjectProperties = Object.keys(items[0]);
    const filteredHeaders = renderKey 
        ? allObjectProperties
        : allObjectProperties.filter(o => o != 'Key') 

    const objectFields = filteredHeaders
    .map<rowDefinition>(key => ({
        title: key,
        dataIndex: key
    }));

    objectFields.push({
        title: "Action",
        dataIndex: "Action",
        render:(_: string, record: Removable ) => {
            return (<a onClick={() => record.onRemove()}>Remove</a>) as React.ReactNode
        }
    });

    return objectFields;
}

interface Removable {
    onRemove: () => void
}

export type AddableTableProps<T> = {
    tokens: T[],
    onAdd: (identifier: string) => void,
    onRemove: (identifier: string) => void,
    renderKey?: boolean
}

type onlyStringKeys<T> = {
    [K in keyof T]: T[K] extends string ? K : never
}[keyof T];

export const AddableTable = <T extends {Key: string}>({tokens, onAdd, onRemove, renderKey}: AddableTableProps<T>) => {
    
    const [isModalVisible, setModalVisible] = useState(false);
    
    const data = tokens.map<T & Removable>(o => {
        return {
            ...o,
            onRemove: () => onRemove(o.Key)
        }
    })
    
    return (
    <div>
        <div className="AddableTable">
            {data.length > 0 &&
                <Table 
                pagination={false}
                showHeader={false}
                dataSource={data} 
                columns={GetColumnDefinition(tokens,renderKey)}/>
            }
            <Tooltip title={"Add Token"} >
                <Button className='AddTokenButton' onMouseDown={() => setModalVisible(true)} block>+</Button>
            </Tooltip>
        </div>

        {isModalVisible &&
            <AddItemModal 
            onAdd={(token) => {
                onAdd(token);
                setModalVisible(false)
            }}
            onRequestClose={() => setModalVisible(false)}/>
        }
    </div>)
}