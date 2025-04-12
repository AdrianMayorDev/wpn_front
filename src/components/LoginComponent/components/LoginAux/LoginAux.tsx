import Link from "next/link";
import styles from "./LoginAux.module.css";

interface ILoginAuxProps {
	text: string;
	link: string;
	textLink: string;
}

const LoginAux = ({ text, link, textLink }: ILoginAuxProps) => {
	return (
		<div>
			<span className={styles.auxText}>{text} </span>
			<Link className={styles.auxTextLink} href={link}>
				{textLink}
			</Link>
		</div>
	);
};

export default LoginAux;
