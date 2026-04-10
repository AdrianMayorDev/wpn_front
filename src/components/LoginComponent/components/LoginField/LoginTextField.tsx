"use client";

import InputFieldText from "@/components/InputTextField/InputTextField";
import styles from "./LoginTextField.module.css";
import useLoginContext from "../../hooks/useLoginContext";

interface ILoginFieldProps {
	label: string;
	type: "password" | "text";
	placeholder: string;
}

const LoginTextField = ({ label, type, placeholder }: ILoginFieldProps) => {
	const { values, setValue } = useLoginContext();

	return (
		<div className={styles.loginFieldContainer}>
			<label htmlFor={label.toLowerCase()}>{label}</label>
			<InputFieldText
				type={type}
				placeholder={placeholder}
				value={values[label.toLowerCase() as keyof typeof values] as string}
				onChange={(e) => setValue(label.toLowerCase() as keyof typeof values, e.target.value)}
			/>
		</div>
	);
};

export default LoginTextField;
