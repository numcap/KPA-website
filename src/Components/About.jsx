import { useState } from "react";
import { usePositionValue } from "../contexts";

export const About = () => {
	const { scrollPosition } = usePositionValue();
	const [inFocus, setInFocus] = useState(false);

	document.addEventListener("scroll", () => {
		if (scrollPosition.about == true) {
			setInFocus(true);
		} else {
			setInFocus(false);
		}
	});

	const divInFocus =
		"mx-10 my-40 sm:mx-28 md:m-40 p-10 bg-neutral-100 rounded-3xl scale-[1.07] bg-opacity-90 transition-all duration-300 3xl:mx-[30vw]";

	const div =
		"mx-10 my-40 md:m-40 p-10 bg-neutral-100 bg-opacity-30 rounded-3xl transition-all duration-300 3xl:mx-[30vw] sm:";

	return (
		<div className={inFocus ? divInFocus : div}>
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
