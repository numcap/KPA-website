import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { ImSpinner2 } from "react-icons/im";

export const Login = () => {
	const [loginInfo, setLoginInfo] = useState({
		username: "",
		password: "",
	});
	const [eventInfo, setEventInfo] = useState({
		title: "",
		date: "",
		startTime: "",
		endTime: "",
		location: "",
	});
	const [verified, setVerified] = useState(false);
	const [loadingScreen, setLoadingScreen] = useState(false);
	const [invalidCredentials, setInvalidCredentials] = useState(false);

	async function handleLogIn() {
		setLoadingScreen(true);

		const res = await fetch("/api/auth/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include", // Ensures refresh token is stored in cookies
			body: JSON.stringify({
				username: loginInfo.username,
				password: loginInfo.password,
			}),
		});
		if (res.ok) {
			const data = await res.json();
			Cookies.set("access_token", data.accessToken);
			setVerified(true);
			setInvalidCredentials(false);
		} else {
			setVerified(false);
			setInvalidCredentials(true);
		}
		setLoadingScreen(false);
	}

	useEffect(() => {
		const token = Cookies.get("access_token");
		checkAccessToken(token);
	}, []);

	async function checkAccessToken(token) {
		setLoadingScreen(true);
		const res = await fetch("/api/auth/authorization", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: token,
			},
			credentials: "include",
		});

		const data = await res.json();
		if (res.ok) {
			if ("accessToken" in data) {
				Cookies.set("access_token", data.accessToken, {expires: 1});
			}
			setVerified(true);
		} else {
			setVerified(false);
		}
		setLoadingScreen(false);
	}

	async function handleAddEvent() {

		await fetch("/api/calendar/addEvent", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(eventInfo),
		}).catch((e) => {
			console.error(e);
		});
	}

	return (
		<>
			{loadingScreen && (
				<div className='w-full h-full fixed bg-black z-30 bg-opacity-70 flex flex-col justify-center items-center gap-10'>
					<p className='text-5xl font-bold text-white'>Loading</p>
					<ImSpinner2 className='z-50 w-32 h-32 animate-spin text-white' />
				</div>
			)}
			{!verified ? ( // change to !verified after
				<div className='fixed top-[50%] translate-y-[-50%] right-[50%] translate-x-[50%] flex flex-col bg-kings-green-100 p-10 rounded-xl gap-5 items-center'>
					<p className='text-3xl'>KPA Admin Login</p>
					<input
						type='text'
						className='rounded-xl p-3'
						placeholder='username'
						onChange={(e) => {
							setLoginInfo({ ...loginInfo, username: e.target.value });
						}}
					></input>
					<input
						className='rounded-xl p-3'
						placeholder='password'
						onChange={(e) =>
							setLoginInfo({ ...loginInfo, password: e.target.value })
						}
					></input>
					<button
						className='bg-kings-green-300 w-fit p-2 rounded-xl transition-all hover:bg-kings-gold-500'
						onClick={() => handleLogIn()}
					>
						Log In
					</button>
					{invalidCredentials && (
						<p className=''>Incorrect Password or Username</p>
					)}
				</div>
			) : (
				<div className='fixed top-[50%] translate-y-[-50%] right-[50%] translate-x-[50%] flex flex-col bg-kings-green-100 p-10 rounded-xl gap-5 items-center'>
					<p className='text-3xl'>Add a new Event to the calendar</p>
					<span>
						<p className='text-xl font-bold'>Title</p>
						<input
							className='rounded-xl p-3'
							onChange={(e) => {
								setEventInfo({ ...eventInfo, title: e.target.value });
							}}
						></input>
					</span>
					<span>
						<p className='text-xl font-bold'>Date</p>
						<input
							type='date'
							className='rounded-xl p-3'
							onChange={(e) => {
								setEventInfo({ ...eventInfo, date: e.target.value });
							}}
						></input>
					</span>
					<span>
						<p className='text-xl font-bold text-center'>Start Time</p>
						<input
							type='time'
							className='rounded-xl p-3 px-5'
							onChange={(e) => {
								setEventInfo({ ...eventInfo, startTime: e.target.value });
							}}
						></input>
					</span>
					<span>
						<p className='text-xl font-bold text-center'>End Time</p>
						<input
							type='time'
							className='rounded-xl p-3 px-5'
							onChange={(e) => {
								setEventInfo({ ...eventInfo, endTime: e.target.value });
							}}
						></input>
					</span>
					<span>
						<p className='text-xl font-bold'>Location</p>
						<input
							className='rounded-xl p-3'
							onChange={(e) => {
								setEventInfo({ ...eventInfo, location: e.target.value });
							}}
						></input>
					</span>
					<button
						className='bg-kings-green-300 w-fit p-2 rounded-xl transition-all hover:bg-kings-gold-500'
						onClick={() => handleAddEvent()}
					>
						Add Event
					</button>
				</div>
			)}
		</>
	);
};
