"use client";

import useLoginContext from "../../hooks/useLoginContext";
import styles from "./LoginRememberMe.module.css";

interface ILoginRememberMeProps {
	text: string;
}

const LoginRememberMe = ({ text }: ILoginRememberMeProps) => {
	const { values, setValue } = useLoginContext();
	return (
		<div className={styles.rememberMeContainer}>
			<input type='checkbox' checked={values.rememberMe} onChange={(e) => setValue("rememberMe", e.target.checked)} />
			<label htmlFor='remember'>{text}</label>
		</div>
	);
};

export default LoginRememberMe;
