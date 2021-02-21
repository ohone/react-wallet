import React from 'react';
import Modal from 'react-modal';
import { Alert, Input, Card } from "antd";
import './AddTokenModal.css'

export type ImportWalletModalProps = {
    onAdd: (item: string) => void;
    message?: string;
}

export const ImportWalletModal = ({onAdd, message}: ImportWalletModalProps) => {
    return <Modal 
        className='AddTokenModal'
        contentLabel="add token" 
        ariaHideApp={false}
        isOpen={true}
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}>
            <Alert message={message ?? "Add an ethereum wallet."} type='error' showIcon/>
            <Card title='Add Wallet'>
                <Input 
                className='AddTokenInput' 
                placeholder='enter wallet address' 
                size='large' 
                onPressEnter={e => { onAdd(e.currentTarget.value); }}/>
            </Card>
        </Modal>
}