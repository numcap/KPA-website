import { useEffect, useState } from "react";
import { CgSpinner } from "react-icons/cg";
import { useInView } from "react-intersection-observer";
import { usePositionValue } from "../contexts";

export const Calendar = () => {
	const [eventsInfo, setEventsInfo] = useState([]);
	const [loading, setLoading] = useState(false);
	const { ref, inView } = useInView();
	const { setScrollPosition } = usePositionValue();

	useEffect(() => {
		fetchEvents();
	}, []);

	useEffect(() => {
		if (inView) {
			setScrollPosition({
				home: false,
				about: false,
				contact: false,
				calendar: true,
			});
		}
	}, [inView]);

	function convertToAmPm(time) {
		return new Date(`1970-01-01T${time}`).toLocaleTimeString("en-US", {
			hour: "2-digit",
			minute: "2-digit",
			hour12: true,
		});
	}

	async function fetchEvents() {
		setLoading(true); //uncomment in prod
		await fetch("/api/calendar/addEvent", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => res.json())
			.then((data) => {
				setEventsInfo(data.events);
			})
			.catch((err) => console.error(err));
		setLoading(false);
	}

	return (
		<div className='mx-10 my-40 sm:mx-28 md:m-40 p-10 bg-neutral-100 rounded-3xl scale-[1.07] bg-opacity-90 transition-all duration-300 3xl:mx-[30vw] gap-8 flex flex-col'>
			<p className='text-center text-5xl sm:text-6xl font-medium '>
				Upcoming Events
			</p>
			<span ref={ref} className='flex flex-col gap-16'>
				{!loading ? (
					eventsInfo.length > 0 ? (
						eventsInfo.map((eventInfo) => {
							return (
								<div className='flex sm:flex-row flex-col sm:gap-12 gap-5' key={eventInfo.event_id}>
									<div className='flex flex-col items-center'>
										<p className='font-extralight text-3xl'>
											{new Date(eventInfo.date).toString().split(" ")[1]}
										</p>
										<p className='font-bold text-5xl'>
											{new Date(eventInfo.date).toString().split(" ")[2]}
										</p>
									</div>
									<div className='flex flex-col py-2'>
										<p className="text-center sm:text-left">
											{convertToAmPm(eventInfo.start_time)} -{" "}
											{convertToAmPm(eventInfo.end_time)}
										</p>
										<p className='text-2xl font-extrabold text-wrap text-center sm:text-left'>
											{eventInfo.title}
										</p>
										<p className='text-1xl font-light text-wrap text-center sm:text-left'>
											{eventInfo.location}
										</p>
									</div>
								</div>
							);
						})
					) : (
						<>
							<p className='text-center text-2xl'>
								Looks Like There Are No Events Coming Up...
							</p>
							<p className='text-center text-2xl'>
								Stay Tuned for Any Upcoming Events
							</p>
						</>
					)
				) : (
					<div className='m-10 flex justify-center'>
						<CgSpinner className='z-50 w-32 h-32 animate-spin text-black' />
					</div>
				)}
			</span>
		</div>
	);
};
