import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { loginUser, signUpUser } from '../../redux/reducer/auth.reducer';
import { useAppDispatch } from '../../redux/store';
const Auth = ({ showLogin }: { showLogin: boolean }) => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const dispatch = useAppDispatch();

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (showLogin) {
			dispatch(loginUser({ email, password }));
		} else {
			dispatch(signUpUser({ email, password, name }));
		}
	};

	const nav = useNavigate();

	return (
		<section className="bg-gray-50 dark:bg-gray-900">
			<div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
				<NavLink
					to="/"
					className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
				>
					<img className="h-12 mr-2" src="./images/logo.png" alt="logo" />
				</NavLink>
				<div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
					<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
						<h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
							{showLogin ? 'Welcome back' : 'Create a new account'}
						</h1>
						<form className={'space-y-4 md:space-y-6 '} onSubmit={handleSubmit}>
							{!showLogin && (
								<div>
									<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
										Your Name
									</label>
									<input
										type="text"
										name="name"
										id="name"
										value={name}
										placeholder="••••••••"
										onChange={(e) => setName(e.target.value)}
										className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
										required={true}
									/>
								</div>
							)}
							<div>
								<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
									Your email
								</label>
								<input
									value={email}
									type="email"
									name="email"
									id="email"
									className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									placeholder="name@yourmail.com"
									required={true}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</div>
							<div>
								<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
									Password
								</label>
								<input
									type="password"
									name="password"
									id="password"
									value={password}
									placeholder="••••••••"
									onChange={(e) => setPassword(e.target.value)}
									className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									required={true}
								/>
							</div>
							{showLogin && (
								<div className="flex items-center justify-between">
									<div className="flex items-start"></div>
									<div className="text-sm font-medium text-blue-500 hover:underline dark:text-blue-600 cursor-pointer">
										Forgot password?
									</div>
								</div>
							)}
							<button
								type="submit"
								className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
							>
								{showLogin ? 'Sing in' : 'Sign up'}
							</button>
							{showLogin ? (
								<p className="text-sm font-light text-gray-500 dark:text-gray-400">
									Don’t have an account yet?{' '}
									<span
										className="font-medium text-blue-600 hover:underline dark:text-blue-500 cursor-pointer"
										onClick={() => nav('/register')}
									>
										Sign up
									</span>
								</p>
							) : (
								<p className="text-sm font-light text-gray-500 dark:text-gray-400">
									Already have an account?{' '}
									<span
										className="font-medium text-blue-600 hover:underline dark:text-blue-500"
										onClick={() => nav('/login')}
									>
										Sign in
									</span>
								</p>
							)}
						</form>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Auth;

// return (
// 	<>
// 		<div> auth</div>
// 		{showLogin ? <Login /> : <SignUp />}
// 		<button onClick={() => setShowLogin(!showLogin)}> {showLogin ? 'Register' : 'Login'}</button>
// 	</>
// );
