import * as React from 'react';
import { auth } from '../fb';
import { Login } from './Login';
import { Logout } from './Logout';

interface Props {
	email: string;
	history: any;
}

export const UserPanel: React.FC<Props> = ({ email }) => {
	console.log(`Props z UserPanel ${email}`);
	const view = email ? (
		<React.Fragment>
			<Logout email={email} history={history} />
		</React.Fragment>
	) : (
		<Login />
	);

	return <React.Fragment>{view}</React.Fragment>;
};
