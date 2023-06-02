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
    <div className="mt-2 mb-2 w-80 max-w-screen-lg sm:w-96">
      <div className="flex justify-center">
        <Button className="mb-2" onClick={async () => await displayPrize(signer, lotteryContract, setLoading, setData)}>
          Display Prize
        </Button>
      </div>
        { 
          isLoading? <Typography variant="medium" color="blue-gray" className="text-center mb-2 font-medium">Checking Prize...</Typography> : <p></p>
        }
        { 
          data? <Typography variant="medium" color="blue-gray" className="text-center mb-2 font-medium">{data}</Typography> : <p></p>
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
   
 


 