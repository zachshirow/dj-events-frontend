import { FaEye, FaUser } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import Layout from "@/components/Layout";
import styles from "@/styles/AuthForm.module.css";

export default function RegisterPage() {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [passwordConfirm, setPasswordConfirm] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		if (password !== passwordConfirm) {
			toast.error("Passwords do not match");
			return;
		}

		console.log({ username, email, password, passwordConfirm });
	};

	return (
		<Layout title="User Register">
			<ToastContainer />
			<div className={styles.auth}>
				<h1>
					<FaUser /> Register
				</h1>

				<form onSubmit={handleSubmit}>
					<div>
						<label htmlFor="username">Username</label>
						<input
							type="text"
							id="username"
							value={username}
							onChange={(e) => {
								setUsername(e.target.value);
							}}
						/>
					</div>
					<div>
						<label htmlFor="email">Email</label>
						<input
							type="email"
							id="email"
							value={email}
							onChange={(e) => {
								setEmail(e.target.value);
							}}
						/>
					</div>
					<div>
						<label htmlFor="password">Password</label>
						<input
							type="password"
							id="password"
							value={password}
							onChange={(e) => {
								setPassword(e.target.value);
							}}
						/>
					</div>
					<div>
						<label htmlFor="password-confirm">Confirm Password</label>
						<input
							type="password"
							id="password-confirm"
							value={passwordConfirm}
							onChange={(e) => {
								setPasswordConfirm(e.target.value);
							}}
						/>
					</div>

					<input type="submit" value="Login" className="btn" />
				</form>

				<p className="text-center">
					Already have an account? <Link href="/account/login">Login</Link>
				</p>
			</div>
		</Layout>
	);
}
