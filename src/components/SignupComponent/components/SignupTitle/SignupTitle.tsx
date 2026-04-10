import styles from "./SignupTitle.module.css";

interface SignupTitleProps {
	children: React.ReactNode;
}

const SignupTitle = ({ children }: SignupTitleProps) => {
	return <h1 className={styles.signupTitle}>{children}</h1>;
};

export default SignupTitle;
