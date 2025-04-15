"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./SettingsModal.module.css";
import TabContainer from "./components/TabContainer/TabContainer";
import AccountSettings from "./components/AccountSettings/AccountSettings";
import StatusesSettings from "./components/StatusesSettings/StatusesSettings";

const SettingsModal = ({ isModalOpen, setIsModalOpen }: { isModalOpen: boolean; setIsModalOpen: (arg0: boolean) => void }) => {
	const dialogRef = useRef<HTMLDialogElement>(null);
	const [activeTab, setActiveTab] = useState<"account" | "statuses">("account");

	useEffect(() => {
		if (isModalOpen) {
			openModal();
		} else {
			closeModal();
		}
	}, [isModalOpen]);

	const openModal = () => {
		if (dialogRef.current) {
			dialogRef.current.showModal();
		}
	};

	const closeModal = () => {
		if (dialogRef.current) {
			dialogRef.current.close();
			setIsModalOpen(false);
		}
	};

	return (
		<dialog ref={dialogRef} className={styles.dialog}>
			<div className={styles.modalContainer}>
				<div className={styles.modalHeader}>
					<h2>Settings</h2>
					<button onClick={closeModal} className={styles.closeButton}>
						X
					</button>
				</div>
				<div className={styles.modalContent}>
					<TabContainer activeTab={activeTab} setActiveTab={setActiveTab} />
					<div className={styles.tabContent}>
						{activeTab === "account" && <AccountSettings closeModal={closeModal} />}
						{activeTab === "statuses" && <StatusesSettings />}
					</div>
				</div>
			</div>
		</dialog>
	);
};

export default SettingsModal;
