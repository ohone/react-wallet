import { Erc20Token } from "../models/Erc20Token";
import { IEthereumClient } from "./IEthereumClient";

export class MockEthereumClient implements IEthereumClient{

    getTokenInfo(tokenAddress: string): Promise<Erc20Token> {
      const token : Erc20Token = {
        ContractAddress: tokenAddress,
        Name: "Token Name",
        Decimals: 0,
        Ticker: "TKN"
      }
      return Promise.resolve(token)
    }
    getEthBalance = (walletAddress: string): Promise<number> => Promise.resolve(123);
    getBalance = (tokenAddress: string, walletAddress: string): Promise<number> => Promise.resolve(300);
    getTokenSymbol = (tokenAddress: string): Promise<string> => Promise.resolve(tokenAddress.substr(0, 3));
    getTokenName = (tokenAddress: string): Promise<string> => Promise.resolve(tokenAddress);
    getDecimals = (tokenAddress: string): Promise<number> => Promise.resolve(1);
  }