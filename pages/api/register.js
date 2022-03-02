import { API_URL } from "@/config/index.js";
import cookie from "cookie";

const register = async (req, res) => {
	if (req.method === "POST") {
		const { username, email, password } = req.body;

		const strapiRes = await fetch(`${API_URL}/api/auth/local/register`, {
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

		const data = await strapiRes.json();

		if (strapiRes.ok) {
			// @ Set Cookie
			res.setHeader(
				"Set-Cookie",
				cookie.serialize("token", data.jwt, {
					httpOnly: true,
					secure: process.env.NODE_ENV !== "development",
					maxAge: 60 * 60 * 24 * 7,
					path: "/",
				})
			);

			res.status(200).json({ user: data.user });
		} else {
			if (data.error) {
				const errors = data.error.details.errors;

				res.status(data.error.status).json({ errors: [errors] });
			}
		}
	} else {
		res.setHeader("Allow", ["POST"]);
		res.status(405).json({ message: `Method ${req.method} not allowed!!!!` });
	}
};

export default register;
