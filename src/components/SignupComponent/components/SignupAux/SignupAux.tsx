import Link from "next/link";
import styles from "./SignupAux.module.css";

interface ISignupAuxProps {
	text: string;
	link: string;
	textLink: string;
}

const SignupAux = ({ text, link, textLink }: ISignupAuxProps) => {
	return (
		<div>
			<span className={styles.auxText}>{text} </span>
			<Link className={styles.auxTextLink} href={link}>
				{textLink}
			</Link>
		</div>
	);
};

export default SignupAux;
