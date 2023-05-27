import * as React from 'react';
import Router, { useRouter } from "next/router";
import {ethers, Contract} from 'ethers';
import * as lotteryJson from '../abi/Lottery.json';

export function CheckState() {
  const [data, setData] = React.useState(null);
	const [isLoading, setLoading] = React.useState(false);
  //const [errorReason, setError] = React.useState(null);
  const router = useRouter();

  let etherscanApi = process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY;
  let lotteryAddress = process.env.NEXT_PUBLIC_LOTTERY_ADDRESS;
  let testnet = process.env.NEXT_PUBLIC_TESTNET;

  
   const provider = new ethers.providers.EtherscanProvider(testnet, etherscanApi);
   const lotteryContract = new Contract(lotteryAddress, lotteryJson.abi, provider);

    return (
      <div>
        <h2>Checking State</h2>
        <button onClick={async () => await checkState(lotteryContract, provider, setLoading, setData)}>
          Check State
        </button>
          { 
            isLoading? <p>Checking the state...</p> : <p></p>
          }
          { 
            data? <p>{data}</p> : <p></p>
          }
          
      </div>
    )
    
  }

 async function delegate(signer, tokenContract, setLoading, setTxData, setError){
  if(signer){
    setLoading(true);
    tokenContract.connect(signer).delegate(signer._address)
       .then((data) => {
         setTxData(data);
         setLoading(false);
         console.log("Delegation Done!");
         console.log(data);
       }).catch((err) => {
          setError(err.reason); 
          setLoading(false);
          console.log(err);
       });
  }else{
    alert("Please connect to a wallet");
  }
   
 }

 async function checkState(contract, provider, setLoading, setData) {
  setLoading(true);
  const state = await contract.betsOpen();
  console.log(`The lottery is ${state ? "open" : "closed"}\n`);
  let output = `The lottery is ${state ? "open" : "closed"}\n`;
  setData(state);
  setLoading(false);
  if (!state) return;
  const currentBlock = await provider.getBlock("latest");
  const currentBlockDate = new Date(currentBlock.timestamp * 1000);
  const closingTime = await contract.betsClosingTime();
  const closingTimeDate = new Date(closingTime.toNumber() * 1000);
  console.log(
    `The last block was mined at ${currentBlockDate.toLocaleDateString()} : ${currentBlockDate.toLocaleTimeString()}\n`
  );
  console.log(
    `lottery should close at ${closingTimeDate.toLocaleDateString()} : ${closingTimeDate.toLocaleTimeString()}\n`
  );
  output = `The last block was mined at ${currentBlockDate.toLocaleDateString()} : ${currentBlockDate.toLocaleTimeString()}\n`;
  output += `lottery should close at ${closingTimeDate.toLocaleDateString()} : ${closingTimeDate.toLocaleTimeString()}\n`;
  setData(output);
  setLoading(false);
}
   
 


 