import * as React from 'react';
import { Post } from './Post';
import { db } from '../fb';

interface Props {
	email: string;
}

export type firestoreDoc = {
	title: string;
	content: string;
	author: string;
	id: string;
	time: string;
};

export const Posts: React.FC<Props> = ({ email }) => {
	let [ posts, setPosts ] = React.useState<firestoreDoc[]>([]);
	let [ cleanUpHelper, setCleanUpHelper ] = React.useState('');

	React.useEffect(
		() => {
			let posts: firestoreDoc[] = [];

			const getData = async () => {
				await db
					.collection('posts')
					.orderBy('time', 'desc')
					.get()
					.then((querySnapshot) => {
						querySnapshot.forEach((doc) => {
							posts.push({
								title: doc.data().title,
								content: doc.data().content,
								author: doc.data().author,
								id: doc.id,
								time: doc.data().time
							});
						});
						setPosts(posts);
					})
					.catch((error: any) => {
						console.log(error.message);
					});

				setCleanUpHelper(posts[0].id);
				console.log(`cleanUpHelper:  ${cleanUpHelper}; posts length -> ${posts.length} `);
				// BE CAREFUL -> INFINITE LOOPS!
			};

			getData();
			return () => {
				console.log('data base updated.');
			};
		},
		[ setCleanUpHelper ]
	);
	const deletePost = (id: string) => {
		db
			.collection('posts')
			.doc(id)
			.delete()
			.then(() => {
				console.log(`Document ${id} successfully deleted!`);
			})
			.catch((error) => {
				console.log(`Error removing document ${id}: ${error.message}`);
			});

		const updatedPosts = posts.filter((post: firestoreDoc) => post.id !== id);
		setPosts(updatedPosts);
		console.log(id);
	};

	const showSinglePost = (id: string) => {
		const selectedPost = posts.filter((post: firestoreDoc) => post.id === id);
		setPosts(selectedPost);
		console.log(id);
	};

	console.log('test');

	return (
		<React.Fragment>
			<h1>POSTS:</h1>
			{posts.map((pst: firestoreDoc, idx: number) => {
				return (
					<div key={idx}>
						<Post pst={pst} deletePost={deletePost} showSinglePost={showSinglePost} email={email} />
					</div>
				);
			})}
		</React.Fragment>
	);
};
