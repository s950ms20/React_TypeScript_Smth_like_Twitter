import * as React from 'react';
import { auth } from '../fb';
import { Redirect, RedirectProps } from 'react-router-dom';
import App from '../App';

interface Props {
	email: string;
	history: any;
}

export const Logout: React.FC<Props> = ({ email, history }) => {
	const [ shouldRedirect, setShouldRedirect ] = React.useState(false);

	const redirect = (history: History): void => {
		history.pushState(null, '/');
	};
	const logout = () => {
		auth.signOut().then(() => alert('You are Logged Out!')).catch((error) => {
			alert(error.message);
		});

		setShouldRedirect(true);
	};

	return (
		<React.Fragment>
			{shouldRedirect ? (
				<Redirect to="/dashboard" />
			) : (
				<div className="box">
					<p>Hello {email}!</p>
					<button onClick={logout}>Logout</button>
				</div>
			)}
		</React.Fragment>
	);
};
