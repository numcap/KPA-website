import { About } from "../Components/About";
import { JoinUs } from "../Components/JoinUs";
import { HeroBanner } from "../Components/HeroBanner";
import { Calendar } from "../Components/Calendar";

export const Content = () => (
	<div>
		<HeroBanner />
		<div className='bg-[url("/images/blobs.svg")] h-fit md:bg-cover md:relative md:bg-no-repeat bg-contain bg-repeat-y flex flex-col items-center'>
			<About />
			<JoinUs />
			<Calendar />
		</div>
	</div>
);
