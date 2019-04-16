import * as React from 'react';
import { auth } from '../fb';
import { Link } from 'react-router-dom';

interface Props {
	history: any;
}

export const Register: React.FC<Props> = (props) => {
	const [ email, setEmail ] = React.useState('');
	const [ password, setPassword ] = React.useState('');

	const register = (event: any) => {
		event.preventDefault();
		auth.createUserWithEmailAndPassword(email, password).catch((error) => {
			alert(error.message);
		});
		email && password ? props.history.replace('/') : null;
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
					<Link to="/">
						<button>Go Back</button>
					</Link>
					<button onClick={register}>Register</button>
				</form>
			</div>
		</React.Fragment>
	);
};
