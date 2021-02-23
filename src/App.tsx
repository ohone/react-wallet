import React from 'react'
import logo from './eth-diamond-rainbow.png'
import './App.css'
import { ImportWalletModal } from './ImportWalletModal'
import { useStickyState } from './utils/Utilities'
import { IEthereumClient } from './web3/IEthereumClient'
import { MockEthereumClient } from './web3/MockEthereumClient'
import { Wallet } from './Wallet'
import { ClientSwitch } from './ClientSwitch'
import { InfuraEthereumClient } from './web3/InfuraEthereumClient'
  
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
      <ClientSwitch onChange={ToggleClient} toggleState={!live}/>
      {!address && <ImportWalletModal onAdd={setAddress}/>}
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          <code>Wallet Manager</code>
        </p>
      </header>
          {address && <Wallet 
            address={address} 
            ethClient={live ? mockClient : client}/>}
    </div>
  )
}

export default App