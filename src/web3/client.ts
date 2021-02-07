import Web3 from 'web3';
const web3 = new Web3(
    new Web3.providers.WebsocketProvider("wss://mainnet.infura.io/ws/v3/ff2809ef7851478eaefc9fe4b5539f11"))

const miniABI: any = [
    // balanceOf
    {
      "constant":true,
      "inputs":[{"name":"_owner", "type":"address"}],
      "name":"balanceOf",
      "outputs":[{"name":"balance","type":"uint256"}],
      "type":"function"
    },
    // decimals
     {
      "constant":true,
      "inputs":[],
      "name":"decimals",
      "outputs":[{"name":"","type":"uint8"}],
      "type":"function"
    } 
  ]
  
export const getEthBalance = async (walletAddress: string): Promise<string> => {
    let balance = web3.eth.getBalance(walletAddress, (Error) => {
        if (Error){
            console.log(Error);
        }
    })
    return balance;
}

export const getBalance = async (tokenAddress: string, walletAddress: string): Promise<number> => {
    const contract = new web3.eth.Contract(miniABI, tokenAddress);
    const balance = await contract.methods.balanceOf(walletAddress).call();
    console.log(balance);
    return balance;
  }