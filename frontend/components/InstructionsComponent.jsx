import styles from "../styles/InstructionsComponent.module.css";
import Router, { useRouter } from "next/router";
import { CheckState } from "./CheckState";
import { OpenBets } from "./OpenBets";
import { DisplayBalance } from "./DisplayBalance";
import { DisplayTokenBalance } from "./DisplayTokenBalance";
import { Bet } from "./Bet";
import { BuyTokens } from "./BuyTokens";
import { CloseLottery } from "./CloseLottery";
import { DisplayPrize } from "./DisplayPrize";
import { ClaimPrize } from "./ClaimPrize";

import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel, Typography,
  } from "@material-tailwind/react";

export default function InstructionsComponent() {
	const router = useRouter();
	return (
		<>
		
				<header >
					<Typography variant="h1">Lottery dApp</Typography>
				</header>
				<div className="w-4/6 h-4 block">
					<PageBody></PageBody>
				</div>
				<footer  className="fixed inset-x-0 bottom-0 bg-neutral-900 text-center ">
					Group 1 Cohort 2 Encode Solidity Bootcamp April 2023
				</footer>
		</>
	);
}

function PageBody(){
	return(
		
		<Tabs value="html">
			<TabsHeader>
				<Tab key="open" value="open">
					Open
				</Tab>
				<Tab key="balance" value="balance">
					Balance
				</Tab>
				<Tab key="buy" value="buy">
					Buy Token
				</Tab>
				<Tab key="bet" value="bet">
					Bet
				</Tab>
				<Tab key="prize" value="prize">
					Prize
				</Tab>
				<Tab key="withdraw" value="withdraw">
					Withdraw
				</Tab>
				<Tab key="close" value="close">
					Close
				</Tab>
			</TabsHeader>
			<TabsBody>
				<TabPanel key="open" value="open">
					<div className="flex flex-col items-center justify-center gap-4">
						<CheckState/>
						<OpenBets/>
					</div>
				</TabPanel>
				<TabPanel key="balance" value="balance">
					<div className="flex flex-col items-center justify-center gap-4">
						<DisplayBalance/>
						<DisplayTokenBalance/>
					</div>
				</TabPanel>
				<TabPanel key="buy" value="buy">
					<div className="flex flex-col items-center justify-center gap-4">
						<BuyTokens/>
					</div>
				</TabPanel>
				<TabPanel key="bet" value="bet">
					<div className="flex flex-col items-center justify-center gap-4">
						<Bet/>
					</div>
				</TabPanel>
				<TabPanel key="prize" value="prize">
					<div className="flex flex-col items-center justify-center gap-4">
						<DisplayPrize></DisplayPrize>
						<ClaimPrize></ClaimPrize>
					</div>
				</TabPanel>
				<TabPanel key="close" value="close">
					<CloseLottery></CloseLottery><br />
				</TabPanel>
			</TabsBody>
		</Tabs>
		
	)
}


