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

export default function InstructionsComponent() {
	const router = useRouter();
	return (
		<div className={styles.container}>
			<header className={styles.header_container}>
				<h1>
					Lottery dApp
				</h1>
			</header>
			<PageBody></PageBody>
			<div className={styles.footer}>
				Group 1 Cohort 2 Encode Solidity Bootcamp April 2023
			</div>
		</div>
	);
}

function PageBody(){
	return(
		<div className={styles.buttons_container}>
			<CheckState/><br />
			<OpenBets/><br />
			<DisplayBalance/><br />
			<DisplayTokenBalance/><br />
			<BuyTokens/><br />
			<Bet/><br />
			<CloseLottery></CloseLottery><br />
			<DisplayPrize></DisplayPrize><br />
			<ClaimPrize></ClaimPrize><br />
		</div>
	)
}


