import styles from "./SignupForm.module.css";

interface ISignupFormProps {
	children: React.ReactNode;
}

const SignupForm = ({ children }: ISignupFormProps) => {
	return (
		<form className={styles.signupFormContainer} method='dialog'>
			{children}
		</form>
	);
};

export default SignupForm;
