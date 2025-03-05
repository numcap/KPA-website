import { useEffect, useState } from "react";
import { usePositionValue } from "../contexts";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross1 } from "react-icons/rx";

export const Navbar = () => {
	let btn =
		"m-3 rounded-xl py-2 px-5 hover:bg-kings-green-500 transition ease-in-out all duration-300 hover:text-white";
	let btn_active = "m-3 rounded-xl py-2 px-5 bg-kings-green-500 text-white";

	const { scrollPosition, setScrollPosition } = usePositionValue();
	const [isMobile, setIsMobile] = useState(undefined);
	const [menuActive, setMenuActive] = useState(false);

	// TODO: check if the users width is on mobile in order to change the buttons to a hamburger menu use  the sm (small screen) value in Tailwind

	window.addEventListener("resize", () => {
		if (window.outerWidth <= 640) setIsMobile(true);
		else setIsMobile(false);
	});

	useEffect(() => {
		if (window.outerWidth <= 640) setIsMobile(true);
		else setIsMobile(false);
	}, []);

	return (
		<div className='flex p-2 sticky top-0 bg-white z-50 cursor-pointer h-fit'>
			<div>
				<img
					src='./images/icons/KPA_plain.png'
					alt='KPA Icon'
					className='w-20 m-2 ml-5'
					onClick={() => window.scrollTo(0, 0)}
				></img>
			</div>
			{isMobile ? (
				<div className='h-20 m-2 flex-grow content-center'>
					<GiHamburgerMenu
						className='ml-auto h-9 w-9'
						onClick={() => setMenuActive(true)}
					/>
					{menuActive ? (
						<div
							className='bg-neutral-400 bg-opacity-55 w-[100vw] h-[100vh] absolute top-0 left-0'
							onClick={() => setMenuActive(false)}
						>
							<div className='absolute h-[100vh] w-40 right-0 top-0 bg-white flex flex-col justify-center items-center gap-6 animate-slideIn'>
								<RxCross1
									className='h-9 w-9 mb-10'
									onClick={() => setMenuActive(false)}
								/>
								<button
									className={scrollPosition.home ? btn_active : btn}
									onClick={() => {
										setScrollPosition({
											home: true,
											about: false,
											contact: false,
										});
										setMenuActive(false);
										window.scroll(0, 0);
									}}
								>
									Home
								</button>
								<button
									className={scrollPosition.about ? btn_active : btn}
									onClick={() => {
										setScrollPosition({
											home: false,
											about: true,
											contact: false,
										});
										setMenuActive(false);
										window.scroll(0, 750);
									}}
								>
									About
								</button>
								<button
									className={scrollPosition.contact ? btn_active : btn}
									onClick={() => {
										setScrollPosition({
											home: false,
											about: false,
											contact: true,
										});
										setMenuActive(false);
										window.scrollTo(0, 1400);
									}}
								>
									Contact
								</button>
								<button
									className={scrollPosition.calendar ? btn_active : btn}
									onClick={() => {
										setScrollPosition({
											home: false,
											about: false,
											contact: false,
											calendar: true,
										});
										setMenuActive(false);
										window.scrollTo(0, 2800);
									}}
								>
									Calendar
								</button>
							</div>
						</div>
					) : null}
				</div>
			) : (
				<div className='h-20 m-2 flex-grow content-center text-right cursor-default'>
					<button
						className={scrollPosition.home ? btn_active : btn}
						onClick={() => {
							window.scroll(0, 0);
							setScrollPosition({
								home: true,
								about: false,
								contact: false,
								calendar: false,
							});
						}}
					>
						Home
					</button>
					<button
						className={scrollPosition.about ? btn_active : btn}
						onClick={() => {
							window.scroll(0, 750);
							setScrollPosition({
								home: false,
								about: true,
								contact: false,
								calendar: false,
							});
						}}
					>
						About
					</button>
					<button
						className={scrollPosition.contact ? btn_active : btn}
						onClick={() => {
							window.scrollTo(0, 1400);
							setScrollPosition({
								home: false,
								about: false,
								contact: true,
								calendar: false,
							});
						}}
					>
						Contact
					</button>
					<button
						className={scrollPosition.calendar ? btn_active : btn}
						onClick={() => {
							window.scrollTo(0, 1900);
							setScrollPosition({
								home: false,
								about: false,
								contact: false,
								calendar: true,
							});
						}}
					>
						Calendar
					</button>
				</div>
			)}
		</div>
	);
};
