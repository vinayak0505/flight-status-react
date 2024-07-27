import React, { useState } from 'react';
import { authSelector, signUpUser } from '../../../redux/reducer/auth.reducer';
import { useAppDispatch } from '../../../store';
import { useSelector } from 'react-redux';

const SignUp = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [rePassword, setRePassword] = useState('');

	const dispatch = useAppDispatch();

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		dispatch(signUpUser({ email, password, name }));
	};

	const { loading } = useSelector(authSelector);

	return (
		<div>
			<h1>Login</h1>
			<form onSubmit={handleSubmit}>
				<label>
					Full Name{' '}
					<input type="text" value={name} onChange={(e) => setName(e.target.value)} />
				</label>
				<br />
				<label>
					Email <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
				</label>
				<br />
				<label>
					Password{' '}
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</label>
				<br />
				<label>
					Re Enter Password{' '}
					<input
						type="password"
						value={rePassword}
						onChange={(e) => setRePassword(e.target.value)}
					/>
				</label>
				<br />
				<input type="submit" value={loading ? 'Loading...' : 'Submit'} />
			</form>
		</div>
	);
};

export default SignUp;
