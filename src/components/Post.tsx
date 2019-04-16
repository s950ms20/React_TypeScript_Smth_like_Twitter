import * as React from 'react';
import { firestoreDoc } from './Posts';
import { Link } from 'react-router-dom';

interface Props {
	pst: firestoreDoc;
	deletePost: any;
	showSinglePost: any;
	email: string;
}

export const Post: React.FC<Props> = ({ pst, deletePost, showSinglePost, email }) => {
	let showDeleteButton = email ? (
		<button
			onClick={() => {
				deletePost(pst.id);
			}}
		>
			Delete
		</button>
	) : null;

	return (
		<React.Fragment>
			<div className="box">
				<div>
					<h1
						onClick={() => {
							showSinglePost(pst.id);
						}}
					>
						{pst.title}
					</h1>
					{showDeleteButton}
				</div>
				<div>{pst.id}</div>
				<div className="content">{pst.content}</div>
				<div className="author">
					created by: {pst.author}
					<br />
					@ {pst.time}
				</div>
			</div>
		</React.Fragment>
	);
};
