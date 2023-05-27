import styles from "../styles/InstructionsComponent.module.css";
import Router, { useRouter } from "next/router";
import { CheckState } from "./CheckState";
import { OpenBets } from "./OpenBets";
import { DisplayBalance } from "./DisplayBalance";
import { DisplayTokenBalance } from "./DisplayTokenBalance";
import { Bet } from "./Bet";
import { BuyTokens } from "./buyTokens";

export default function InstructionsComponent() {
	const router = useRouter();
	return (
		<div className={styles.container}>
			<header className={styles.header_container}>
				<h1>
					Lottery dApp
				</h1>
			</header>

			<div className={styles.buttons_container}>
				<PageBody></PageBody>
			</div>
			<div className={styles.footer}>
				Group 1 Cohort 2 Encode Solidity Bootcamp April 2023
			</div>
		</div>
	);
}

function PageBody(){
	return(
		<div>
			<CheckState/><br />
			<OpenBets/><br />
			<DisplayBalance/><br />
			<DisplayTokenBalance/><br />
			<BuyTokens/><br />
			<Bet/><br />
			
		</div>
	)
}


