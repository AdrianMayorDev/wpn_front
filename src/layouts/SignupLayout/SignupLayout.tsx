import { SignupFormProvider } from "@/components/SignupComponent/context/SignupContextProvider";
import Signup from "@/components/SignupComponent/Signup";

const SignupLayout: React.FC = () => {
	return (
		<SignupFormProvider>
			<Signup>
				<Signup.Title>Sign Up</Signup.Title>
				<Signup.Form>
					<Signup.Field type='text' placeholder='Steam Username' label='Steam Username' />
					<Signup.Field type='text' placeholder='Email' label='Email' />
					<Signup.Field type='password' placeholder='Password' label='Password' />
					<Signup.RememberMe text='Remember me' />
					<Signup.Button text='Sign Up' />
				</Signup.Form>
				<Signup.Aux text='Already have an account?' textLink='Log in' link='/login' />
			</Signup>
		</SignupFormProvider>
	);
};

export default SignupLayout;
