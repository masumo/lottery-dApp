import * as React from 'react';
import Router, { useRouter } from "next/router";
import {ethers, Contract} from 'ethers';
import { useSigner } from 'wagmi';
import * as lotteryJson from '../abi/Lottery.json';
import { Button, Typography } from '@material-tailwind/react';


export function DisplayPrize() {
  const [data, setData] = React.useState(null);
  const [isLoading, setLoading] = React.useState(false);
  //const [errorReason, setError] = React.useState(null);
  const { data:signer} = useSigner();
  const router = useRouter();

  let etherscanApi = process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY;
  let testnet = process.env.NEXT_PUBLIC_TESTNET;
  let lotteryAddress = process.env.NEXT_PUBLIC_LOTTERY_ADDRESS;
  const provider = new ethers.providers.EtherscanProvider(testnet, etherscanApi); 
  const lotteryContract = new Contract(lotteryAddress, lotteryJson.abi, provider);
  return (
    <div>
      <div>
      <Button onClick={async () => await displayPrize(signer, lotteryContract, setLoading, setData)}>
        Display Prize
      </Button>
      </div>
        { 
          isLoading? <p>Checking Prize...</p> : <p></p>
        }
        { 
          data? <div><Typography variant="medium" color="blue-gray" className="mb-4 font-medium">{data}</Typography></div> : <p></p>
        }
        
    </div>
  )
    
  }

  async function displayPrize(signer, contract, setLoading, setData) {
    setLoading(true)
    const prizeBN = await contract.prize(signer._address);
    const prize = ethers.utils.formatEther(prizeBN);
    const output = `The account of address ${signer._address} 
    has earned a prize of ${prize} Tokens\n`
    console.log(output);
    setData(output)
    setLoading(false)
  }
   
 


 