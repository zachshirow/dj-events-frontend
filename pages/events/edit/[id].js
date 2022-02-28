import { ToastContainer, toast } from "react-toastify";
import moment from "moment";

import Layout from "@/components/Layout";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { API_URL } from "@/config/index.js";
import Input from "@/components/Input";
import Image from "next/image";
import Modal from "@/components/Modal";

import styles from "@/styles/Form.module.css";
import "react-toastify/dist/ReactToastify.css";
import QueryString from "qs";
import { FaImage } from "react-icons/fa";
import ImageUpload from "@/components/ImageUpload";

export default function EditEventPage({ evt }) {
	const evtData = evt.data.attributes;
	const id = evt.data.id;
	const [values, setValues] = useState({
		name: evtData.name,
		performers: evtData.performers,
		venue: evtData.venue,
		address: evtData.address,
		date: evtData.date,
		time: evtData.time,
		description: evtData.description,
	});

	const [imagePreview, setImagePreview] = useState(
		evt.data.attributes.image.data
			? evt.data.attributes.image.data.attributes.formats.small.url
			: null
	);

	const [showModal, setShowModal] = useState(false);

	const router = useRouter();

	const handleSubmit = async (e) => {
		e.preventDefault();

		//validation
		const hasEmptyFields = Object.values(values).some((element) => {
			return element === "";
		});

		if (hasEmptyFields) {
			toast.error("Please fill in all the fields");
			return;
		}

		const res = await fetch(`${API_URL}/api/events/${evt.data.id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ data: values }),
		});

		if (!res.ok) {
			toast.error("something went wrong");
		} else {
			const evt = await res.json();
			router.push(`/events/${evt.data.attributes.slug}`);
		}
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setValues({ ...values, [name]: value });
	};

	const imageUploaded = async (imageData) => {
		const imageId = imageData.id;
		const imageUrl = imageData.formats.small.url;

		const res = await fetch(`${API_URL}/api/events/${evt.data.id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ data: { image: imageId } }),
		});

		if (!res.ok) {
			toast.error("something went wrong");
		} else {
			setImagePreview(imageUrl);
			setShowModal(false);
		}
	};

	return (
		<Layout>
			<Link href={`/events/${evtData.slug}`}>← Go Back</Link>
			<h1>Edit Event</h1>
			<ToastContainer />
			<form className={styles.form} onSubmit={handleSubmit}>
				<div className={styles.grid}>
					<Input
						type="text"
						name="name"
						label="Event Name"
						value={values.name}
						onChange={handleInputChange}
					/>
					<Input
						type="text"
						name="performers"
						label="Performers"
						value={values.performers}
						onChange={handleInputChange}
					/>
					<Input
						type="text"
						name="venue"
						label="Venue"
						value={values.venue}
						onChange={handleInputChange}
					/>
					<Input
						type="text"
						name="address"
						label="Address"
						value={values.address}
						onChange={handleInputChange}
					/>

					<Input
						type="date"
						name="date"
						label="Date"
						value={moment(values.date).format("yyyy-MM-DD")}
						onChange={handleInputChange}
					/>
					<Input
						type="text"
						name="time"
						label="Time"
						value={values.time}
						onChange={handleInputChange}
					/>
				</div>
				<div>
					<label htmlFor="description">Description</label>
					<textarea
						name="description"
						id="description"
						value={values.description}
						onChange={handleInputChange}></textarea>
				</div>
				<input type="submit" value="Update Event" className="btn" />
			</form>

			<div>
				<h2>Event Image</h2>
				{imagePreview ? (
					<Image
						alt="Preview Image"
						src={imagePreview}
						height={200}
						width={340}
					/>
				) : (
					<div>
						<p>No Image Uploaded</p>
					</div>
				)}

				<div>
					<button
						className="btn-secondary"
						onClick={() => {
							setShowModal(true);
						}}>
						<FaImage /> Set Image
					</button>
				</div>

				<Modal
					show={showModal}
					onClose={() => {
						setShowModal(false);
					}}
					title="Image Upload">
					<ImageUpload evtId={id} imageUploaded={imageUploaded} />
				</Modal>
			</div>
		</Layout>
	);
}

export async function getServerSideProps({ params: { id } }) {
	const query = QueryString.stringify({ populate: "image" });

	const res = await fetch(`${API_URL}/api/events/${id}?${query}`);
	const evt = await res.json();

	return {
		props: { evt },
	};
}
