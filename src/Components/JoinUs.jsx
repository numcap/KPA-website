import { useEffect, useState } from "react";
import { usePositionValue } from "../contexts";
import { PiLinktreeLogo } from "react-icons/pi";
import { FaInstagram } from "react-icons/fa";
import { useInView } from "react-intersection-observer";

export const JoinUs = () => {
	const { setScrollPosition } = usePositionValue();
	const [inFocus, setInFocus] = useState(false);
	const [isMobile, setIsMobile] = useState(undefined);

	window.addEventListener("resize", () => {
		if (window.outerWidth <= 640) setIsMobile(true);
		else setIsMobile(false);
	});

	useEffect(() => {
		if (window.outerWidth <= 640) setIsMobile(true);
		else setIsMobile(false);
	}, []);

	const { ref, inView } = useInView();

	useEffect(() => {
		if (!isMobile) {
			if (inView) {
				setScrollPosition({
					home: false,
					about: false,
					contact: true,
					calendar: false,
				});
				setInFocus(true);
			} else {
				setInFocus(false);
			}
		}
	}, [inView]);

	const divInFocus =
		"mx-14 my-10 w-fit sm:m-20 md:m-40 md:my-10 p-10 bg-neutral-100 rounded-3xl scale-[1.05] sm:scale-[1.20] bg-opacity-90 transition-all duration-300 3xl:mx-[30vw]";

	const div =
		"mx-10 my-40 my-10 w-fit md:mb-10 md:my-40 p-10 bg-neutral-100 bg-opacity-30 rounded-3xl transition-all duration-300 3xl:mx-[30vw]";

	const optionInFocus =
		"p-10 md:p-5 lg:p-10 sm:mx-10 md:mx-0 md:w-[30%] bg-neutral-100 rounded-3xl scale-[1.05] bg-opacity-90 transition-all duration-300 flex flex-col items-center justify-end";

	const option =
		"md:w-[30%] p-10 md:p-2 bg-neutral-100 rounded-3xl bg-opacity-30 transition-all duration-300 flex flex-col items-center justify-end";

	return (
		<>
			<div className={isMobile ? divInFocus : inFocus ? divInFocus : div}>
				<h1 className='text-center lg:text-7xl md:text-4xl sm:text-4xl text-4xl font-medium'>
					How to Get Involved
				</h1>
			</div>
			<div className='flex place-content-center justify-evenly md:flex-row flex-col mx-16 gap-10'>
				<div
					className={
						isMobile ? optionInFocus : inFocus ? optionInFocus : option
					}
				>
					<h1 className='text-center text-3xl font-semibold pb-4'>Join Us</h1>
					<h1 className='text-center text-balance'>
						By Filling out this Google Form You can stay up to date with all the
						events and Officially be part of the club
					</h1>
					<a href='https://docs.google.com/forms/d/e/1FAIpQLSeKpceJHuDr3doCTobd707WlMdyun1fiOORmU4DAeG8L3QEgw/viewform'>
						<button className='mt-6 py-3 px-4 w-fit h-fit bg-kings-green-300 hover:scale-110 hover:bg-kings-green-500 transition-all duration-300 text-white rounded-2xl'>
							JOIN NOW
						</button>
					</a>
				</div>
				<div
					className={
						isMobile ? optionInFocus : inFocus ? optionInFocus : option
					}
				>
					<PiLinktreeLogo className='w-20 h-20' />
					<p className='text-center'>Want More Information About Us?</p>
					<p className='text-center'>
						Click the Button Below to be Taken to our Linktree
					</p>
					<a href='https://linktr.ee/kingspsychassociation?utm_source=linktree_profile_share&ltsid=b44fed9f-f255-4169-97fa-6f0f5a8b0a6c'>
						<button
							ref={ref}
							className='mt-5 py-3 px-4 w-fit h-fit bg-kings-green-300 hover:scale-110 hover:bg-kings-green-500 transition-all duration-300 text-white rounded-2xl'
						>
							Linktree
						</button>
					</a>
				</div>
				<div
					className={
						isMobile ? optionInFocus : inFocus ? optionInFocus : option
					}
				>
					<FaInstagram className='w-20 h-20' />
					<p className='text-center'>Want More Information About Us?</p>
					<p className='text-center'>
						Click the Button Below to be Taken to our Instagram
					</p>
					<a href='https://www.instagram.com/kingspsych?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=='>
						<button className='mt-5 py-3 px-4 w-fit h-fit bg-kings-green-300 hover:scale-110 hover:bg-kings-green-500 transition-all duration-300 text-white rounded-2xl'>
							Instagram
						</button>
					</a>
				</div>
			</div>
		</>
	);
};
