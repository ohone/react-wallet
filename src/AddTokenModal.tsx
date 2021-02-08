import React, { useState } from 'react';
import Modal from 'react-modal';
import { Alert, Input, Card } from "antd";
import './AddTokenModal.css'

export type AddTokenModalProps = {
    isModalVisible: boolean;
    tryAddToken: (tokenAddress: string) => Promise<void>;
    onRequestClose: () => void;
}

type MessageState = null | 'error' | 'success';

export const AddTokenModal = ({isModalVisible, tryAddToken, onRequestClose}: AddTokenModalProps) => {
    const [message, setMessage] = useState<string | null>(null);

    const GetMessage = (success: boolean, message: string) => {
        return <Alert message={message} type={success ? "success" : "error"}  showIcon/>
    }

    const [messageState, setMessageState] = useState<MessageState>(null);

    let errorMessage;
    switch(messageState){
        case "success":
            errorMessage = GetMessage(true, message!);
            break;
        case "error":
            errorMessage = GetMessage(false, message!);
            break;
    }

    return <Modal 
        className='AddTokenModal'
        contentLabel="add token" 
        isOpen={isModalVisible}
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
        onRequestClose={() => {
            onRequestClose(); 
            setMessageState(null);
            }}>

            {errorMessage}
            <Card title='Add Token'>
                <Input 
                className='AddTokenInput' 
                placeholder='enter token address' 
                size='large' 
                onPressEnter={e => {
                    tryAddToken(e.currentTarget.value)
                    .then(() => {
                        setMessageState("success");
                        setMessage("Done"); 
                    })
                    .catch(err => {
                        setMessageState("error");
                        setMessage(err); 
                    });
                    }}/>
            </Card>
        </Modal>
}