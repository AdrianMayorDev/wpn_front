"use client";
import Image from "next/image";
import useDecodedToken from "../../hooks/useDecodedToken";
import styles from "./SidePanel.module.css";
import SettingsModal from "../SettingsModal/SettingsModal";
import { useState } from "react";

const SidePanel = () => {
	const { steamNick, steamAvatar } = useDecodedToken();
	const [isModalOpen, setIsModalOpen] = useState(false);

	return (
		<div className={styles.sidePanelContainer}>
			<div className={styles.userInfo}>
				{steamAvatar && <Image src={steamAvatar} alt='Avatar Image' width={20} height={20} />}
				<p>{steamNick}</p>
			</div>
			<button onClick={() => setIsModalOpen(true)}>Settings</button>
			<SettingsModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
		</div>
	);
};

export default SidePanel;
