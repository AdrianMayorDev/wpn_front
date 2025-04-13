"use client";

import FilledButton from "@/components/FilledButton/FilledButton";
import useSignupContext from "../../hooks/useSignupContext";

const SignupButton = ({ text }: { text: string }) => {
	const { handleSubmit } = useSignupContext();

	return <FilledButton textButton={text} onClick={handleSubmit} />;
};

export default SignupButton;
