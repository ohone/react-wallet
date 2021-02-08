import { useState } from 'react';
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
    
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const GetSuccessMessage = () => 
        <Alert message={successMessage} type="success" showIcon/>
    const GetErrorMessage = () => 
        <Alert message={errorMessage} type="error" showIcon/>
    
    return <Modal 
        className='AddTokenModal'
        contentLabel="add token" 
        isOpen={isModalVisible}
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
        onRequestClose={onRequestClose}>
            {isSuccessVisible &&
                GetSuccessMessage()
            }
            {isErrorVisible &&
                GetErrorMessage()
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
                        setSuccessMessage("Done"); 
                        setSuccessVisible(true);
                    })
                    .catch(err => {
                        setSuccessVisible(false);
                        setErrorMessage(err); 
                        setErrorVisible(true);
                    });
                    }}/>
            </Card>
        </Modal>
}