interface UpdateUserPayload {
	email: string;
	password: string;
	newPassword: string;
}

const updateUserService = async (values: UpdateUserPayload) => {
	try {
		if (!values.email || !values.password) {
			throw new Error("Please provide both email and password.");
		}

		const token = sessionStorage.getItem("token");
		if (!token) {
			throw new Error("User is not authenticated.");
		}

		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: `${token}`,
			},
			body: JSON.stringify(values),
		});

		const data = await response.json();

		if (data.status === "error") {
			throw new Error(data.message || "Failed to update user.");
		}

		return data;
	} catch (error) {
		throw error;
	}
};

export default updateUserService;
