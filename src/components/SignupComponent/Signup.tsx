import { ReactNode } from "react";
import SignupTitle from "./components/SignupTitle/SignupTitle";
import SignupForm from "./components/SignupForm/SignupForm";
import SignupTextField from "./components/SignupField/SignupTextField";
import SignupRememberMe from "./components/SignupRememberMe/SignupRememberMe";
import SignupButton from "./components/SignupButton/SignupButton";
import SignupAux from "./components/SignupAux/SignupAux";
import styles from "./Signup.module.css";

interface ISignupProps {
	children: ReactNode;
}

const Signup: React.FC<ISignupProps> & {
	Title: typeof SignupTitle;
	Form: typeof SignupForm;
	Field: typeof SignupTextField;
	RememberMe: typeof SignupRememberMe;
	Button: typeof SignupButton;
	Aux: typeof SignupAux;
} = ({ children }: ISignupProps) => {
	return (
		<dialog open id='loginFormDialog' className={styles.signupContainer}>
			{children}
		</dialog>
	);
};

Signup.Title = SignupTitle;
Signup.Form = SignupForm;
Signup.Field = SignupTextField;
Signup.RememberMe = SignupRememberMe;
Signup.Button = SignupButton;
Signup.Aux = SignupAux;

export default Signup;
