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
	const [eventAddModal, setEventAddModal] = useState({
		eventAdded: false,
		error: false,
	});

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
				Cookies.set("access_token", data.accessToken, { expires: 1 });
			}
			setVerified(true);
		} else {
			setVerified(false);
		}
		setLoadingScreen(false);
	}

	async function handleAddEvent() {
		if (
			!eventInfo.date ||
			!eventInfo.title ||
			!eventInfo.endTime ||
			!eventInfo.startTime ||
			!eventInfo.location
		) {
			setEventAddModal({ eventAdded: false, error: true });
			return;
		}
		await fetch("/api/calendar/addEvent", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(eventInfo),
		})
			.then((res) => {
				if (res.ok) {
					setEventAddModal({ eventAdded: true, error: false });
				} else {
					setEventAddModal({ eventAdded: false, error: true });
				}
			})
			.catch((e) => {
				setEventAddModal({ eventAdded: false, error: true });
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
				<>
					<div className='fixed top-[50%] translate-y-[-50%] right-[50%] translate-x-[50%] flex flex-col bg-kings-green-100 p-10 rounded-xl gap-5 items-center'>
						<p className='text-3xl'>Add a new Event to the calendar</p>
						<p className='text-xl'>Please fill all values</p>
						<span>
							<p className='text-xl font-bold'>
								Title <span className='text-red-500 inline'>*</span>{" "}
							</p>
							<input
								className='rounded-xl p-3'
								onChange={(e) => {
									setEventInfo({ ...eventInfo, title: e.target.value });
								}}
								value={eventInfo.title}
							></input>
						</span>
						<span>
							<p className='text-xl font-bold'>
								Date <span className='text-red-500 inline'>*</span>{" "}
							</p>
							<input
								type='date'
								className='rounded-xl p-3'
								onChange={(e) => {
									setEventInfo({ ...eventInfo, date: e.target.value });
								}}
								value={eventInfo.date}
							></input>
						</span>
						<span>
							<p className='text-xl font-bold text-center'>
								Start Time <span className='text-red-500 inline'>*</span>{" "}
							</p>
							<input
								type='time'
								className='rounded-xl p-3 px-5'
								onChange={(e) => {
									setEventInfo({ ...eventInfo, startTime: e.target.value });
								}}
								value={eventInfo.startTime}
							></input>
						</span>
						<span>
							<p className='text-xl font-bold text-center'>
								End Time <span className='text-red-500 inline'>*</span>{" "}
							</p>
							<input
								type='time'
								className='rounded-xl p-3 px-5'
								onChange={(e) => {
									setEventInfo({ ...eventInfo, endTime: e.target.value });
								}}
								value={eventInfo.endTime}
							></input>
						</span>
						<span>
							<p className='text-xl font-bold'>
								Location/Description <span className='text-red-500 inline'>*</span>{" "}
							</p>
							<input
								className='rounded-xl p-3'
								onChange={(e) => {
									setEventInfo({ ...eventInfo, location: e.target.value });
								}}
								value={eventInfo.location}
							></input>
						</span>
						<button
							className='bg-kings-green-300 w-fit p-2 rounded-xl transition-all hover:bg-kings-gold-500'
							onClick={() => handleAddEvent()}
						>
							Add Event
						</button>
					</div>
					{eventAddModal.eventAdded && (
						<div className='absolute flex flex-col bg-gray-500 text-white p-5 rounded-xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5/6 gap-5'>
							<p>Your Event has been added with these Details</p>
							<p>Title: {eventInfo.title}</p>
							<p>Date: {eventInfo.date}</p>
							<p>Start Time: {eventInfo.startTime}</p>
							<p>End Time: {eventInfo.endTime}</p>
							<p>Location/Description: {eventInfo.location}</p>
							<button
								className='py-2 m-3 rounded-full bg-kings-green-600'
								onClick={() => {
									setEventAddModal({ eventAdded: false, error: false });
									setEventInfo({
										title: "",
										date: "",
										startTime: "",
										endTime: "",
										location: "",
									});
								}}
							>
								Close
							</button>
						</div>
					)}
					{eventAddModal.error && (
						<div className='absolute flex flex-col bg-gray-500 text-white p-5 rounded-xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5/6'>
							<p>There has been an error with your request</p>
							<button
								className='py-2 m-3 rounded-full bg-kings-green-600'
								onClick={() => {
									setEventAddModal({ eventAdded: false, error: false });
								}}
							>
								Close
							</button>
						</div>
					)}
				</>
			)}
		</>
	);
};
