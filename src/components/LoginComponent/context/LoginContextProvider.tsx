"use client";

import { useState } from "react";
import LoginFormContext from "./LoginContext";
import { useRouter } from "next/navigation";
import useHandleLogin from "@/hooks/useHandleLogin";

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

	const { handleLogin } = useHandleLogin();

	const setValue = (field: keyof LoginFormValues, value: string | boolean) => {
		setValues((prev) => ({ ...prev, [field]: value }));
	};

	const handleSubmit = async () => {
		try {
			await handleLogin(values);
			router.push("/");
		} catch {
			// Login errors are handled by useHandleLogin
		}
	};

	return <LoginFormContext.Provider value={{ values, setValue, handleSubmit }}>{children}</LoginFormContext.Provider>;
};
