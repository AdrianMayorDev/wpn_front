import { LoginFormValues } from "@/components/LoginComponent/context/LoginContextProvider";

const loginService = async (values: LoginFormValues) => {
	try {
		if (!values.email || !values.password) {
			throw new Error("Please fill in all fields.");
		}

		const payload = {
			email: values.email,
			password: values.password,
		};

		const response = await fetch("http://localhost:8000/user/login", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(payload),
		});
		const data = await response.json();

		if (data.status === "error") {
			throw new Error(data.message || "Login failed");
		}

		if (data.data.token) {
			sessionStorage.setItem("token", data.data.token);
		}

		localStorage.setItem("rememberMe", JSON.stringify(values.rememberMe));

		alert("Login successful!");
	} catch (error) {
		alert(error instanceof Error ? error.message : "An unknown error occurred");
	}
};
export default loginService;
