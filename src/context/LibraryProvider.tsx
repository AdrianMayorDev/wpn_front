"use client";

import React, { useState } from "react";
import { LibraryContext } from "./LibraryContext";

interface LibraryItem {
	userId: string;
	gameId: string;
	gameStatusId: string;
	addedAt: string;
	updatedAt: string;
	manualIndex: string | null;
}

interface Status {
	gameStatusId: string;
	name: string;
}

const LibraryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [library, setLibrary] = useState<LibraryItem[]>([]);
	const [totalGamesToSync, setTotalGamesToSync] = useState<number>(0);
	const [statuses, setStatuses] = useState<Status[]>([]);

	const getLibrary = (): LibraryItem[] => {
		return library;
	};

	const refreshStatuses = async () => {
		const token = sessionStorage.getItem("token");
		if (!token) return;

		try {
			const response = await fetch(`http://localhost:8000/library/allStatus`, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `${token}`,
				},
			});
			const data = await response.json();
			setStatuses(data.data);
		} catch (error) {
			console.error("Error fetching statuses:", error);
		}
	};

	return (
		<LibraryContext.Provider
			value={{
				library,
				setLibrary,
				getLibrary,
				totalGamesToSync,
				setTotalGamesToSync,
				statuses,
				refreshStatuses,
			}}
		>
			{children}
		</LibraryContext.Provider>
	);
};

export default LibraryProvider;
