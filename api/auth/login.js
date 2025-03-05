import pg from "pg";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import process from "process";
import { serialize } from "cookie";

dotenv.config({ path: "../.env" });
const { Pool } = pg;

const pool = new Pool({
	connectionString: process.env.PG_STRING,
	ssl: { rejectUnauthorized: false },
});

export const POST = async (req) => {
	try {
		const body = await req.json();

		const { username, password } = body;

		const user = await pool.query("SELECT * FROM admins WHERE username = $1", [
			username,
		]);

		if (!user.rowCount) {
			return new Response(JSON.stringify({ error: "User Not Found" }), {
				status: 401,
			});
		}

		const hashed_password = user.rows[0].password_hash;
		const id = user.rows[0].id;

		if (await bcrypt.compare(password, hashed_password)) {
			const accessToken = jwt.sign(
				{ username: username, id: id },
				process.env.ACCESS_TOKEN_SECRET,
				{ expiresIn: 60 * 60 * 24 }
			);

			const refreshToken = jwt.sign(
				{ username: username, id: id },
				process.env.REFRESH_TOKEN_SECRET,
				{ expiresIn: 60 * 60 * 24 * 7 }
			);

			await pool.query("UPDATE admins SET reset_token = $1 WHERE id = $2", [
				refreshToken,
				id,
			]);

			return new Response(JSON.stringify({ accessToken }), {
				status: 200,
				headers: {
					"Set-Cookie": serialize("refresh_token", refreshToken, {
						httpOnly: true,
						secure: true, // change to true in prod
						sameSite: "None",
						path: "/",
						maxAge: 60 * 60 * 24 * 7,
					}),
					"Content-Type": "application/json",
				},
			});
		} else {
			return new Response(JSON.stringify({ error: "incorrect password" }), {
				status: 401,
			});
		}
	} catch (e) {
		return new Response(JSON.stringify({ error: e }), { status: 500 });
	}
};
