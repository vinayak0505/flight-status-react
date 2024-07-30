import { Navigate, Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import Auth from './pages/auth/Auth';
import { authSelector } from './redux/reducer/auth.reducer';
import Home from './pages/home/Home';
import Nav from './components/nav/Nav';
import { useSelector } from 'react-redux';
import SideBar from './components/sidebar/SideBar';
import BookFlight from './pages/book_flight/BookFlight';
import UserRole from './redux/model/user/UserRole';
import TicketPage from './pages/ticket/TicketPage';
import UpdateFlight from './pages/update_flight/UpdateFlight';
import Loading from './components/loading/Loading';

function Router() {

	const { user, loading } = useSelector(authSelector);
	
	// protected to prevent route that should not be acceble without logout
	const Protected = ({
		adminOnly = false,
		children
	}: {
		adminOnly?: boolean;
		children: JSX.Element | null;
	}) => {
		if (!user) {
			localStorage.setItem('path_history', window.location.pathname);
			return <Navigate to="/login" replace />;
		}

		if (adminOnly && (user?.role !== UserRole.ADMIN)) {
			return <Navigate to="/" replace />;
		}
		return children;
	};

	const LoggedIn = ({ children }: { children: JSX.Element }) => {
		if (user) {
			const path = localStorage.getItem('path_history') ?? '/';
			localStorage.removeItem('path_history');
			return <Navigate to={path} replace />;
		}
		return children;
	};

	// routes
	const browserRouter = createBrowserRouter([
		{
			path: '/login',
			element: (
				<LoggedIn>
					<Auth showLogin={true} />
				</LoggedIn>
			)
		},
		{
			path: '/register',
			element: (
				<LoggedIn>
					<Auth showLogin={false} />
				</LoggedIn>
			)
		},
		{
			path: '*',
			element: <Navigate to="/" replace />
		},
		{
			path: '/',
			element: (
				<>
					<Nav user={user} />
					<SideBar user={user}>
						<Outlet />
					</SideBar>
				</>
			),
			children: [
				{
					index: true,
					element: <Home />
				},
				{
					path: '/book_flight/:id',
					element: (
						<Protected>
							<BookFlight />
						</Protected>
					)
				},
				{
					path: '/update_flight/:id',
					element: (
						<Protected adminOnly>
							<UpdateFlight />
						</Protected>
					)
				},
				{
					path: '/ticket',
					element: (
						<Protected>
							<TicketPage />
						</Protected>
					)
				}
			]
		}
	]);

	if (loading) return (
		<div className={"h-screen w-screen"}>
			<Loading />
		</div>
	);

	return (
		<>
			<RouterProvider router={browserRouter} />
		</>
	);
}

export default Router;
