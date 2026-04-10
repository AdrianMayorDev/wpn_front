"use client";

import { useState } from "react";
import signupService from "@/services/signupService";
import SignupFormContext from "./SignupContext";
import { useRouter } from "next/navigation";
import { useLibrary } from "@/context/LibraryContext";

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
	const { setTotalGamesToSync } = useLibrary();

	const setValue = (field: keyof SignupFormValues, value: string | boolean) => {
		setValues((prev) => ({ ...prev, [field]: value }));
	};

	const handleSubmit = async () => {
		try {
			const totalGames = await signupService(values);
			if (totalGames) setTotalGamesToSync(totalGames);
			router.push("/");
		} catch {
			// Signup errors are handled in signupService
		}
	};

	return <SignupFormContext.Provider value={{ values, setValue, handleSubmit }}>{children}</SignupFormContext.Provider>;
};
