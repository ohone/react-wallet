import React from 'react'
import { Layout } from "antd";
import './App.css'
import { ImportWalletModal } from './ImportWalletModal'
import { useStickyState } from './utils/Utilities'
import { IEthereumClient } from './web3/IEthereumClient'
import { MockEthereumClient } from './web3/MockEthereumClient'
import { Wallet } from './Wallet'
import { ClientSwitch } from './ClientSwitch'
import { InfuraEthereumClient } from './web3/InfuraEthereumClient'
import { ToolView } from './ToolView';
  
const mockClient : IEthereumClient = new MockEthereumClient()
const client : IEthereumClient = new InfuraEthereumClient();

function App() {
  const [live, setLive] = useStickyState(false, 'live');
  const [address, setAddress] = useStickyState<string | undefined>(undefined, "currentAddress")
  const ToggleClient = () => {
    setLive(!live);
  }
  return (
    <div className="App">
      {!address && <ImportWalletModal onAdd={setAddress}/>}
      <Layout>
        <Layout.Header>
          <div className='header'>
            <div className='sitetitle'>Wallet Manager</div> 
            <ClientSwitch onChange={ToggleClient} toggleState={!live}/>
          </div>
        </Layout.Header>
        <Layout>
          <Layout.Sider width={400}>
            {address && <Wallet 
              address={address} 
              ethClient={live ? mockClient : client}/>}
          </Layout.Sider>
          <Layout.Content>
            <div className='toolview-container'>
              <ToolView/>
            </div>
          </Layout.Content>
        </Layout>
      </Layout>
    </div>
  )
}

export default App