import styles from "./LoginTitle.module.css";

interface LoginTitleProps {
	children: React.ReactNode;
}

const LoginTitle = ({ children }: LoginTitleProps) => {
	return <h1 className={styles.loginTitle}>{children}</h1>;
};

export default LoginTitle;
