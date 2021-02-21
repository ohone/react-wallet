import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';
import { erc20ABI } from './erc20ABI';
import { IEthereumClient } from './IEthereumClient';

const web3 = new Web3(
    new Web3.providers.WebsocketProvider("wss://mainnet.infura.io/ws/v3/ff2809ef7851478eaefc9fe4b5539f11"))

export class InfuraEthereumClient implements IEthereumClient{
  getEthBalance = async (walletAddress: string): Promise<number> => {
    let balance = web3.eth.getBalance(walletAddress, (Error) => {
        if (Error){
            console.log(Error);
        }
    })
    return Number(balance);
  }

  getBalance = async (tokenAddress: string, walletAddress: string): Promise<number> => {
    const contract = new web3.eth.Contract(erc20ABI, tokenAddress);
    let balance = await this.getTokenBalanceForContractWithAddress(contract, walletAddress);
    console.log(balance);
    return balance;
  }

  getTokenSymbol = (tokenAddress: string) : Promise<string> => {
    let contract = new web3.eth.Contract(erc20ABI, tokenAddress);
    return this.getTokenSymbolForContract(contract);
  }

  getTokenName = (tokenAddress: string) : Promise<string> => {
    let contract = new web3.eth.Contract(erc20ABI, tokenAddress);
    return this.getTokenNameForContract(contract);
  }

  getDecimals = (tokenAddress: string) : Promise<number> => 
    this.getDecimalsForContract(this.contractForAddress(tokenAddress)); 

  contractForAddress = (tokenAddress: string) : Contract => 
    new web3.eth.Contract(erc20ABI, tokenAddress);

  getTokenSymbolForContract = (contract: Contract) : Promise<string> => 
  contract.methods.symbol().call();

  getTokenNameForContract = (context: Contract) : Promise<string> =>
  context.methods.name().call();

  getDecimalsForContract = (context: Contract) : Promise<number> => 
    context.methods.decimals().call();

  getTokenBalanceForContractWithAddress = (contract: Contract, address: string): Promise<number> => 
    contract.methods.balanceOf(address).call();
}