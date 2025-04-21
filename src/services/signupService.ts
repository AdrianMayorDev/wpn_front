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
			alert("Please fill in all fields.");
		}

		const response = await fetch("http://localhost:8000/user/", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(payload),
		});
		const data = await response.json();

		console.log("Response data:", data);
		if (data.status === "error") {
			alert(data.message || "Signup failed");
			return;
		}

		alert("Signup successful!");

		const token = await loginService({ email: values.email, password: values.password, rememberMe: values.rememberMe });

		// Trigger library sync in the background
		const syncPayload = {
			steamNick: values.steamNick,
			steamId: values.steamUserId,
		};

		const syncResponse = await fetch("http://localhost:8000/library/sync", {
			method: "POST",
			headers: { "Content-Type": "application/json", Authorization: `${token}` },
			body: JSON.stringify(syncPayload),
		});

		const syncData = await syncResponse.json();
		console.log("Sync response data:", syncData, token);

		return syncData.data;
	} catch (error) {
		alert(error instanceof Error ? error.message : "An unknown error occurred");
	}
};

export default signupService;
