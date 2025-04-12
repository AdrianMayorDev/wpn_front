"use client";

import { useState } from "react";
import LoginFormContext from "./LoginContext";

interface LoginFormValues {
	email: string;
	password: string;
	rememberMe: boolean;
}

export const LoginFormProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [values, setValues] = useState<LoginFormValues>({
		email: "",
		password: "",
		rememberMe: false,
	});

	const setValue = (field: keyof LoginFormValues, value: string | boolean) => {
		setValues((prev) => ({ ...prev, [field]: value }));
	};

	const handleSubmit = async () => {
		if (!values.email || !values.password) {
			alert("Please fill in all fields.");
			return;
		}

		try {
			const response = await fetch("/api/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(values),
			});
			if (!response.ok) {
				throw new Error("Login failed");
			}
			alert("Login successful!");
		} catch (error) {
			alert(error instanceof Error ? error.message : "An unknown error occurred");
		}
	};

	return <LoginFormContext.Provider value={{ values, setValue, handleSubmit }}>{children}</LoginFormContext.Provider>;
};
