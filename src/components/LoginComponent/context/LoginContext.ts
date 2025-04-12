"use client";

import { createContext } from "react";

interface LoginFormValues {
	email: string;
	password: string;
	rememberMe: boolean;
}

interface LoginFormContextProps {
	values: LoginFormValues;
	setValue: (field: keyof LoginFormValues, value: string | boolean) => void;
	handleSubmit: () => void;
}

const LoginFormContext = createContext<LoginFormContextProps | undefined>(undefined);

export default LoginFormContext;
