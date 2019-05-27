import * as React from 'react';
import { Login } from './Login';
import { Logout } from './Logout';
import { GlobalContext } from '../state/GlobalContext';

interface Props {
	history: any;
}

export const UserPanel: React.FC<Props> = () => {
	const global = React.useContext(GlobalContext);

	return (
		<React.Fragment>
			{global.minimizeToIconUserPanel ? null : (
				<React.Fragment>{global.userUID ? <Logout history={history} /> : <Login />}</React.Fragment>
			)}
		</React.Fragment>
	);
};
