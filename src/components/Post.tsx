import * as React from 'react';
import { firestoreDoc } from '../state/GlobalContext';
import user_icon from '../img/user_icon.svg';
import { GlobalContext } from '../state/GlobalContext';
import { Link } from 'react-router-dom';

interface Props {
	pst: firestoreDoc;
}

export const Post: React.FC<Props> = ({ pst }) => {
	const [ author, setAuthor ] = React.useState('');
	const [ authorPhotoURL, setAuthorPhotoURL ] = React.useState('');
	const [ authorEmail, setAuthorEmail ] = React.useState('');
	const global = React.useContext(GlobalContext);

	const checkUsersData = () => {
		let matchAuthorToUID = global.allUsersData.find((usr) => usr.userUID === pst.author);
		typeof matchAuthorToUID === 'undefined'
			? (setAuthor(''), setAuthorPhotoURL(user_icon), setAuthorEmail(''))
			: (setAuthor(matchAuthorToUID.name),
				setAuthorPhotoURL(matchAuthorToUID.photoURL),
				setAuthorEmail(matchAuthorToUID.email));
	};

	setTimeout(() => checkUsersData(), 500);

	return (
		<React.Fragment>
			<div className="box">
				<div>
					<img className="userPhoto" src={authorPhotoURL} />
					<br />
					<Link to={`/posts/${pst.id}`}>
						<h1 onClick={() => global.showSinglePost(pst.id)}>{pst.title}</h1>
					</Link>

					{global.userUID && pst.author === global.userUID ? (
						<button
							onClick={() => {
								global.deletePost(pst.id);
							}}
						>
							Delete
						</button>
					) : null}
				</div>
				<div className="content">{pst.content}</div>
				{pst.img ? <img src={pst.img} className="img" /> : null}
				<Link to={`/author/${global.userUID}`}>
					<div
						onClick={() => {
							global.showPostsOfThisAuthor(pst.author);
						}}
						className="author"
					>
						created by: {author ? ' ' + author : authorEmail}
						<br />
						@ {pst.time}
					</div>
				</Link>
			</div>
		</React.Fragment>
	);
};
