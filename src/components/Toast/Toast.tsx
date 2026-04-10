"use client";

import { createContext, useContext, useState, useCallback } from "react";
import styles from "./Toast.module.css";

type ToastType = "success" | "error" | "info";

interface Toast {
	id: number;
	message: string;
	type: ToastType;
}

interface ToastContextValue {
	showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export const useToast = () => {
	const context = useContext(ToastContext);
	if (!context) {
		throw new Error("useToast must be used within a ToastProvider");
	}
	return context;
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [toasts, setToasts] = useState<Toast[]>([]);

	const showToast = useCallback((message: string, type: ToastType = "info") => {
		const id = Date.now();
		setToasts((prev) => [...prev, { id, message, type }]);
		setTimeout(() => {
			setToasts((prev) => prev.filter((t) => t.id !== id));
		}, 4000);
	}, []);

	return (
		<ToastContext.Provider value={{ showToast }}>
			{children}
			<div className={styles.toastContainer}>
				{toasts.map((toast) => (
					<div key={toast.id} className={`${styles.toast} ${styles[toast.type]}`}>
						{toast.message}
					</div>
				))}
			</div>
		</ToastContext.Provider>
	);
};
