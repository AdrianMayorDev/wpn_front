"use client";

import { useContext } from "react";
import SignupFormContext from "../context/SignupContext";

const useSignupContext = () => {
	const context = useContext(SignupFormContext);
	if (!context) {
		throw new Error("useLoginContext must be used within a LoginFormProvider");
	}
	return context;
};

export default useSignupContext;
