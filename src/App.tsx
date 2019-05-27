import * as React from 'react';
import './App.scss';
import { UserPanel } from './components/UserPanel';
import { Register } from './components/Register';
import { Logout } from './components/Logout';
import { Wall } from './components/Wall';
import { Dashboard } from './components/Dashboard';
import { BrowserRouter, Route } from 'react-router-dom';
import { Posts } from './components/Posts';
import { Profile } from './components/Profile';
import { GlobalState } from './state/GlobalState';
import { AppHeader } from './components/AppHeader';
import { SinglePost } from './components/SinglePost';
interface Props {}

const App: React.FC<Props> = (props) => {
	return (
		<React.Fragment>
			<BrowserRouter>
				<GlobalState>
					<div className="app">
						<AppHeader />
						<Route path="/" exact component={Dashboard} />
						<Route path="/dashboard" exact render={(props) => <UserPanel history={history} />} />
						<Route path="/logout" exact render={(props) => <Logout history={history} />} />
						<Route path="/register" exact component={Register} />
						<Route path="/dashboard" exact component={Wall} />
						<Route path="/posts" component={SinglePost} />
						<Route path="/author" component={Posts} />
						<Route path="/profile" exact component={Profile} />
					</div>
				</GlobalState>
			</BrowserRouter>
		</React.Fragment>
	);
};

export default App;
