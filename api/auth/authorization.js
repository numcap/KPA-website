import jwt from "jsonwebtoken";
import process from "process";
import { parse } from "cookie";
import pg from "pg";

// connecting to postgres db on Neon
const { Pool } = pg;
const pool = new Pool({
	connectionString: process.env.PG_STRING,
	ssl: { rejectUnauthorized: false },
});

// handling Post request
export const POST = async (req) => {
	try {
		// obtain refresh token and access token
		const authHeader =
			req.headers.get("Authorization") === "undefined"
				? false
				: req.headers.get("Authorization");

		const cookies = parse(req.headers.get("cookie") || "");
		const refreshToken = cookies.refresh_token;

		const user = await pool.query(
			"SELECT * FROM admins WHERE reset_token = $1",
			[refreshToken]
		);

		// check if there is Access token
		if (!authHeader) {
			generateNewAccessToken(refreshToken, user);
		}

		try {
			// check the access token, if verified then return ok status
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
	// check if user has an refresh token saved, if not they need to sign in
	if (!user.rowCount || user.rows[0].reset_token != refreshToken) {
		return new Response(JSON.stringify({ error: "Please sign in" }), {
			status: 403,
		});
	}

	try {
		// verify the refresh token, and sign a new access token to return
		jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
		const accessToken = jwt.sign(
			{ username: user.rows[0].username, id: user.rows[0].id },
			process.env.ACCESS_TOKEN_SECRET,
			{ expiresIn: 60 * 60 * 24 }
		);
		return new Response(JSON.stringify({ accessToken }), { status: 200 });
	} catch {
		// if it throws an error then the refresh token could not be verified
		return new Response(
			JSON.stringify({ error: "Could not verify refresh token" }),
			{
				status: 400,
			}
		);
	}
}
