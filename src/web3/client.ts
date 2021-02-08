import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';
import { erc20ABI } from './erc20ABI';

const web3 = new Web3(
    new Web3.providers.WebsocketProvider("wss://mainnet.infura.io/ws/v3/[key]"))

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
  let balance = await getTokenBalance(contract, tokenAddress);
  console.log(balance);
  return balance;
}

export const getTokenSymbol = (contract: Contract) : Promise<string> => 
 contract.methods.symbol().call();

export const getTokenName = (context: Contract) : Promise<string> =>
 context.methods.name().call();

export const getTokenBalance = (contract: Contract, address: string): Promise<number> => {
  return contract.methods.balanceOf(address).call();
}