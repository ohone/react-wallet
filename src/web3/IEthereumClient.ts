import { Erc20Token } from "../models/Erc20Token";

export interface IEthereumClient{
  getEthBalance(walletAddress: string): Promise<number>;
  getBalance(tokenAddress: string, walletAddress: string): Promise<number>;
  getTokenSymbol(tokenAddress: string) : Promise<string>;
  getTokenName(tokenAddress: string) : Promise<string>;
  getDecimals(tokenAddress: string) : Promise<number>;
  getTokenInfo(tokenAddress: string) : Promise<Erc20Token>;
}
  
export interface EthereumClientConstructor{
  new () : IEthereumClient
}