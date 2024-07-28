import { NavLink, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { logoutUser } from '../../redux/reducer/auth.reducer';
import { useAppDispatch } from '../../redux/store';
import Styles from './Nav.module.scss';
import UserType from '../../redux/model/user/UserType';
// import { DropDown } from '../custom_input/DropDown';
const Nav = ({ user }: { user: UserType }) => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	return (
		<nav className="bg-white fixed dark:bg-gray-900 w-full z-40 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
			<div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
				<NavLink to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
					<img src="/images/logo.png" alt="logo" className={Styles.logo} />
				</NavLink>
				<div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
					<button
						onClick={() => (user ? dispatch(logoutUser()) : navigate('/login'))}
						type="button"
						className="inline-flex items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
					>
						{user ? 'Logout' : 'Login'}
					</button>
				</div>
				<div
					className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
					id="navbar-sticky"
				>
					<ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
						<li>
							<NavLink
								to="/"
								className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
								aria-current="page"
							>
								Home
							</NavLink>
						</li>
						<li>
							<NavLink
								to="/ticket"
								className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
							>
								Tickets
							</NavLink>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default Nav;
