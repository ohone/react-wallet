import React from 'react'
import logo from './eth-diamond-rainbow.png'
import './App.css'
import { ImportWalletModal } from './ImportWalletModal'
import { useStickyState } from './utils/Utilities'
import { IEthereumClient } from './web3/IEthereumClient'
import { MockEthereumClient } from './web3/MockEthereumClient'
import { Wallet } from './Wallet'
  
const client : IEthereumClient = new MockEthereumClient()

function App() {
  const [address, setAddress] = useStickyState<string | undefined>(undefined, "currentAddress")

  return (
    <div className="App">
      {!address && <ImportWalletModal onAdd={setAddress}/>}
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          <code>Wallet Manager</code>
        </p>
      </header>
          {address && <Wallet 
            address={address} 
            ethClient={client}/>}
    </div>
  )
}

export default App