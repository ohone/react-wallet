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

    const GetMessage = (state: Exclude<MessageState, null>, message: string) => {
        return <Alert message={message} type={state}  showIcon/>
    }

    const [messageState, setMessageState] = useState<MessageState>(null);

    let errorMessage;
    if (messageState){
        errorMessage = GetMessage(messageState, message!);
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
                        setMessage("Done"); 
                        setMessageState("success");
                    })
                    .catch(err => {
                        setMessage(err); 
                        setMessageState("error");
                    });
                    }}/>
            </Card>
        </Modal>
}