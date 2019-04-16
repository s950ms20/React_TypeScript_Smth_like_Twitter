import * as React from 'react';
import { db } from '../fb';

interface Props {
	email: string;
}

export const AddNewPost: React.FC<Props> = ({ email }) => {
	const [ title, setTitle ] = React.useState('');
	const [ content, setContent ] = React.useState('');

	const add = () => {
		db
			.collection('posts')
			.doc()
			.set({
				title: title,
				content: content,
				author: email,
				time: Date()
			})
			.then(function() {
				console.log('Document successfully written!');
			})
			.catch(function(error) {
				console.error('Error writing document: ', error);
			});
	};

	const lorem = () => {
		const ipsum =
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis eos sit quos provident soluta? Quidem, earum quisquam ipsam fugit quo facere minima tempore distinctio laboriosam, obcaecati nobis nesciunt, numquam aliquam.';
		setTitle(String(Math.floor(10000 * Math.random())));
		setContent(ipsum);
	};

	const clear = () => {
		setTitle('');
		setContent('');
	};

	return (
		<React.Fragment>
			<div className="box">
				<input
					type="text"
					placeholder="Title......."
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
				<br />
				<textarea
					className="content"
					// type="text"
					placeholder="Content..."
					value={content}
					onChange={(e) => setContent(e.target.value)}
				/>
				<br />
				<button onClick={add}>Add</button>
				<button onClick={lorem}>Lorem Ipsum</button>
				<button onClick={clear}>Clear</button>
			</div>
		</React.Fragment>
	);
};
