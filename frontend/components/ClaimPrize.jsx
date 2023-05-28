import * as React from 'react';
import Router, { useRouter } from "next/router";
import {ethers, Contract} from 'ethers';
import * as lotteryJson from '../abi/Lottery.json';
import { useSigner } from 'wagmi';

export function ClaimPrize() {
  const [data, setData] = React.useState(null);
  const [isLoading, setLoading] = React.useState(false);
  //const [errorReason, setError] = React.useState(null);
  const { data:signer} = useSigner();
  const router = useRouter();

  let etherscanApi = process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY;
  let lotteryAddress = process.env.NEXT_PUBLIC_LOTTERY_ADDRESS;
  let testnet = process.env.NEXT_PUBLIC_TESTNET;

   const provider = new ethers.providers.EtherscanProvider(testnet, etherscanApi);
   const lotteryContract = new Contract(lotteryAddress, lotteryJson.abi, provider);
   
   async function handleSubmit(e) {
    if(signer){
      e.preventDefault();
      const form = e.target;
      const formData = new FormData(form);
      let amount = formData.get('amount');
      await claimPrize(lotteryContract, signer, amount, setLoading, setData);
      
      
    }else{
      alert("Please connect to a wallet");
      e.preventDefault();
    }
}

    return (
      <div>
        <h2>Claim Tokens</h2>
        <form method="post" onSubmit={handleSubmit}>
              <label>
              Claim Tokens: &nbsp; 
              </label>
              <input name="amount" /> &nbsp; 
              <button type="submit">Claim</button>
          </form>
          { 
            isLoading? <p>Claiming Tokens...</p> : <p></p>
          }
          { 
            data? <p>{data}</p> : <p></p>
          }
          
      </div>
    )
    
  }


 async function claimPrize(contract, signer, amount, setLoading, setData) {
  setLoading(true);
  try {
    const tx = await contract
    .connect(signer)
    .prizeWithdraw(ethers.utils.parseEther(amount));
    const receipt = await tx.wait();
    console.log(`Prize claimed (${receipt.transactionHash})\n`);
    setLoading(false);
    setData(`Prize claimed (${receipt.transactionHash})\n`)
    
  } catch (error) {
    setLoading(false);
    setData(`Couldn't claim the prize`)
  }
  
}
   
 


 