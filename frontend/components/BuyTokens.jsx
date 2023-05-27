import * as React from 'react';
import Router, { useRouter } from "next/router";
import {ethers, Contract} from 'ethers';
import { useSigner } from 'wagmi';
import * as lotteryJson from '../abi/Lottery.json';

export function BuyTokens() {
  const [data, setData] = React.useState(null);
	const [isLoading, setLoading] = React.useState(false);
  const { data:signer} = useSigner();
  const router = useRouter();

  let etherscanApi = process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY;
  let lotteryAddress = process.env.NEXT_PUBLIC_LOTTERY_ADDRESS;
  let tokenRatio = process.env.NEXT_PUBLIC_TOKEN_RATIO;
  let testnet = process.env.NEXT_PUBLIC_TESTNET;

  
   const provider = new ethers.providers.EtherscanProvider(testnet, etherscanApi);
   const lotteryContract = new Contract(lotteryAddress, lotteryJson.abi, provider);

   async function handleSubmit(e) {
    if(signer){
      e.preventDefault();
      const form = e.target;
      const formData = new FormData(form);
      let tokens = formData.get('tokens');
      try {
        await buyTokens(tokens, signer, lotteryContract, tokenRatio, setData, setLoading);
      } catch (error) {
        console.log(`Main Error ${error}`)
        setData(error)
      }
      
    }else{
      alert("Please connect to a wallet");
      e.preventDefault();
    }
}

    return (
      <div>
        <h2>Buy Tokens</h2>
        <form method="post" onSubmit={handleSubmit}>
              <label>
              Tokens: &nbsp; 
              </label>
              <input name="tokens" /> &nbsp; 
              <button type="submit">Buy Tokens</button>
          </form>
          { 
            isLoading? <p>Buying Tokens...</p> : <p></p>
          }
          { 
            data? <p>{data}</p> : <p></p>
          }
          
      </div>
    )
    
  }

  async function buyTokens(tokens, signer, contract, tokenRatio, setData, setLoading) {
    setLoading(true);
    try {
        const tx = await contract.connect(signer).purchaseTokens({
            value: ethers.utils.parseEther(tokens).div(tokenRatio),
          });
          const receipt = await tx.wait();
          setLoading(false);
          console.log(`Tokens bought (${receipt.transactionHash})\n`);
          setData(`Tokens bought (${receipt.transactionHash})\n`);
        
    } catch (error) {
        setData(error.reason);
        console.log(`ERRORRR IS ${error.code}`);
        console.log(`Data IS ${error.data}`);
    }

    // contract.connect(signer).purchaseTokens({
    //     value: ethers.utils.parseEther(tokens).div(tokenRatio),
    //   }).then(async (tx) => {
    //     const receipt = await tx.wait();
    //     console.log(`Tokens bought (${receipt.transactionHash})\n`);
    //     setData(`Tokens bought (${receipt.transactionHash})\n`);
    //   }).catch((err) => {
    //   //  setData(err.code); 
    //    setLoading(false);
    //    console.log(`Error is ${err.code}`);
    //   })
    
  }
   
 


 