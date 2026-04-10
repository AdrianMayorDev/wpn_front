"use client";

import { useContext } from "react";
import LoginFormContext from "../context/LoginContext";

const useLoginContext = () => {
	const context = useContext(LoginFormContext);
	if (!context) {
		throw new Error("useLoginContext must be used within a LoginFormProvider");
	}
	return context;
};

export default useLoginContext;
