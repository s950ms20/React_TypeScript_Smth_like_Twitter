import * as React from 'react';
import { Posts } from './Posts';
import { AddNewPost } from './AddNewPost';
import { GlobalContext, firestoreDoc } from '../state/GlobalContext';

interface Props {}

export const Wall: React.FC<Props> = (props) => {
	const global = React.useContext(GlobalContext);

	return (
		<React.Fragment>
			{global.email ? <AddNewPost /> : null}
			<Posts pst={global.selectedPost} />
		</React.Fragment>
	);
};
