import Styles from './Loading.module.scss';
const Loading = () => {
    return <div className={"flex items-center justify-center h-full w-full"}>
        <svg className={Styles.loading_icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" width="200" height="200" xmlnsXlink="http://www.w3.org/1999/xlink">
            <path strokeWidth="12" stroke="#2563EB" fill="none" d="M50 15A35 35 0 1 0 74.74873734152916 25.251262658470843"></path>
            <path fill="#2563EB" d="M49 3L49 27L61 15L49 3"></path>
        </svg>
    </div>
}

export default Loading;