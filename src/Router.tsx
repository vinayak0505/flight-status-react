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

/**
 * 
 * @returns {JSX.Element}
 * react router dom for navigating between pages
 */
function Router() {

	// getting userdetails and loading state from store
	const { user, loading } = useSelector(authSelector);
	
	// protected to prevent route that should not be acceble without login
	// protected item cannot be visited by used that is not logged in
	// is will redirect to login page and after successfull login redirect back to protected item
	const Protected = ({
		adminOnly = false, // some pages are admin only so user need to have admin role to access it
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

	// if use is logged in then they will not able to reach login page
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
			path: '/login', // login page
			element: (
				<LoggedIn>
					<Auth showLogin={true} />
				</LoggedIn>
			)
		},
		{
			path: '/register', // signup page
			element: (
				<LoggedIn>
					<Auth showLogin={false} />
				</LoggedIn>
			)
		},
		{
			path: '*', // if some page is not found then redirect to home
			element: <Navigate to="/" replace />
		},
		{
			path: '/', // base page which will be always visible and has nav and sidebar
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

	// if user state is loading show loading screen
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
