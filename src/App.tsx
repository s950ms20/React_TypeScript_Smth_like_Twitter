import * as React from 'react';
import './App.scss';
import { UserPanel } from './components/UserPanel';
import { Register } from './components/Register';
import { Logout } from './components/Logout';
import { auth } from './fb';
import { Wall } from './components/Wall';
import { Dashboard } from './components/Dashboard';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import { Post } from './components/Post';

interface Props {}

const App: React.FC<Props> = (props) => {
	const [ email, setEmail ] = React.useState('');
	React.useEffect(
		() => {
			auth.onAuthStateChanged((user) => {
				if (user) {
					// User is signed in.
					const email = String(user.email);
					setEmail(email);
				} else {
					// User is signed out.
					console.log('User is Logged Out');
				}
			});
		},
		[ email ]
	);

	return (
		<React.Fragment>
			<BrowserRouter>
				<div className="app">
					<Route path="/" exact component={Dashboard} />
					<Route path="/dashboard" exact render={(props) => <UserPanel email={email} history={history} />} />
					<Route path="/dashboard" exact render={(props) => <Wall email={email} />} />
					<Route path="/logout" exact render={(props) => <Logout email={email} history={history} />} />
					<Route path="/register" exact component={Register} />
					<Route path="/post" exact component={Post} />
				</div>
			</BrowserRouter>
		</React.Fragment>
	);
};

export default App;
