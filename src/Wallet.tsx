import { Token } from './primitives/Token';
import { List } from 'antd';
import { Input, Col, Row } from 'antd';
import 'antd/dist/antd.css';
import './Wallet.css';

export type WalletTokens = {
    [tokenAddress: string]: number
}

export interface WalletProps {
    address: string;
    ethBalance: string;
    tokens: Map<Token,number>;
    handleAddToken?: (tokenAddress: string) => void;
}

export const Wallet = ({address, ethBalance, tokens, handleAddToken} : WalletProps) => {
    let items = Array.from(tokens);
    return <div className='Wallet'> 
    <List 
        className='TokenList'
        itemLayout="horizontal" 
        dataSource={items} 
        header={address} 
        renderItem={token => (
            <List.Item>
                <List.Item.Meta title={token[0].name} key={token[0].address} />
                <div>{token[1]}</div>
            </List.Item>
    )}>
        <List.Item>
            <List.Item.Meta title={"ETH"} key={"ETH"} />
            <div>{ethBalance}</div>
        </List.Item>
    </List>
    <Input.Group size="large">
        <Row gutter={8}>
            <Col span={5}>
                <Input.Search 
                placeholder="tokenAddress" 
                onSearch={(value) => {if (handleAddToken){ handleAddToken(value)}}} />
            </Col>
        </Row>
    </Input.Group>
    </div>
};