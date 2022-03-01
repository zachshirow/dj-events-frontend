import { API_URL } from "@/config/index.js";

const login = async (req, res) => {
	if (req.method === "POST") {
		const { identifier, password } = req.body;

		const strapiRes = await fetch(`${API_URL}/api/auth/local`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				identifier,
				password,
			}),
		});

		const data = await strapiRes.json();

		if (strapiRes.ok) {
			// @todo - set the cookie

			res.status(200).json({ user: data.user });
			console.log(data.jwt);
		} else {
			if (data.error) {
				const { status, name, message, details } = data.error;
				res.status(status).json({ name, message, details });
			}
		}
	} else {
		res.setHeader("Allow", ["POST"]);
		res.status(405).json({ message: `Method ${req.method} not allowed!!!!` });
	}
};

export default login;
