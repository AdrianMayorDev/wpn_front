import { SignupFormValues } from "@/components/SignupComponent/context/SignupContextProvider";
import loginService from "./loginService";

const signupService = async (values: SignupFormValues) => {
	try {
		const payload = {
			email: values.email,
			password: values.password,
			steamNick: values.steamNick,
			steamUserId: values.steamUserId,
			steamAvatar: values.steamAvatar,
		};

		console.log("Payload:", payload);
		if (!values.email || !values.password || !values.steamNick || !values.steamUserId || !values.steamAvatar) {
			console.log("values ", values);
			throw new Error("Please fill in all fields.");
		}

		const response = await fetch("http://localhost:8000/user/", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(payload),
		});
		const data = await response.json();

		if (data.status === "error") {
			throw new Error(data.message || "Signup failed");
		}

		alert("Signup successful!");

		await loginService({ email: values.email, password: values.password, rememberMe: values.rememberMe });
	} catch (error) {
		alert(error instanceof Error ? error.message : "An unknown error occurred");
	}
};

export default signupService;
