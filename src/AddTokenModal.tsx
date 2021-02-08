import React, { useState } from 'react';
import Modal from 'react-modal';
import { Alert, Input, Card } from "antd";
import './AddTokenModal.css'

export type AddTokenModalProps = {
    isModalVisible: boolean;
    tryAddToken: (tokenAddress: string) => Promise<void>;
    onRequestClose: () => void;
}

export const AddTokenModal = ({isModalVisible, tryAddToken, onRequestClose}: AddTokenModalProps) => {
    
    const [isErrorVisible, setErrorVisible] = useState(false);
    const [isSuccessVisible, setSuccessVisible] = useState(false);
    
    const [message, setMessage] = useState<string | null>(null);

    const GetMessage = (success: boolean, message: string) => {
        return <Alert message={message} type={success ? "success" : "error"}  showIcon/>
    }

    return <Modal 
        className='AddTokenModal'
        contentLabel="add token" 
        isOpen={isModalVisible}
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
        onRequestClose={() => {
            onRequestClose(); 
            setErrorVisible(false); 
            setSuccessVisible(false);
            }}>
            {isSuccessVisible &&
                GetMessage(true, message!)
            }
            {isErrorVisible &&
                GetMessage(false, message!)
            }
            <Card title='Add Token'>
                <Input 
                className='AddTokenInput' 
                placeholder='enter token address' 
                size='large' 
                onPressEnter={e => {
                    tryAddToken(e.currentTarget.value)
                    .then(() => {
                        setErrorVisible(false);
                        setMessage("Done"); 
                        setSuccessVisible(true);
                    })
                    .catch(err => {
                        setSuccessVisible(false);
                        setMessage(err); 
                        setErrorVisible(true);
                    });
                    }}/>
            </Card>
        </Modal>
}