import * as React from 'react';
import { Redirect, RedirectProps } from 'react-router-dom';
interface Props {}

export const Dashboard: React.FC<Props> = (props) => {
	return (
		<React.Fragment>
			<Redirect to="/dashboard" />
		</React.Fragment>
	);
};
