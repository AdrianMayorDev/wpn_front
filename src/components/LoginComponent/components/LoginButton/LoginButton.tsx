"use client";

import FilledButton from "@/components/FilledButton/FilledButton";
import useLoginContext from "../../hooks/useLoginContext";

const LoginButton = ({ text }: { text: string }) => {
	const { handleSubmit } = useLoginContext();

	return <FilledButton textButton={text} onClick={handleSubmit} />;
};

export default LoginButton;
