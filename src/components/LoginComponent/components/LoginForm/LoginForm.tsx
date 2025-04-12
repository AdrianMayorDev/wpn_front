import styles from "./LoginForm.module.css";

interface ILoginFormProps {
	children: React.ReactNode;
}

const LoginForm = ({ children }: ILoginFormProps) => {
	return (
		<form className={styles.loginFormContainer} method='dialog'>
			{children}
		</form>
	);
};

export default LoginForm;
