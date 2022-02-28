import { FaEye, FaUser } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import Layout from "@/components/Layout";
import styles from "@/styles/AuthForm.module.css";

export default function LoginPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState("password");

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log({ email, password });
	};

	return (
		<Layout title="User Login">
			<div className={styles.auth}>
				<h1>
					<FaUser /> Login
				</h1>
				<ToastContainer />
				<form onSubmit={handleSubmit}>
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
							type={showPassword}
							id="password"
							value={password}
							onChange={(e) => {
								setPassword(e.target.value);
							}}
						/>
						<p className="text-right">
							<span
								className="btn-tertiary"
								onClick={() => {
									switch (showPassword) {
										case "password":
											setShowPassword("text");
											return;
										case "text":
											setShowPassword("password");
											return;
									}
								}}>
								Show Password
							</span>
						</p>
					</div>

					<input type="submit" value="Login" className="btn" />
				</form>

				<p className="text-center">
					Don&apos;t have an account?{" "}
					<Link href="/account/register">Register</Link>
				</p>
			</div>
		</Layout>
	);
}
