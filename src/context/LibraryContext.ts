import { createContext, useContext } from "react";

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

interface LibraryContextType {
	library: LibraryItem[];
	setLibrary: (library: LibraryItem[]) => void;
	getLibrary: () => LibraryItem[];
	totalGamesToSync: number;
	setTotalGamesToSync: (total: number) => void;
	statuses: Status[];
	refreshStatuses: () => void;
}

const LibraryContext = createContext<LibraryContextType | undefined>(undefined);

const useLibrary = (): LibraryContextType => {
	const context = useContext(LibraryContext);
	if (!context) {
		throw new Error("useLibrary must be used within a LibraryProvider");
	}
	return context;
};

const getLibrary = (): LibraryItem[] => {
	const library = localStorage.getItem("library");
	if (library) {
		return JSON.parse(library);
	}
	return [];
};

export { LibraryContext, useLibrary, getLibrary };
