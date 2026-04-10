const createStatusService = async (name: string) => {
	try {
		const token = sessionStorage.getItem("token");
		if (!token) {
			throw new Error("User is not authenticated.");
		}

		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/library/status`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `${token}`,
			},
			body: JSON.stringify({ name }),
		});

		const data = await response.json();

		if (data.status === "error") {
			throw new Error(data.message || "Failed to create status.");
		}

		return data;
	} catch (error) {
		throw error;
	}
};

export default createStatusService;
