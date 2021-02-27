import React, { useEffect, useState } from 'react';
import { IEthereumClient } from './web3/IEthereumClient';
import { WalletView } from './WalletView';
import { useStickyState } from './utils/Utilities';
import { EthereumWallet } from './models/EthereumWallet';
import { PopulatedWallet } from './models/PopulatedWallet';
import { Erc20Token } from './models/Erc20Token';

export type WalletProps = {
    address: string,
    ethClient: IEthereumClient,
}

export const Wallet = ({ address, ethClient: client }: WalletProps) => {
    const [wallet, setWallet] = useStickyState<EthereumWallet | undefined>(undefined, "savedWallet")

    // initialize wallet
    useEffect(() => {
        let DoWork = async () => {
            if (address && !wallet) {
                await client.getEthBalance(address)
                    .then((balance) => {
                        setWallet(oldWallet => {
                            if (oldWallet) {
                                oldWallet.Balance = balance
                                return oldWallet
                            }
                            const newWallet: EthereumWallet = {
                                Address: address,
                                Balance: balance,
                                TokenAddresses: []
                            }
                            return newWallet
                        })
                    })
                    .catch((err) => { console.log(err) })
            }
        }
        DoWork()
    }, [address])

    const [populatedWallet, setPopulatedWallet] = useState<PopulatedWallet | null>(null)

    // populate populatedWallet from Wallet if set
    useEffect(() => {
        if (wallet) {
            let PopulateTokenBalances = async () => {

                const walletState: PopulatedWallet = populatedWallet ??
                {
                    ...wallet!,
                    TokenBalances: new Map<string, number>()
                }

                const currentTokenBalances = new Map<string, number>(walletState.TokenBalances);
                const currentKeys = Array.from(currentTokenBalances.keys())
                const tokensToRemove = currentKeys.filter(currentKey => wallet.TokenAddresses.filter(newKey => newKey == currentKey).length == 0)

                for (const removedToken of tokensToRemove) {
                    currentTokenBalances.delete(removedToken)
                    walletState.TokenAddresses = walletState.TokenAddresses.filter(o => o != removedToken)
                }

                for (const token of wallet.TokenAddresses) {
                    if (!currentTokenBalances.has(token)) {
                        await client.getBalance(token, walletState.Address)
                            .then(balance => {
                                currentTokenBalances.set(token, balance)
                            })
                            .catch(err => console.log(err))
                    }
                }

                walletState.TokenBalances = currentTokenBalances
                setPopulatedWallet({...walletState});
            }
            PopulateTokenBalances()
        }
    }, [wallet])

    const handleAddToken = (tokenAddress: string): void => {
        if (wallet!.TokenAddresses.some(t => t === tokenAddress)) {
            return
        }
        setWallet(wallet => {
            wallet?.TokenAddresses.push(tokenAddress)
            return { ...wallet! }
        })
    }

    const handleRemoveToken = (tokenAddress: string): void => {
        if (!wallet!.TokenAddresses.some(t => t === tokenAddress)) {
            return
        }
        setWallet(wallet => {
            const newTokenAddresses = wallet!.TokenAddresses.filter(o => o != tokenAddress);
            wallet!.TokenAddresses = newTokenAddresses
            return { ...wallet! }
        })
    }

    
    const [tokenInfos, setTokenInfos] = useState<Erc20Token[]>([]);
    useEffect(() => {
        if (populatedWallet){
            const doWork = async () => {
                const newTokenInfos : Erc20Token[] = [];
                const newTokens = populatedWallet.TokenAddresses.filter(o => tokenInfos.filter(t => t.ContractAddress == o).length == 0);
                for(const token of newTokens){
                    const tokenInfo = await client.getTokenInfo(token);
                    newTokenInfos.push(tokenInfo)
                }
                if (newTokenInfos.length > 0){
                    setTokenInfos(newTokenInfos.concat(tokenInfos));
                }
            }
            doWork()
        }
    }, [populatedWallet])
    
    const tokenBalancesToTokens = (tokenBalances: Map<string,number>) : [Erc20Token, number][] =>  {
        const results : [Erc20Token, number][] = []
        for (const [address, count] of tokenBalances.entries()){
            const tokenInfo = tokenInfos.filter(t => t.ContractAddress == address);
            if (tokenInfo.length > 0){
                results.push([tokenInfo[0], count])
            }
        }
        return results;
    }    

    return (
        <div className='Wallet'>
            {populatedWallet && <WalletView
                address={populatedWallet.Address}
                //ethBalance={ethBalance}
                tokens={tokenBalancesToTokens(populatedWallet.TokenBalances)}
                handleAddToken={handleAddToken}
                handleRemoveToken={handleRemoveToken} />}
        </div>)
};