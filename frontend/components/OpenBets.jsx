import * as React from 'react';
import Router, { useRouter } from "next/router";
import {ethers, Contract} from 'ethers';
import { useSigner } from 'wagmi';
import * as lotteryJson from '../abi/Lottery.json';

export function OpenBets() {
  const [data, setData] = React.useState(null);
	const [isLoading, setLoading] = React.useState(false);
  //const [errorReason, setError] = React.useState(null);
  const router = useRouter();
  const { data:signer} = useSigner();

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
      let duration = formData.get('duration');
        
      await openBets(duration, signer, provider, lotteryContract, setData, setLoading);
    }else{
      alert("Please connect to a wallet");
      e.preventDefault();
    }
  
  //console.log(formData.get('selectedProposal')+"  "+formData.get("amount"));
}

    return (
      <div>
        <h2>Open Bets</h2>
        <form method="post" onSubmit={handleSubmit}>
              <label>
              Duration: &nbsp; 
              </label>
              <input name="duration" /> &nbsp; 
              <button type="submit">Open Bets</button>
          </form>
          { 
            isLoading? <p>Opening bets...</p> : <p></p>
          }
          { 
            data? <p>{data}</p> : <p></p>
          }
          
      </div>
    )
    
  }

  async function openBets(duration, signer, provider, contract, setData, setLoading) {
    setLoading(true);
    const currentBlock = await provider.getBlock("latest");
    const tx = await contract.connect(signer).openBets(currentBlock.timestamp + Number(duration));
    const receipt = await tx.wait();
    console.log(`Bets opened (${receipt.transactionHash})`);

    let output = `Bets opened (${receipt.transactionHash})`;
    setData(output);
    setLoading(false);

  }
   
 


 