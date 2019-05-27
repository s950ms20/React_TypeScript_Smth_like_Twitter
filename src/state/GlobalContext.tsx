import * as React from 'react';

export interface GlobalContext {
	// USER-DB

	uploadedImgUrl: string;
	setUploadedImgUrl: any;
	email: string;
	userUID: string;
	userPhoto: string;
	userName: string;
	editedName: string;
	editedEmail: string;
	setEditedName: any;
	setEditedEmail: any;
	addUserToDb: any;
	allUsersData: userDB[];
	registerNewUser: any;
	updateUserDB: any;
	updateControler: any;

	// POSTS-DB
	posts: firestoreDoc[];
	setPosts: any;
	id: string;
	setId: any;
	title: string;
	setTitle: any;
	content: string;
	setContent: any;
	controler: number;
	setControler: any;
	add: any;
	lorem: any;
	clear: any;
	newDocId: any;
	deletePost: any;
	showSinglePost: any;
	showPostsOfThisAuthor: any;
	selectedPost: any;

	// MENU-BUTTONS
	minimizeToIconUserPanel: boolean;
	setMinimizeToIconUserPanel: any;
	minimizeToIconNewPost: boolean;
	setMinimizeToIconNewPost: any;
	minimizeToIconPosts: boolean;
	setMinimizeToIconPosts: any;
}

// USER-DB
export interface userDB {
	userUID: string;
	photoURL: string;
	email: string;
	name: string;
	docID: string;
}

// POSTS-DB
export interface firestoreDoc {
	title: string;
	content: string;
	author: string;
	id: string;
	time: string;
	img: string;
}

export class firestoreDoc {
	constructor(title: string, content: string, author: string, id: string, time: string) {
		this.title = title;
		this.content = content;
		this.author = author;
		this.id = id;
		this.time = time;
	}
}

export const GlobalContext = React.createContext<GlobalContext>({
	// USER-DB

	uploadedImgUrl: '',
	setUploadedImgUrl: () => {},
	email: '',
	userUID: '',
	userPhoto: '',
	userName: '',
	editedName: '',
	editedEmail: '',
	setEditedName: () => {},
	setEditedEmail: () => {},
	addUserToDb: () => {},
	allUsersData: [],
	registerNewUser: () => {},
	updateUserDB: () => {},

	// POSTS-DB
	posts: [],
	setPosts: () => {},
	id: '',
	setId: () => {},
	title: '',
	setTitle: () => {},
	content: '',
	setContent: () => {},
	controler: 0,
	setControler: () => {},
	add: () => {},
	lorem: () => {},
	clear: () => {},
	newDocId: () => {},
	deletePost: () => {},
	showSinglePost: () => {},
	showPostsOfThisAuthor: () => {},
	selectedPost: [],
	updateControler: () => {},

	// MENU-BUTTONS
	minimizeToIconUserPanel: false,
	setMinimizeToIconUserPanel: () => {},
	minimizeToIconNewPost: true,
	setMinimizeToIconNewPost: () => {},
	minimizeToIconPosts: false,
	setMinimizeToIconPosts: () => {}
});
