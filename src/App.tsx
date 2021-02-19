import React, { useEffect, useState } from 'react';
import logo from './eth-diamond-rainbow.png';
import './App.css';
import { Wallet as WalletView } from './WalletView';
import { WalletSearch } from './WalletSearch';
import { Token } from './primitives/Token';
  
function App() {
  const [ethBalance, setEthBalance] = React.useState<number | undefined>(undefined)
  
  const handleAddToken = (tokenAddress : string): void => {
    if (tokens.some(t => t === tokenAddress)){
      return;
    }
    const newTokens = tokens.slice();
    newTokens.push(tokenAddress);
    setTokens(newTokens);
  }
  
  const walletSearch = () => (<WalletSearch onAddressEntered={setAddress}/>);
  
  const walletView = () => (<WalletView 
    address={address!} 
    ethBalance={ethBalance}
    tokens={Array.from(tokenDetails.values())} 
    handleAddToken={(token) => handleAddToken(token)}/>);
    
  const [address, setAddress] = React.useState<string | undefined | null>(null);
  
  useEffect(() => {
      setEthBalance(100);
  }, [address])

  const [tokens, setTokens] = React.useState<string[]>([]);
  const [tokenDetails, setTokenDetails] = useState(new Map<string,[string, number]>());
    
  useEffect(() => {
    const newTokenDetails = new Map<string,[string,number]>(tokenDetails);
    tokens.forEach((value,index) => {
      if (!newTokenDetails.has(value)){
        newTokenDetails.set(value, [value.slice(0,3),100])
      }
    });
    setTokenDetails(newTokenDetails);
  },[tokens]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          <code>Wallet Manager</code>
        </p>
      </header>
          {!address && walletSearch()}
          {address && walletView()}
    </div>
  );
}

export default App;