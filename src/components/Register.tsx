import * as React from 'react';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../state/GlobalContext';

interface Props {
	history: any;
}

export const Register: React.FC<Props> = (props) => {
	const [ email, setEmail ] = React.useState('');
	const [ password, setPassword ] = React.useState('');
	const global = React.useContext(GlobalContext);

	const register = (event: any) => {
		event.preventDefault();
		global.registerNewUser(email, password);
		email && password ? props.history.replace('/profile') : null;
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
