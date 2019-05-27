import * as React from 'react';
import { auth } from '../fb';
import { Redirect, RedirectProps } from 'react-router-dom';
import { GlobalContext } from '../state/GlobalContext';
import user_icon from '../img/user_icon.svg';

interface Props {
	history: any;
}

export const Logout: React.FC<Props> = ({ history }) => {
	const [ shouldRedirect, setShouldRedirect ] = React.useState('');
	const global = React.useContext(GlobalContext);

	const logout = () => {
		auth.signOut().then(() => alert('You are Logged Out!')).catch((error) => {
			alert(error.message);
		});

		setShouldRedirect('dashboard');
	};

	const goToMyProfile = (): void => {
		setShouldRedirect('profile');
	};

	const rendering = () => {
		switch (shouldRedirect) {
			case 'dashboard':
				return <Redirect to="/dashboard" />;
			case 'profile':
				return <Redirect to="/profile" />;
			default:
				return (
					<div className="box">
						<img
							className="userPhoto"
							src={global.userPhoto ? global.userPhoto : user_icon}
							width="300px"
						/>

						<br />
						{global.userName ? null : <div className="box">Don't forget to update your profile!</div>}
						<p>Hello {global.userName}!</p>
						<button onClick={logout}>Logout</button>
						<button onClick={goToMyProfile}>My Profile</button>
					</div>
				);
		}
	};

	return <React.Fragment>{rendering()}</React.Fragment>;
};
