import * as React from 'react';
import Router, { useRouter } from "next/router";
import {ethers, Contract} from 'ethers';
import { useSigner } from 'wagmi';
import * as lotteryJson from '../abi/Lottery.json';
import * as tokenJson from '../abi/LotteryToken.json';
import { Button, Typography, Input } from '@material-tailwind/react';

export function Bet() {
  const [data, setData] = React.useState(null);
	const [isLoading, setLoading] = React.useState(false);
  //const [errorReason, setError] = React.useState(null);
  const router = useRouter();
  const { data:signer} = useSigner();

  let etherscanApi = process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY;
  let lotteryAddress = process.env.NEXT_PUBLIC_LOTTERY_ADDRESS;
  let tokenAddress = process.env.NEXT_PUBLIC_TOKEN_ADDRESS;
  let testnet = process.env.NEXT_PUBLIC_TESTNET;

  
   const provider = new ethers.providers.EtherscanProvider(testnet, etherscanApi);
   const lotteryContract = new Contract(lotteryAddress, lotteryJson.abi, provider);
   const tokenContract = new Contract(tokenAddress, tokenJson.abi, provider);

   async function handleSubmit(e) {
    if(signer){
      e.preventDefault();
      const form = e.target;
      const formData = new FormData(form);
      let amount = formData.get('amount');
        
      await bet(amount, signer, tokenContract, lotteryContract, setData, setLoading);
    }else{
      alert("Please connect to a wallet");
      e.preventDefault();
    }

    
}

    return (
      <div>
        {/* <h2>Bet</h2> */}
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" method="post" onSubmit={handleSubmit}>
              <Typography
                  variant="medium"
                  color="blue-gray"
                  className="mb-4 font-medium"
                >
                  How many times:
              </Typography>
              <Input label ="Bet:" name="amount" />
              <Button className="mt-6" fullWidth type="submit">Bet</Button>
          </form>
          { 
            isLoading? <p>Betting is in progress...</p> : <p></p>
          }
          { 
            data? <p>{data}</p> : <p></p>
          }
          
      </div>
    )
    
  }

  

  async function bet(amount, signer, token, contract, setData, setLoading) {
    setLoading = true;
    const allowTx = await token
      .connect(signer)
      .approve(contract.address, ethers.constants.MaxUint256);
    await allowTx.wait();
    const tx = await contract.connect(signer).betMany(amount);
    const receipt = await tx.wait();
    console.log(`Bets placed (${receipt.transactionHash})\n`);
    let output = `Bets placed (${receipt.transactionHash})\n`;
    setData = output;
    setLoading = false;
  }
   
 


 