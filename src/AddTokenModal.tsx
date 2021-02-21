import React from 'react';
import Modal from 'react-modal';
import { Alert, Input, Card } from "antd";
import './AddTokenModal.css'

export type AddItemModalProps = {
    message?: string | undefined,
    onAdd: (item: string) => void;
    onRequestClose: () => void;
}

export const AddItemModal = ({message, onAdd, onRequestClose}: AddItemModalProps) => {
    const GetMessage = (message: string) => {
        return <Alert message={message}  showIcon/>
    }

    let errorMessage;
    if (message){
        errorMessage = GetMessage(message!);
    }

    return <Modal 
        className='AddTokenModal'
        contentLabel="add token" 
        ariaHideApp={false}
        isOpen={true}
        shouldCloseOnOverlayClick={false}
        shouldCloseOnEsc={true}
        onRequestClose={() => {onRequestClose(); }}>
            {errorMessage}
            <Card title='Add Token'>
                <Input 
                className='AddTokenInput' 
                placeholder='enter token address' 
                size='large' 
                onPressEnter={e => { onAdd(e.currentTarget.value); }}/>
            </Card>
        </Modal>
}