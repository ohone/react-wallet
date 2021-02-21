import { IEthereumClient } from "./IEthereumClient";

export class MockEthereumClient implements IEthereumClient{
    getEthBalance = (walletAddress: string): Promise<number> => Promise.resolve(123);
    getBalance = (tokenAddress: string, walletAddress: string): Promise<number> => Promise.resolve(300);
    getTokenSymbol = (tokenAddress: string): Promise<string> => Promise.resolve(tokenAddress.substr(0, 3));
    getTokenName = (tokenAddress: string): Promise<string> => Promise.resolve(tokenAddress);
    getDecimals = (tokenAddress: string): Promise<number> => Promise.resolve(1);
  }