import Layout from "@/components/Layout";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { API_URL } from "@/config/index.js";
import styles from "@/styles/Form.module.css";
import Input from "@/components/Input";

export default function AddEventPage() {
	const [values, setValues] = useState({
		name: "",
		performers: "",
		venue: "",
		address: "",
		date: "",
		time: "",
		description: "",
	});

	const router = useRouter();

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(values);
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setValues({ ...values, [name]: value });
	};

	return (
		<Layout>
			<Link href="/events">← Go Back</Link>
			<h1>Add event</h1>
			<p className="code">{JSON.stringify(values, null, 3)}</p>

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
						value={values.date}
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
				<input type="submit" value="Add Event" className="btn" />
			</form>
		</Layout>
	);
}
