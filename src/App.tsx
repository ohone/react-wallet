import React, { useEffect } from 'react';
import logo from './eth-diamond-rainbow.png';
import './App.css';
import { Wallet } from './Wallet';
import { WalletSearch } from './WalletSearch';
import { Token } from './primitives/Token';
import { 
  getBalance, 
  getEthBalance, 
  getTokenName, 
  getTokenSymbol,
  getDecimals } from './web3/client';

function App() {

  const sw = navigator.serviceWorker;

  
  const [address, setAddress] = React.useState<string | null>(null);
  const [tokens, setTokens] = React.useState(new Map<Token,number>());
  const [ethBalance, setEthBalance] = React.useState<string | null>(null)

  useEffect(() => {
    if (sw){
      window.addEventListener( 'load', () => {
        sw.register('./service-worker.ts' )
        .then(() => sw.ready)
        .then( () => {
          sw.addEventListener( 'message' , ( { data } ) => {
            if ( data?.state !== undefined ){
              setAddress( data.state );
            }
          })
        })
      })
    }
  }, [setAddress, sw])

  const stateToServiceWorker = (data : string) => {
    if (sw.controller){
      sw.controller.postMessage(data);
    }
  }

  const handleAddToken = async (tokenAddress : string): Promise<void> => {
    if (Array.from(tokens.keys()).some(item => item.address == tokenAddress)){
      return Promise.reject("token already in wallet")
    }
    
    try{
      let newMap = new Map<Token,number>(tokens);
      let token : Token = {
        name: await getTokenName(tokenAddress),
        symbol: await getTokenSymbol(tokenAddress),
        decimals: await getDecimals(tokenAddress),
        address: tokenAddress
      };
      let tokenValue = transformBalance(await getBalance(tokenAddress, address!), token.decimals);
      newMap.set(token, tokenValue);
      setTokens(newMap);
    }
    catch{
      return Promise.reject("error resolving token");
    }
  }

  const handleAddressChange = async (address : string) => {
    let balance = await getEthBalance(address);
    stateToServiceWorker(address);
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

const transformBalance = (balance: number, decimals: number) : number => {
  return balance / (10**decimals);
}