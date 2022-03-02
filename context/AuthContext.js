import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { NEXT_URL } from "@/config/index";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [error, setError] = useState(null);

	useEffect(() => checkUserLoggedIn(), []);

	const router = useRouter();

	//register user
	const register = async (user) => {
		const { username, email, password } = user;
		const res = await fetch(`${NEXT_URL}/api/register`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				username,
				email,
				password,
			}),
		});

		const data = await res.json();

		if (res.ok) {
			setUser(data.user);
			router.push("/account/dashboard");
		} else {
			setError(data.errors[0]);
			setError(null);
		}
	};

	//login user
	const login = async ({ email: identifier, password }) => {
		const res = await fetch(`${NEXT_URL}/api/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				identifier,
				password,
			}),
		});

		const data = await res.json();

		if (res.ok) {
			setUser(data.user);
			router.push("/account/dashboard");
		} else {
			setError(data.errors[0]);
			setError(null);
		}
	};
	//logout user
	const logout = async () => {
		const res = await fetch(`${NEXT_URL}/api/logout`, {
			method: "POST",
		});

		if (res.ok) {
			setUser(null);
			router.push("/");
		}
	};

	//check is user is logged in
	const checkUserLoggedIn = async () => {
		const res = await fetch(`${NEXT_URL}/api/user`);

		const data = await res.json();

		if (res.ok) {
			setUser(data.user);
		} else {
			setUser(null);
		}
	};

	return (
		<AuthContext.Provider value={{ user, error, register, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
