import * as React from 'react';
import Router, { useRouter } from "next/router";
import {ethers, Contract} from 'ethers';
import * as lotteryJson from '../abi/Lottery.json';
import { useSigner } from 'wagmi';

export function CloseLottery() {
  const [data, setData] = React.useState(null);
  const [isLoading, setLoading] = React.useState(false);
  const { data:signer} = useSigner();
  //const [errorReason, setError] = React.useState(null);
  const router = useRouter();

  let etherscanApi = process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY;
  let lotteryAddress = process.env.NEXT_PUBLIC_LOTTERY_ADDRESS;
  let testnet = process.env.NEXT_PUBLIC_TESTNET;

  
   const provider = new ethers.providers.EtherscanProvider(testnet, etherscanApi);
   const lotteryContract = new Contract(lotteryAddress, lotteryJson.abi, provider);

    return (
      <div>
        <h2>Close Lottery</h2>
        <button onClick={async () => await closeLottery(lotteryContract, signer, setLoading, setData)}>
          Close Lottery
        </button>
          { 
            isLoading? <p>Clossing Lottery...</p> : <p></p>
          }
          { 
            data? <p>{data}</p> : <p></p>
          }
          
      </div>
    )
    
  }


 async function closeLottery(contract, signer, setLoading, setData) {
  setLoading(true);
  const tx = await contract.connect(signer).closeLottery();
  const receipt = await tx.wait();
  setLoading(false);
  console.log(`Bets closed (${receipt.transactionHash})\n`);
  setData(`Bets closed (${receipt.transactionHash})\n`)
}
   
 


 