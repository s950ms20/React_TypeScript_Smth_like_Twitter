import * as React from 'react';
import { Posts } from './Posts';
import { AddNewPost } from './AddNewPost';

interface Props {
	email: string;
}

export const Wall: React.FC<Props> = ({ email }) => {
	const addNewPostView = email ? (
		<React.Fragment>
			<AddNewPost email={email} />
		</React.Fragment>
	) : null;

	return (
		<React.Fragment>
			{addNewPostView}
			<Posts email={email} />
		</React.Fragment>
	);
};
