import Carousel from "../carousel/Carousel"

const images = [
    {
        src: "https://campaignsoftheworld.com/wp-content/uploads/2021/03/Indigo_airlines_Fly_Bakshi_Fly.jpg",
        alt: "Come Fly With Us",
        link: "https://www.goindigo.in/flight-booking.html"
    },
    {
        src: "https://mir-s3-cdn-cf.behance.net/project_modules/max_3840/e67a3b11444599.560f7c63210a7.jpg",
        alt: "Go Fishing",
        link: "https://www.goindigo.in/flight-booking.html"
    },
    {
        src: "https://newspaperads.ads2publish.com/wp-content/uploads/2018/01/indigo-goindigo-in-time-after-time-ad-the-hindu-chennai-30-01-2018.jpg",
        alt: "Time after time",
        link: "https://www.goindigo.in/flight-booking.html"
    },
    {
        src: "https://cdn.i.haymarketmedia.asia/?n=campaign-india%2Fcontent%2FPRESS+AD+12x20_CT.jpg",
        alt: "We are international",
        link: "https://www.goindigo.in/flight-booking.html"
    },
];
const Advertisement = () => {
    return (
        <Carousel images={images} />
    )
}

export default Advertisement;