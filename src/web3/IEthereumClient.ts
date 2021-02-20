export interface IEthereumClient{
    getEthBalance(walletAddress: string): Promise<string>;
    getBalance(tokenAddress: string, walletAddress: string): Promise<number>;
    getTokenSymbol(tokenAddress: string) : Promise<string>;
    getTokenName(tokenAddress: string) : Promise<string>;
    getDecimals(tokenAddress: string) : Promise<number>;
  }
  
export interface EthereumClientConstructor{
new () : IEthereumClient
}