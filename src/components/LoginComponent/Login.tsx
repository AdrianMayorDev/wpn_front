import { ReactNode } from "react";
import LoginButton from "./components/LoginButton/LoginButton";
import LoginTextField from "./components/LoginField/LoginTextField";
import LoginForm from "./components/LoginForm/LoginForm";
import LoginRememberMe from "./components/LoginRememberMe/LoginRememberMe";
import LoginTitle from "./components/LoginTitle/LoginTitle";
import styles from "./Login.module.css";
import LoginAux from "./components/LoginAux/LoginAux";

interface ILoginProps {
	children: ReactNode;
}

const Login: React.FC<ILoginProps> & {
	Title: typeof LoginTitle;
	Form: typeof LoginForm;
	Field: typeof LoginTextField;
	RememberMe: typeof LoginRememberMe;
	Button: typeof LoginButton;
	Aux: typeof LoginAux;
} = ({ children }: ILoginProps) => {
	return (
		<dialog open id='loginFormDialog' className={styles.loginContainer}>
			{children}
		</dialog>
	);
};

Login.Title = LoginTitle;
Login.Form = LoginForm;
Login.Field = LoginTextField;
Login.RememberMe = LoginRememberMe;
Login.Button = LoginButton;
Login.Aux = LoginAux;

export default Login;
