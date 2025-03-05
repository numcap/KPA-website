import pg from "pg";
import process from "process";

const { Pool } = pg;
const pool = new Pool({
	connectionString: process.env.PG_STRING,
	ssl: { rejectUnauthorized: false },
});

// handle post requests
export const POST = async (req) => {
	const body = await req.json();
	const { title, date, startTime, endTime, location } = body;

	// query the db using the data given
	try {
        await pool.query(
            "INSERT INTO calendar_dates(title, date, start_time, end_time, location) VALUES($1, $2, $3, $4, $5)",
			[title, date, startTime, endTime, location]
		);
        return new Response(JSON.stringify({title, date, startTime, endTime, location}), {status: 200})
	} catch {
		return new Response(JSON.stringify({ error: "could not create event" }), {
			status: 400,
		});
	}
};

// handle get requests
export const GET = async () => {
    try {
		// query the db for the latest events
        const data = await pool.query("SELECT * FROM public.calendar_dates WHERE date > CURRENT_DATE - INTERVAL '2 DAY' ORDER BY date ASC ")
        return new Response(JSON.stringify({events: data.rows}), {status: 200})
    } catch (error) {
        return new Response(JSON.stringify({error}), {status: 500})
    }
}