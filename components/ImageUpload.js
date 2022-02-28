import { useState } from "react";
import { API_URL } from "@/config/index.js";
import styles from "@/styles/Form.module.css";

import { ToastContainer, toast } from "react-toastify";
import { FaCircle } from "react-icons/fa";

export default function ImageUpload({ evtId, imageUploaded }) {
	const [image, setImage] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (image === null) {
			toast.error("Please select an image first.");
			return;
		}

		const formData = new FormData();

		formData.append("files", image);
		// formData.append("ref", "api::event.event");
		// formData.append("refId", evtId);
		// formData.append("field", "image");

		setIsLoading(true);

		const res = await fetch(`${API_URL}/api/upload`, {
			method: "POST",
			body: formData,
		});

		const imageData = await res.json();

		if (res.ok) {
			toast.success("Image Uploaded successfully");
			imageUploaded(imageData[0]);
		} else {
			toast.error("Couldn't Upload");
		}
		setIsLoading(false);
	};

	const handleFileChange = (e) => {
		e.preventDefault();
		setImage(e.target.files[0]);
	};

	return (
		<div className={styles.form}>
			<form onSubmit={handleSubmit}>
				<div className={styles.file}>
					<input type="file" onChange={handleFileChange} />
				</div>
				{isLoading && (
					<p className="text-center">
						<FaCircle /> Uploading Image
					</p>
				)}
				<input
					type="submit"
					className={"btn-secondary"}
					disabled={isLoading}
					value="Upload"
				/>
				<ToastContainer />
			</form>
		</div>
	);
}
