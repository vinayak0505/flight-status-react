import { useEffect, useState } from 'react';
import Styles from './Carousel.module.scss';

const Carousel = ({
	images,
	visible = true
}: {
	images: { src: string; link: string, alt: string }[];
	visible?: boolean;
}) => {
	const [slider, setSlider] = useState(0);

	const nextSlider = () => {
		setSliderNumber((slider + 1) % images.length);
	};

	const prevSlider = () => {
		setSliderNumber((slider - 1 + images.length) % images.length);
		setSlider((slider + images.length - 1) % images.length);
	};

	const setSliderNumber = (index: number) => {
		if (index === slider) return;
		document.getElementById(`data-carousel-home-item-${slider}`)?.classList.add('hidden');
		document
			.getElementById(`data-carousel-home-button-${slider}`)
			?.classList.remove('dark:bg-gray-800');
		document
			.getElementById(`data-carousel-home-button-${slider}`)
			?.classList.add('dark:bg-gray-500');
		document.getElementById(`data-carousel-home-item-${index}`)?.classList.remove('hidden');
		document
			.getElementById(`data-carousel-home-button-${index}`)
			?.classList.remove('dark:bg-gray-500');
		document.getElementById(`data-carousel-home-button-${index}`)?.classList.add('dark:bg-gray-800');
		setSlider(index);
	};

	useEffect(() => {
		if (visible === false) return;
		document.getElementById(`data-carousel-home-item-0`)?.classList.remove('hidden');
		document.getElementById(`data-carousel-home-button-0`)?.classList.add('dark:bg-gray-800');
		document.getElementById(`data-carousel-home-button-0`)?.classList.remove('dark:bg-gray-500');
	}, [visible]);
	if (visible === false) return <></>;
	return (
		<>
			<div
				id="default-carousel"
				className={'relative w-full ' + Styles.ele}
				data-carousel="slide"
			>
				{/* <!-- Carousel wrapper --> */}
				<div className="relative h-full overflow-hidden rounded-lg ">
					{/* <!-- Item 1 --> */}
					{images.map((image, index) => (
						<div
							key={index}
							className="hidden h-96 duration-700 ease-in-out "
							id={`data-carousel-home-item-${index}`}
						>
							<a href={image.link} target="_blank" rel="noreferrer">
								<img
									src={image.src}
									className="h-96 border-2 border-white-500 absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
									alt={image.alt}
								/>
							</a>
						</div>
					))}
				</div>
				{/* <!-- Slider indicators --> */}
				<div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
					{images.map((_, index) => (
						<button
							key={index}
							type="button"
							id={`data-carousel-home-button-${index}`}
							className="w-4 h-4 rounded-full dark:bg-gray-500 border-2 border-white-500"
							onClick={() => setSliderNumber(index)}
						></button>
					))}
				</div>
				{/* <!-- Slider controls --> */}
				<button
					type="button"
					className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
					onClick={prevSlider}
				>
					<span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-white/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
						<svg
							className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 6 10"
						>
							<path
								stroke="currentColor"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M5 1 1 5l4 4"
							/>
						</svg>
						<span className="sr-only">Previous</span>
					</span>
				</button>
				<button
					type="button"
					className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
					onClick={nextSlider}
				>
					<span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-white/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
						<svg
							className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 6 10"
						>
							<path
								stroke="currentColor"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="m1 9 4-4-4-4"
							/>
						</svg>
						<span className="sr-only">Next</span>
					</span>
				</button>
			</div>
		</>
	);
};
export default Carousel;
