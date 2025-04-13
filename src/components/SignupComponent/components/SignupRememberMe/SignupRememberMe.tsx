"use client";

import useSignupContext from "../../hooks/useSignupContext";
import styles from "./SignupRememberMe.module.css";

interface ISignupRememberMeProps {
	text: string;
}

const SignupRememberMe = ({ text }: ISignupRememberMeProps) => {
	const { values, setValue } = useSignupContext();
	return (
		<div className={styles.rememberMeContainer}>
			<input type='checkbox' checked={values.rememberMe} onChange={(e) => setValue("rememberMe", e.target.checked)} />
			<label htmlFor='remember'>{text}</label>
		</div>
	);
};

export default SignupRememberMe;
