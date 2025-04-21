import styles from "./TabContainer.module.css";

const TabContainer = ({
	activeTab,
	setActiveTab,
}: {
	activeTab: "account" | "statuses";
	setActiveTab: (tab: "account" | "statuses") => void;
}) => {
	const handleLogout = () => {
		sessionStorage.removeItem("token");
		localStorage.removeItem("rememberMe");
		window.location.reload();
	};

	return (
		<div className={styles.tabContainer}>
			<button className={activeTab === "account" ? styles.activeTab : ""} onClick={() => setActiveTab("account")}>
				Account
			</button>
			<button className={activeTab === "statuses" ? styles.activeTab : ""} onClick={() => setActiveTab("statuses")}>
				Statuses
			</button>
			<button onClick={() => handleLogout()}>Log out</button>
		</div>
	);
};

export default TabContainer;
