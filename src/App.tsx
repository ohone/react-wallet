import React, { useEffect, useState } from 'react'
import logo from './eth-diamond-rainbow.png'
import './App.css'
import { Wallet as WalletView } from './WalletView'
import { ImportWalletModal } from './ImportWalletModal'
import { useStickyState } from './utils/Utilities'
import { EthereumWallet } from './models/EthereumWallet'
import { InfuraEthereumClient } from './web3/InfuraEthereumClient'
import { IEthereumClient } from './web3/IEthereumClient'
import { PopulatedWallet } from './models/PopulatedWallet'
import { Erc20Token } from './models/Erc20Token'
import { MockEthereumClient } from './web3/MockEthereumClient'
  
const client : IEthereumClient = new MockEthereumClient()

function App() {
  const [wallet, setWallet] = useStickyState<EthereumWallet | undefined>(undefined, "savedWallet")
  const [address, setAddress] = useState<string | undefined>(wallet?.Address ?? undefined)
  const [loadedTokens, setLoadedTokens] = useStickyState<Erc20Token[]>([], "tokens")

  useEffect(() => {
    let DoWork = async () => {
      if (address && !wallet){
        await client.getEthBalance(address)
          .then((balance) => {
            setWallet(oldWallet => 
              {
                if (oldWallet){
                  oldWallet.Balance = balance 
                  return oldWallet
                }
                const newWallet: EthereumWallet = {
                  Address: address,
                  Balance: balance,
                  TokenAddresses: []
                }
                return newWallet
              })
          })
          .catch((err) => {console.log(err)})
      }
    }
    DoWork()
  }, [address])

  const [populatedWallet, setPopulatedWallet] = useState<PopulatedWallet | null>(null)

  // populate populatedWallet from Wallet if set
  useEffect(() => {
    if (wallet){
      let PopulateTokenBalances = async () => {
        const newWallet : PopulatedWallet = populatedWallet ??  
        {
          ...wallet!,
          TokenBalances: new Map<string, number>()
        }

        const newTokenBalances = new Map<string,number>(newWallet.TokenBalances);
        
        for (const token of newWallet.TokenAddresses){
          if (!newTokenBalances.has(token)){
             await client.getBalance(token, newWallet.Address)
                .then(balance => {
                  newTokenBalances.set(token, balance)
                })
                .catch(err => console.log(err))
          }
        }
        newWallet.TokenBalances = newTokenBalances
        return newWallet
      }
      PopulateTokenBalances()
        .then(m => setPopulatedWallet({...m}));
    }
  }, [wallet])

  const handleAddToken = (tokenAddress : string): void => {
    if (wallet!.TokenAddresses.some(t => t === tokenAddress)){
      return
    }
    setWallet(wallet => {
      wallet?.TokenAddresses.push(tokenAddress)
      return { ...wallet! }
    })
  }

  return (
    <div className="App">
      {!address && <ImportWalletModal onAdd={setAddress}/>}
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          <code>Wallet Manager</code>
        </p>
      </header>
          {populatedWallet && <WalletView 
            address={populatedWallet.Address} 
            //ethBalance={ethBalance}
            tokens={populatedWallet.TokenBalances} 
            handleAddToken={(token) => handleAddToken(token)}/>}
    </div>
  )
}

export default App