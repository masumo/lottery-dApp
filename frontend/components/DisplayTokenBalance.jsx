import * as React from 'react';
import Router, { useRouter } from "next/router";
import {ethers, Contract} from 'ethers';
import * as tokenJson from '../abi/LotteryToken.json';
import { useSigner } from 'wagmi';
import { Button } from '@material-tailwind/react';


export function DisplayTokenBalance() {
  const [data, setData] = React.useState(null);
	const [isLoading, setLoading] = React.useState(false);
  //const [errorReason, setError] = React.useState(null);
  const router = useRouter();

  let etherscanApi = process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY;
  let lotteryAddress = process.env.NEXT_PUBLIC_LOTTERY_ADDRESS;
  let tokenAddress = process.env.NEXT_PUBLIC_TOKEN_ADDRESS;
  let testnet = process.env.NEXT_PUBLIC_TESTNET;
  const { data:signer} = useSigner();
  const provider = new ethers.providers.EtherscanProvider(testnet, etherscanApi);
  const tokenContract = new Contract(tokenAddress, tokenJson.abi, provider);

    return (
      <div>
        {/* <h2>Display Token Balance</h2> */}
        <Button onClick={async () => await displayTokenBalance(tokenContract, signer, setLoading, setData)}>
          Display Token Balance
        </Button>
          { 
            isLoading? <p>Checking token balance...</p> : <p></p>
          }
          { 
            data? <p>{data}</p> : <p></p>
          }
          
      </div>
    )
    
  }


 async function displayTokenBalance(tokenContract, signer, setLoading, setData) {
  setLoading(true);
  const balanceBN = await tokenContract.balanceOf(signer._address);
  console.log(balanceBN)
  const balance = ethers.utils.formatEther(balanceBN);
  console.log(balance)
  const output =`The account of address ${
    signer._address
  } has ${balance} LT0\n`;
  console.log(output)
  setData(output);
  setLoading(false);
}
   
 


 