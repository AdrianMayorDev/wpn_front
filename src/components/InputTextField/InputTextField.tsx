import styles from "./InputTextField.module.css";

interface IInputField {
	type: "password" | "text";
	placeholder: string;
	value?: string;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	disabled?: boolean;
	required?: boolean;
}

const InputField = ({ type, placeholder, value = "", onChange, disabled, required }: IInputField) => {
	return (
		<input
			className={styles.inputContainer}
			type={type}
			placeholder={placeholder}
			value={value}
			onChange={onChange}
			disabled={disabled}
			required={required}
		/>
	);
};

export default InputField;
