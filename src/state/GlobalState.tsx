import * as React from 'react';
import { auth, db } from '../fb';
import { GlobalContext, userDB, firestoreDoc } from './GlobalContext';

export const GlobalState = ({ children }: any) => {
	// USER-DB
	const [ uploadedImgUrl, setUploadedImgUrl ] = React.useState<any>('');
	const [ email, setEmail ] = React.useState('');
	const [ userUID, setUserUID ] = React.useState('');
	const [ userPhoto, setUserPhoto ] = React.useState<any>('');
	const [ userName, setUserName ] = React.useState<any>('');
	const [ editedName, setEditedName ] = React.useState('');
	const [ editedEmail, setEditedEmail ] = React.useState('');
	const [ allUsersData, setAllUsersData ] = React.useState<any>([]);

	//POSTS-DB
	let [ posts, setPosts ] = React.useState<firestoreDoc[]>([]);
	const [ id, setId ] = React.useState('');
	const [ title, setTitle ] = React.useState('');
	const [ content, setContent ] = React.useState('');
	const [ controler, setControler ] = React.useState(Number(Math.floor(Math.random() * 1000)));
	const [ selectedPost, setSelectedPost ] = React.useState<any>();

	//MENU-BUTTONS
	const [ minimizeToIconUserPanel, setMinimizeToIconUserPanel ] = React.useState(false);
	const [ minimizeToIconNewPost, setMinimizeToIconNewPost ] = React.useState(true);
	const [ minimizeToIconPosts, setMinimizeToIconPosts ] = React.useState(false);

	// AUTHENTICATION
	React.useEffect(
		() => {
			const authetication = () => {
				auth.onAuthStateChanged((user) => {
					if (user) {
						// User is signed in.
						const email = String(user.email);
						setEmail(email);
						setUserUID(user.uid);
						setUserPhoto(user.photoURL);
						setUserName(user.displayName);
					} else {
						// User is signed out.
						console.log('User is Logged Out');
					}
				});
			};
			authetication();

			// USER-DB
			const allUsersData: userDB[] = [];
			const getUserData = async () => {
				await db
					.collection('users')
					.get()
					.then((querySnapshot) => {
						querySnapshot.forEach((doc) => {
							allUsersData.push({
								userUID: doc.data().userUID,
								photoURL: doc.data().photoURL,
								email: doc.data().email,
								name: doc.data().name,
								docID: doc.id
							});
						});
						setAllUsersData(allUsersData);
						console.log('Users Data Downloaded');
					})
					.catch((error: any) => {
						console.log(error.message);
					});
			};
			getUserData();

			// POSTS-DB
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
								time: doc.data().time,
								img: doc.data().img
							});
						});
						setPosts(posts);
						setControler(posts.length);
					})
					.catch((error: any) => {
						console.log(error.message);
					});
			};

			getData();
			return () => {
				console.log('data base updated.');
				console.log(controler);
			};
		},
		[ userUID, controler ]
	);

	// USER-DB
	const addUserToDb = (newName: string, newEmail: string, newUserUID: string, newPhotoURL: string) => {
		db
			.collection('users')
			.doc()
			.set({ name: newName, email: newEmail, userUID: newUserUID, photoURL: newPhotoURL })
			.then(() => console.log(db.collection('posts').doc().id))
			.then(() => console.log('Document successfully written!'))
			.catch((error) => console.error('Error writing document: ', error));
	};

	const registerNewUser = (email: string, password: string) => {
		auth.createUserWithEmailAndPassword(email, password).catch((error) => {
			alert(error.message);
		});
		auth.onAuthStateChanged((user) => {
			if (user) {
				// User is signed in.
				const email = String(user.email);
				setEmail(email);
				setUserUID(user.uid);
				setUploadedImgUrl(user.photoURL);
				setUserName(user.displayName);
				addUserToDb(name, email, user.uid, uploadedImgUrl);
			} else {
				// User is signed out.
				console.log('User is Logged Out');
			}
		});
		setTimeout(() => {}, 500);
	};

	const updateUserDB = (name: string, email: string, userUID: string, userPhoto: string) => {
		const editedDoc = allUsersData.find((doc: any) => doc.userUID === userUID);
		const docID: string = editedDoc.docID;

		db
			.collection('users')
			.doc(docID)
			.update({ name: name, email: email, userUID: userUID, photoURL: userPhoto })
			.then(() => console.log(db.collection('posts').doc().id))
			.then(() => console.log('Document successfully updated!'))
			.catch((error) => console.error('Error updating document: ', error));
	};

	// POSTS-DB
	const updateControler = () => {
		setControler(Number(Math.floor(Math.random() * 1000)));
	};

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
		updateControler();
	};

	const showSinglePost = (id: string) => {
		const selectedPost = posts.filter((post: firestoreDoc) => post.id === id);
		setPosts(selectedPost);
	};

	const showPostsOfThisAuthor = (UID: string) => {
		const selectedPosts = posts.filter((post: firestoreDoc) => post.author === UID);
		setPosts(selectedPosts);
	};

	const newDocId = () => {
		const alphabet: string[] = [
			'a',
			'b',
			'c',
			'd',
			'e',
			'f',
			'g',
			'h',
			'i',
			'j',
			'k',
			'l',
			'm',
			'n',
			'o',
			'p',
			'q',
			'r',
			's',
			't',
			'u',
			'v',
			'w',
			'x',
			'y',
			'z'
		];

		let newId: string = '';
		alphabet.forEach((el) => {
			const randomSign: string = String(
				Math.floor(Math.random() * 10) > 4
					? alphabet[Math.floor(Math.random() * alphabet.length)]
					: Math.floor(Math.random() * 10)
			);

			newId = newId.concat(randomSign).slice(0, 19);
		});

		setId(newId);
	};

	const add = () => {
		const actualTime = Date();
		content.length > 155
			? alert('155 letters max')
			: db
					.collection('posts')
					.doc(id)
					.set({
						title: title,
						content: content,
						author: userUID,
						time: actualTime,
						img: uploadedImgUrl
					})
					.then(() => console.log(db.collection('posts').doc().id))
					.then(() => console.log('Document successfully written!'))
					.catch((error) => console.error('Error writing document: ', error));
		updateControler();
	};

	const lorem = () => {
		const randomNumbers = String(Math.floor(10000 * Math.random()));
		const ipsum =
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis eos sit quos provident soluta? Quidem, earum quisquam ipsam fugit quo facere minima ...';
		setTitle(randomNumbers);
		setContent(ipsum);
	};

	const clear = () => {
		setTitle('');
		setContent('');
	};

	return (
		<React.Fragment>
			<GlobalContext.Provider
				value={{
					// USER-DB
					uploadedImgUrl,
					setUploadedImgUrl,
					email,
					userUID,
					userPhoto,
					userName,
					editedName,
					editedEmail,
					setEditedName,
					setEditedEmail,
					addUserToDb,
					allUsersData,
					registerNewUser,
					updateUserDB,

					// POSTS-DB
					posts,
					setPosts,
					id,
					setId,
					title,
					setTitle,
					content,
					setContent,
					controler,
					setControler,
					add,
					lorem,
					clear,
					newDocId,
					deletePost,
					showSinglePost,
					showPostsOfThisAuthor,
					selectedPost,
					updateControler,

					// MENU-BUTTONS
					minimizeToIconUserPanel,
					setMinimizeToIconUserPanel,
					minimizeToIconNewPost,
					setMinimizeToIconNewPost,
					minimizeToIconPosts,
					setMinimizeToIconPosts
				}}
			>
				{children}
			</GlobalContext.Provider>
		</React.Fragment>
	);
};
