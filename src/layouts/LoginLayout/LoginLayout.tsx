import LoginButton from "@/components/LoginComponent/components/LoginButton/LoginButton";
import { LoginFormProvider } from "@/components/LoginComponent/context/LoginContextProvider";
import Login from "@/components/LoginComponent/Login";
import React from "react";

const LoginLayout: React.FC = () => {
	return (
		<LoginFormProvider>
			<Login>
				<Login.Title>Login</Login.Title>
				<Login.Form>
					<Login.Field type='text' placeholder='Email' label='Email' />
					<Login.Field type='password' placeholder='Password' label='Password' />
					<Login.RememberMe text='Remember me' />
					<LoginButton text='Login' />
				</Login.Form>
				<Login.Aux text="Don't have an account yet?" textLink='Sign up' link='/' />
			</Login>
		</LoginFormProvider>
	);
};

export default LoginLayout;
