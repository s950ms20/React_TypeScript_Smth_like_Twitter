import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
	apiKey: 'AIzaSyBRO5rUjPXDsakRwBhIBhsBOMpPj9IysnQ',
	authDomain: 'rcttsrdx3.firebaseapp.com',
	databaseURL: 'https://rcttsrdx3.firebaseio.com',
	projectId: 'rcttsrdx3',
	storageBucket: 'rcttsrdx3.appspot.com',
	messagingSenderId: '766829960198'
};

export const fb = firebase.initializeApp(config);
export const auth = firebase.auth();
export const db = firebase.firestore();
