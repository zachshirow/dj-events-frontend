import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { FaTimes } from "react-icons/fa";
import styles from "@/styles/Modal.module.css";

export default function Modal({ show, onClose, children, title }) {
	const [isBrowser, setIsBrowser] = useState(false);

	useEffect(() => setIsBrowser(true));

	const handleClose = (e) => {
		e.preventDefault();
		onClose();
	};

	const modalContent = show ? (
		<div className={styles.overlay}>
			<div className={styles.modal}>
				<div className={styles.header}>
					<a href="#" onClick={handleClose}>
						<FaTimes color="black" />
					</a>
				</div>
				{title && <h2 className={styles.title}>{title}</h2>}
				<div className={styles.body}>{children}</div>
			</div>
		</div>
	) : null;

	if (isBrowser) {
		return ReactDOM.createPortal(
			modalContent,
			document.getElementById("modal-root")
		);
	} else {
		return null;
	}
}
