import * as React from 'react';
import { auth } from '../fb';
import { Link } from 'react-router-dom';

interface Props {}

export const Login: React.FC<Props> = (props) => {
	const [ email, setEmail ] = React.useState('');
	const [ password, setPassword ] = React.useState('');

	const login = (event: any) => {
		event.preventDefault();
		auth.signInWithEmailAndPassword(email, password).catch((error) => {
			alert(error.message);
		});
		auth.onAuthStateChanged((user) => {
			if (user) {
				// User is signed in.
				const email = user.email;
				console.log(email);
				const uid = user.uid;
			} else {
				console.log('User is Logged Out');
			}
		});
	};

	return (
		<React.Fragment>
			<div className="box">
				<form>
					<input
						type="email"
						name="email"
						placeholder="email..."
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<br />
					<input
						type="password"
						name="password"
						placeholder="password..."
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<br />
					<button onClick={login}>Login</button>
					<Link to="/register">
						<button>Unregistered User?</button>
					</Link>
				</form>
			</div>
		</React.Fragment>
	);
};
