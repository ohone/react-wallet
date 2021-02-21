import React, { useEffect, useState } from 'react'
import logo from './eth-diamond-rainbow.png'
import './App.css'
import { ImportWalletModal } from './ImportWalletModal'
import { useStickyState } from './utils/Utilities'
import { EthereumWallet } from './models/EthereumWallet'
import { InfuraEthereumClient } from './web3/InfuraEthereumClient'
import { IEthereumClient } from './web3/IEthereumClient'
import { PopulatedWallet } from './models/PopulatedWallet'
import { Erc20Token } from './models/Erc20Token'
import { MockEthereumClient } from './web3/MockEthereumClient'
import { Wallet } from './Wallet'
  
const client : IEthereumClient = new MockEthereumClient()

function App() {
  const [address, setAddress] = useStickyState<string | undefined>(undefined, "currentAddress")
  const [loadedTokens, setLoadedTokens] = useStickyState<Erc20Token[]>([], "tokens")

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