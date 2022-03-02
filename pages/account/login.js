import { FaEye, FaUser } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import Layout from "@/components/Layout";
import styles from "@/styles/AuthForm.module.css";
import AuthContext from "@/context/AuthContext";

export default function LoginPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState("password");

	const { login, error } = useContext(AuthContext);

	useEffect(() => {
		if (error) {
			for (var x = 0; x < error.length; x++) {
				toast.error(error[x].message);
			}
		}
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		login({ email, password });
	};

	return (
		<Layout title="User Login">
			<ToastContainer />
			<div className={styles.auth}>
				<h1>
					<FaUser /> Login
				</h1>

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
