import { FaInstagram } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { TbBrandLinktree } from "react-icons/tb";
import { Link } from "react-router";

export const Footer = () => {
	return (
		<div className='bg-white flex flex-col items-center sm:flex-row h-fit'>
			<div className='w-48 h-44 m-10 my-0 mt-8 sm:m-10'>
				<img
					src='./images/icons/KPA1.png'
					alt='KPA logo and title'
					className='size-full cursor-pointer'
					onClick={() => window.scrollTo(0, 0)}
				/>
			</div>
			<div className='flex-1 h-40 mx-10 my-0 mb-8 sm:m-10 flex flex-col gap-4 items-center sm:items-start'>
				<p className='font-medium text-2xl text-center sm:text-left'>
					King&apos;s Psychology Association (KPA)
				</p>
				<div className='flex gap-x-5 justify-center sm:justify-start'>
					<a href='https://www.instagram.com/kingspsych?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=='>
						<FaInstagram className='w-10 h-10 text-kings-green-500 hover:text-kings-gold-500 transition-all duration-300 cursor-pointer' />
					</a>
					<a href='https://linktr.ee/kingspsychassociation?utm_source=linktree_profile_share&ltsid=b44fed9f-f255-4169-97fa-6f0f5a8b0a6c'>
						<TbBrandLinktree className='w-10 h-10 text-kings-green-500 hover:text-kings-gold-500 transition-all duration-300 cursor-pointer' />
					</a>
					<a href='mailto:psych.association@kucsc.com'>
						<IoIosMail className='w-10 h-10 text-kings-green-500 hover:text-kings-gold-500 transition-all duration-300 cursor-pointer' />
					</a>
				</div>
				<Link className='bg-kings-green-500 w-fit text-white px-3 py-1.5 rounded-lg hover:bg-kings-gold-500 transition-all duration-300' to='/login'>
					Admin Login
				</Link>
			</div>
		</div>
	);
};
