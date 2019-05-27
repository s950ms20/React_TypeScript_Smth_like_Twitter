import * as React from 'react';
import { Link } from 'react-router-dom';
import icon_home from '../img/icon_home.svg';
import icon_person from '../img/icon_person.svg';
import pencil_icon from '../img/pencil_icon.svg';
import icon_posts from '../img/icon_posts.svg';
import { GlobalContext } from '../state/GlobalContext';

interface Props {}

export const AppHeader: React.FC<Props> = (props) => {
	const global = React.useContext(GlobalContext);
	return (
		<React.Fragment>
			<div className="header-menu">
				<Link to="/" onClick={() => global.updateControler()}>
					<img src={icon_home} className="icon box" />
				</Link>
				<img
					src={icon_person}
					className="icon box"
					onClick={() => global.setMinimizeToIconUserPanel(!global.minimizeToIconUserPanel)}
				/>
				<img
					src={pencil_icon}
					className="icon box"
					onClick={() => global.setMinimizeToIconNewPost(!global.minimizeToIconNewPost)}
				/>
				<img
					src={icon_posts}
					className="icon box"
					onClick={() => global.setMinimizeToIconPosts(!global.minimizeToIconPosts)}
				/>
			</div>
		</React.Fragment>
	);
};
