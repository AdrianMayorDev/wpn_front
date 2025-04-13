"use client";

import { useState } from "react";
import LoginFormContext from "./LoginContext";
import loginService from "@/services/loginService";
import { useRouter } from "next/navigation";

export interface LoginFormValues {
	email: string;
	password: string;
	rememberMe: boolean;
}

export const LoginFormProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const router = useRouter();
	const [values, setValues] = useState<LoginFormValues>({
		email: "",
		password: "",
		rememberMe: false,
	});

	const setValue = (field: keyof LoginFormValues, value: string | boolean) => {
		setValues((prev) => ({ ...prev, [field]: value }));
	};

	const handleSubmit = async () => {
		try {
			await loginService(values);
			router.push("/");
		} catch (error) {
			console.error("Login failed:", error);
		}
	};

	return <LoginFormContext.Provider value={{ values, setValue, handleSubmit }}>{children}</LoginFormContext.Provider>;
};
