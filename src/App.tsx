import React from 'react';
import logo from './eth-diamond-rainbow.png';
import './App.css';
import { Wallet } from './Wallet';
import { WalletSearch } from './WalletSearch';
import { Token } from './primitives/Token';
import { getBalance, getEthBalance } from './web3/client';

function App() {

  const [address, setAddress] = React.useState<string | null>(null);
  const [tokens, setTokens] = React.useState(new Map<Token,number>());
  const [ethBalance, setEthBalance] = React.useState<string | null>(null)

  const handleAddToken = async (tokenAddress : string): Promise<void> => {
    if (Array.from(tokens.keys()).some(item => item.address == tokenAddress)){
      return Promise.reject("token already in wallet")
    }
    
    let token : Token ={
      address: tokenAddress,
      name: tokenAddress
    }

    try{
      let tokenValue = await getBalance(tokenAddress, address!)
      let newMap = new Map<Token,number>(tokens);
      newMap.set(token, tokenValue);
      setTokens(newMap);
      return undefined;
    }
    catch{
      return Promise.reject("error resolving token");
    }
  }

  const handleAddressChange = async (address : string) => {
    let balance = await getEthBalance(address);
    setAddress(address);
    setEthBalance(balance);
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          <code>Wallet Manager</code>
        </p>
      </header>
      <WalletSearch onAddressEntered={t => handleAddressChange(t)}/>
      {address && 
        <Wallet 
        address={address} 
        ethBalance={ethBalance ?? "error"}
        tokens={tokens} 
        handleAddToken={(token) => handleAddToken(token)}/>
      }
    </div>
  );
}

export default App;
