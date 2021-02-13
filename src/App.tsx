import React, { useEffect, useState } from 'react';
import logo from './eth-diamond-rainbow.png';
import './App.css';
import { Wallet as WalletView } from './WalletView';
import { WalletSearch } from './WalletSearch';
import { Token } from './primitives/Token';
import { Location, History } from 'history';
import { 
  getBalance, 
  getTokenName, 
  getTokenSymbol,
  getDecimals } from './web3/client';
  import { Route, useHistory, Switch, useLocation, useParams } from 'react-router-dom';
  
function App() {
    
  const location = useLocation();
  const history = useHistory();

  const [address, setAddress] = React.useState<string | undefined>(undefined);
  const [ethBalance, setEthBalance] = React.useState<string | null>(null)
  const [tokenDetails, setTokenDetails] = useState(new Map<string,[Token, number]>());
  
  const handleAddressChange = async (address : string | undefined) => {
    updateUrlFromState(parseAddress(location), history, address, tokenDetails);
    await updateStateFromUrl(parseAddress(location));
  }
  
  const handleAddToken = async (tokenAddress : string): Promise<void> => {
    if (tokenDetails.has(tokenAddress)){
      return Promise.reject("token already in wallet")
    }
    const newTokenDetails = await getTokenDetails(tokenAddress, address!);
    tokenDetails.set(tokenAddress, newTokenDetails);
    updateUrlFromState(parseAddress(location), history, undefined, tokenDetails);
    await updateStateFromUrl(parseAddress(location));
  }
  
  const getTokenDetails = async (tokenAddress : string, walletAddress: string): Promise<[Token,number]> => {
    try{
      let token : Token = {
        name: await getTokenName(tokenAddress),
        symbol: await getTokenSymbol(tokenAddress),
        decimals: await getDecimals(tokenAddress),
        address: tokenAddress
      };
      let tokenValue = transformBalance(await getBalance(tokenAddress, walletAddress), token.decimals);
      return [token, tokenValue];
    }
    catch(err){
      return Promise.reject("error resolving token" + tokenAddress);
    }
  }
  
  const updateStateFromUrl = async (urlState: QueryModel) : Promise<void> => {
    if (address !== urlState.walletAddress){
      setAddress(urlState.walletAddress)
    }
    
    var newTokenState = new Map<string,[Token,number]>(tokenDetails);
    if (urlState.walletAddress){
      for(var token of urlState.tokens){
        if (!newTokenState.has(token)){
          newTokenState.set(token, await getTokenDetails(token, urlState.walletAddress));
          setTokenDetails(newTokenState);
        }
      }
    }
  };

  const updateUrlFromState = (addressState: QueryModel, history : History<unknown>, address: string | undefined, tokenDetails: Map<string,[Token,number]>) : void => {

    const newAddress = addressState.walletAddress !== address ? address : undefined;

    var newTokens : string[] = addressState.tokens;

    Array.from(tokenDetails.keys()).forEach(k => {
      if (!addressState.tokens.includes(k)){
        newTokens.push(k);
      }
    })

    history.push({pathname: newAddress, search: newTokens.length > 0 ? 'tokens=' + newTokens.toString() : undefined})
  }

  

  updateStateFromUrl(parseAddress(location));
  const walletSearch = () => (<WalletSearch onAddressEntered={t => handleAddressChange(t)}/>);

  const walletView = () => (<WalletView 
    address={address!} 
    ethBalance={ethBalance ?? "error"}
    tokens={Array.from(tokenDetails.values())} 
    handleAddToken={(token) => handleAddToken(token)}/>);
  
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
          <Route path='/:walletId' render={() => walletView()}/>
        </Switch>
    </div>
  );
}

type QueryModel = {
  tokens: string[],
  walletAddress: string | undefined
}

const parseAddress = (location: Location<unknown>): QueryModel => {
  const queryString = location.search;
  var pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');

  var queryTokens = [] as string[];
  for (var i = 0; i < pairs.length; i++) {
      const paramAndValues = pairs[i].split('=');
      const paramName = paramAndValues[0];
      switch(paramName){
        case "tokens":
          queryTokens = paramAndValues[1].split(',')
          break;
      }
  }

  const path = location.pathname.substring(1);
  return { 
    tokens: queryTokens,
    walletAddress: path.length > 0 ? path : undefined
  };
}

const transformBalance = (balance: number, decimals: number) : number => {
  return balance / (10**decimals);
}

export default App;