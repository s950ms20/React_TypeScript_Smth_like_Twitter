import * as React from 'react';
import { GlobalContext, firestoreDoc } from '../state/GlobalContext';
import { Link } from 'react-router-dom';
import { Posts } from './Posts';

interface Props {
	id: string;
}

export const SinglePost: React.FC<Props> = ({ id }) => {
	const global = React.useContext(GlobalContext);

	return (
		<React.Fragment>
			<Posts pst={global.selectedPost} />
			<Link to="/">
				<button onClick={global.updateControler}>Go Back</button>
			</Link>
		</React.Fragment>
	);
};
