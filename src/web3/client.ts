import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';
import { erc20ABI } from './erc20ABI';

const web3 = new Web3(
    new Web3.providers.WebsocketProvider("wss://mainnet.infura.io/ws/v3/ff2809ef7851478eaefc9fe4b5539f11"))

export const getEthBalance = async (walletAddress: string): Promise<string> => {
    let balance = web3.eth.getBalance(walletAddress, (Error) => {
        if (Error){
            console.log(Error);
        }
    })
    return balance;
}

export const getBalance = async (tokenAddress: string, walletAddress: string): Promise<number> => {
  const contract = new web3.eth.Contract(erc20ABI, tokenAddress);
  let balance = await getTokenBalanceForContractWithAddress(contract, walletAddress);
  console.log(balance);
  return balance;
}

export const getTokenSymbol = (tokenAddress: string) : Promise<string> => {
  let contract = new web3.eth.Contract(erc20ABI, tokenAddress);
  return getTokenSymbolForContract(contract);
}

export const getTokenName = (tokenAddress: string) : Promise<string> => {
  let contract = new web3.eth.Contract(erc20ABI, tokenAddress);
  return getTokenNameForContract(contract);
}

export const getDecimals = (tokenAddress: string) : Promise<number> => 
  getDecimalsForContract(contractForAddress(tokenAddress)); 

const contractForAddress = (tokenAddress: string) : Contract => 
  new web3.eth.Contract(erc20ABI, tokenAddress);

const getTokenSymbolForContract = (contract: Contract) : Promise<string> => 
 contract.methods.symbol().call();

const getTokenNameForContract = (context: Contract) : Promise<string> =>
 context.methods.name().call();

const getDecimalsForContract = (context: Contract) : Promise<number> => 
  context.methods.decimals().call();

const getTokenBalanceForContractWithAddress = (contract: Contract, address: string): Promise<number> => 
  contract.methods.balanceOf(address).call();
