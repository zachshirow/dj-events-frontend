import styles from "@/styles/Search.module.css";
import { useState } from "react";
import { useRouter } from "next/router";
import { FaSearch } from "react-icons/fa";

export default function Search() {
	const [term, setTerm] = useState("");
	const router = useRouter();

	function handleSubmit(e) {
		e.preventDefault();
		if (term !== "") {
			router.push(`/events/search?term=${term}`);
			setTerm("");
		} else {
			return;
		}
	}

	function handleChange(e) {
		setTerm(e.target.value);
	}

	return (
		<div className={styles.search}>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					value={term}
					onChange={handleChange}
					placeholder="Search Events..."
				/>
				<button type="submit" className="btn-tertiary">
					<FaSearch />
				</button>
			</form>
		</div>
	);
}
