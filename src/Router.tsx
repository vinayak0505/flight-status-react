import { Navigate, Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import Auth from './pages/auth/Auth';
import { authSelector } from './redux/reducer/auth.reducer';
import Home from './pages/home/Home';
import Nav from './components/nav/Nav';
import { useSelector } from 'react-redux';
import SideBar from './components/sidebar/SideBar';

function Router() {
	// todo temp setting user to work without auth
	// const user = { email: 'vinayakaggarwal05@gmail.com', fullName: 'Vinayak Agarwal', timeCreated: '', univercity: '', profile: null };
	// const user = useSelector(authSelector).user;
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

		if (adminOnly && !user.isAdmin) {
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
				// {
				// 	path: '/profile',
				// 	element: (
				// 		<Protected>
				// 			<ProfilePage />
				// 		</Protected>
				// 	)
				// },
				// {
				// 	path: '/profile/:id',
				// 	element: (
				// 		<Protected>
				// 			<ViewOnlyProfilePage />
				// 		</Protected>
				// 	)
				// },
				// {
				// 	path: 'favorite',
				// 	element: (
				// 		<Protected>
				// 			<FavoritePage />
				// 		</Protected>
				// 	)
				// },
				// {
				// 	path: '/upload/:uploadType',
				// 	element: (
				// 		<Protected>
				// 			<UploadPage />
				// 		</Protected>
				// 	)
				// },
				// {
				// 	path: '/add_alert',
				// 	element: (
				// 		<Protected adminOnly>
				// 			<AlertsUploadPage />
				// 		</Protected>
				// 	)
				// },
				// {
				// 	path: '/notifications',
				// 	element: <Notifications />
				// },
				// {
				// 	path: '/paper',
				// 	element: <PaperPage />
				// },
				// {
				// 	path: '/paper/:id',
				// 	element: <PaperDetailPage />
				// },
				// {
				// 	path: '/notes',
				// 	element: <NotesPage />
				// },
				// {
				// 	path: '/notes/:id',
				// 	element: <NotesDetailPage />
				// },
				// {
				// 	path: '/books',
				// 	element: <BooksPage />
				// },
				// {
				// 	path: '/books/:id',
				// 	element: <BookDetailPage />
				// },
				// {
				// 	path: '/practical',
				// 	element: <PracticalPage />
				// },
				// {
				// 	path: '/practical/:id',
				// 	element: <PracticlDetailsPage />
				// },
				// {
				// 	path: '/jobs',
				// 	element: <JobsPage />
				// },
				// {
				// 	path: '/jobs/:id',
				// 	element: <JobDetailPage />
				// },
			]
		}
	]);

	if (loading) return (
		<svg className='loading' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" width="200" height="200" xmlnsXlink="http://www.w3.org/1999/xlink">
			<path strokeWidth="12" stroke="#2563EB" fill="none" d="M50 15A35 35 0 1 0 74.74873734152916 25.251262658470843"></path>
			<path fill="#2563EB" d="M49 3L49 27L61 15L49 3"></path>
		</svg>);

	return (
		<>
			<RouterProvider router={browserRouter} />
		</>
	);
}

export default Router;
