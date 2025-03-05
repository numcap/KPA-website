import process from "process";
import pg from "pg";

const { Pool } = pg;

const pool = new Pool({
	connectionString: process.env.PG_STRING,
	ssl: { rejectUnauthorized: false },
});

// handles cron job request by vercel
export const GET = async (req) => {
	// verify the authorization with cron secret string
	if (
		req.headers.get("Authorization") !== `Bearer ${process.env.CRON_SECRET}`
	) {
		return new Response(
			{ message: "Cron Not Executed, Auth not accepted" },
			{ status: 401 }
		);
	}
	try {
		// clear old events in order to reduce strain on the db
		await pool.query(
			"DELETE FROM calendar_dates WHERE date < CURRENT_DATE - INTERVAL '3 DAY"
		);
		return new Response({ message: "Cron Executed" }, { status: 200 });
	} catch {
		return new Response(
			{ message: "Error querying database" },
			{ status: 500 }
		);
	}
};
