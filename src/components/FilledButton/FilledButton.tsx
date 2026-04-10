"use client";

import styles from "./FilledButton.module.css";

interface IFilledButton {
	textButton: string;
	onClick?: () => void;
	disabled?: boolean;
}

const FilledButton = ({ textButton, onClick, disabled = false }: IFilledButton) => {
	return (
		<button className={styles.buttonContainer} onClick={onClick} disabled={disabled}>
			{textButton}
		</button>
	);
};
export default FilledButton;
