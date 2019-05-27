import * as React from 'react';
import { Post } from './Post';
import { firestoreDoc } from '../state/GlobalContext';
import { GlobalContext } from '../state/GlobalContext';

interface Props {
	pst: firestoreDoc;
}

export const Posts: React.FC<Props> = ({ pst }) => {
	const global = React.useContext(GlobalContext);

	return (
		<React.Fragment>
			{global.minimizeToIconPosts ? null : (
				<React.Fragment>
					{global.posts.map((pst: firestoreDoc, idx: number) => {
						return (
							<div key={idx}>
								<Post pst={pst} />
							</div>
						);
					})}
				</React.Fragment>
			)}
		</React.Fragment>
	);
};
