import React, { ReactComponentElement, useEffect } from 'react';
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
import { Route, RouteComponentProps, BrowserRouter, useHistory, Switch, useLocation, useParams } from 'react-router-dom';

function App() {

  const sw = navigator.serviceWorker;

  const [address, setAddress] = React.useState<string | null>(null);
  const [tokens, setTokens] = React.useState(new Map<Token,number>());
  const [ethBalance, setEthBalance] = React.useState<string | null>(null)

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
    history.push(address);
    setAddress(address);
    setEthBalance(balance);
  }
  const history = useHistory();
  const walletSearch = () => (<WalletSearch onAddressEntered={t => handleAddressChange(t)}/>);
  const walletView = 
  (address: string) => (<Wallet 
    address={address!} 
    ethBalance={ethBalance ?? "error"}
    tokens={tokens} 
    handleAddToken={(token) => handleAddToken(token)}/>);

  const location = useLocation();
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          <code>Wallet Manager</code>
        </p>
      </header>
        <Switch>
          <Route exact path='/' component={walletSearch}/>
          <Route path='/:walletId' render={() => walletView(location.pathname.substring(1))}/>
        </Switch>
    </div>
  );
}

export default App;

const transformBalance = (balance: number, decimals: number) : number => {
  return balance / (10**decimals);
}