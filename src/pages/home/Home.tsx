import Carousel from '../../components/carousel/Carousel';
import Card from '../../components/cards/Card';
import ResponsiveGrid from '../../components/grid/ResponsiveGrid';
import { useSelector } from 'react-redux';
import { alertSelector } from '../../redux/reducer/alert.reducer';

const data = [
	{
		title: 'Jobs',
		body: 'Get all latest jobs post here',
		link: '/jobs',
		image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0ZWE-Ya5wIZxIJcfbB0_2TsqnnKGGwlrVcPnw1xkcbw&s',
		button: 'View Jobs'
	},
	{
		title: 'Books',
		body: 'Download books for free',
		link: '/books',
		image: './images/bookImage.png',
		button: 'View Books'
	},
	{
		title: 'Notes',
		body: 'You can find handwritten notes from all students',
		link: '/notes',
		image: './images/notesImage.png',
		button: 'View Notes'
	},
	{
		title: 'Question Paper',
		body: 'Previous years Question paper from different universities',
		link: '/paper',
		image: 'https://cdn-icons-png.flaticon.com/512/4542/4542505.png',
		button: 'View Paper'
	},

	{
		title: 'Practical File',
		body: 'See other students practical file',
		link: '/practical',
		image: 'https://static.vecteezy.com/system/resources/previews/017/337/613/non_2x/quality-folder-icon-flat-document-file-vector.jpg',
		button: 'View Practical'
	}
];

const Home = () => {
	const Alerts = useSelector(alertSelector).data;
	return (
		<>
			<Carousel
				visible={(Alerts?.length ?? 0) > 0}
				images={Alerts?.map((item) => ({ src: item.imageLink, link: item.link, alt: item.heading })) ?? []}
			/>
			<ResponsiveGrid maxChildrenWidth={220}>
				{data.map((item, index) => (
					<div key={index}>
						<Card
							title={item.title}
							body={item.body}
							link={item.link}
							image={item.image}
							maxWidth={80}
							maxTitleLines={2}
							maxBodyLines={4}
						/>
					</div>
				))}
			</ResponsiveGrid>
		</>
	);
};
export default Home;
