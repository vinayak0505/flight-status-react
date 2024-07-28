import UserType from '../../redux/model/user/UserType';
import Styles from './SideBar.module.scss';
import { NavLink, useLocation } from 'react-router-dom';

const SideBar = ({ user, children }: { user: UserType; children: JSX.Element | undefined }) => {

	const location = useLocation();

	return (
		<div className={Styles.main}>
			<aside
				id="separator-sidebar"
				className="fixed left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
				aria-label="Sidebar"
			>
				<div className="h-full px-3 py-4 overflow-y-auto">
					{user && location.pathname !=='/profile' && (
						<div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mb-4">
							<div className="flex flex-col items-center pb-6 pt-6">
								<h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
									{user?.fullName}
								</h5>
								<span className="text-sm text-gray-500 dark:text-gray-400">
									{user?.email}
								</span>
							</div>
						</div>
					)}

					<ul className="space-y-2 font-medium bg-gray-50 dark:bg-gray-800 rounded-lg  border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-4">
						<li>
							<NavLink
								to="/"
								className="flex items-center p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group"
							>
								<span className="ms-3">Dashboard</span>
							</NavLink>
						</li>
						<li>
							<NavLink
								to="/ticket"
								className="flex items-center p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group"
							>
								<span className="ms-3">Ticket</span>
							</NavLink>
						</li>
					</ul>
				</div>
			</aside>
			<aside
				id="separator-sidebar-right"
				className="fixed right-0  w-64 h-screen transition-transform translate-x-full lg:-translate-x-0"
				aria-label="Sidebar"
			>
				<div className="h-full px-3 py-4 overflow-y-auto">
					<div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
						<div className="flex flex-col items-center pb-6 pt-6">
							{/* todo add advertisement */}
							advertisement
						</div>
					</div>
				</div>
			</aside>
			<div className="p-4 sm:ml-64 lg:mr-64">
				<div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
					{children}
				</div>
			</div>
		</div>
	);
};

export default SideBar;
