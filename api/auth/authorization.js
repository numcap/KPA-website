import jwt from "jsonwebtoken";
import process from "process";
import { parse } from "cookie";
import pg from "pg";

const { Pool } = pg;
const pool = new Pool({
	connectionString: process.env.PG_STRING,
	ssl: { rejectUnauthorized: false },
});

export const POST = async (req) => {
	try {
		const authHeader =
			req.headers.get("Authorization") === "undefined"
				? false
				: req.headers.get("Authorization");

		// this is for the refresh token
		// const cookies = parse(req.headers.get("cookie") || ""); // Parse cookie string
		// const refreshToken = cookies.refresh_token; // Get the refresh token
		const cookies = parse(req.headers.get("cookie") || "");
		const refreshToken = cookies.refresh_token;

		const user = await pool.query(
			"SELECT * FROM admins WHERE reset_token = $1",
			[refreshToken]
		);

		if (!authHeader) {
			generateNewAccessToken(refreshToken, user);
		}

		try {
			jwt.verify(authHeader, process.env.ACCESS_TOKEN_SECRET);
			return new Response(
				JSON.stringify({ verified: "This user is verified" }),
				{
					status: 200,
				}
			);
		} catch {
			return generateNewAccessToken(refreshToken, user);
		}
	} catch {
		return new Response(JSON.stringify({ error: "Server error" }), {
			status: 500,
		});
	}
};

function generateNewAccessToken(refreshToken, user) {
	if (!user.rowCount || user.rows[0].reset_token != refreshToken) {
		return new Response(JSON.stringify({ error: "Please sign in" }), {
			status: 403,
		});
	}

	try {
		jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
		const accessToken = jwt.sign(
			{ username: user.rows[0].username, id: user.rows[0].id },
			process.env.ACCESS_TOKEN_SECRET,
			{ expiresIn: 60 * 60 * 24 }
		);
		return new Response(JSON.stringify({ accessToken }), { status: 200 });
	} catch {
		return new Response(
			JSON.stringify({ error: "Could not verify refresh token" }),
			{
				status: 400,
			}
		);
	}
}
