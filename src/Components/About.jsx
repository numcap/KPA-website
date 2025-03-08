import { useState, useEffect } from "react";
import { usePositionValue } from "../contexts";
import { useInView } from "react-intersection-observer";

export const About = () => {
	const { setScrollPosition } = usePositionValue();
	const [, setInFocus] = useState(false);

	const { ref, inView } = useInView({ threshold: 1 });

	useEffect(() => {
		if (inView) {
			setScrollPosition({
				home: false,
				about: true,
				contact: false,
				calendar: false,
			});
			setInFocus(true);
		} else {
			setInFocus(false);
		}
	}, [inView]);

	return (
		<div
			ref={ref}
			className='mx-10 my-40 sm:mx-28 md:m-40 p-10 bg-neutral-100 rounded-3xl bg-opacity-90 transition-all duration-300 3xl:mx-[30vw]'
		>
			<h1 className='text-center text-5xl sm:text-7xl font-medium '>
				About us
			</h1>
			<p className='text-xl md:text-3xl pt-5 font-light'>
				Our club is a vibrant community of students passionate about exploring
				the human mind and behavior. Whether you&apos;re fascinated by why
				people think and act the way they do, interested in mental health, or
				curious about careers in psychology, this is the place for you!
			</p>
		</div>
	);
};
