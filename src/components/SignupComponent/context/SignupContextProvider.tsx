"use client";

import { useState } from "react";
import signupService from "@/services/signupService";
import SignupFormContext from "./SignupContext";
import { useRouter } from "next/navigation";

export interface SignupFormValues {
	email: string;
	password: string;
	steamNick: string;
	steamUserId: string;
	rememberMe: boolean;
	steamAvatar?: string;
}

export const SignupFormProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const router = useRouter();
	const [values, setValues] = useState<SignupFormValues>({
		email: "",
		password: "",
		steamNick: "",
		steamUserId: "",
		rememberMe: false,
	});

	const setValue = (field: keyof SignupFormValues, value: string | boolean) => {
		setValues((prev) => ({ ...prev, [field]: value }));
		console.log("SignupFormProvider setValue", field, value);
		console.log("SignupFormProvider values", values);
	};

	const handleSubmit = async () => {
		try {
			await signupService(values);
			router.push("/");
		} catch (error) {
			console.error("Signup failed:", error);
		}
	};

	return <SignupFormContext.Provider value={{ values, setValue, handleSubmit }}>{children}</SignupFormContext.Provider>;
};
